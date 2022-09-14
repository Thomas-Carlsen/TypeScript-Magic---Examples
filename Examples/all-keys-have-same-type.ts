

export enum stringConstants {
  stringA = "a",
  stringB = "b",
  stringC = "c",
}

interface KeyType {
  id: string;
  age: number;
  collection: any[];
}

// type below is forcing the key names to be stringContants and the values to be KeyType
const DMSDocumentBaseTypes: Record<stringConstants, KeyType> = {
  [stringConstants.stringA]: {
    id: "string",
    age: 3,
    collection: [],
  },
  [stringConstants.stringB]: {
    id: "bo",
    age: 5,
    collection: [2, 3],
  },
  [stringConstants.stringC]: {
    id: "124",
    age: 1,
    collection: ["hello"]
  }
}