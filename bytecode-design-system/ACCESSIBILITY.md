# Accessibility Standard

**Target:** WCAG 2.2 Level AA.

This document is an implementation checklist, not a substitute for testing with assistive technology and real users.

## Contrast

- Normal text: minimum 4.5:1.
- Large text: minimum 3:1.
- User-interface component boundaries and meaningful graphical objects: generally 3:1 against adjacent colors where the criterion applies.
- Test actual token combinations, including hover, disabled, selected, and dark theme states.

## Keyboard

- All functionality is operable by keyboard.
- Tab and Shift+Tab move through interactive controls in a logical order.
- Enter and Space activate controls according to their semantics.
- Escape dismisses dismissible overlays.
- Arrow keys follow established patterns for menus, tabs, radio groups, and listboxes.
- Focus is visible and is not obscured by sticky UI.

## Focus

Example baseline:

```css
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}
```

Do not remove browser focus styling without providing an equally visible alternative.

## Semantics

- Use `button` for actions and `a` for navigation.
- Use `label` for form controls.
- Use native table semantics for tabular data.
- Use landmarks such as `nav`, `main`, and `header` appropriately.
- Provide accessible names for icon-only controls.
- Use ARIA only when native HTML semantics are insufficient.

## Forms

- Every control has a programmatic label.
- Required state is conveyed in text or programmatically, not only by color or an asterisk.
- Helper and error text are associated with the control (for example, `aria-describedby`).
- Error messages identify the field and explain how to fix the problem.
- On failed submission, provide an error summary when useful and move focus appropriately.
- Preserve entered values after recoverable errors.

## Overlays

- Dialogs have an accessible name.
- Modal focus is moved inside, contained while open, and restored to the trigger on close.
- Background content is not operable while a modal dialog is active.
- Escape and backdrop dismissal behavior is appropriate to the risk of losing work.

## Motion

- Respect `prefers-reduced-motion`.
- Do not rely on animation alone to communicate state.
- Avoid flashing content.

## Touch and pointer targets

WCAG 2.2 AA includes a 24 by 24 CSS pixel minimum target-size criterion with exceptions. For primary controls, aim for approximately 40–44px where practical.

## Testing checklist

- [ ] Keyboard-only walkthrough completed.
- [ ] Focus order is logical.
- [ ] Focus indicator is visible.
- [ ] Contrast checked for actual component states.
- [ ] Form labels and errors are announced correctly.
- [ ] Dialog focus management verified.
- [ ] Screen-reader smoke test completed.
- [ ] Reduced-motion preference respected.
- [ ] Zoom/reflow tested at narrow viewport widths.
