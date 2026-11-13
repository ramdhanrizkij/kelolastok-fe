# Design System Governance

## Component documentation contract

Every reusable component should document:

1. Name and purpose.
2. Anatomy.
3. Variants and sizes.
4. Properties/API.
5. Visual and interaction states.
6. Responsive behavior.
7. Accessibility requirements.
8. Usage guidance and anti-patterns.
9. Examples.

## Change management

Before changing a shared token, identify all components that consume it and evaluate the visual impact. For example, changing the medium input height affects text inputs, selects, date pickers, search fields, and form alignment.

## Versioning

Use semantic versioning:

| Change | Version |
|---|---|
| Breaking token or component behavior change | Major |
| Backward-compatible component or token addition | Minor |
| Clarification, correction, or non-breaking refinement | Patch |

## Contribution workflow

1. Identify the use case that is not covered.
2. Check whether an existing token, component, or pattern can solve it.
3. Propose the smallest reusable extension.
4. Document its states, responsive behavior, and accessibility.
5. Validate it in representative pages.
6. Update examples and changelog.

## Exceptions

Avoid undocumented one-off styling. When an exception is necessary, record:
- Why the default does not work.
- Where the exception applies.
- Whether it should become a reusable variant.
- Any accessibility or responsive implications.
