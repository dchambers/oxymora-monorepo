import type { MouseEventHandler } from "react";

import * as React from "react";
import { usePureStatefulCallback } from "@dchambers/oxymora";
import { TodoItems, TodoListStateSpec, ViewMode } from "./TodoList";
import {
  clearCompletedStyle,
  filtersStyle,
  footerStyle,
  selectedStyle,
  todoCountStyle,
} from "./TodoListStyle";

type TodoListFooterProps = {
  mode?: ViewMode;
  todoItems: TodoItems;
};

type ButtonClickHandler = MouseEventHandler<HTMLButtonElement>;

const TodoListFooter = ({ mode, todoItems }: TodoListFooterProps) => {
  const remainingTodos = todoItems.filter(
    (todoItem) => todoItem.completed === false
  );

  const clearCompletedHandler = usePureStatefulCallback<
    TodoListStateSpec,
    ButtonClickHandler
  >((_event, { state }) => ({
    state: {
      ...state,
      todoItems: state.todoItems.filter(
        (todoItem) => todoItem.completed === false
      ),
    },
  }));

  return (
    <footer css={footerStyle}>
      <span css={todoCountStyle}>
        <strong>{remainingTodos.length}</strong>
        <span> {remainingTodos.length === 1 ? "item" : "items"} left</span>
      </span>
      <ul css={filtersStyle}>
        <li>
          <a href="/" css={mode === ViewMode.All ? selectedStyle : undefined}>
            All
          </a>
        </li>
        <li>
          <a
            href="/active"
            css={mode === ViewMode.Active ? selectedStyle : undefined}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/completed"
            css={mode === ViewMode.Completed ? selectedStyle : undefined}
          >
            Completed
          </a>
        </li>
      </ul>
      <button css={clearCompletedStyle} onClick={clearCompletedHandler}>
        Clear completed
      </button>
    </footer>
  );
};

export default TodoListFooter;
