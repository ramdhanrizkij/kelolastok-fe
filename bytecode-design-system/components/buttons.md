# Buttons

## Sizes

| Size | Height | Horizontal padding | Font size |
|---|---:|---:|---:|
| Small | 32px | 12px | 13px |
| Medium | 36px | 16px | 14px |
| Large | 40px | 20px | 14px |
| Extra large | 44px | 24px | 16px |

Use medium as the default for dense admin toolbars and large for prominent form actions.

## Variants

| Variant | Purpose |
|---|---|
| Primary | Main action in a region |
| Secondary | Supporting action |
| Outline | Alternative action with visible boundary |
| Ghost | Low-emphasis action |
| Destructive | Delete or irreversible action |
| Link | Navigation or inline action |

## States

Every applicable button must define default, hover, active, focus-visible, disabled, and loading states.

## Rules

- Keep one visually dominant primary action per action group.
- Use descriptive verbs: “Create user”, “Save changes”, “Export report”.
- Prevent duplicate submission while loading.
- Use a button for actions and an anchor for navigation.
- Icon-only buttons require an accessible name and a usable hit area.
- For important controls, target approximately 40–44px height even though WCAG 2.2 AA's minimum target-size criterion has exceptions and a 24px baseline.
