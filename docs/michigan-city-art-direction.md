# Michigan City — verified art direction (2026-11-11)

## Design standard
Use original, colorful, premium isometric 3D-cartoon game art, but represent **current** Michigan City landmarks accurately. The game map is a stylized composition, not a literal street map. Do not invent present-day attractions. Preserve existing player saves, city progress and economy.

## Landmarks and geographic relationships
1. **East Pierhead Lighthouse** — red-roofed pierhead light and its elevated catwalk on the breakwater. Do NOT draw a generic red-and-white striped tower. Do not confuse with the 1858 Old Lighthouse Museum.
2. **Washington Park** — public beach, dune/park grounds, shelters, historic bandstand, gardens, paths, and nearby **Washington Park Zoo** with its real observation tower. No Ferris wheel. The zoo and tower are inland from the beach.
3. **Blue Chip Casino / Blue Chip District** — recognizable hotel/casino complex in its actual district; avoid fabricating a landmark casino façade. Confirm current exterior from official imagery before final asset production.
4. **Franklin Street** — recognizable Michigan City downtown/Uptown Arts District streetscape, historic storefronts and walkable urban character; do not use generic casino-style façades.
5. **Lakefront Pier / Marina** — existing pier, boardwalk/catwalk access, water, boats and Michigan City Marina. The lighthouse is at the pierhead; don't place a second fictitious lighthouse.

## Reference sources
- Official Washington Park map: https://parks.michigancityin.gov/wp-content/uploads/2025/02/WashingtonParkMap021219_202411191613584534.pdf.pdf
- Official Washington Park: https://parks.michigancityin.gov/parks-and-facilities/washington-park/
- Official Washington Park Zoo: https://parks.michigancityin.gov/parks-and-facilities/washington-park-zoo/
- Lighthouse history and architectural distinction: https://www.indianalandmarks.org/2012/09/michigan-city-lighthouses/
- Tourism district references: https://michigancitylaporte.com/see-and-do/washington-park-beach/

## Asset production plan
- Produce one clean **background-only** isometric environment with no labels or UI.
- Produce **transparent individual landmark assets** for each of five landmarks at levels 0–5 (30 total). Keep identical camera angle, scale, anchor point and lighting for all stages.
- Produce UI as HTML/CSS, never bake coin counts, upgrade labels, buttons, or game-state text into artwork.
- Place landmarks as interactive positioned layers. Upgrade should swap only that landmark's image; preserve all other landmarks and the background.
- Support portrait mobile layout, image preloading, fallbacks, and reduced motion.
- Preserve the current localStorage key and Michigan City 25/25 and La Porte progress. Never reset or overwrite saves for art changes.
- Do not claim images are integrated until actual image files have been committed and deployed.

## Acceptance
1. Current buildings are geographically and visually recognizable.
2. All five landmarks visually change at every level.
3. Completed Michigan City renders 5/5 landmarks.
4. La Porte progress and spins/coins persist after reload.
5. Works on Android mobile Chrome and GitHub Pages.
