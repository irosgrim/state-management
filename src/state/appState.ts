import { globalState } from "../lib/state/useGlobalState";

export type AppState = {
  todos: any[];
  profile: { name: string } | null;
  menu: Record<string, any>;
  greet: (name: string) => string;
  getTodos: (n: number | undefined) => Promise<void>;
  clearTodos: () => void;
  login: () => void;
  logout: () => void;
  getMenu: ( country?: "sweden" | "denmark" | "norway" | "finland") => void;
};

export const appState: AppState = {
  todos: [],
  profile: null,
  menu: {
    sweden: {
        helsingborg: ["Laröd", "Lunnom", "Lydestad", "Pålsjö", "Tågarp", "Väla", "Viken"],
        stockholm: ["Botkyrka", "Danderyds", "Ekerö"],
        gothenburg: ["Majorna", "Torslanda", "Billdal"],
        malmo: ["Oxie", "Käglinge", "Sege"],
    },
  },
  greet: (name: string) => `Hello ${name}`,
  getTodos: async (n: number | undefined = undefined) => {
    const req = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!req.ok) {
      throw new Error("Can't get todos!");
    }
    const data = await req.json();
    globalState.setState({ todos: data.slice(0, n) });
  },
  clearTodos: () => {
    globalState.setState({ todos: [] });
  },
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

  getMenu: (country) => {
    const countries = {
        sweden: {
            helsingborg: ["Laröd", "Lunnom", "Lydestad", "Pålsjö", "Tågarp", "Väla", "Viken"],
            stockholm: ["Botkyrka", "Danderyds", "Ekerö"],
            gothenburg: ["Majorna", "Torslanda", "Billdal"],
            malmo: ["Oxie", "Käglinge", "Sege"],
        },
        denmark: {
            copenhagen: ["Frederiksberg", "Norrebro", "Vesterbro"],
            aarhus: ["Bispehaven", "Skjoldhøj", "Tilst"],
        },
        norway: {
            oslo: ["Grünerløkka", "Frogner", "St. Hanshaugen"],
            bergen: ["Arna", "Fana", "Ytrebygda"],
        },
        finland: {
            helsinki: ["Kallio", "Töölö", "Kamppi"],
            turku: ["Maaria-Paattinen", "Varissuo", "Runosmäki"],
        },
    };
    if (!country) {
        globalState.setState({menu: {...countries}})
    } else if (["sweden", "denmark", "norway", "finland"].includes(country)) {
        globalState.setState({menu: {[country]: {...countries[country]}}})
    }
  }
};