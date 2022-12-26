
const test2 = () => {
  console.log('b');
}

const test = () => {
  test2();
  (() => {
    console.log('a');
  })();
}
  // console.log('a');

// console.log(test);
test()

const obj = { name: 'kwon', age:20 };
const obj2 = { ...obj };

console.log(obj2);