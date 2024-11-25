`REST API(Representational State Transfer API)는 
서버와 클라이언트 간의 통신을 위한 가장 일반적인 아키텍처 스타일 중 하나다.
REST는 간단한 HTTP 요청을 통해 리소스(데이터)를 생성, 조회, 수정, 삭제할 수 있도록 설계되었다.

TypeScript를 활용해 REST API의 개념과 동작 원리를 자세히 설명하겠다.

# REST API의 개념

리소스 기반 설계
REST API는 리소스를 중심으로 설계된다.
각 리소스는 고유한 URI(Uniform Resource Identifier)로 식별됩니다.
예: /users, /products/1

HTTP 메서드
REST는 HTTP 프로토콜의 메서드를 활용하여 작업의 의도를 나타낸다.
GET: 리소스 조회
POST: 리소스 생성
PUT: 리소스 수정
DELETE: 리소스 삭제
Stateless (무상태성)

서버는 클라이언트의 상태를 저장하지 않는다.
요청 간에 클라이언트의 상태를 유지하려면 모든 요청에 필요한 정보를 포함해야 한다.

표준 응답 코드
API 응답은 HTTP 상태 코드로 결과를 나타냅니다.
200: 성공
400: 잘못된 요청
401: 인증 실패
404: 리소스 없음
500: 서버 오류
JSON 형식

REST API의 요청과 응답은 주로 JSON(JavaScript Object Notation) 형식을 사용한다.

REST API
API 요청과 응답의 데이터 구조를 명확히 정의하여 런타임 오류를 줄일 수 있다.

리소스 타입 정의
`;
// 사용자 리소스 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// API 응답 타입 정의
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}
`
2. REST API 요청 함수 구현
Axios와 같은 HTTP 클라이언트를 활용하여 REST API를 호출한다.

Axios 설정
`;
import axios, { AxiosInstance } from "axios";

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: "https://example.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
`

GET 요청: 리소스 조회
`;
const fetchUser = async (userId: number): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  return response.data;
};

// 호출 예제
(async () => {
  const user = await fetchUser(1);
  console.log("Fetched User:", user.data);
})();
`
POST 요청: 리소스 생성
`;
const createUser = async (
  newUser: Omit<User, "id" | "createdAt">
): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>("/users", newUser);
  return response.data;
};

// 호출 예제
(async () => {
  const newUser = await createUser({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  console.log("Created User:", newUser.data);
})();
`
PUT 요청: 리소스 수정
`;
const updateUser = async (
  userId: number,
  user: Partial<User>
): Promise<ApiResponse<User>> => {
  const response = await apiClient.put<ApiResponse<User>>(
    `/users/${userId}`,
    user
  );
  return response.data;
};

// 호출 예제
(async () => {
  const updatedUser = await updateUser(1, { name: "Jane Doe" });
  console.log("Updated User:", updatedUser.data);
})();
`
DELETE 요청: 리소스 삭제
`;
const deleteUser = async (userId: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(
    `/users/${userId}`
  );
  return response.data;
};

// 호출 예제
(async () => {
  const result = await deleteUser(1);
  console.log("Delete Result:", result.message);
})();
`
3. 에러 처리
TypeScript와 Axios를 활용해 에러를 처리하는 방식이다.
`;
const safeApiCall = async <T>(
  apiFunction: () => Promise<T>
): Promise<T | null> => {
  try {
    return await apiFunction();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error:", error.response?.data || error.message);
    } else {
      console.error("Unknown Error:", error);
    }
    return null;
  }
};

// 안전한 호출
(async () => {
  const user = await safeApiCall(() => fetchUser(1));
  if (user) {
    console.log("User:", user.data);
  }
})();
`
4. REST API의 상태 관리
React Query로 상태 관리
React Query는 REST API를 효율적으로 관리하기 위한 라이브러리다.
`;
import { useQuery, useMutation } from "react-query";

const useFetchUser = (userId: number) =>
  useQuery(["user", userId], () => fetchUser(userId));

const useCreateUser = () =>
  useMutation((newUser: Omit<User, "id" | "createdAt">) => createUser(newUser));
`
REST API 설계의 핵심 원칙
리소스 중심: API는 리소스의 표현을 다룬다.
/users: 사용자 목록
/users/1: 특정 사용자
HTTP 메서드 활용:
GET: 조회
POST: 생성
PUT: 수정
DELETE: 삭제
Stateless: 요청 간 상태 유지가 없는 설계.
표준 응답 사용:
상태 코드와 메시지를 명확히 전달.
REST API와 TypeScript의 장점
타입 안정성: 요청과 응답 구조를 명확히 정의.
코드 재사용성: API 호출 함수 모듈화.
오류 감소: 런타임 오류 방지.
유지보수 용이성: 코드 가독성 증가.
`;
