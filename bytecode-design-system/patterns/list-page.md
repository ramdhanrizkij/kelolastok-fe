# List / Management Page Pattern

## Structure

```text
PageHeader
├── Breadcrumb
├── Title
├── Description
└── Primary create action

Toolbar
├── Search
├── Filters
├── Optional column/export actions
└── Optional bulk actions

DataTable

Pagination / result summary
```

## Rules

- The primary create action should be easy to locate.
- Search and filters should appear before the data they affect.
- Show active filters and provide a clear way to remove them.
- Preserve filters and sort state where it improves workflow continuity.
- Provide a meaningful empty state with a next action.
- Do not show bulk actions until selection exists.
