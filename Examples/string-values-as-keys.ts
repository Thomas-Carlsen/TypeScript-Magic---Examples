

export const stringConstants = {
  stringA: "a" as const,
  stringB: "b" as const,
  stringC: "c" as const,
}


type Keys = keyof typeof stringConstants;
type Values = typeof stringConstants[Keys];
type DMSUrlValuesObjectType = { [key in Values]?: string; }; // also made optional