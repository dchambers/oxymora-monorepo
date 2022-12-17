export type Todos = {
  viewMode: ViewMode;
  toggleAllChecked: boolean;
  newTodo: string;
  todoItems: Todo[];
};

export enum ViewMode {
  All = "all",
  Active = "active",
  Completed = "completed",
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

export const getActiveTodoListItems = (viewMode: ViewMode, todoItems: Todo[]) =>
  viewMode === ViewMode.All
    ? todoItems
    : todoItems.filter(
        viewMode === ViewMode.Active ? isActiveItem : isCompletedItem
      );

export const updateTodoList = (todos: Todos, update: UpdatedTodos): Todos => ({
  ...todos,
  ...update,
});

export const updateTodoListItems = (
  todos: Todos,
  update: TodoUpdate
): Todos => ({
  ...todos,
  todoItems: todos.todoItems.map((todoItem) => ({ ...todoItem, ...update })),
});

export const addTodoListItem = (todos: Todos, item: Todo): Todos => ({
  ...todos,
  todoItems: [...todos.todoItems, item],
});

export const updateTodoListItem = (todos: Todos, item: UpdatedTodo): Todos => ({
  ...todos,
  todoItems: todos.todoItems.map((todoItem) =>
    todoItem.id === item.id ? { ...todoItem, ...item } : todoItem
  ),
});

export const removeTodoListItem = (todos: Todos, id: Todo["id"]): Todos => ({
  ...todos,
  todoItems: todos.todoItems.filter((todoItem) => todoItem.id !== id),
});
