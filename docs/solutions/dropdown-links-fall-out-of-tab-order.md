# Dropdown links fall out of tab order

## Symptom

The Products dropdown opened on keyboard focus, but `Tab` from the Products
trigger moved to Events, not into the open panel. Focusing Events then opened
the Events panel and closed the Products one, so the Products links could never
be reached by keyboard.

## Cause

The two panels were siblings of the whole nav list. In the DOM they came after
every nav item, so the tab order was Products, Events, About, the CTA, and only
then the panel links.

## Fix

Each panel now sits inside the `<li>` of the item that opens it, right after
the trigger. The panel keeps its place on screen, because it is absolutely
positioned and `#nav-shell` is the only positioned ancestor, so `top: 100%` and
`inset-x-0` still measure the whole bar. The tab order is now Products, its six
links, Events, its eight links, About, the CTA.

## Check

Open the page, focus the Products trigger, and press `Tab`. The next stop must
be "Knowledge Base".
