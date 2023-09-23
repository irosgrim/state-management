import { useGlobalState } from "./store/appStore";
import { AppState } from "./store/types";

const checkboxes = ["ana", "ion", "robin", "bernie"];

export const Checkboxes = () => {
    const { selection, setSelection } = useGlobalState<Pick<AppState, "selection" | "setSelection">>(state => (
        {
            selection: state.selection,
            setSelection: state.setSelection,
        }
    ));


    const handleSelection = (val: string) => {
        const index = selection.indexOf(val);
        if (index > -1) {
            const newSelection = [...selection];
            newSelection.splice(index, 1);
            setSelection(newSelection)
        } else {
            setSelection([...selection, val]);
        }
    }

    return (
        <div>
            {checkboxes.map((x) => (
                <div key={x}>
                    <input
                        type="checkbox"
                        id={x}
                        name={x}
                        value={x}
                        checked={selection.includes(x)}
                        onChange={() => handleSelection(x)}
                    />
                    <label htmlFor={x}>{x}</label>
                </div>
            ))}
        </div>
    );
}