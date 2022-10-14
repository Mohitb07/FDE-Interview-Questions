const functionStore = {
  increment: function () {
    this.score++;
  },
  decrement: function () {
    this.score--;
  },
  getName: function () {
    return this.name;
  },
};

const user1 = {
  name: "John",
  score: 100,
};
console.log(user1);
console.log(user1.name); // -> exist in global memory
console.log(user1.increment); // -> doesn't exist in global memory and has no __proto__ chaining to functionStore
console.log(user1.getName); // -> doesn't exist in global memory and has no __proto__ chaining to functionStore

console.log("--------------------------------");

const user2 = Object.create(functionStore); // -> here we linked the __proto__ of user2 to functionStore

user2.name = "Phil";
user2.score = 100;
console.log(user2); // -> exist in global memory
user2.increment(); // -> doesn't exist in global memory but has __proto__ chaining to functionStore
console.log(user2.getName()); // -> doesn't exist in global memory but has __proto__ chaining to functionStore
console.log(user2.score); // -> doesn't exist in global memory but has __proto__ chaining to functionStore

console.log("--------------------------------");

// WITHOUT USING new KEYWORD IN FRONT OF CONSTRUCTOR FUNCTION CALL
function userCreator(name, password) {
  const newUser = Object.create(userFunctionStore);
  newUser.name = name;
  newUser.password = password;
  return newUser;
}
const userFunctionStore = {
  getName: function () {
    return this.name;
  },
};
const user_1 = userCreator("Mohit", 123);
console.log("Without using new Keyword", user_1.getName());

// WITH USING new KEYWORD IN FRONT OF CONSTRUCTOR FUNCTION CALL
function userCreatorWithNew(name, password) {
  this.name = name;
  this.password = password;
}

userCreatorWithNew.prototype.getName = function () {
  return this.name;
};
const userNew1 = new userCreatorWithNew("Mohit", 123);
console.log("With using new Keyword", userNew1.getName());

console.log("--------------------------------");

class UserCreator {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
  getName() {
    return this.name;
  }
}

const classUser = new UserCreator("Mohit's Class", "123");
console.log(classUser.getName());

console.log("--------------------------------");

// Write a reverse method on a string which can be used on every string values
String.prototype.reverse = function () {
  const string = this.toString();
  let result = "";
  for (let i = string.length - 1; i >= 0; i--) {
    result += string[i];
  }
  return result;
};

const input = "hello world";
console.log(input.reverse());
