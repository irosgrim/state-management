export type AppState = {
  profile: { name: string } | null;
  menu: Record<string, any> | null;
  count: 0,
  selection: string[],
  setSelection: (selectedItems: string[]) => void;
  addToCount: (nr: number) => void;
  greet: (name: string) => string;
  login: () => void;
  logout: () => void;
  getMenu: ( country?: "sweden" | "denmark" | "norway" | "finland") => void;
};
