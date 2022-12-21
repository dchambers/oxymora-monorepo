# Oxymora

Making React components 100% pure.

> oxymoron
> ŏk″sē-môr′ŏn″
>
> noun
> A rhetorical figure in which incongruous or contradictory terms are combined, as in a 'deafening silence' and a 'mournful optimist'.

Oxymora is the plural of oxymoron, and this library has that name since it has functions named `pureStatefulComponent` and `usePureStatefulCallback`, yet ["pure stateful"](./docs/PURE_STATEFUL_COMPONENTS.md) is an oxymoron.

## Why Use Oxymora?

Oxymora components are:

1. Quick to write:
   - [Components are written declaratively](./docs/OXYMORA_COMPONENTS_ARE.md#written-declaratively).
   - [No callback prop-drilling](./docs/OXYMORA_COMPONENTS_ARE.md#free-from-callback-prop-drilling).
2. Easy to reason about / debug.
   - [Trivial component mental model](./docs/OXYMORA_COMPONENTS_ARE.md#easy-to-comprehend).
   - [Both view functions and event handler functions are 100% pure](./docs/OXYMORA_COMPONENTS_ARE.md#one-hundred-percent-pure).
3. Simple to test.
   - [Pure components so mocking isn't required](./docs/OXYMORA_COMPONENTS_ARE.md#testable-without-mocks).
   - [Option to test via a view-model rather than via the view](./docs/OXYMORA_COMPONENTS_ARE.md#testable-via-view-model).
4. Always composable.
   - [Unlike stateful components, pure components always compose](./docs/OXYMORA_COMPONENTS_ARE.md#always-composable).
5. Quicker to feedback on broken functionality.
   - [Ability to jump components to prior UI discovered states to speed up view tests](./docs/OXYMORA_COMPONENTS_ARE.md#faster-to-feedback-by-reducing-clicking).
   - [Option to have even faster tests if testing via a view-model](./docs/OXYMORA_COMPONENTS_ARE.md#even-faster-to-feedback-by-eliminating-clicking)
6. Robust.
   - [Less state equals fewer bugs](./docs/OXYMORA_COMPONENTS_ARE.md#more-robust).

## The Anatomy of an Oxymora Component

Oxymora components start with a TypeScript _state-spec_; this defines the component's _state_, _input-props_ and _output-props_. Here's an example of a _state-spec_ for a `Counter` component:

```ts
type CounterStateSpec = {
  State: number;
  InputProps: {
    incrementBy?: number;
  };
  OutputProps: {
    onCounterChange: number;
  };
};
```

The props for this component are defined like this:

```ts
type CounterProps = Props<CounterStateSpec>;
```

This is equivalent to manually writing the following:

```ts
// NOTE: you don't need to write this because this is what Props<CounterStateSpec> gives you:
type CounterProps = {
  // `InputProps`:
  incrementBy?: number;
  // `OutputProps`:
  onCounterChange?: (number) => void;
  // `State`:
  state: number;
  onStateChange?: (number) => void;
};
```

Although the `State` related props are part of the pure-stateful component, they will be removed from the stateful component that's subsequently created using `makeStateful`. Having the pure-stateful component available to us is helpful for testing however, plus it can also be useful when composition isn't possible using the stateful component.

Here's how you might implement `PureStatefulCounter`:

```ts
export const PureStatefulCounter = pureStatefulComponent<CounterStateSpec>(
  1, // initial state
  ({ state }) => {
    const onIncrementCounter = usePureStatefulCallback<CounterStateSpec>(
      ({ state, incrementBy = 1 }) => {
        const newState = state + incrementBy;

        return {
          state: newState,
          onCounterChange: newState,
        };
      }
    );

    return (
      <Button
        colorScheme="orange"
        leftIcon={<GrFormAdd />}
        onClick={onIncrementCounter}
      >
        {state}
      </Button>
    );
  }
);
```

Notice the declarative nature of the `onIncrementCounter` event handler; it signals both a state update and a callback declaratively. Event handlers act on behalf of the closest pure-stateful ancestor component, so this event handler would continue to work even if it was moved into a child component (no callback prop-drilling required).

Finally, the stateful version of the component (i.e. not having `state` and `onStateChange` props) can be created like this:

```ts
export const StatefulCounter =
  makeStateful<CounterStateSpec>(PureStatefulCounter);
```

## Try a Demo!

We have a live StackBlitz development environment that includes the simple `Counter` example above, but also an Oxymora implementation of [TodoMVC](https://todomvc.com/). Use this to play with the components, inspect the code, and test code changes live.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/dchambers/oxymora-monorepo/tree/master/examples/todomvc?terminal=dev&title=Oxyymora%20Todo%20MVC%20Example)
