
// type tobj = {
//   a: string;
//   b: string;
//   c?: number;
// }

const ob1 = {
  a: "cool string value",
  b: "another cool string value",
  c: undefined,
}
type tobj = typeof ob1;
type ktobj = keyof tobj;


// Intrinsic String Manipulation Types - these are built-in to the compiler (so not in lib.d.ts) and hence no TS def exist of this
/*
Uppercase<StringType>
Lowercase<StringType>
Capitalize<StringType>
Uncapitalize<StringType>
*/



// From TS release 2.1:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick

// Partial
type PartialDef<T> = {
  [P in keyof T]?: T[P]; // its simpler than I though
};
// Example(s)
type par1 = Partial<tobj>;


// Readonly - Keep types the same, but make each property to be read-only.
type ReadonlyDef<T> = {
  readonly [P in keyof T]: T[P];
};
// Example(s)
type read1 = Readonly<tobj>;


// Extras from release 2.1 but not offical keywords in TS:

// Deferred - Same property names, but make the value a promise instead of a concrete one
type Deferred<T> = {
  [P in keyof T]: Promise<T[P]>;
};
// Example(s)
type def1 = Deferred<tobj>;


// Proxify - Wrap proxies around properties of T
type Proxify<T> = {
  [P in keyof T]: { get(): T[P]; set(v: T[P]): void };
};
// Example(s)
type prox1 = Proxify<tobj>;


// Record - Construct a type with a set of properties K of type T
type RecordDef<K extends string | number | symbol, T> = {
  [P in K]: T;
}
// we are saying that keys/props should be of a certain type string/number/symbols and their value should be of a certain type (T above)
// it is more useful if the 'value type' is a complex type instead of number as below
// Example(s)
type rec1 = Record<ktobj, number>;


// Pick - From T, pick a set of properties whose keys are in the union K
type PickDef<T, K extends keyof T> = {
  [P in K]: T[P];
}
// Example(s)
type pic1 = Pick<tobj, "a">;

declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>; // the ...keys: K[] is what is cool by this example (in my mind)

const nameAndAgeOnly = pick({ "name": "tc", "age": 2 }, "name", "age"); // { name: string, age: number }




// From TS release 2.3:
// https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype

// ThisType (interface) - Marker for contextual 'this' type

// Example(s) 
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
  // x and y are first defined in 'data' and therefore 'moveBy' doesn't know that this will be in the same object in the makeObject
  // so we are helping 'moveBy' to know that 'this' also contains the this of D (or 'data' below)
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});




// From TS release 2.8:
// TypeScript 2.8 adds several predefined conditional types to lib.d.ts
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#improved-control-over-mapped-type-modifiers


// Exclude - Exclude from T those types that are assignable to U
type ExcludeDef<T, U> = T extends U ? never : T
// Example(s) 
type exc1 = Exclude<ktobj, "a" | "c" | "f">;


// Extract - Extract from T those types that are assignable to U
type ExtractDef<T, U> = T extends U ? T : never
// Example(s) 
type ext1 = Extract<ktobj, "a" | "c" | "f">;


// NonNullable - Exclude null and undefined from T
type NonNullableDef<T> = T extends null | undefined ? never : T;
// Example(s) 
type nonn1 = NonNullable<string | number | undefined>;

type nonn2 = { [P in ktobj as tobj[P] extends null | undefined ? never : P]: tobj[P] }; // removing all null keys
const obtsg: nonn2 = ob1;
obtsg.a


// ReturnType - Obtain the return type of a function type
type ReturnTypeDef<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
// I think this def will become cleaner when we are not forced to use infer in an type condition with 'extends'
// Example(s) 
declare function f1(): { a: number; b: string };
type ret1 = ReturnType<typeof f1>;


// InstanceType - Obtain the return type of a constructor function type
type InstanceTypeDef<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any
// Example(s) 
class C {
  x = 0;
  y = 0;
}
type ctype = typeof C;
type ins1 = InstanceType<ctype>;


// Required - Make all properties in T required
type RequiredDef<T> = { [P in keyof T]-?: T[P]; }
// Example(s) 
type req1 = Required<par1>;