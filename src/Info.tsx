import { useGlobalState } from "./store/appStore";
import { AppState } from "./store/types";

export const Info = () => {
    const { count, selection } = useGlobalState<Pick<AppState, "count" | "selection">>(state => (
        {
            count: state.count,
            selection: state.selection,
        }
    ));
    return (
        <div>
            <div> Sidebar component</div>
            <div>
                Count is: {count}
            </div>
            <div>
                Selection is: {JSON.stringify(selection)}
            </div>
        </div>
    )
}