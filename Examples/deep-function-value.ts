

export const getDeepValue = <TObj, TFirstKey extends keyof TObj, TSecondObj extends keyof TObj[TFirstKey]>(
  obj: TObj,
  firstKey: TFirstKey,
  secondKey: TSecondObj
) => {
  return obj[firstKey][secondKey];
};

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "12",
    d: 18,
  },
};

const value = getDeepValue(obj, "foo", "b");


typeof value === 'number';