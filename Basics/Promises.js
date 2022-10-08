function CustomPromise(executor) {
  let fulfilled = false,
    rejected = false,
    called = false,
    value;

  let onResolve, onReject;

  function resolve(resolvedValue) {
    value = resolvedValue;
    fulfilled = true;
    if (typeof onResolve === "function") {
      onResolve(value);
      called = true;
    }
  }

  function reject(rejectionError) {
    rejected = true;
    value = rejectionError;
    if (typeof onReject === "function") {
      onReject(value);
      called = true;
    }
  }

  this.then = function (cb) {
    onResolve = cb;
    if (fulfilled && !called) {
      called = true;
      onResolve(value);
    }
    return this;
  };

  this.catch = function (cb) {
    onReject = cb;

    if (rejected && !called) {
      called = true;
      onReject(value);
    }
    return this;
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

CustomPromise.resolve = (resolvedValue) => {
  new CustomPromise((resolve, reject) => {
    resolve(resolvedValue);
  });
};

CustomPromise.reject = (rejectionError) => {
  new CustomPromise((resolve, reject) => {
    reject(rejectionError);
  });
};

CustomPromise.all = (promisesList) => {
  const fulfilledList = [];
  const resultingList = [];

  function executor(resolve, reject) {
    promisesList.forEach((promise, idx) => {
      promise
        .then((val) => {
          fulfilledList.push(true);
          resultingList[idx] = val;

          if (fulfilledList.length === promisesList.length) {
            return resolve(resultingList);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  }

  return new CustomPromise(executor);
};

const promise1 = new CustomPromise((resolve, reject) => {
  console.log("inside promise executor");
  setTimeout(() => resolve(10), 1000);
});
const promise2 = new CustomPromise((resolve, reject) => {
  console.log("inside promise executor");
  setTimeout(() => resolve(10), 3000);
});

promise1
  .then((value) => {
    console.log("value", value);
  })
  .catch((error) => {
    console.log("error", error);
  });

CustomPromise.all([promise1, promise2])
  .then((val) => {
    console.log("all value", val);
  })
  .catch((err) => {
    console.log("error all", err);
  });

// Challenge 1
// Let's start by reviewing asynchronous functions! Using setTimeout, print the string 'Hello!' after 1000ms.

function sayHello() {
  setTimeout(() => {
    console.log("Hello!");
  }, 1000);
}

sayHello();

// Challenge 2
// Create a promise. Have it resolve with a value of 'Resolved!' in resolve after a delay of 1000ms, using setTimeout. Print the contents of the promise after it has been resolved by passing console.log to .then

// Challenge 2
var promise = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Resolved!");
  }, 1000);
});
// Should print out "Resolved!"
promise.then((result) => {
  console.log(result);
});

// Challenge 3
// Create another promise. Now have it reject with a value of "Rejected!" without using setTimeout. Print the contents of the promise after it has been rejected by passing console.log to .catch

promise = new Promise(function (resolve, reject) {
  // ADD CODE HERE
  reject("Rejected!");
});

// Should print out "Rejected!"
promise.catch((result) => {
  console.log(result);
});

// Challenge 4
// Promises are asynchronous and we're now going to prove that they indeed are! Create a promise and have it resolve with the value of "Promise has been resolved!" Then uncomment the code at bottom of Challenge 4. What order do we expect "Promise has been resolved!" and "I'm not the promise!" to print? Why?

promise = new Promise(function (resolve, reject) {
  resolve("Promise has been resolved!");
});

promise.then(() => console.log("Promise has been resolved!"));
console.log("I'm not the promise!");

// Challenge 5
// Write a function delay that returns a promise. And that promise should return a setTimeout that calls resolve after 1000ms

function delay() {
  return new Promise((resolve, reject) => {
    return setTimeout(() => resolve("Hello"), 1000);
  });
}

// This code should log "Hello" after 1000ms
delay().then(sayHello);

// Challenge 6
// This challenge we'll chain promises together using ".then" Create two variables: firstPromise and secondPromise Set secondPromise to be a promise that resolves to "Second!" Set firstPromise to be a promise that resolves to secondPromise Call the firstPromise with a ".then", which will return the secondPromise> promise. Then print the contents of the promise after it has been resolved by passing console.log to .then

var secondPromise = new Promise((resolve, reject) => resolve("Second!"));
var firstPromise = new Promise((resolve, reject) => resolve(secondPromise));

firstPromise.then((promise) => console.log(promise));

// Challenge 7
// We have a API that gets data from a database, it takes an index parameter and returns a promise Your challenge is to use Promise.all to make 3 API calls and return all the data when the calls are complete

const fakePeople = [
  { name: "Rudolph", hasPets: false, currentTemp: 98.6 },
  { name: "Zebulon", hasPets: true, currentTemp: 22.6 },
  { name: "Harold", hasPets: true, currentTemp: 98.3 },
];

const fakeAPICall = (i) => {
  const returnTime = Math.floor(Math.random() * 1000);
  return new Promise((resolve, reject) => {
    if (i >= 0 && i < fakePeople.length) {
      setTimeout(() => resolve(fakePeople[i]), returnTime);
    } else {
      reject({ message: "index out of range" });
    }
  });
};

function getAllData() {
  const apiPromises = [fakeAPICall(0), fakeAPICall(1), fakeAPICall(2)];
  return Promise.all(apiPromises).then((res) => res)
}

getAllData().then((res) => {
  console.log(res);
});
