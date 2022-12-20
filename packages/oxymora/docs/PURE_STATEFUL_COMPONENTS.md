# Pure Stateful Components

## Introduction

In computer science a pure function is a function that uses only its formally defined inputs to produce a formally defined output, with no other I/O or local state being used for computation, and no side effects being produced.

In React a pure component is a React component created using a pure function. Ergo, a pure component can not have state.

In Oxymora, however, a pure-stateful component is a pure React component that has the potential to be made stateful (using `makeStateful`) by having `state` and `onStateChange` props. Formally, `PureStatefulComponent` is defined as:

```ts
type PureStatefulComponent<S, P extends PureStatefulComponentProps<S>> = (
  props: P
) => JSX.Element;

type PureStatefulComponentProps<S> = {
  state: S;
  onStateChange: (updatedState: S) => void;
};
```

## What Are The Benefits?

Even though a pure-stateful component can be made into a regular stateful component using `makeStateful`, having access to the pure-stateful component is useful since it increases the softare re-use potential. This is the case since pure functions can always be compposed into larger components, whereas that's not always possible with stateful components.

For a demonstration of this take a look at the [Todo MVC Demo](../README.md#try-oxymora-out), which is used in three different ways, only two of which are viable using the stateful component.

## Other Implementations?

The `PureStatefulComponent` interface could actually be implemented by libraries other than Oxymora in the future, and these might have very different design goals. Oxymora is simply my opinionated take on a library that produces pure-stateful components. For this reason, the `makeStateful` function within Oxymora (i.e. `@oxymora/oxymora`) is actually just a convenience wrapper around the `makeStateful` function from `@oxymora/pure-stateful-component`.

## Which Components Should Be Pure-Stateful?

This is no different to which components you'd want to make regularly stateful, and there are typically three levels at which you'll want to introduce state within your application:

1. The top-level app itself.
2. Independently testable units of the app.
3. Indepenently testable UI controls.
