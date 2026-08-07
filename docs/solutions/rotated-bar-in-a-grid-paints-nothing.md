# A rotated bar inside a grid paints nothing

## Symptom

The FAQ toggle drew a plus from two spans. One span stayed flat, the other
carried `rotate: 90deg` to stand upright.

```html
<span class="relative grid size-4.5 place-items-center">
	<span class="bg-body absolute h-px w-full"></span>
	<span class="bar bg-body absolute h-px w-full"></span>
</span>
```

Every row painted a minus. The upright stroke never showed.

The DOM and the CSS both looked right. `getComputedStyle` returned
`rotate: 90deg`, and `getBoundingClientRect` returned `1 x 18`, which is the
upright box. The browser measured the stroke and then painted nothing.

## Cause

Both spans are absolutely positioned and carry no inset. Their place therefore
comes from the static position inside a grid container. That position is not
reliable for a box that is one pixel thick. The measured box is correct, the
painted box is not.

`w-full` adds to the trap. It resolves against the containing block, so the
stroke depends on two things at once: the size of the parent and the static
position inside it.

## Fix

Draw the mark as an inline SVG. The viewBox fixes both strokes in place, so
neither one depends on a static position.

```html
<svg class="mark size-4.5" viewBox="0 0 18 18" aria-hidden="true">
	<line x1="2" y1="9" x2="16" y2="9" />
	<line class="bar" x1="9" y1="2" x2="9" y2="16" />
</svg>
```

```css
.bar {
	transform-box: fill-box;
	transform-origin: center;
	transition: rotate 260ms var(--ease-out);
}

details[open] .bar {
	rotate: 90deg;
}
```

`transform-box: fill-box` is required. Without it the origin sits at the corner
of the SVG viewport, and the stroke swings around that corner instead of turning
on itself.

## Rule

Do not build a mark out of absolutely positioned boxes that carry no inset. Use
an SVG. A viewBox states the geometry once, and it holds at every size.
