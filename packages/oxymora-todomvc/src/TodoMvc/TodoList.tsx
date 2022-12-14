import type { Props } from "@dchambers/oxymora";
import type { ChangeEventHandler, KeyboardEventHandler } from "react";
import type { TodoListInfo, TodoItemInfo } from "./todo-list-model";

import {
  pureStatefulComponent,
  usePureStatefulCallback,
} from "@dchambers/oxymora";
import stateify from "@dchambers/stateify";
import TodoItem from "./TodoItem";
import TodoListFooter from "./TodoListFooter";
import {
  infoStyle,
  mainStyle,
  newTodoStyle,
  todoAppStyle,
  todoListStyle,
  toggleAllStyle,
} from "./TodoListStyle";
import { ListMode } from "./todo-list-model";
import { getActiveTodoItems } from "./todo-list-utils";

export type TodoListStateSpec = {
  State: TodoListInfo;
  InputProps: {};
  OutputProps: {};
};

type TodoListProps = Props<TodoListStateSpec>;

const defaultTodoList = {
  listMode: ListMode.All,
  toggleAllChecked: false,
  newTodo: "",
  todoItems: [],
};

export const PureStatefulTodoList = pureStatefulComponent<TodoListStateSpec>(
  defaultTodoList,
  (props: TodoListProps) => {
    const activeTodoItems = getActiveTodoItems(
      props.state.listMode,
      props.state.todoItems
    );

    const onNewTodoItemChange = usePureStatefulCallback<
      TodoListStateSpec,
      ChangeEventHandler<HTMLInputElement>
    >((event, { state }) => ({
      state: {
        ...state,
        newTodo: event.target.value,
      },
    }));

    const onNewTodoItemKeyDown = usePureStatefulCallback<
      TodoListStateSpec,
      KeyboardEventHandler<HTMLInputElement>
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
                  renameInProgress: false,
                },
              ],
            },
    }));

    const onToggleAllChange = usePureStatefulCallback<
      TodoListStateSpec,
      ChangeEventHandler<HTMLInputElement>
    >((_event, { state }) => ({
      state: {
        ...state,
        toggleAllChecked: !state.toggleAllChecked,
        todoItems: state.todoItems.map((todoItem) => ({
          ...todoItem,
          completed: !state.toggleAllChecked,
        })),
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
                renameInProgress={todoItem.renameInProgress}
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
              onChange={onNewTodoItemChange}
              onKeyDown={onNewTodoItemKeyDown}
            />
            {props.state.todoItems.length === 0 ? undefined : (
              <>
                <input
                  id="toggle-all"
                  type="checkbox"
                  css={toggleAllStyle}
                  checked={props.state.toggleAllChecked}
                  onChange={onToggleAllChange}
                />
                <label htmlFor="toggle-all" />
              </>
            )}
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
  TodoListProps
>(PureStatefulTodoList);
