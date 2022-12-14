import type { TodoListStateSpec } from "./TodoList";
import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

import { usePureStatefulCallback } from "@dchambers/oxymora";
import {
  completedStyle,
  destroyStyle,
  editingStyle,
  editStyle,
  listEditingStyle,
  listLabelHiddenStyle,
  notEditingStyle,
  toggleStyle,
} from "./TodoListStyle";
import { css } from "@emotion/react";
import { TodoItemInfo } from "./todo-list-model";

type TodoItemProps = TodoItemInfo;

const TodoItem = (props: TodoItemProps) => {
  const { id, description, completed, renameInProgress } = props;
  const inputReference = useRef(null as HTMLInputElement | null);

  useEffect(() => {
    inputReference.current?.focus();
  }, [renameInProgress]);

  const onTodoItemCompletedChange = usePureStatefulCallback<
    TodoListStateSpec,
    ChangeEventHandler<HTMLInputElement>
  >((_event, { state }) => ({
    state: {
      ...state,
      todoItems: state.todoItems.map((todoItem) =>
        todoItem.id !== id
          ? todoItem
          : {
              ...todoItem,
              completed: !todoItem.completed,
            }
      ),
    },
  }));

  const onTodoItemDoubleClick = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLLIElement>
  >((_event, { state }) => ({
    state: {
      ...state,
      todoItems: state.todoItems.map((todoItem) =>
        todoItem.id !== id
          ? todoItem
          : {
              ...todoItem,
              renameInProgress: true,
            }
      ),
    },
  }));

  const onRenamedTodoItemChange = usePureStatefulCallback<
    TodoListStateSpec,
    ChangeEventHandler<HTMLInputElement>
  >((event, { state }) => ({
    state: {
      ...state,
      todoItems: state.todoItems.map((todoItem) =>
        todoItem.id !== id
          ? todoItem
          : {
              ...todoItem,
              description: event.target.value,
            }
      ),
    },
  }));

  const onRenamedTodoItemBlur = usePureStatefulCallback<
    TodoListStateSpec,
    FocusEventHandler<HTMLInputElement>
  >((_event, { state }) => ({
    state: {
      ...state,
      todoItems: state.todoItems.map((todoItem) =>
        todoItem.id !== id
          ? todoItem
          : {
              ...todoItem,
              renameInProgress: false,
            }
      ),
    },
  }));

  const onRemoveTodoItemClick = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLButtonElement>
  >((_event, { state }) => ({
    state: {
      ...state,
      todoItems: state.todoItems.filter((todoItem) => todoItem.id !== id),
    },
  }));

  return (
    <li
      css={css`
        ${completed ? completedStyle : undefined}
        ${renameInProgress ? listEditingStyle : undefined}
      `}
      onDoubleClick={onTodoItemDoubleClick}
    >
      <div>
        <div css={renameInProgress ? listLabelHiddenStyle : undefined}>
          <input
            type="checkbox"
            css={toggleStyle}
            value={completed ? "true" : "false"}
            onChange={onTodoItemCompletedChange}
          />
          <label>{description}</label>
          <button css={destroyStyle} onClick={onRemoveTodoItemClick} />
        </div>
        <input
          css={css`
            ${editStyle}
            ${renameInProgress ? editingStyle : notEditingStyle}
          `}
          value={description}
          ref={inputReference}
          onChange={onRenamedTodoItemChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              (event.target as HTMLInputElement).blur();
            }
          }}
          onBlur={onRenamedTodoItemBlur}
        />
      </div>
    </li>
  );
};

export default TodoItem;
