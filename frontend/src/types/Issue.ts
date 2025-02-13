export type Issue = {
  title: string;
  id: number;
  state: "open" | "closed" | "no reaction";
  first: string;
  messages: string;
};
