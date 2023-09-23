import { AppState } from "./types";
import { Store, createHook } from "@irosgrim/react-state-manager"

export const globalState = new Store();

export const appState: AppState = {
  profile: null,
  count: 0,
  selection: [],
  menu: null,
  addToCount: (n: number = 1) => {
    const { count } = globalState.getState();
    globalState.setState({count: count + n});
  },
  setSelection: (selectedItems: number[]) => {
    globalState.setState({selection: selectedItems})
  },
  greet: (name: string) => `Hello ${name}`,
  login: async () => {
    const req = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!req.ok) {
        throw new Error("Can't get profile");
    }
    const data: any[] = await req.json();

    globalState.setState({
      profile: {
        name: data[Math.floor(Math.random() * data.length)].name,
      }
    })
  },
  logout: () => {
    globalState.setState({ profile: null });
  },

  getMenu: async (country) => {
    const req = await fetch("countries.json");
    if (!req.ok) {
        throw new Error("Can't fetch countries");
    }
    const countries = await req.json();
    if (!country) {
        globalState.setState({menu: {...countries}})
    } else if (["sweden", "denmark", "norway", "finland"].includes(country)) {
        globalState.setState({menu: {[country]: {...countries[country]}}})
    }
  },
};

globalState.setState(appState);

export const useGlobalState = createHook (globalState);