export const API_PATHS = {
  GOODS: "/goods",
  LISTS: "/lists",
} as const;

export type ApiPaths = (typeof API_PATHS)[keyof typeof API_PATHS];
