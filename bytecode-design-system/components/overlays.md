# Dialogs, Drawers, and Popovers

## Dialog sizes

| Size | Width |
|---|---:|
| Small | 400px |
| Medium | 560px |
| Large | 720px |
| Extra large | 960px |

Use `width: min(<size>, calc(100vw - 32px))` or equivalent to prevent viewport overflow.

## Dialog anatomy

```text
Dialog
├── Header
│   ├── Title
│   └── Close action
├── Content
└── Footer
    ├── Secondary action
    └── Primary action
```

Defaults:
- Padding: 24px.
- Radius: 12px.
- Title: 18px / 28px, weight 600.
- Body: 14px / 20px.
- Footer action gap: 8px.

## Dialog behavior

- Provide an accessible name and description where appropriate.
- Move focus into the dialog when opened.
- Keep keyboard focus within a modal dialog.
- Restore focus to the trigger when closed.
- Support Escape when dismissal is safe.
- Do not close on backdrop click if it risks losing important unsaved work.
- Confirm destructive or irreversible actions with clear consequences.

## Drawer widths

| Size | Width |
|---|---:|
| Small | 360px |
| Medium | 480px |
| Large | 640px |

Use drawers for record details, long forms, filter panels, and mobile navigation. Apply the same focus management expectations as dialogs when the drawer is modal.

## Popovers

Use for compact contextual content and actions. Prefer a menu component for a list of commands and a tooltip for short supplementary text. Avoid placing complex multi-step forms in a small popover.
