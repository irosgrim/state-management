import { useGlobalState } from "./lib/state/useGlobalState";

export const Footer = () => {
    const { profile } = useGlobalState((state) => ({ profile: state.profile }))
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
