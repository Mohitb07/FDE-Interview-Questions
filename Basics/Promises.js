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
