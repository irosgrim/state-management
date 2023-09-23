import { useGlobalState } from "./store/appStore";

export const Profile = () => {
    const { profile, logout, login } = useGlobalState<any>((state) => (
        {
            profile: state.profile,
            logout: state.logout,
            login: state.login,
        }
    ));
    return (
        <div>
            {
                profile && `Welcome, ${profile.name}`
            }
            <button onClick={() => {
                if (profile) {
                    logout();
                } else {
                    login();
                }
            }}>{profile ? "Logout" : "Login"}</button>
        </div>
    );
};
