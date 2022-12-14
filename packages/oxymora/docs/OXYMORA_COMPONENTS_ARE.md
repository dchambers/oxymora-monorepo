# Oxymora Components Are...

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

### What About Side-Effects Though?

Having said the above, components often do need to have side-effects, and when that's the case those side-effects must ultimately be handled somewhere. Oxymora components can overcome this by firing callbacks, and leaving it to the consuming component to act on those callbacks. It may very well be the case that the component module provides some impure functions to help with this, but provided that it's left to the consuming component to pull the trigger on their use, then the component itself will remain pure.

If the consuming component is itself a pure component, it can refrain from accepting this responsibility by offering a callback prop of its own to handle the side effect, which can then be fed (as-is, or wrapped in a coordinating function) to the child component. The idea being that side-effects should ideally be handled at the top of the app component tree only, such that the vast majority of an app's call-stack / component-tree will be trivial to reason about, and trivial to test.

![Oxymora Component Tree](oxymora-component-tree.svg)

## One Hundred Percent Pure

Well, almost. While Oxymora is the only library I'm aware of which allows you to create rich React applications from pure functions alone, there are limitations within React which occasionally require side-effects to be introduced into what would otherwise be pure components.

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

Composability is diminished once state or side-effects are introduced into a component, such that not all use cases for a component remain possible once a component ceases to be pure. You can find a practical example of this within the [StackBlitz demo](https://github.com/dchambers/oxymora-monorepo/tree/master/packages/oxymora#try-a-demo), which implements the following three use cases using the `TodoList` component:

- TodoMVC with no routing.
- TodoMVC with client-side routing and where state isn't persisted.
- TodoMVC with full routing and where state is persisted using local-storage.

Of these three use cases, only the first two can be supported by the stateful version of the `TodoList` component, whereas all three can be supported by leveraging the pure component. As is mentioned in that demo, although `TodoList` could be re-written to explicitly support the third use-case in the stateful version, doing so would then prevent its use when implementing the first two use cases.

So with stateful components you genuinely can't always have your cake, and eat it too ????.

## Faster to Feedback by Reducing Clicking

_TBD_ (section to be written once example `react-testing-library` tests have been added for `TodoList`).

## Even Faster to Feedback by Eliminating Clicking

For those choosing to [test via a view-model](#testable-via-view-model), testing through slower view based tests (e.g. `react-testing-library`) will either be completely eliminated, or substantially reduced, depending on whether the developer chooses to have any view based tests at all (e.g. for verifying that a component's view is correctly bound).

In both cases, extensive behaviour tests will occur using only the reducer function, which effectively acts as the view-model for the component, and which will result in much faster and completely reliable tests than otherwise.

## More Robust

It's not just my experience; developers that try them regularly report finding that pure functions lead to fewer bugs and simpler code, for example:

- https://dev.to/nimmo/pure-functions-and-why-i-like-them
- https://www.learnhowtoprogram.com/react/functional-programming-with-javascript/pure-functions
- https://blog.bitsrc.io/pure-functions-in-js-avoiding-unwanted-problems-a67974f34aa3
