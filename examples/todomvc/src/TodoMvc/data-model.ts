export type Todos = {
  listMode: ListMode;
  toggleAllChecked: boolean;
  newTodo: string;
  todoItems: Todo[];
};

export enum ListMode {
  All = "ALL_ITEMS",
  Active = "ACTIVE_ITEMS",
  Completed = "COMPLETED_ITEMS",
}

export type Todo = {
  id: string;
  description: string;
  completed: boolean;
  renameInProgress: boolean;
};

type UpdatedTodos = Partial<Todos>;
type TodoUpdate = Partial<Omit<Todo, "id">>;
type UpdatedTodo = Pick<Todo, "id"> & Partial<Todo>;

const isActiveItem = (todoItem: Todo) => !todoItem.completed;
const isCompletedItem = (todoItem: Todo) => todoItem.completed;

export const getActiveTodoItems = (listMode: ListMode, todoItems: Todo[]) =>
  listMode === ListMode.All
    ? todoItems
    : todoItems.filter(
        listMode === ListMode.Active ? isActiveItem : isCompletedItem
      );

export const updateTodoList = (todos: Todos, update: UpdatedTodos): Todos => ({
  ...todos,
  ...update,
});

export const updateTodoItems = (todos: Todos, update: TodoUpdate): Todos => ({
  ...todos,
  todoItems: todos.todoItems.map((todoItem) => ({ ...todoItem, ...update })),
});

export const addTodoItem = (todos: Todos, item: Todo): Todos => ({
  ...todos,
  todoItems: [...todos.todoItems, item],
});

export const updateTodoItem = (todos: Todos, item: UpdatedTodo): Todos => ({
  ...todos,
  todoItems: todos.todoItems.map((todoItem) =>
    todoItem.id === item.id ? { ...todoItem, ...item } : todoItem
  ),
});

export const removeTodoItem = (todos: Todos, id: Todo["id"]): Todos => ({
  ...todos,
  todoItems: todos.todoItems.filter((todoItem) => todoItem.id !== id),
});
