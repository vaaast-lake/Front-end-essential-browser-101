
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

