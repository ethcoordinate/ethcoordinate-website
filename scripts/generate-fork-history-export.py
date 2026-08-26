#!/usr/bin/env python3
"""Generate print-quality static exports of the fork history timeline.

Outputs (served from the site, linked under the timeline):
  public/upgrades/fork-history-dark.png
  public/upgrades/fork-history-light.png

Geometry mirrors src/app/upgrades/UpgradeTimeline.tsx (source-artwork px space);
fork data mirrors src/data/upgrades.ts. Keep both in sync when forks change.

Requires: Pillow. Fonts (JetBrains Mono, OFL) auto-download to scripts/.fonts/.
"""

import math
import os
import urllib.request

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "public", "upgrades")
FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".fonts")

FONT_URLS = {
    "JetBrainsMono-Regular.ttf": "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf",
    "JetBrainsMono-Bold.ttf": "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf",
}

# --- fork data (sync with src/data/upgrades.ts) ---
PRE_MERGE_EL = [
    ("Frontier", "30 Jul 2015"), ("Frontier Thawing", "7 Sep 2015"),
    ("Homestead", "16 Mar 2016"), ("DAO fork", "20 Jul 2016"),
    ("Tangerine Whistle", "18 Oct 2016"), ("Spurious Dragon", "22 Nov 2016"),
    ("Byzantium", "16 Oct 2017"), ("Constantinople + St. Petersburg", "28 Feb 2019"),
    ("Istanbul", "7 Dec 2019"), ("Muir Glacier", "2 Jan 2020"),
    ("Berlin", "15 Apr 2021"), ("London", "5 Aug 2021"),
    ("Arrow Glacier", "9 Dec 2021"), ("Grey Glacier", "30 Jun 2022"),
]
PRE_MERGE_CL = [("Phase0 “Genesis”", "1 Dec 2020"), ("Altair", "27 Oct 2021")]
MERGE = ("The Merge", "Bellatrix/Paris", "15 Sep 2022")
POST_MERGE = [
    (1, "Shapella", "Capella/Shanghai", "12 Apr 2023", "Enabled withdrawals from validators."),
    (2, "Dencun", "Deneb/Cancun", "13 Mar 2024", "Added a new data type called “blobs” that made L2s cheaper to use."),
    (3, "Pectra", "Electra/Prague", "7 May 2025", "Enabled better wallet UX, validator consolidations & withdrawal address exits."),
    (4, "Fusaka", "Fulu/Osaka", "3 Dec 2025", "Data availability sampling (scaling unlock)."),
    (5, "Glamsterdam", "Gloas/Amsterdam", "2026", "ePBS, Block-level Access Lists."),
    (6, "Hegotá", "Heze / Bogotá", "TBD", "FOCIL."),
]

# --- timeline geometry (sync with UpgradeTimeline.tsx) ---
EL_BADGES = [
    (352, 942, 90, 88), (433, 942, 90, 88), (699, 940, 90, 89), (874, 940, 91, 89),
    (1008, 924, 91, 89), (1035, 975, 109, 95), (1527, 942, 91, 88), (2231, 940, 91, 89),
    (2679, 924, 91, 89), (2705, 975, 110, 95), (3376, 940, 91, 89), (3552, 941, 90, 89),
    (3729, 937, 90, 88), (3988, 937, 91, 88),
]
CL_BADGES = [(3205, 772, 90, 88), (3636, 772, 91, 88)]
MERGE_R = (4171, 832, 235, 123)
MERGE_L = (401, 1753, 235, 124)
POST_BADGES = [
    (1029, 1752, 131, 130), (1800, 1752, 131, 130), (2775, 1752, 131, 130),
    (3170, 1752, 129, 130), (3770, 1752, 130, 130), (4316, 1752, 129, 130),
]
LOOP = (100, 800, 4600, 1100)
DOT_GAP = 43
EL_YEARS = [("2016", 720), ("2017", 1240), ("2018", 1765), ("2019", 2275),
            ("2020", 2750), ("2021", 3415), ("2022", 3925)]
POST_YEARS = [("2023", 1100), ("2024", 1860), ("2025", 2700), ("2026", 3334)]

# vertical crop of the source space used in the export
SRC_TOP, SRC_BOTTOM = 660, 2040

