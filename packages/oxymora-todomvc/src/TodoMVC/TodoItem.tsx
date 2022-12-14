import type { TodoListStateSpec } from "./TodoList";
import type { ChangeEventHandler, MouseEventHandler } from "react";

import { usePureStatefulCallback } from "@dchambers/oxymora";
import {
  completedStyle,
  destroyStyle,
  toggleStyle,
  viewStyle,
} from "./TodoListStyle";

export type TodoItemProps = {
  id: string;
  description: string;
  completed: boolean;
};

type CheckboxChangeHandler = ChangeEventHandler<HTMLInputElement>;
type ButtonClickHandler = MouseEventHandler<HTMLButtonElement>;

const TodoItem = (props: TodoItemProps) => {
  const { id, description, completed } = props;
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
    <li css={completed ? completedStyle : undefined}>
      <div css={viewStyle}>
        <input
          type="checkbox"
          css={toggleStyle}
          value={completed ? "true" : "false"}
          onChange={onCheckboxChangeHandler}
        />
        <label>{description}</label>
        <button css={destroyStyle} onClick={onButtonClickHandler} />
      </div>
    </li>
  );
};

export default TodoItem;
