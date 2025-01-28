export const QUERY_KEYS = {
  GOODS: "goods",
  LISTS: "lists",
} as const;

export type QueryKeys = (typeof QUERY_KEYS)[keyof typeof QUERY_KEYS];
