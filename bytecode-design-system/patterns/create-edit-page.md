# Create / Edit Page Pattern

## Structure

```text
PageHeader
├── Breadcrumb
├── Title
└── Description

FormContainer
├── Section: first logical group
├── Section: second logical group
└── Section: additional group

FormActions
├── Cancel
└── Save / Update
```

## Rules

- Split long forms into meaningful sections.
- Use a single column by default; use two columns for related short fields on sufficiently wide screens.
- Keep save/cancel placement consistent.
- Disable or guard duplicate submissions while saving.
- Preserve user-entered values after recoverable errors.
- Warn before navigation only when unsaved changes would be lost.
- Place validation feedback near the relevant field and provide an error summary for complex forms.
