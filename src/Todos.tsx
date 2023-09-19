import { useGlobalState } from "./lib/state/useGlobalState";

export const Todos = () => {
    const { todos } = useGlobalState<any>((state) => ({ todos: state.todos }));

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
