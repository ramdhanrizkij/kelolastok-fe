# Dashboard Page Pattern

## Purpose

Provide a concise operational overview and make the next useful action easy to identify.

## Suggested structure

```text
PageHeader
├── Title and description
└── Date range / page actions

KPI Grid
├── Metric card
├── Metric card
├── Metric card
└── Metric card

Main area
├── Primary chart
└── Secondary summary

Supporting area
├── Recent records
└── Activity feed
```

## Rules

- Put the most actionable or decision-relevant metrics first.
- Give each metric a clear label, value, period, and comparison context when relevant.
- Avoid decorative charts that do not answer a business question.
- Use consistent date ranges across related widgets.
- Provide loading, empty, and error states per widget.
- Keep dashboard density appropriate to the role and task.
