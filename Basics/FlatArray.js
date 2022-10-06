const value = [1, 2, 3, [4, [5, 7]], 20];

// easy approach
const infiniteFlatten = (value) => {
  return value.flat(Infinity);
};

const infiniteFlat = (value, res = []) => {
  const result = res; // [1,2,3, ]
  if (value.length === 0) {
    return [];
  }
  value.forEach((item) => {
    if (Array.isArray(item)) {
      infiniteFlat(item, result);
    } else {
      result.push(item);
    }
  });

  return result;
};

console.log(infiniteFlat([1, [2, [3, [4, [5]]]]]));

// [4,[5,7]] -> [1,2,3]
// [5,7] -> [1,2,3,4]
// [7] => [1,2,3,4,5]
// [] => [1,2,3,4,5, 7]
