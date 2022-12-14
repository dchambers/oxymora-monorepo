import { ListMode, TodoItemInfo } from "./todo-list-model";

const isActiveItem = (todoItem: TodoItemInfo) => !todoItem.completed;
const isCompletedItem = (todoItem: TodoItemInfo) => todoItem.completed;

export const getActiveTodoItems = (
  listMode: ListMode,
  todoItems: TodoItemInfo[]
) =>
  listMode === ListMode.All
    ? todoItems
    : todoItems.filter(
        listMode === ListMode.Active ? isActiveItem : isCompletedItem
      );
