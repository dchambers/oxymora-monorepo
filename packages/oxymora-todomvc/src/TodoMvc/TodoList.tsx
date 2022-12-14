import type { Props } from "@dchambers/oxymora";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import type { Todos } from "./data-model";

import {
  pureStatefulComponent,
  usePureStatefulCallback,
} from "@dchambers/oxymora";
import stateify from "@dchambers/stateify";

import {
  infoStyle,
  mainStyle,
  newTodoStyle,
  todoAppStyle,
  todoListStyle,
  toggleAllStyle,
} from "./styles";
import {
  ListMode,
  addTodoItem,
  getActiveTodoItems,
  updateTodoItems,
  updateTodoList,
} from "./data-model";
import TodoItem from "./TodoItem";
import TodoListFooter from "./TodoListFooter";

export type TodoListStateSpec = {
  State: Todos;
  InputProps: {};
  OutputProps: {};
};

type TodoListProps = Props<TodoListStateSpec>;

const defaultTodoList = {
  listMode: ListMode.All,
  toggleAllChecked: false,
  newTodo: "",
  todoItems: [],
};

export const PureStatefulTodoList = pureStatefulComponent<TodoListStateSpec>(
  defaultTodoList,
  ({ state: todoList }: TodoListProps) => {
    const activeTodoItems = getActiveTodoItems(
      todoList.listMode,
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
              addTodoItem(state, {
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
        updateTodoItems(state, { completed: !state.toggleAllChecked }),
        { toggleAllChecked: !state.toggleAllChecked }
      ),
    }));

    const listSections = (
      <>
        <section css={mainStyle}>
          <ul css={todoListStyle}>
            {activeTodoItems.map((todoItem) => (
              <TodoItem
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
          listMode={todoList.listMode}
        />
      </>
    );

    return (
      <>
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
      </>
    );
  }
);

export const StatefulTodoList = stateify<
  TodoListStateSpec["State"],
  TodoListProps
>(PureStatefulTodoList);
