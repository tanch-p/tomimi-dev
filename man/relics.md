# Relic definitions and selection

The IS relic JSON files contain definitions only. Names and tooltips use language
maps, for example `"name": { "zh": "探测先锋", "ja": "", "en": "" }`. Empty or
missing translations fall back to Chinese through `getRelicText`.

`src/lib/data/is/relicCatalog.ts` groups the definitions by topic. Phantom hard
relics have their own catalog because only one can be selected at a time.

## Selection stores

Each topic creates a store with `createRelicSelectionStore(catalog)`. Phantom's
hard relic store additionally passes `{ exclusive: true }`.

The store exposes a Svelte subscription containing `{ id, stageIndex }` entries.
Indices are zero-based for every relic. An ordinary relic uses index `0`; an
absent entry means unselected. Definitions never carry a runtime `count`.

Use the store's operations instead of constructing arrays or mutating JSON:

| Operation                 | Behavior                                                           |
| ------------------------- | ------------------------------------------------------------------ |
| `ensureSelected(idOrIds)` | Add missing relics at their first stage; preserve existing stages. |
| `toggle(id)`              | Remove a selected relic or add it at its first stage.              |
| `setStage(id, index)`     | Change an already selected relic to a valid stage.                 |
| `remove(id)`              | Remove a relic.                                                    |
| `clear()`                 | Remove all selections.                                             |
| `restore(saved)`          | Replace selections using validated saved IDs and counts.           |

Unknown IDs and invalid stage indices are ignored. Changes preserve selection
order and avoid notifying subscribers when the result is unchanged.

Stage requirements remain in pages and components. For example, a page may add
a default only when neither of two alternative relics is selected. Such rules
call `ensureSelected` after checking their own conditions.

## Reading effects and presentation data

Use `store.resolved` for names, images, active stages, and effects. Both ordinary
stat modifiers and special modifiers consume its `effects` field. A stage's
effects replace the base effects completely, including when the stage's effects
are empty. Stages are not accumulated or scaled by their index: different relics
have different stacking rules encoded in their effect arrays.

Presence checks can read the compact selection store directly. Relic-linked wave
options derive their selected state and hidden groups from resolved special
effects, so changes made in the overlay also update the wave panel.

## Saved state compatibility

Published Black share codes use one-based `count` values. `restore` converts
these to zero-based indices; `serializeRelics` converts resolved selections back
to the existing saved shape. Neither the share-code version nor the encoded ID
ordering changes.

## Image resolution

Use `getRelicImagePath(id)` from `src/lib/data/is/relicImages.ts` wherever a relic
image is needed. Its private alias map contains only filenames that differ from
the relic ID; other IDs resolve to `/images/relics/{id}.webp`. Shared artwork
aliases remain available to both IS stages and recruitment filters. Relic JSON
and selection objects do not need image fields.

`getIconPath` uses the same resolver for stage-variant relic icons. Wave options,
modifier icons, cards, floor controls, recruitment filters, and footer icons also
use it directly.

## Regression tests

- `src/vitest/relicSelection.test.ts`: selection isolation, validation, stage
  effects, immutable definitions, saved codes, and wave synchronization.
- `src/vitest/relicStores.test.ts`: the six route stores, conditional Sui effects,
  Phantom exclusivity, and consistent regular/special stage modifiers. A staged
  system-effect fixture guards against consumers bypassing stage resolution.
- `src/vitest/relicImages.test.ts`: shared aliases, ID fallbacks, stage icons, and
  image-file existence for every IS, recruitment, and variant relic ID.
- `tests/relic_selection.spec.ts`: browser checks for stats, stage controls,
  keyboard/backdrop behavior, saved states, defaults, variants, waves, and
  recruitment image aliases.

Run the unit checks with `pnpm exec vitest run src/vitest/relicSelection.test.ts
src/vitest/relicStores.test.ts src/vitest/relicImages.test.ts`. Run the browser
checks with `pnpm exec playwright test tests/relic_selection.spec.ts`.
