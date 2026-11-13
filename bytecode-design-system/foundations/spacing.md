# Spacing Foundation

## Principle

Use a 4px-based spacing scale. Prefer named tokens over arbitrary values so that spacing remains consistent and can be adjusted centrally.

## Scale

| Token | Value | Typical use |
|---|---:|---|
| `space-0` | 0px | Reset |
| `space-1` | 4px | Icon-to-text gap, tight inline spacing |
| `space-2` | 8px | Label-to-control gap |
| `space-3` | 12px | Compact internal spacing |
| `space-4` | 16px | Standard component gap |
| `space-5` | 20px | Form field gap |
| `space-6` | 24px | Card padding, page header to content |
| `space-7` | 28px | Intermediate separation |
| `space-8` | 32px | Form section gap |
| `space-10` | 40px | Large group separation |
| `space-12` | 48px | Major page section separation |
| `space-16` | 64px | Large layout separation |

## Contextual rules

| Relationship | Default |
|---|---:|
| Icon to adjacent label | 8px |
| Label to input | 8px |
| Input to helper/error text | 4px |
| Form field to field | 20px |
| Form section to section | 32px |
| Card internal padding | 24px |
| Card to card | 16–24px |
| Page title to description | 4px |
| Page header to page content | 24px |
| Section heading to section content | 16px |
| Button to button | 8px |
| Dialog content padding | 24px |

## Rules

- Use the smallest spacing that preserves clear grouping and touch usability.
- Use larger gaps to communicate a change in information group.
- Do not use identical spacing for every relationship.
- Avoid one-off values unless a component's geometry requires them; document exceptions.
- On narrow screens, page and card padding may reduce to 16px.
