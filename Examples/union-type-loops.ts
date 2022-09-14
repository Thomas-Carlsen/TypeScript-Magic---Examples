
// Basic union type stuff
const o = {
  "lol": 3,
  "lolz" : 4,
}

type l = keyof typeof o;



// looping over a type with above concept
interface rand {
  a: number;
  b: string;
  c: {
    name: string;
  };
}



type abType = rand["a" | "b"]; // loops through the keys' type and making an union