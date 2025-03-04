// testing promises

const testFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('first promise');
      resolve('Success');
    }, 1000);
  });
};

const testFunc2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('second promise');
      resolve('Success 2');
    }, 2000);
  });
};

const testFunc3 = async () => {
  console.log('Start');

  await testFunc();
  await testFunc2();

  console.log('Done');
  return 'Done - 1';
};

testFunc3().then((res) => {
  console.log(res);
});
console.log('End');
