
import { useEffect, useState } from "react";
import { useGlobalState } from "./store/appStore";
import { AppState } from "./store/types";
import { Info } from "./Info";

const Menu = ({ data, setSelection, depth = 0, path = [] }: any) => {
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

    const handleClick = (path: any, key: any, hasChildren: any) => {
        if (hasChildren) {
            setExpandedKeys((prev: any) => {
                return prev.includes(key) ? prev.filter((k: any) => k !== key) : [...prev, key];
            });
        }
        const [country, county, city] = path;
        setSelection({ country, county, city });
    };

    if (Array.isArray(data)) {
        return (
            <ul style={{ paddingLeft: depth * 8 }}>
                {data.map((city, index) => (
                    <li key={index} onClick={() => handleClick([...path, city], city, false)}>
                        {city}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <ul style={{ paddingLeft: depth * 8 }}>
            {data && Object.entries(data).map(([key, value], index) => (
                <li key={index}>
                    <div onClick={() => handleClick([...path, key], key, !!Object.keys(value).length)}>
                        {key}
                    </div>
                    {expandedKeys.includes(key) && Object.keys(value).length > 0 && (
                        <Menu data={value} setSelection={setSelection} depth={depth + 1} path={[...path, key]} />
                    )}
                </li>
            ))}
        </ul>
    );
};

export const Sidebar = () => {
    const [selection, setSelection] = useState({});
    const { menu, getMenu } = useGlobalState((state) => ({ menu: state.menu, getMenu: state.getMenu }));

    useEffect(() => {
        getMenu();
    }, []);

    return (
        <div className="sidebar">
            <div>
                <Info />
                <div>
                    <h2> Countries::</h2>
                    <button onClick={() => getMenu("sweden")}>Sweden</button>
                    <button onClick={() => getMenu("denmark")}>Denmark</button>
                    <button onClick={() => getMenu("norway")}>Norway</button>
                    <button onClick={() => getMenu("finland")}>Finland</button>
                    <button onClick={() => getMenu()}>All</button>
                </div>
                <h2>Menu::</h2>
                <Menu data={menu} setSelection={setSelection} />
            </div>
        </div>
    );
};
