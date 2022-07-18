// Implement Array.prototype functions: map, reduce, filter, sort

/*
    Map :-
        The map() method creates a new array with the results of calling a provided function on every element in the calling array. 

        let arr = [1,2,3,4,6]
        const resultArray = arr.map(item => item + 1)

        console.log(resultArray) // print [2,3,4,5,7]
*/

// custom approach

const map = (arr, fn) => {
  const resultArray = [];

  for (let i = 0; i < arr.length; i++) {
    const result = fn(arr[i], i, arr);

    resultArray.push(result);
  }

  return resultArray;
};

const resultOfAddOne = map([1, 2, 3, 4, 5], (item) => item + 1);

console.log("resulting array", resultOfAddOne);

/*
    Filter :-
        The filter() method create a new array with all elements that pass the test implemented by the provided funtion.

        let arr = [1,2,3,4,6]
        const resultArray = arr.filter(item => item % 2 === 0 )

        console.log(resultArray) // print [2,4]
*/

// custom approach

const filter = (arr, fn) => {
  const filteredArray = [];

  for (let i = 0; i < arr.length; i++) {
    const result = fn(arr[i], i, arr);
    if (result) filteredArray.push(arr[i]);
  }

  return filteredArray;
};

// filter even numbers
const resultOfEven = filter([1, 2, 3, 4, 5], (item) => (item & 1) === 0);
console.log("resulting array", resultOfEven);
