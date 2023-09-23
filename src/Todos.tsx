import { TodoState, useTodoState } from "./store/todoStore";

export const Todos = () => {
    const { todos } = useTodoState<Pick<TodoState, "todos">>((state) => ({ todos: state.todos }));

    return (
        <>
            {
                todos.length > 0 && <ol>
                    {
                        todos.map((t: any) => (
                            <li key={t.id}>{t.title}</li>
                        ))
                    }
                </ol>
            }
        </>
    );
};
