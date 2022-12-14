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

export type TodoItemProps = {
  id: string;
  description: string;
  completed: boolean;
  renameInProgress: boolean;
};

type CheckboxChangeHandler = ChangeEventHandler<HTMLInputElement>;
type ListClickHandler = MouseEventHandler<HTMLLIElement>;
type ButtonClickHandler = MouseEventHandler<HTMLButtonElement>;
type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;
type InputBlurHandler = FocusEventHandler<HTMLInputElement>;

const TodoItem = (props: TodoItemProps) => {
  const { id, description, completed, renameInProgress } = props;
  const inputReference = useRef(null as HTMLInputElement | null);

  useEffect(() => {
    inputReference.current?.focus();
  }, [renameInProgress]);

  const onCheckboxChangeHandler = usePureStatefulCallback<
    TodoListStateSpec,
    CheckboxChangeHandler
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

  const onDoubleClickHandler = usePureStatefulCallback<
    TodoListStateSpec,
    ListClickHandler
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

  const onInputChangeHandler = usePureStatefulCallback<
    TodoListStateSpec,
    InputChangeHandler
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
  const onBlurHandler = usePureStatefulCallback<
    TodoListStateSpec,
    InputBlurHandler
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

  const onButtonClickHandler = usePureStatefulCallback<
    TodoListStateSpec,
    ButtonClickHandler
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
      onDoubleClick={onDoubleClickHandler}
    >
      <div>
        <div css={renameInProgress ? listLabelHiddenStyle : undefined}>
          <input
            type="checkbox"
            css={toggleStyle}
            value={completed ? "true" : "false"}
            onChange={onCheckboxChangeHandler}
          />
          <label>{description}</label>
          <button css={destroyStyle} onClick={onButtonClickHandler} />
        </div>
        <input
          css={css`
            ${editStyle}
            ${renameInProgress ? editingStyle : notEditingStyle}
          `}
          value={description}
          ref={inputReference}
          onChange={onInputChangeHandler}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              (event.target as HTMLInputElement).blur();
            }
          }}
          onBlur={onBlurHandler}
        />
      </div>
    </li>
  );
};

export default TodoItem;
