import type { MouseEventHandler } from "react";

import { usePureStatefulCallback } from "@dchambers/oxymora";
import { TodoListStateSpec } from "./TodoList";
import {
  clearCompletedStyle,
  filtersStyle,
  footerStyle,
  selectedStyle,
  todoCountStyle,
} from "./TodoListStyle";
import { ListMode, TodoItemInfo } from "./todo-list-model";

type TodoListFooterProps = {
  listMode: ListMode;
  todoItems: TodoItemInfo[];
};

const TodoListFooter = ({ todoItems, listMode }: TodoListFooterProps) => {
  const remainingTodos = todoItems.filter(
    (todoItem: TodoItemInfo) => todoItem.completed === false
  );

  const changeListModeHandler = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLSpanElement>
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
    MouseEventHandler<HTMLButtonElement>
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