# --- layout constants (export px) ---
W = 4700
MARGIN = 130
TITLE_Y = 100
TIMELINE_Y = 300  # where SRC_TOP maps to


def ty(y):
    return y - SRC_TOP + TIMELINE_Y


def dot_row(x0, x1, skip):
    dots = []
    x = math.ceil(x0 / DOT_GAP) * DOT_GAP
    while x <= x1:
        if not any(a <= x <= b for a, b in skip):
            dots.append(x)
        x += DOT_GAP
    return dots


SKIP_EL = [(b[0] - 12, b[0] + b[2] + 12) for b in EL_BADGES]
SKIP_CL = [(b[0] - 12, b[0] + b[2] + 12) for b in CL_BADGES]
SKIP_POST = [(MERGE_L[0] - 12, MERGE_L[0] + MERGE_L[2] + 12)] + [
    (b[0] - 12, b[0] + b[2] + 12) for b in POST_BADGES
]


def bezier_dots(p0, p1, p2, p3, gap=DOT_GAP):
    """Dots along a cubic bezier, spaced by arc length."""
    pts = []
    steps = 400
    prev = p0
    acc = 0.0
    for i in range(1, steps + 1):
        t = i / steps
        x = (1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * p1[0] + 3 * (1 - t) * t ** 2 * p2[0] + t ** 3 * p3[0]
        y = (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * p1[1] + 3 * (1 - t) * t ** 2 * p2[1] + t ** 3 * p3[1]
        acc += math.hypot(x - prev[0], y - prev[1])
        if acc >= gap:
            pts.append((x, y))
            acc = 0.0
        prev = (x, y)
    return pts


def load_fonts():
    os.makedirs(FONT_DIR, exist_ok=True)
    for name, url in FONT_URLS.items():
        path = os.path.join(FONT_DIR, name)
        if not os.path.exists(path):
            print(f"downloading {name}")
            urllib.request.urlretrieve(url, path)
    regular = os.path.join(FONT_DIR, "JetBrainsMono-Regular.ttf")
    bold = os.path.join(FONT_DIR, "JetBrainsMono-Bold.ttf")
    return regular, bold


def scale_rgb(img, factor):
    """Multiply RGB by factor, keep alpha (for light-mode sprite contrast)."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    r, g, b, a = img.split()
    lut = [min(255, round(v * factor)) for v in range(256)]
    r, g, b = (ch.point(lut) for ch in (r, g, b))
    return Image.merge("RGBA", (r, g, b, a))


def invert_rgb(img):
    """Invert RGB, keep alpha (loop line: light gray on dark -> dark gray on light)."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    r, g, b, a = img.split()
    lut = [255 - v for v in range(256)]
    r, g, b = (ch.point(lut) for ch in (r, g, b))
    return Image.merge("RGBA", (r, g, b, a))


def paste(draw_img, sprite, box):
    x, y, w, h = box
    s = sprite.resize((w, h), Image.LANCZOS)
    draw_img.alpha_composite(s, (x, y))


def rotated_label(base, text, font, fill, center, angle=2):
    """Small text tile rotated like the site's -2deg CSS labels."""
    pad = 12
    tmp = Image.new("RGBA", (10, 10))
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tile = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    td = ImageDraw.Draw(tile)
    td.text((pad - bbox[0], pad - bbox[1]), text, font=font, fill=fill)
    tile = tile.rotate(angle, expand=True, resample=Image.BICUBIC)
    base.alpha_composite(tile, (round(center[0] - tile.width / 2), round(center[1] - tile.height / 2)))


def render(mode):
    dark = mode == "dark"
    pal = {
        "bg": (0, 0, 4) if dark else (255, 255, 255),
        "text": (240, 246, 255) if dark else (16, 16, 24),
        "body": (156, 156, 156) if dark else (70, 70, 80),
        "muted": (138, 138, 138) if dark else (120, 120, 130),
        "blue": (0, 212, 255) if dark else (0, 138, 170),
        "purple": (167, 139, 250) if dark else (124, 92, 214),
        "dot": (138, 154, 175, 140) if dark else (90, 100, 120, 115),
    }

    regular, bold = load_fonts()
    f_title = ImageFont.truetype(bold, 96)
    f_head = ImageFont.truetype(bold, 44)
    f_item = ImageFont.truetype(regular, 36)
    f_item_b = ImageFont.truetype(bold, 36)
    f_small = ImageFont.truetype(regular, 32)
    f_nick = ImageFont.truetype(bold, 46)
    f_date = ImageFont.truetype(regular, 36)
    f_year = ImageFont.truetype(regular, 44)
    f_layer = ImageFont.truetype(regular, 52)
    f_credit = ImageFont.truetype(regular, 38)

    legend_top = ty(SRC_BOTTOM) + 110
    row_h = 58
    col_w = (W - 2 * MARGIN - 2 * 100) / 3
    # height is driven by the tallest column (EL list vs wrapped post-merge summaries)
    f_small_probe = ImageFont.truetype(regular, 32)
    probe = ImageDraw.Draw(Image.new("RGBA", (10, 10)))

    def wrapped_count(text, max_w):
        lines, cur = 0, ""
        for word in text.split():
            trial = f"{cur} {word}".strip()
            if probe.textlength(trial, font=f_small_probe) <= max_w:
                cur = trial
            else:
                lines += 1
                cur = word
        return lines + (1 if cur else 0)

    el_h = 78 + 7 * row_h  # col 1: first half of EL
    mid_h = 78 + 7 * row_h + 40 + 78 + 3 * row_h  # col 2: EL rest + CL + merge
    post_h = 78 + sum(78 + 40 * wrapped_count(b, col_w - 64) for *_x, b in POST_MERGE)
    legend_h = max(el_h, mid_h, post_h)
    credit_y = legend_top + legend_h + 110
    H = credit_y + 130

    img = Image.new("RGBA", (W, H), pal["bg"] + (255,))
    d = ImageDraw.Draw(img)

    # ---------- title ----------
    d.text((MARGIN, TITLE_Y), "Ethereum fork history", font=f_title, fill=pal["text"])
    d.text((W - MARGIN, TITLE_Y + 30), "ethcoordinate.org/upgrades", font=f_small,
           fill=pal["muted"], anchor="ra")

    # ---------- loop ----------
    loop = Image.open(os.path.join(ASSETS, "loop.webp"))
    if not dark:
        loop = invert_rgb(loop)
    paste(img, loop, (LOOP[0], ty(LOOP[1]), LOOP[2], LOOP[3]))

    # ---------- dotted tracks ----------
    def dot(x, y):
        d.rounded_rectangle([x - 7, ty(y) - 9, x + 7, ty(y) + 9], radius=7, fill=pal["dot"])

    for x in dot_row(530, 4040, SKIP_EL):
        dot(x, 975)
    for x in dot_row(3300, 4040, SKIP_CL):
        dot(x, 816)
    for x in dot_row(660, 4500, SKIP_POST):
        dot(x, 1816)
    for x, y in bezier_dots((4040, 816), (4100, 816), (4130, 845), (4165, 902)):
        dot(x, y)
    for x, y in bezier_dots((4040, 975), (4100, 975), (4130, 950), (4165, 908)):
        dot(x, y)

    # ---------- badges ----------
    def sprite(name):
        return Image.open(os.path.join(ASSETS, name))

    el_sprite_factor = 1 if dark else 0.72
    cl_sprite_factor = 1 if dark else 0.68
    for i, box in enumerate(EL_BADGES):
        s = sprite(f"el-{i + 1}.webp")
        if not dark:
            s = scale_rgb(s, el_sprite_factor)
        paste(img, s, (box[0], ty(box[1]), box[2], box[3]))
    for i, box in enumerate(CL_BADGES):
        s = sprite(f"cl-{i + 1}.webp")
        if not dark:
            s = scale_rgb(s, cl_sprite_factor)
        paste(img, s, (box[0], ty(box[1]), box[2], box[3]))
    paste(img, sprite("merge-pill.webp"), (MERGE_R[0], ty(MERGE_R[1]), MERGE_R[2], MERGE_R[3]))
    paste(img, sprite("merge-pill-left.webp"), (MERGE_L[0], ty(MERGE_L[1]), MERGE_L[2], MERGE_L[3]))
    for i, box in enumerate(POST_BADGES):
        paste(img, sprite(f"post-{i + 1}.webp"), (box[0], ty(box[1]), box[2], box[3]))

    # ---------- labels ----------
    rotated_label(img, "consensus layer", f_layer, pal["blue"], (3808, ty(674 + 26)))
    rotated_label(img, "execution layer", f_layer, pal["purple"], (1700, ty(1080 + 26)))

    for year, x in EL_YEARS:
        d.text((x, ty(870)), year, font=f_year, fill=pal["muted"], anchor="ma")
    for year, x in POST_YEARS:
        d.text((x, ty(1645)), year, font=f_year, fill=pal["muted"], anchor="ma")

    # merge label under the right pill
    d.text((MERGE_R[0] + MERGE_R[2] / 2, ty(985)), MERGE[0], font=f_nick, fill=pal["text"], anchor="ma")
    d.text((MERGE_R[0] + MERGE_R[2] / 2, ty(1045)), MERGE[2], font=f_date, fill=pal["muted"], anchor="ma")

    # post-merge nicknames + dates under badges
    for (n, nick, full, date, blurb), box in zip(POST_MERGE, POST_BADGES):
        cx = box[0] + box[2] / 2
        d.text((cx, ty(box[1] + box[3] + 40)), nick, font=f_nick, fill=pal["text"], anchor="ma")
        d.text((cx, ty(box[1] + box[3] + 100)), date, font=f_date, fill=pal["muted"], anchor="ma")

    # ---------- legend ----------
    cols = [MARGIN, MARGIN + col_w + 100, MARGIN + 2 * (col_w + 100)]

    def head(x, y, text):
        d.text((x, y), text.upper(), font=f_head, fill=pal["blue"])
        return y + 78

    def item(x, y, num, name, date, num_color):
        d.text((x, y), str(num), font=f_item_b, fill=num_color)
        d.text((x + 64, y), name, font=f_item, fill=pal["text"])
        d.text((x + col_w, y), date, font=f_small, fill=pal["muted"], anchor="ra")
        return y + row_h

    # col 1: execution layer (first half)
    y = head(cols[0], legend_top, "Execution layer (pre-merge)")
    for i, (name, date) in enumerate(PRE_MERGE_EL[:7]):
        y = item(cols[0], y, i + 1, name, date, pal["purple"])

    # col 2: rest of EL, then CL + merge
    y = head(cols[1], legend_top, "Execution layer (cont.)")
    for i, (name, date) in enumerate(PRE_MERGE_EL[7:]):
        y = item(cols[1], y, i + 8, name, date, pal["purple"])
    y += 40
    y = head(cols[1], y, "Consensus layer (pre-merge)")
    for i, (name, date) in enumerate(PRE_MERGE_CL):
        y = item(cols[1], y, i + 1, name, date, pal["blue"])
    y = item(cols[1], y, "m", f"{MERGE[1]} “{MERGE[0]}”", MERGE[2], pal["blue"])

    # col 3: post-merge with smol summaries (word-wrapped to the column)
    def wrap(text, font, max_w):
        lines, cur = [], ""
        for word in text.split():
            trial = f"{cur} {word}".strip()
            if d.textlength(trial, font=font) <= max_w:
                cur = trial
            else:
                lines.append(cur)
                cur = word
        if cur:
            lines.append(cur)
        return lines

    y = head(cols[2], legend_top, "Post-merge (combined forks)")
    for n, nick, full, date, blurb in POST_MERGE:
        d.text((cols[2], y), str(n), font=f_item_b, fill=pal["text"])
        d.text((cols[2] + 64, y), f"{full} “{nick}”", font=f_item, fill=pal["text"])
        d.text((cols[2] + col_w, y), date, font=f_small, fill=pal["muted"], anchor="ra")
        for j, line in enumerate(wrap(blurb, f_small, col_w - 64)):
            d.text((cols[2] + 64, y + 46 + j * 40), line, font=f_small, fill=pal["body"])
        y += 78 + 40 * len(wrap(blurb, f_small, col_w - 64))

    # ---------- credit ----------
    d.text((W - MARGIN, credit_y), "an EthCoordinate resource, illustration by nixo",
           font=f_credit, fill=pal["muted"], anchor="ra")

    out = os.path.join(ASSETS, f"fork-history-{mode}.png")
    img.convert("RGB").save(out, optimize=True)
    print(f"wrote {out} ({os.path.getsize(out) / 1e6:.1f} MB, {W}x{H})")


if __name__ == "__main__":
    render("dark")
    render("light")
