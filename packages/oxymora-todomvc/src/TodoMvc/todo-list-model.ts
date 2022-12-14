export type TodoListInfo = {
  listMode: ListMode;
  toggleAllChecked: boolean;
  newTodo: string;
  todoItems: TodoItemInfo[];
};

export enum ListMode {
  All = "ALL_ITEMS",
  Active = "ACTIVE_ITEMS",
  Completed = "COMPLETED_ITEMS",
}

export type TodoItemInfo = {
  id: string;
  description: string;
  completed: boolean;
  renameInProgress: boolean;
};
