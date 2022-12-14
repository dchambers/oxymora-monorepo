import type { Props } from "@dchambers/oxymora";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";

import {
  pureStatefulComponent,
  usePureStatefulCallback,
} from "@dchambers/oxymora";
import stateify from "@dchambers/stateify";
import TodoItem, { TodoItemProps } from "./TodoItem";
import TodoListFooter from "./TodoListFooter";
import {
  infoStyle,
  mainStyle,
  newTodoStyle,
  todoAppStyle,
  todoListStyle,
} from "./TodoListStyle";

export type TodoListStateSpec = {
  State: TodoListInfo;
  InputProps: {};
  OutputProps: {};
};

type TodoListInfo = {
  newTodo: string;
  todoItems: TodoItems;
  listMode: ListMode;
};

export type TodoItems = Array<TodoItemProps>;

export enum ListMode {
  All = "ALL_ITEMS",
  Active = "ACTIVE_ITEMS",
  Completed = "COMPLETED_ITEMS",
}

type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
type InputKeyDownHandler = KeyboardEventHandler<HTMLInputElement>;

const defaultTodoList = {
  newTodo: "",
  todoItems: [],
  listMode: ListMode.All,
};

const isActiveItem = (todoItem: TodoItemProps) => !todoItem.completed;
const isCompletedItem = (todoItem: TodoItemProps) => todoItem.completed;

export const PureStatefulTodoList = pureStatefulComponent<TodoListStateSpec>(
  defaultTodoList,
  (props: Props<TodoListStateSpec>) => {
    const activeTodoItems =
      props.state.listMode === ListMode.All
        ? props.state.todoItems
        : props.state.todoItems.filter(
            props.state.listMode === ListMode.Active
              ? isActiveItem
              : isCompletedItem
          );

    const onInputChangeHandler = usePureStatefulCallback<
      TodoListStateSpec,
      InputChangeHandler
    >((event, { state }) => ({
      state: {
        ...state,
        newTodo: event.target.value,
      },
    }));

    const onInputKeyDownHandler = usePureStatefulCallback<
      TodoListStateSpec,
      InputKeyDownHandler
    >((event, { state }) => ({
      state:
        event.key !== "Enter"
          ? state
          : {
              ...state,
              newTodo: "",
              todoItems: [
                ...state.todoItems,
                {
                  id: `${state.newTodo}@${Date.now()}`,
                  description: state.newTodo,
                  completed: false,
                },
              ],
            },
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
              />
            ))}
          </ul>
        </section>
        <TodoListFooter
          todoItems={props.state.todoItems}
          listMode={props.state.listMode}
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
              value={props.state.newTodo}
              onChange={onInputChangeHandler}
              onKeyDown={onInputKeyDownHandler}
            />
          </header>
          {props.state.todoItems.length === 0 ? false : listSections}
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
  Props<TodoListStateSpec>
>(PureStatefulTodoList);
