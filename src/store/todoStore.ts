import { Store, createHook } from "@irosgrim/react-state-manager"

export const todoState = new Store();

export type TodoState = {
  todos: any[];
  getTodos: (n: number | undefined) => void;
  clearTodos: () => void;
};

export const todoStore = {
    todos: [],
    getTodos: async (n: number | undefined = undefined) => {
      const req = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!req.ok) {
        throw new Error("Can't get todos!");
      }
      const data = await req.json();
      todoState.setState({ todos: data.slice(0, n) });
    },
  clearTodos: () => {
    todoState.setState({ todos: [] });
  },
}
todoState.setState(todoStore);
export const useTodoState = createHook (todoState)
