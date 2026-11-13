# Navigation and Feedback Components

## Sidebar

| Property | Default |
|---|---:|
| Expanded width | 256px |
| Collapsed width | 72px |
| Item height | 40px |
| Horizontal item padding | 12px |
| Icon size | 20px |
| Item radius | 6px |
| Group spacing | 24px |

Rules:
- Active item uses a clear selected treatment.
- Collapsed items need tooltips and accessible names.
- Keep navigation hierarchy shallow (normally 2–3 levels).
- Mobile navigation becomes a drawer.

## Header

| Property | Default |
|---|---:|
| Height | 64px |
| Horizontal padding | 24px |
| Icon size | 20px |
| Bottom border | 1px |

## Badge / status

| Property | Default |
|---|---:|
| Height | 22px |
| Horizontal padding | 8px |
| Font | 12px / 16px, weight 500 |
| Radius | 4px |

Suggested mapping:
- Active, approved, completed: success.
- Pending, attention required: warning.
- Processing: information.
- Rejected, failed: danger.
- Draft, inactive: neutral.

Always include a text label; color alone is insufficient.

## Toast

- Typical width: 360px, constrained by viewport.
- Padding: 16px.
- Radius: 8px.
- Icon: 20px.
- Provide concise feedback.
- Success messages may dismiss automatically.
- Important errors should remain long enough to read or require dismissal.
- Use an appropriate live region and do not use toast as the only form-error mechanism.

## Tooltip

- Font: 12px.
- Padding: 8px.
- Maximum width: 240px.
- Use for supplementary explanations, not essential labels.
- Ensure the tooltip can be accessed by keyboard and does not disappear before it can be read.

## Tabs

- Default height: 40px.
- Horizontal padding: 16px.
- Font: 14px / 20px, weight 500.
- Underline tabs are the default for page-level section navigation.
- Follow the correct keyboard interaction pattern for tabs.
