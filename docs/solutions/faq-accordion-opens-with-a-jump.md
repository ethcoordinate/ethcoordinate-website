# FAQ accordion opens with a jump

## Symptom

Each FAQ item snaps open instead of expanding. Only the text fades. The
clicked question also slides up when another item closes. Firefox shows the
snap on every open.

## Cause

Two causes stack:

1. The panel animated `block-size` from `0` to `auto`. That needs
   `interpolate-size: allow-keywords`, which only Chromium supports. Firefox
   and Safari skip the transition and jump to the final height.
2. The `name="faq"` attribute made the accordion exclusive. An open
   force-closed the open item above, so the clicked row shifted up under the
   cursor while its answer expanded.

## Fix

1. Animate `grid-template-rows` from `0fr` to `1fr` on
   `details::details-content` instead of `block-size`. Every modern engine
   interpolates `fr` tracks. Give the answer `min-height: 0`, so the track
   can reach zero. `interpolate-size` is no longer needed, so it is gone
   from `global.css`.
2. Drop the `name` attribute. Items open and close on their own, so no
   sibling moves the clicked row.

See `src/components/faq.astro`.
