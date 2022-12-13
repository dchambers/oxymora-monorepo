import type { MouseEventHandler } from "react";

import * as React from "react";
import { usePureStatefulCallback } from "@dchambers/oxymora";
import { TodoItems, TodoListStateSpec, ListMode } from "./TodoList";
import {
  clearCompletedStyle,
  filtersStyle,
  footerStyle,
  selectedStyle,
  todoCountStyle,
} from "./TodoListStyle";

type TodoListFooterProps = {
  todoItems: TodoItems;
  listMode: ListMode;
};

type ButtonClickHandler = MouseEventHandler<HTMLButtonElement>;
type SpanClickHandler = MouseEventHandler<HTMLSpanElement>;

const TodoListFooter = ({ todoItems, listMode }: TodoListFooterProps) => {
  const remainingTodos = todoItems.filter(
    (todoItem) => todoItem.completed === false
  );

  const changeListModeHandler = usePureStatefulCallback<
    TodoListStateSpec,
    SpanClickHandler
  >((event, { state }) => {
    const dataAttributes = (event.target as HTMLSpanElement).dataset;

    return {
      state: {
        ...state,
        listMode: dataAttributes.listMode as ListMode,
      },
    };
  });

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
          <span
            css={listMode === ListMode.All ? selectedStyle : undefined}
            data-list-mode={ListMode.All}
            onClick={changeListModeHandler}
          >
            All
          </span>
        </li>
        <li>
          <span
            css={listMode === ListMode.Active ? selectedStyle : undefined}
            data-list-mode={ListMode.Active}
            onClick={changeListModeHandler}
          >
            Active
          </span>
        </li>
        <li>
          <span
            css={listMode === ListMode.Completed ? selectedStyle : undefined}
            data-list-mode={ListMode.Completed}
            onClick={changeListModeHandler}
          >
            Completed
          </span>
        </li>
      </ul>
      <button css={clearCompletedStyle} onClick={clearCompletedHandler}>
        Clear completed
      </button>
    </footer>
  );
};

export default TodoListFooter;
