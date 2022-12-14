import type { TodoListStateSpec } from "./TodoList";
import type { Todo } from "./data-model";

import {
  ChangeEventHandler,
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import { css } from "@emotion/react";
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
} from "./styles";
import { removeTodoItem, updateTodoItem } from "./data-model";

type TodoItemProps = Todo;

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
    state: updateTodoItem(state, { id, completed: !completed }),
  }));

  const onRemoveTodoItemClick = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLButtonElement>
  >((_event, { state }) => ({
    state: removeTodoItem(state, id),
  }));

  const onTodoItemDoubleClick = usePureStatefulCallback<
    TodoListStateSpec,
    MouseEventHandler<HTMLLIElement>
  >((_event, { state }) => ({
    state: updateTodoItem(state, { id, renameInProgress: true }),
  }));

  const onRenamedTodoItemChange = usePureStatefulCallback<
    TodoListStateSpec,
    ChangeEventHandler<HTMLInputElement>
  >((event, { state }) => ({
    state: updateTodoItem(state, { id, description: event.target.value }),
  }));

  const onRenamedTodoItemBlur = usePureStatefulCallback<
    TodoListStateSpec,
    FocusEventHandler<HTMLInputElement>
  >((_event, { state }) => ({
    state: updateTodoItem(state, { id, renameInProgress: false }),
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
