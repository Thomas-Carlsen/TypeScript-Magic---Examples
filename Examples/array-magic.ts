

const a = [1, 2, 3] as const;
const b = ["a", "b", "c"] as const;

type IndexOf<T extends readonly number[], S extends number[] = []> = 
  T["length"] extends S["length"]
  ? S[number]
  : IndexOf<T, [S["length"], ...S]>;

type at = IndexOf<typeof a>;

a.map( (_, i) => {
  const c = b[i];
});

type numb = 1 | 2 | 3 extends number ? number : never;


type Row = "a" | "b";
type Col = "1" | "2";

let position: `${Row}${Col}`;

declare function numericNumberTest(numb: number): void;
declare function numericNumberTest2(numb: 0 | 1): void;

numericNumberTest(2);
numericNumberTest2(1);


type Head<T extends any[]> =
  T extends [any, ...any[]]
  ? T[0] // this is not working for strings
  : never

type Head2<T extends any[]> =
  T extends [infer H, ...any[]] // infer H could be used to take the first char of a string
  ? H
  : never

type h1 = Head<[string, number, null]>;
type h2 = Head2<[string, number, null]>;


type Tail<Type extends any[]> =
  ((...t: Type) => any) extends ((_: any, ...tail: infer T) => any)
  ? T
  : never

type Tail2<Type extends any[]> =
  Type extends [infer H, ...infer T]
  ? T
  : never

type t1 = Tail<[string, number, null]>;
type t2 = Tail2<[string, number, null]>;

type HasTail<T extends any[]> = 
  T extends ([] | [any])
  ? false
  : true

type l1 = [string, number];
type l1test = HasTail<l1>;
type l2test = HasTail<Tail<l1>>;



// goal to make string type of specific number
type isEmptyString<S extends string> = S extends "" ? true : false;
type s = "hej";
type empty = isEmptyString<"">;
type sempty = isEmptyString<s>;

// type efwl = `${infer FirstLetter}${infer Rest}`
type length<S extends string> = S["length"];
type lengthArr<S extends any[]> = S["length"];

type slength = length<s>;
type alengthArr = lengthArr<[0, 1]>;

type sl = [1]["length"] extends 1 ? true : false;

type RecString<S extends string> = 
  isEmptyString<S> extends true 
  ? []
  : S extends `${infer FirstLetter}${infer Rest}`
  ? [1, ...RecString<Rest>] 
  : never;

type rectest = RecString<s>; // here we go!!!

type StringN<S extends string, N extends number> = RecString<S>["length"] extends N ? string : never;

// type twoCharString = `${infer F}${""}`;

// const lss: twoCharString = "j"

const lep = "to";

type rle = StringN<typeof lep, 3>;
