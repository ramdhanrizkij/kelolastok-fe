# Shape and Elevation Foundation

## Border radius

| Token | Value | Usage |
|---|---:|---|
| `radius-none` | 0px | Special cases |
| `radius-sm` | 4px | Compact badges |
| `radius-md` | 6px | Inputs and buttons |
| `radius-lg` | 8px | Cards and dropdowns |
| `radius-xl` | 12px | Dialogs |
| `radius-2xl` | 16px | Large containers |
| `radius-full` | 9999px | Avatars and pill badges |

## Elevation

| Token | Value | Usage |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgb(0 0 0 / 0.04)` | Subtle separation |
| `shadow-sm` | `0 1px 3px rgb(0 0 0 / 0.08)` | Small floating elements |
| `shadow-md` | `0 4px 8px rgb(0 0 0 / 0.08)` | Popovers |
| `shadow-lg` | `0 10px 25px rgb(0 0 0 / 0.12)` | Dialogs |
| `shadow-xl` | `0 20px 40px rgb(0 0 0 / 0.16)` | Large overlays |

## Rules

- Prefer a subtle border over a persistent heavy shadow for cards.
- Use elevation to communicate layering, not decoration.
- Ensure overlays remain distinguishable in dark mode using surface and border tokens as well as shadow.
- Keep radius consistent within a component family.
