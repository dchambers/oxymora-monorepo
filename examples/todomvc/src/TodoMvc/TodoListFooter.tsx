import type { MouseEventHandler } from "react";
import type { Todo } from "./data-model";

import { usePureStatefulCallback } from "@oxymora/oxymora";

import {
  clearCompletedStyle,
  filtersStyle,
  footerStyle,
  selectedStyle,
  todoCountStyle,
} from "./styles";
import { ViewMode, updateTodoList } from "./data-model";
import { TodoListStateSpec } from "./TodoList";

type TodoListFooterProps = {
  viewMode: ViewMode;
  todoItems: Todo[];
};

const TodoListFooter = ({ todoItems, viewMode }: TodoListFooterProps) => {
  const remainingTodos = todoItems.filter(
    (todoItem: Todo) => todoItem.completed === false
  );

  const changeViewModeHandler = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLSpanElement>
  >((event, { state }) => {
    const dataAttributes = (event.target as HTMLSpanElement).dataset;
    const viewMode = dataAttributes.viewMode as ViewMode;

    return {
      state: updateTodoList(state, {
        viewMode,
      }),
      onViewModeChange: viewMode,
    };
  });

  const clearCompletedHandler = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLButtonElement>
  >((_event, { state }) => ({
    state: updateTodoList(state, {
      todoItems: state.todoItems.filter(
        (todoItem) => todoItem.completed === false
      ),
    }),
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
            css={viewMode === ViewMode.All ? selectedStyle : undefined}
            data-view-mode={ViewMode.All}
            onClick={changeViewModeHandler}
          >
            All
          </span>
        </li>
        <li>
          <span
            css={viewMode === ViewMode.Active ? selectedStyle : undefined}
            data-view-mode={ViewMode.Active}
            onClick={changeViewModeHandler}
          >
            Active
          </span>
        </li>
        <li>
          <span
            css={viewMode === ViewMode.Completed ? selectedStyle : undefined}
            data-view-mode={ViewMode.Completed}
            onClick={changeViewModeHandler}
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
