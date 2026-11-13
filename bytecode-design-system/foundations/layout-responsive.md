# Layout and Responsive Foundation

## Application shell

```text
Application
├── Sidebar
├── Header
│   ├── Breadcrumb / Context
│   ├── Global search (optional)
│   ├── Notifications
│   └── User menu
└── Main
    ├── Page header
    ├── Page toolbar (optional)
    └── Page content
```

## Layout dimensions

| Element | Default |
|---|---:|
| Sidebar expanded | 256px |
| Sidebar collapsed | 72px |
| Header | 64px |
| Desktop page padding | 32px |
| Tablet page padding | 24px |
| Mobile page padding | 16px |
| Maximum content width | 1440px |

For data-heavy pages, allow the content area to use the available width rather than forcing a narrow max-width.

## Breakpoints

| Name | Width | Typical target |
|---|---:|---|
| `xs` | 480px | Small mobile |
| `sm` | 640px | Large mobile |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

These are project breakpoints. Components should still respond fluidly between them.

## Responsive behavior

### Mobile
- Convert sidebar navigation to a drawer.
- Use one-column forms.
- Reduce page/card padding to 16px.
- Use table horizontal scrolling or a purpose-designed card/list representation.
- Keep important actions reachable; avoid tiny icon-only targets.

### Tablet
- Allow collapsed sidebar navigation.
- Use two-column dashboard grids where appropriate.
- Use two-column forms only when fields remain readable.

### Desktop
- Use expanded sidebar by default.
- Use two-column forms for related fields.
- Use three- or four-column KPI grids when content permits.

## Rules

- Do not hide critical data without an alternative way to access it.
- Avoid accidental page-level horizontal overflow.
- Tables may scroll horizontally within their own container.
- Test at intermediate widths, not only at named breakpoints.
