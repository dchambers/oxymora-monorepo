import type { Props } from "@oxymora/oxymora";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import type { Todos } from "./data-model";

import {
  pureStatefulComponent,
  usePureStatefulCallback,
  makeStateful,
} from "@oxymora/oxymora";

import {
  infoStyle,
  mainStyle,
  newTodoStyle,
  todoAppStyle,
  todoListStyle,
  toggleAllStyle,
} from "./styles";
import {
  ViewMode,
  addTodoListItem,
  getActiveTodoListItems,
  updateTodoListItems,
  updateTodoList,
} from "./data-model";
import TodoListItem from "./TodoListItem";
import TodoListFooter from "./TodoListFooter";

export type TodoListStateSpec = {
  State: Todos;
  InputProps: {
    viewMode?: ViewMode;
  };
  OutputProps: {
    onViewModeChange: ViewMode;
  };
};

type TodoListProps = Props<TodoListStateSpec>;

export const defaultTodoList = {
  viewMode: ViewMode.All,
  toggleAllChecked: false,
  newTodo: "",
  todoItems: [],
};

export const PureStatefulTodoList = pureStatefulComponent<TodoListStateSpec>(
  defaultTodoList,
  ({ state, viewMode }) => {
    const todoList = {
      ...state,
      viewMode: viewMode || state.viewMode,
    };
    const activeTodoItems = getActiveTodoListItems(
      todoList.viewMode,
      todoList.todoItems
    );

    const onNewTodoItemChange = usePureStatefulCallback<
      TodoListStateSpec,
      ChangeEventHandler<HTMLInputElement>
    >((event, { state }) => ({
      state: updateTodoList(state, { newTodo: event.target.value }),
    }));

    const onNewTodoItemKeyDown = usePureStatefulCallback<
      TodoListStateSpec,
      KeyboardEventHandler<HTMLInputElement>
    >((event, { state }) => ({
      state:
        event.key !== "Enter"
          ? state
          : updateTodoList(
              addTodoListItem(state, {
                id: `${state.newTodo}@${Date.now()}`,
                description: state.newTodo,
                completed: false,
                renameInProgress: false,
              }),
              { newTodo: "" }
            ),
    }));

    const onToggleAllChange = usePureStatefulCallback<
      TodoListStateSpec,
      ChangeEventHandler<HTMLInputElement>
    >((_event, { state }) => ({
      state: updateTodoList(
        updateTodoListItems(state, { completed: !state.toggleAllChecked }),
        { toggleAllChecked: !state.toggleAllChecked }
      ),
    }));

    const listSections = (
      <>
        <section css={mainStyle}>
          <ul css={todoListStyle}>
            {activeTodoItems.map((todoItem) => (
              <TodoListItem
                key={todoItem.id}
                id={todoItem.id}
                description={todoItem.description}
                completed={todoItem.completed}
                renameInProgress={todoItem.renameInProgress}
              />
            ))}
          </ul>
        </section>
        <TodoListFooter
          todoItems={todoList.todoItems}
          viewMode={todoList.viewMode}
        />
      </>
    );

    return (
      <div>
        <section css={todoAppStyle}>
          <header>
            <h1>todos</h1>
            <input
              css={newTodoStyle}
              placeholder="What needs to be done?"
              value={todoList.newTodo}
              onChange={onNewTodoItemChange}
              onKeyDown={onNewTodoItemKeyDown}
            />
            {todoList.todoItems.length === 0 ? undefined : (
              <>
                <input
                  id="toggle-all"
                  type="checkbox"
                  css={toggleAllStyle}
                  checked={todoList.toggleAllChecked}
                  onChange={onToggleAllChange}
                />
                <label htmlFor="toggle-all" />
              </>
            )}
          </header>
          {todoList.todoItems.length === 0 ? false : listSections}
        </section>
        <footer css={infoStyle}>
          <p>Double-click to edit a todo</p>
        </footer>
      </div>
    );
  }
);

export const StatefulTodoList = makeStateful<
  TodoListStateSpec["State"],
  TodoListProps
>(PureStatefulTodoList);
