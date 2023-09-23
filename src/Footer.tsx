import { useGlobalState } from "./store/appStore";

export const Footer = () => {
    const { profile } = useGlobalState((state) => ({ profile: state.profile }));

    return (
        <div className="footer">
            Footer
            <span>
                {
                    profile ? "Logged in" : "Not logged in"
                }
            </span>
        </div>
    );
};
