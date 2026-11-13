# Data Table

## Dimensions

| Property | Default |
|---|---:|
| Header height | 44px |
| Standard row height | 48px |
| Compact row height | 40px |
| Spacious row height | 56px |
| Horizontal cell padding | 12px |
| Header font | 13px / 20px, weight 600 |
| Body font | 14px / 20px, weight 400 |

## Anatomy

```text
DataTable
├── Toolbar
│   ├── Search
│   ├── Filters
│   ├── Column settings (optional)
│   ├── Export (optional)
│   └── Primary action
├── Active filter summary (optional)
├── Table
│   ├── Header
│   └── Rows
└── Footer
    ├── Result count
    └── Pagination
```

## Alignment

- Text: left aligned.
- Numeric and financial values: right aligned.
- Status: centered or left aligned, consistently.
- Actions: use a consistent trailing column.
- Dates: use a consistent locale and format.

## Capabilities

Add only what the use case needs:
- Sorting
- Filtering
- Pagination
- Row selection
- Bulk actions
- Column visibility
- Column resizing
- Export

## Behavior

- Show the active sort direction accessibly.
- Preserve filter and pagination state when navigating if useful.
- Display loading, empty, and error states.
- Show a result count and current page context.
- When rows are selected, reveal relevant bulk actions.
- Use sticky headers only when they improve long-table usability.
- On narrow screens, prefer a scrollable table container or a deliberately designed alternative; do not silently remove important columns.
