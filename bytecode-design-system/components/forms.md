# Form Components

## Form layout principles

Use top-aligned labels as the default. Group related fields into sections. Use one column for simple forms and two columns for related fields when the available width supports it.

## Standard dimensions

| Property | Default |
|---|---:|
| Small control height | 36px |
| Medium control height | 40px |
| Large control height | 48px |
| Horizontal padding | 12px |
| Label-to-control gap | 8px |
| Control-to-helper gap | 4px |
| Field-to-field gap | 20px |
| Section-to-section gap | 32px |
| Border width | 1px |
| Border radius | 6px |

## Field anatomy

```text
FormField
├── Label
├── Required indicator (when applicable)
├── Control
├── Helper text (optional)
└── Error message (when invalid)
```

## Labels

- Place labels above controls.
- Use 14px / 20px, weight 500.
- Use a clear, concise noun phrase.
- Mark required fields consistently.
- Do not rely on placeholder text as the label.

## Inputs

- Default height: 40px.
- Horizontal padding: 12px.
- Font: 14px / 20px.
- Default border: neutral-300.
- Focus: visible focus ring and primary border.
- Disabled: muted surface and text, while retaining readable contrast.
- Read-only: visually distinct from disabled and still selectable where useful.

## Helper and error text

- Use 12px / 16px.
- Place 4px below the control.
- Error copy should explain what is wrong and how to fix it.
- Associate helper/error text programmatically with the input (for example, `aria-describedby`).

Good: “Enter a valid email address, such as name@example.com.”  
Avoid: “Invalid.”

## Form composition

| Layout | Use |
|---|---|
| Single column | Simple forms, narrow containers, mobile |
| Two columns | Related short fields on desktop |
| Three columns | Compact metadata only |
| Full width | Long text, address, description |

Do not split related fields across distant sections. Avoid three-column forms for long labels or complex controls.

## Sections

Example grouping:
- Personal information: name, date of birth, gender.
- Employment information: employee number, rank, department.
- Contact information: email, phone, address.

Use a section heading (16–18px, weight 600), optional description, then 16px gap to the first field.

## Validation behavior

- Validate on blur or submit according to the form's complexity.
- Avoid showing errors before the user has had a reasonable opportunity to enter data.
- On submit failure, provide an error summary when there are multiple errors and move focus appropriately.
- Preserve valid user input after server-side validation failures.
- Do not communicate errors by color alone.
