import type { Props } from "@dchambers/oxymora";

import * as React from "react";
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
  InputProps: {
    mode?: ViewMode;
  };
  OutputProps: {};
};

type TodoListInfo = {
  newTodo: string;
  todoItems: TodoItems;
};

export type TodoItems = Array<TodoItemProps>;

export enum ViewMode {
  All = "ALL",
  Active = "ACTIVE",
  Completed = "COMPLETED",
}

type InputChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
type InputKeyDownHandler = React.KeyboardEventHandler<HTMLInputElement>;

const defaultTodoList = {
  newTodo: "",
  todoItems: [],
};

export const PureStatefulTodoList = pureStatefulComponent<TodoListStateSpec>(
  defaultTodoList,
  (props: Props<TodoListStateSpec>) => {
    const { mode = ViewMode.All } = props;

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
            {props.state.todoItems.map((todoItem, i) => (
              <TodoItem
                key={todoItem.id}
                id={todoItem.id}
                description={todoItem.description}
                completed={todoItem.completed}
              />
            ))}
          </ul>
        </section>
        <TodoListFooter mode={mode} todoItems={props.state.todoItems} />
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
