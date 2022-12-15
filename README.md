# Oxymora

> oxymoron
> ŏk″sē-môr′ŏn″
>
> noun
> A rhetorical figure in which incongruous or contradictory terms are combined, as in a 'deafening silence' and a 'mournful optimist'.

Oxymora is the plural of oxymoron, and this library has that name since it has functions with names like `pureStatefulComponent` and `usePureStatefulCallback`, even though ["pure stateful"](./docs/PURE_STATEFUL_COMPONENTS.md) is an oxymoron.

## Why Use Oxymora?

Oxymora components are:

1. Quick to write.
2. Easy to debug.
3. Simple to test.
4. Always composable.
5. Robust.

## How Is This Achieved?

- Components are written declaritively:
  - Both view functions and event handler functions are 100% pure functions.
- All components are composable:
  - Stateful components remain pure such that the state never hinders composition, and components can always be re-used in novel ways.
- Minimal boilerplate:
  - This isn't Redux.
- Reduced prop drilling:
  - Nested components can directly perform state updates and call-backs for the pure-stateful component ensemble of which they are a part of.
- Pure-stateful component ensembles are designed to be tested in isolation:
  - Use `react-testing-library` as you normally would, but with the optional super-powers of being able to jump to known states, or to test outcomes via the data model.

## Try Oxymora Out!

See what the Todo MVC app looks like when implemented in Oxymora:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/dchambers/oxymora-monorepo/tree/master/examples/todomvc?terminal=dev&title=Oxyymora%20Todo%20MVC%20Example)
