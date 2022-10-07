// Challenge 1
// A) Create a for loop that iterates through an array and returns the sum of the elements of the array.
// B) Create a functional iterator for an array that returns each value of the array when called, one element at a time.

// A)
function sumFunc(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

const array = [1, 2, 3, 4];
console.log(sumFunc(array)); // -> should be 10

// B)
function returnIterator(arr) {
  let index = 0;
  return () => {
    const item = arr[index++];
    return item;
  };
}

const array2 = ["a", "b", "c", "d"];
const myIterator = returnIterator(array2);
console.log(myIterator()); // -> should log 'a'
console.log(myIterator()); // -> should log 'b'
console.log(myIterator()); // -> should log 'c'
console.log(myIterator()); // -> should log 'd'

// Challenge 2
// Create an iterator with a next method that returns each value of the array when .next is called.

function nextIterator(arr) {
  let index = 0;
  return {
    next: () => {
      const item = arr[index++];
      return item;
    },
  };
}

const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log(iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3

// Challenge 3
// Write code to iterate through an entire array using your nextIterator and sum the values.

function sumArray(arr) {
  const iterator = nextIterator(arr);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += iterator.next();
  }
  return sum;
}

const array4 = [1, 2, 3, 4];
console.log(sumArray(array4)); // -> should log 10

// Challenge 4
// Create an iterator with a next method that returns each value of a set when .next is called

function setIterator(set) {
  const iterator = set.values();
  const setIteratorWithNext = {
    next: () => {
      const next = iterator.next();
      return next["value"];
    },
  };
  return setIteratorWithNext;
}

const mySet = new Set("hey");
const iterateSet = setIterator(mySet);
console.log(iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'

// Challenge 5
// Create an iterator with a next method that returns an array with two elements (where the first element is the index and the second is the value at that index) when .next is called.

function indexIterator(arr) {
  let index = 0;
  const iteratorWithNext = {
    next: () => {
      const result = [index, arr[index++]];
      return result;
    },
  };

  return iteratorWithNext;
}

const array5 = ["a", "b", "c", "d"];
const iteratorWithIndex = indexIterator(array5);
console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
console.log(iteratorWithIndex.next()); // -> should log [2, 'c']

// Challenge 6
// Create an iterator that returns each word from a string of words on the call of its .next method (hint: use regex!)
// Then attach it as a method to the prototype of a constructor Words. Hint: research Symbol.iterator!

function Words(string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function () {
  let index = 0;
  const splittedString = this.str.split(" ");
  const iterator = {
    next: () => {
      if (index < splittedString.length) {
        const result = splittedString[index++];
        return {
          value: result,
          done: false,
        };
      } else {
        return {
          value: undefined,
          done: true,
        };
      }
    },
  };
  return iterator;
};

const helloWorld = new Words("Hello World");
for (let word of helloWorld) {
  console.log(word);
} // -> should log 'Hello' and 'World'

// Challenge 7
// Build a function that walks through an array and returns the element concatenated with the string "was found after index x", where x is the previous index.
// Note: if it is the first element it should say that it is the first

function valueAndPrevIndex(array) {
  let index = 0;
  const iterator = {
    sentence: () => {
      const element = array[index];
      let indexName = index - 1;
      const currentIndex = index;
      index++;
      if (currentIndex === 0) {
        indexName = "First";
      }
      return `${element} was found after index ${indexName}`;
    },
  };
  return iterator;
}

const returnedSentence = valueAndPrevIndex([4, 5, 6]);
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
