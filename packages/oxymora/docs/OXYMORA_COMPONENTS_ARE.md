# Oxymora Components Are

## Written Declaratively

Not only are Oxymora components written as pure functions, but even Oxymora event-handlers are written this way too. Take for example the `onIncrementCounter` event-handler from the `Counter` component:

```ts
const onIncrementCounter = usePureStatefulCallback<CounterStateSpec>(
  ({ state, incrementBy = 1 }) => {
    const newState = state + incrementBy;

    return {
      state: newState,
      onCounterChange: newState,
    };
  }
);
```

As you can see, this does not invoke any side-effect functions like `setState` or `dispatch`.

## Free From Callback Prop Drilling

When using hooks like `useState` or `useReducer` you must be local to the state in order to update it (e.g. via `setState` or `dispatch`). You can overcome this by either passing your updater function (i.e. `setState` or `dispatch`) to the child components that need to perform the updates, or by having the child components implement change callbacks which the parent component can then use to perform the update.

Since Oxymura components are required to use the `usePureStatefulComponent` hook to act on the return value from the pure event-handler functions, that function can not only take care of performing the update, but it can do using React context so as to eliminate the need for prop-drilling.

## Easy to Comprehend

Component functions render a component given some props and state, where state is itself a prop (the `state` prop):

- _props_ -> _view_

Event handler functions describe updated component state and fired component callbacks given a UI event, plus access to props:

- (_props_, _ui-event_) -> (_state_, _callbacks_)

The fact that this is so restrictive, and the fact that both types of functions are pure is what makes it so easy to reason about Oxymora components.

Having said that, things will naturally become more complicated once side effects are needed, but these can happen external to any pure-stateful components. The app that is composed of these components can then decide how best to manage any needed side effects.

The important thing here being that side effects should be [lifted to the top of the component tree](./PURE_STATEFUL_COMPONENTS.md#lifting-state-and-side-effects); i.e. the app, rather than the components or controls from which the app is composed. This allows the vast majority of the app to be easy to reason about, and easy to test, with any hard to test and reason about code existing only at the peripheries.

## One Hundred Percent Pure

Well, almost. While Oxymora is the only library I'm aware of which allows you to create rich React applications from pure functions alone, there are limitations within React which require side-effects to be introduced into what would otherwise be pure components.

If you take a look at the TodoMVC code for example, you'll find one such example of this. This is around the requirement in TodoMVC to focus the rename input box that's displayed after double-clicking a todo item to put it into edit mode. Since React provides no way to declaratively say which component should currently have focus (e.g. via a `isFocussed` property), a `useRef` and `useEffect` must be introduced to satisfy this requirement at present.

That aside however, all of the example code is 100% pure, and many of your React components will be too.

## Testable Without Mocks

Mocking is only needed to test impure code, and is a strategy for eliminating unwanted side-effects while testing by passing fake versions of objects that in the real app would otherwise be responsible for handling those side effects. When you create your controls and components as pure components then the need for mocking simply disappears.

## Testable Via View-Model

The `Counter` and `TodoList` components have both been designed to be tested via the view (e.g using `react-testing-library`). However, for those who prefer to test via a view-model (the approach favoured by Eric Elliot; see [Unit Testing React Components](https://medium.com/javascript-scene/unit-testing-react-components-aeda9a44aae2) for example), this approach is also possible with Oxymora.

Consider for example these two event-handlers from `TodoListItem`:

```ts
const onTodoItemCompletedChange = usePureStatefulCallback<TodoListStateSpec>(
  ({ state }) => ({
    state: updateTodoListItem(state, { id, completed: !completed }),
  })
);

const onRemoveTodoItemClick = usePureStatefulCallback<TodoListStateSpec>(
  ({ state }) => ({
    state: removeTodoListItem(state, id),
  })
);
```

While they don't currently expose a view-model that could be used for testing the component with, they could be made to do so by rewriting as follows:

```ts
const onTodoItemCompletedChange = usePureStatefulCallback<TodoListStateSpec>(
  ({ state }) => todoListReducer(state, { type: 'UPDATE_TODO_LIST_ITEM', id, { completed: !completed } })
);

const onRemoveTodoItemClick = usePureStatefulCallback<TodoListStateSpec>(
  ({ state }) => todoListReducer(state, { type: 'REMOVE_TODO_LIST_ITEM', id })
);
```

Here, `todoListReducer` would act as the view-model through which we can test our UI component, and it would contain the invocations to `updateTodoListItem` and `removeTodoListItem` which were previously invoked directly within the event-handlers. It would look something like this:

```ts
export const todoListReducer = (
  state: TodoListStateSpec["State"],
  action: TodoListAction
) => {
  switch (action.type) {
    case "UPDATE_TODO_LIST_ITEM": {
      return updateTodoListItem(state, { id: action.id, ...action.update });
    }

    case "REMOVE_TODO_LIST_ITEM": {
      return removeTodoListItem(state, action.id);
    }
  }
};
```

## Always Composable

Composability is diminished once state or side-effects are introduced into a component, such that not all use cases for a component remain possible once a component ceases to be pure. You can find a practical example of this within the [StackBlitz demo](https://github.com/dchambers/oxymora-monorepo/tree/master/packages/oxymora#try-a-demo), which includes the following three use cases for a `TodoList` component:

- No routing.
- Client-side routing where state isn't persisted.
- Full routing where state is persisted using local-storage.

Of these three use cases, only the first two can be supported by the stateful version of the component, whereas all three can be supported by leveraging the pure component. As is mentioned in that demo, although `TodoList` could be re-written to explicitly support the third use-case in the stateful version, doing so would then prevent the first two use cases.

## Faster to Feedback by Reducing Clicking

_TBD_ (section to be written once example `react-testing-library` tests have been added for `TodoList`).

## Faster to Feedback by Eliminating Clicking

For those choosing to [test via a view-model](#testable-via-view-model), component testing will be limited to a few tests to ensure that a component's view is correctly bound, with extensive behaviour tests occurring using only the reducer function (which is effectively the view-model for the component). In this way, the number of view based tests can be significantly diminished, leading to faster test packs, and faster feedback.

## More Robust

It's not just my experience; developers that try them find that pure functions lead to fewer bugs, for example:

- https://dev.to/nimmo/pure-functions-and-why-i-like-them
- https://www.learnhowtoprogram.com/react/functional-programming-with-javascript/pure-functions
- https://blog.bitsrc.io/pure-functions-in-js-avoiding-unwanted-problems-a67974f34aa3
