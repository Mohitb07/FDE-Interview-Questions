const obj = {
  name: "Mohit Bisht",
  getName: function () {
    console.log(this);
  },
};
obj.getName();

const obj1 = {
  name: "Mohit Bisht",
  getName: () => console.log(this),
};

obj1.getName();

const obj2 = {
  name: "Mohit Bisht",
  getName: function () {
    const inner = () => console.log(this);
    inner();
  },
};

obj2.getName();

const obj3 = {
  name: "Mohit Bisht",
  getName: () => {
    function inner() {
      console.log(this);
    }
    inner();
  },
};

obj3.getName();
