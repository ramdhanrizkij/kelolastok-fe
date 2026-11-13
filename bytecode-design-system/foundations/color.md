# Color Foundation

## Color strategy

Use primitive palettes to create semantic tokens. Components should consume semantic tokens such as `text-primary`, `surface`, and `border`, not raw palette values. This makes themes and brand adjustments safer.

## Primary palette

| Token | Value |
|---|---|
| `primary-50` | `#EFF6FF` |
| `primary-100` | `#DBEAFE` |
| `primary-200` | `#BFDBFE` |
| `primary-300` | `#93C5FD` |
| `primary-400` | `#60A5FA` |
| `primary-500` | `#3B82F6` |
| `primary-600` | `#2563EB` |
| `primary-700` | `#1D4ED8` |
| `primary-800` | `#1E40AF` |
| `primary-900` | `#1E3A8A` |

## Neutral palette

| Token | Value |
|---|---|
| `neutral-0` | `#FFFFFF` |
| `neutral-50` | `#F9FAFB` |
| `neutral-100` | `#F3F4F6` |
| `neutral-200` | `#E5E7EB` |
| `neutral-300` | `#D1D5DB` |
| `neutral-400` | `#9CA3AF` |
| `neutral-500` | `#6B7280` |
| `neutral-600` | `#4B5563` |
| `neutral-700` | `#374151` |
| `neutral-800` | `#1F2937` |
| `neutral-900` | `#111827` |
| `neutral-950` | `#030712` |

## Semantic palette

| Role | Background | Text | Border |
|---|---|---|---|
| Success | `#F0FDF4` | `#166534` | `#BBF7D0` |
| Warning | `#FFFBEB` | `#92400E` | `#FDE68A` |
| Danger | `#FEF2F2` | `#991B1B` | `#FECACA` |
| Information | `#EFF6FF` | `#1E40AF` | `#BFDBFE` |

## Semantic usage

| Token | Usage |
|---|---|
| `color-primary` | Main actions, links, selected navigation |
| `color-success` | Successful or completed state |
| `color-warning` | Pending state or attention required |
| `color-danger` | Errors, rejected state, destructive action |
| `color-info` | Informational state |
| `text-primary` | Main content |
| `text-secondary` | Supporting content |
| `text-muted` | Metadata |
| `surface` | Main card and control surface |
| `surface-muted` | Page and subdued surface |
| `border` | Default separation |

## Rules

- Never communicate status by color alone; include text or an icon.
- Validate every foreground/background pair for contrast.
- A palette swatch is not proof of WCAG compliance in every context.
- Avoid using the primary color for every action; preserve visual hierarchy.
- Define separate semantic mappings for dark mode rather than mechanically inverting colors.
