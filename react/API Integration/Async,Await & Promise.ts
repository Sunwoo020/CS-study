`
Async/Await와 Promise의 차이
Promise와 async/await은 모두 JavaScript에서 비동기 작업을 처리하는 데 사용되는 방식이다. 
Promise는 ES6(ECMAScript 2015)에서 도입되었고, 
async/await는 ES8(ECMAScript 2017)에서 도입되어 
비동기 코드를 더 간결하고 읽기 쉽게 작성할 수 있도록 도와준다.

아래에서 Promise와 async/await의 개념과 차이점, 그리고 사용법을 자세히 살펴보자.

Promise란?
Promise는 비동기 작업의 성공 또는 실패를 나타내는 객체이다.

Promise는 세 가지 상태를 가진다

- Pending: 초기 상태, 비동기 작업이 아직 완료되지 않은 상태.
- Fulfilled: 비동기 작업이 성공적으로 완료된 상태.
- Rejected: 비동기 작업이 실패한 상태.

Promise는 .then(), .catch(), .finally()를 사용해 결과를 처리한다.

Promise 기본 사용법
`;
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // 작업 성공 여부
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 2000); // 2초 후 실행
  });
};

fetchData()
  .then((result) => {
    console.log(result); // "Data fetched successfully!"
  })
  .catch((error) => {
    console.error(error); // "Failed to fetch data."
  })
  .finally(() => {
    console.log("Operation completed.");
  });
`
Promise의 장점
체인 형태의 구성: .then()을 통해 비동기 작업을 순차적으로 처리 가능.
비동기 처리의 표준화: 콜백 함수의 중첩 문제(Callback Hell)를 해결.

Promise의 단점
.then()과 .catch()를 중첩해 사용할 경우, 코드 가독성이 떨어질 수 있음.
복잡한 비동기 흐름에서는 읽기 어려운 코드가 될 수 있음.



Async/Await란?
async/await는 Promise를 더 간결하게 사용하도록 도와주는 문법이다.
async 키워드는 함수 앞에 사용하며, 해당 함수는 항상 Promise를 반환한다.
await 키워드는 Promise가 해결될 때까지 코드 실행을 멈추고 결과를 반환한다.

Async/Await 기본 사용법
`;
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 2000);
  });
};

const getData = async () => {
  try {
    const result = await fetchData(); // Promise가 해결될 때까지 기다림
    console.log(result); // "Data fetched successfully!"
  } catch (error) {
    console.error(error); // "Failed to fetch data."
  } finally {
    console.log("Operation completed.");
  }
};

getData();
`
Async/Await의 장점
가독성 향상: 동기식 코드처럼 읽히므로 이해하기 쉽다.
에러 처리: try/catch를 통해 명확한 에러 처리가 가능하다.
콜백 중첩 문제 해결: Promise의 체인보다 간단하게 작성할 수 있다.

Async/Await의 단점
await는 항상 Promise를 반환해야 하므로, 모든 비동기 작업이 Promise로 처리되어야 한다.
동기적으로 보이지만 내부적으로는 여전히 비동기이므로 실행 순서를 잘못 이해할 수 있다.
병렬 실행이 필요한 경우 추가 작업이 필요하다.

Async/Await와 Promise의 차이점
특징	Promise	Async/Await
문법	.then()과 .catch()를 사용해 결과 처리	async 함수와 await 키워드로 결과 처리
가독성	중첩이 많아질수록 코드 가독성이 떨어짐	동기식 코드처럼 읽히며 가독성이 높음
에러 처리	.catch()를 통해 에러 처리	try/catch 블록을 사용하여 명확히 처리
직렬 처리	체인 형태로 순차적으로 처리	await를 사용해 순차적으로 처리
병렬 처리	.all() 메서드를 사용해 병렬 처리 가능	Promise.all()를 함께 사용해야 병렬 처리 가능
적합한 상황	단순한 비동기 작업	복잡한 비동기 작업 흐름

Async/Await와 Promise 병렬 처리
Promise로 병렬 처리
`;
const fetch1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Result 1"), 1000));
const fetch2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Result 2"), 2000));

Promise.all([fetch1(), fetch2()])
  .then((results) => {
    console.log(results); // ["Result 1", "Result 2"]
  })
  .catch((error) => {
    console.error(error);
  });
`
Async/Await로 병렬 처리
`;
const fetch1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Result 1"), 1000));
const fetch2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Result 2"), 2000));

const fetchAll = async () => {
  try {
    const results = await Promise.all([fetch1(), fetch2()]);
    console.log(results); // ["Result 1", "Result 2"]
  } catch (error) {
    console.error(error);
  }
};

fetchAll();
`
Async/Await와 Promise의 선택 기준
간단한 작업
Promise가 적합하다. 코드가 짧고 간결한 작업에는 .then()과 .catch()를 사용한다.

복잡한 작업 흐름
Async/Await가 적합하다. 
비동기 작업이 여러 단계로 이루어져 있거나 에러 처리가 중요한 경우 async/await로 작성하면 가독성과 유지보수성이 높아진다.

병렬 처리
둘 다 사용 가능하지만, Promise.all()과 함께 사용해야 병렬 처리가 가능하다.

결론
Promise는 비동기 작업을 표준화하고, 체인형 구문으로 처리할 수 있는 도구다.
Async/Await는 Promise를 기반으로 더 간단하고 가독성 높은 비동기 처리를 가능하게 한다.
복잡한 비동기 작업에는 async/await가 더 적합하며, 간단한 작업에는 Promise를 그대로 사용해도 좋다.
`;
