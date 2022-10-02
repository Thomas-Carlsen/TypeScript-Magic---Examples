

// For every properties K of type T, transform it to U
declare function mapObject<K extends string, T, U>( // the K, T, U types are inferred via the function arguments' types
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U>;
const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length); // { foo: number, bar: number, baz: number }

type Yo<K extends string, T> = {
  [P in K]: 2
}

declare function testfunc<K extends string | number | symbol, T>(obj: Record<K, T>): K;
testfunc(names);


type CapitalizeDef<S extends string> = intrinsic
type cap = Capitalize<"hay">;


type stringArr = string[];
type stringFromArr1 = string[number]; // why this not char? - maybe char not in TS but is actually string
type stringFromArr = stringArr[number];

// type d = char; // no char no exit - makes senes

type Cap<T extends string> = T[0];

type s1 = Cap<"hello">;

const s1 = "hello"
type lw = typeof s1;
const s2: Cap<typeof s1> = "e"

declare function firstLetter<Letters extends string>(
  string: Letters,
): Letters extends `${infer FirstLetter}${string}`
  ? FirstLetter
  : never;

firstLetter("hello");

type Speed = 'fast' | 'slow' | 'medium';
type Cap2<T extends string> = T extends `${infer FirstLetter}${string}` ? FirstLetter : never;

// below is actully just Cap
type SpeedShor2t<T extends string> = {
  [P in T]: P extends `${infer FirstLetter}${infer Rest}` ? `${Uppercase<FirstLetter>}${Rest}` : never;
}[T];

type lf = SpeedShor2t<"hello">;
type lf2 = Cap2<"hello">;
type lf3 = Cap2<Speed>;
type lf4 = Cap2<"">;

const s3: SpeedShor2t<typeof s1> = "e"



type Guid = `${string}-${string}-${string}-${string}-${string}`

const randGuid: Guid = 'a240c845-bae6-467b-b3be-b4b82431d2e2';




// Key Remapping via as - that is, chaning the key name

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

//You can filter out keys by producing never via a conditional type:

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Property extends number ? "hello" : Property]: Type[Property]
};
// weird syntax - but the 'as' is simple just a rename of the key but if the new name is 'never' it is not returned

interface Circle {
  kind: "circle";
  0: number;
}

type KindlessCircle = RemoveKindField<Circle>;
type KindlessCircle2 = Exclude<keyof Circle, "kind">;

const funfun: KindlessCircle = {
  hello: 32,
  kind: "circle",
}


// How to filter an object in TS
// - we need to use 'Pick' but that expects an object (good we have that) and a union of all the props key to keep
// - so we need to make that union of props/keys to keep
// - we need to filter on each keys' type:
// -- return never when type is fulfill (to whatever purpose you are interested in). Otherwise return the prop (typically P)
// -- after this use the type index with the keyof typeof obj (i.e. [keyof typeof obj] at the end)

// I don't know if there is a better way, but this def works

type ty = {
  x: string,
  y: () => {}
}

type RemoveKeysOfType<T extends object, U> = { 
  [P in keyof T]: T[P] extends U ? never : P 
}[keyof T];

// this is supreme 
type RemoveKeysOfType2<T extends object, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
};

type r = RemoveKeysOfType<ty, string>;
type r2 = RemoveKeysOfType2<ty, string>; // final result - very niiice

type PickDef2<T, K extends keyof T> = { [P in K]: T[P]; }

type NoStringsKeys<T extends object> = Pick<T, RemoveKeysOfType<T, string>>;

type yo1 = NoStringsKeys<ty>;


const v1: ty = {
  x: "hej",
  y: () => { return {}; },
};
const v2: r2 = {
  x: "hej",
  y: () => { return {}; },
}

const v3: r2 = {
  x: "hej",
  y: () => { return {}; },
} as ty // why is this valid?