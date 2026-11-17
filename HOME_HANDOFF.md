# Home implementation — 2026-11-17

- Added `assets/reaper-home.png` from the supplied shoulder-scythe character reference, unchanged.
- Updated `index.html`: explicit accessible hero image, responsive navy/crimson presentation, four menus, normal-panel accessibility relationship, accurate coming-soon text.
- Game JavaScript is byte-for-byte unchanged, including localStorage record key/schema and PeerJS protocol.

## Validation
- JavaScript syntax and git diff whitespace checks passed.
- Browser: hero loaded; normal menu opens; demo selection, result, and record update passed (one win, 100% rate, streak 1).
- Browser iframe viewports 430 × 932 and 375 × 667: four menus fit horizontally; short screens scroll vertically. This is Chromium size validation, not physical iOS Safari verification.
- Online two-device test remains outstanding.

## Outstanding
- Source PNG has opaque white islands in weapon/arm gaps. Automated cleanup was attempted but image tool returned usage_limit_reached (429); original artwork retained.
- Formal character changes (cross ornament, five-finger checks, separate parts, soul vessel animation) require further artwork review.
- Abilities, card collection/catalogue, best-of-five and loss penalties remain design proposals and are not implemented.
