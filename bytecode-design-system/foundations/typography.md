# Typography Foundation

## Typeface

Recommended default: **Inter**. Alternatives include Geist, IBM Plex Sans, and Plus Jakarta Sans. Use one primary family across the application unless there is a documented reason to introduce another.

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## Type scale

| Token | Size | Line height | Weight | Usage |
|---|---:|---:|---:|---|
| `display-lg` | 36px | 44px | 600 | Exceptional dashboard highlights |
| `display-md` | 30px | 38px | 600 | Major KPI values |
| `heading-1` | 24px | 32px | 600 | Page title |
| `heading-2` | 20px | 28px | 600 | Major section heading |
| `heading-3` | 18px | 28px | 600 | Card/section heading |
| `heading-4` | 16px | 24px | 600 | Subsection heading |
| `body-lg` | 16px | 24px | 400 | Prominent body content |
| `body-md` | 14px | 20px | 400 | Default body and table content |
| `body-sm` | 13px | 20px | 400 | Secondary dense content |
| `caption` | 12px | 16px | 400 | Metadata and helper text |
| `overline` | 11px | 16px | 600 | Short category label only |

## Component typography

| Element | Size / line height | Weight |
|---|---|---:|
| Page title | 24px / 32px | 600 |
| Section title | 18px / 28px | 600 |
| Card title | 16px / 24px | 600 |
| Body | 14px / 20px | 400 |
| Form label | 14px / 20px | 500 |
| Input value | 14px / 20px | 400 |
| Placeholder | 14px / 20px | 400 |
| Helper/error | 12px / 16px | 400 |
| Table header | 13px / 20px | 600 |
| Badge | 12px / 16px | 500 |

## Rules

- Do not use placeholder text as the only field label.
- Reserve 12px text for supporting information, not essential long-form content.
- Use a limited set of weights (400, 500, 600, 700).
- Use tabular numerals for aligned financial or statistical values where appropriate.
- Avoid all-caps labels for long text.
- Maintain readable line lengths; use wider layouts for tables and narrower measures for prose.
