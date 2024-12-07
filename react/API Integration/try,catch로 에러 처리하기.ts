`
try/catch로 에러 처리하기
try/catch는 JavaScript에서 오류(예외)가 발생했을 때 이를 처리하기 위해 사용되는 구조이다.
프로그램 실행 중에 오류가 발생하면 이를 적절히 처리하여 애플리케이션이 중단되지 않도록 도와준다.

1. try/catch 기본 구조
1.1. 기본 문법
`;
try {
  // 오류가 발생할 가능성이 있는 코드
} catch (error) {
  // 오류가 발생했을 때 실행되는 코드
}
`
1.2. finally 블록
finally는 try 또는 catch 블록 실행 후 항상 실행되는 코드 블록이다.
자원 정리나 반드시 실행되어야 하는 작업을 수행할 때 유용하다.
`;
try {
  // 오류가 발생할 가능성이 있는 코드
} catch (error) {
  // 오류 처리
} finally {
  // 항상 실행되는 코드
}
`
2. 에러 객체 (Error Object)
JavaScript에서 예외가 발생하면 자동으로 에러 객체가 생성되고, catch 블록에서 이를 사용할 수 있다.

2.1. 에러 객체의 주요 속성
message: 오류 메시지.
name: 오류의 이름 (예: TypeError, ReferenceError).
stack: 오류 발생 시의 호출 스택 정보.
`;
try {
  throw new Error("Custom error message");
} catch (error) {
  console.log(error.name); // "Error"
  console.log(error.message); // "Custom error message"
  console.log(error.stack); // 에러 스택 정보
}
`
3. try/catch의 사용 예제
3.1. 기본 예제
`;
try {
  const result = JSON.parse("invalid JSON"); // JSON 파싱 중 오류 발생
  console.log(result);
} catch (error) {
  console.error("An error occurred:", error.message); // "Unexpected token i in JSON at position 0"
}
`
3.2. finally 활용
`;
try {
  console.log("Try block executed");
} catch (error) {
  console.error("An error occurred:", error.message);
} finally {
  console.log("Finally block executed"); // 항상 실행됨
}
`
4. 비동기 작업에서의 try/catch
4.1. async/await와 함께 사용
비동기 작업에서도 try/catch를 사용해 오류를 처리할 수 있다.
`;
const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

fetchData();
`
4.2. 함수 호출에서 에러 처리
비동기 함수 호출 시에도 try/catch를 사용한다.
`;
const asyncFunction = async () => {
  throw new Error("Async error occurred");
};

try {
  await asyncFunction();
} catch (error) {
  console.error("Caught error:", error.message);
}
`
5. 사용자 정의 에러
JavaScript에서 사용자 정의 에러를 생성해 특정 상황에 맞는 에러 메시지를 전달할 수 있다.

5.1. 기본 사용자 정의 에러
`;
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

try {
  throw new CustomError("This is a custom error");
} catch (error) {
  console.error(`${error.name}: ${error.message}`); // "CustomError: This is a custom error"
}
`
6. try/catch 사용 시 주의사항
6.1. 예외가 발생할 가능성이 높은 코드만 감싸기
try/catch 블록은 최소한의 코드만 포함해야 한다.
불필요한 코드까지 포함하면 디버깅과 유지보수가 어려워질 수 있다.
`;
try {
  const result = riskyFunction(); // 위험한 코드만 감싼다.
  console.log(result); // 안전한 코드
} catch (error) {
  console.error("An error occurred:", error.message);
}
`
7. 실전 사례
7.1. API 요청에서의 에러 처리
`;
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null; // 기본값 반환
  }
};

(async () => {
  const data = await fetchData("https://jsonplaceholder.typicode.com/posts");
  console.log(data);
})();
`
7.2. 입력 값 검증
`;
const validateInput = (input) => {
  if (typeof input !== "string") {
    throw new TypeError("Input must be a string");
  }
  if (input.trim() === "") {
    throw new Error("Input cannot be empty");
  }
  return true;
};

try {
  validateInput(123); // 오류 발생
} catch (error) {
  console.error(`${error.name}: ${error.message}`); // "TypeError: Input must be a string"
}
`
8. 장점과 한계
8.1. 장점
오류를 처리해 애플리케이션의 비정상 종료를 방지.
예외 상황에 대한 명확한 처리 방법 제공.
try/catch를 사용하면 코드의 의도를 명확히 전달할 수 있음.

8.2. 한계
모든 오류를 처리하지 않아야 한다. 예상치 못한 오류는 발생하도록 놔두고, 디버깅이나 로깅으로 처리해야 한다.
남용하면 코드가 복잡해지고 성능 저하를 초래할 수 있다.

9. 결론
try/catch는 동기 및 비동기 코드에서 예외를 처리하는 강력한 도구다.
예상 가능한 오류를 안전하게 처리하고, 사용자 경험을 개선하는 데 매우 유용하다.
올바르게 사용하려면 오류가 발생할 가능성이 높은 코드만 try/catch로 감싸야 하며, 불필요한 사용은 피해야 한다.
`;
