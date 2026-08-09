# Firefox skips every transition on `::details-content`

## Symptom

In Firefox the FAQ items snap open. On close, the answer fades, then the row
and the whole page below jump at once. The jump is most visible on the last
items, because the CTA section with the drifting dots jolts with them. Chrome
animates the same items correctly.

## Cause

Firefox does not start transitions on the `::details-content` pseudo element.
The `grid-template-rows` value flips from `0fr` to `1fr` in one frame. The
fr-track trick from `faq-accordion-opens-with-a-jump.md` therefore only ever
worked in Chromium and Safari. Frame-by-frame measurement confirmed it: the
track height interpolated in Chromium and snapped in Firefox.

## Fix

Move the animation off the pseudo element and onto a real wrapper:

1. Wrap the answer in a `div.panel`. The panel carries `display: grid`,
   the `0fr` to `1fr` track, `overflow: hidden`, and the transition. Every
   engine transitions grid tracks on a real element.
2. Keep the content rendered with
   `details::details-content { content-visibility: visible }`. Without it the
   closed content has no computed style, so no engine can start a transition
   from it.
3. Move the answer's `padding-bottom` into the transition. Left as static
   padding, it holds a 26px floor under every closed row in Firefox, because
   a track minimum cannot shrink below the padding of its item.

See `src/components/faq.astro`. Verify accordion changes in Firefox and
Chromium both, with a frame-by-frame height sample, not a single screenshot.
