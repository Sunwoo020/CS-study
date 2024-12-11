`API의 기본 개념
API란 무엇인가?
애플리케이션 간 데이터를 주고받는 계약(contract)다.

예: 클라이언트가 서버에 요청(request)을 보내고, 서버가 클라이언트에 응답(response)을 반환.

API의 동작 원리
클라이언트: 데이터를 요청 (예: 브라우저, 모바일 앱).
서버: 요청을 처리하고 데이터를 반환 (예: 데이터베이스 쿼리 결과).
HTTP 프로토콜: 요청과 응답을 전달하는 통신 규약.

API 요청 흐름
Endpoint: https://example.com/api/posts
- 요청을 보낼 서버 주소.
HTTP 메서드:
- GET: 데이터 조회.
- POST: 데이터 생성.
- PUT: 데이터 수정.
- DELETE: 데이터 삭제.
- Headers: 추가 메타데이터 (예: 인증 토큰, 콘텐츠 타입).
- Body: 요청에 포함된 데이터 (JSON 등).

Request와 Response 타입 정의
TypeScript는 요청과 응답 데이터의 타입을 명확히 정의하여 런타임 오류를 예방.

// API 응답 타입 정의
`
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 사용자 데이터 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
}

// API 요청 타입 정의
interface CreateUserRequest {
  name: string;
  email: string;
}
`
Axios 인스턴스 생성
Axios는 API 호출을 쉽게 처리할 수 있는 HTTP 클라이언트다.

`import axios, { AxiosInstance } from 'axios';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://example.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
`

API 호출 예제
1. GET 요청: 데이터 조회
서버에서 데이터를 가져오는 예제입니다.
`
const getUser = async (userId: number): Promise<ApiResponse<User>> => {
  const response = await apiClient.get<ApiResponse<User>>(`/users/${userId}`);
  return response.data;
};

// 호출 예제
(async () => {
  const user = await getUser(1);
  console.log('Fetched User:', user.data);
})();
`
2. POST 요청: 데이터 생성
클라이언트에서 서버로 데이터를 전송하여 새 리소스를 생성합니다.
`
const createUser = async (user: CreateUserRequest): Promise<ApiResponse<User>> => {
  const response = await apiClient.post<ApiResponse<User>>('/users', user);
  return response.data;
};

// 호출 예제
(async () => {
  const newUser = await createUser({ name: 'John Doe', email: 'john.doe@example.com' });
  console.log('Created User:', newUser.data);
})();
`
3. PUT 요청: 데이터 수정
기존 데이터를 업데이트하는 예제입니다.
`
const updateUser = async (userId: number, user: Partial<User>): Promise<ApiResponse<User>> => {
  const response = await apiClient.put<ApiResponse<User>>(`/users/${userId}`, user);
  return response.data;
};

// 호출 예제
(async () => {
  const updatedUser = await updateUser(1, { name: 'Jane Doe' });
  console.log('Updated User:', updatedUser.data);
})();
`
4. DELETE 요청: 데이터 삭제
서버에서 데이터를 삭제하는 예제입니다.
`
const deleteUser = async (userId: number): Promise<ApiResponse<null>> => {
  const response = await apiClient.delete<ApiResponse<null>>(`/users/${userId}`);
  return response.data;
};

// 호출 예제
(async () => {
  const result = await deleteUser(1);
  console.log('Delete Result:', result.message);
})();
`
API 에러 처리
API 호출에서 발생할 수 있는 에러를 처리하기 위해 try-catch를 사용합니다.
`
const safeApiCall = async <T>(apiFunction: () => Promise<T>): Promise<T | null> => {
  try {
    return await apiFunction();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message);
    } else {
      console.error('Unknown Error:', error);
    }
    return null;
  }
};

// 안전한 API 호출

(async () => {
  const user = await safeApiCall(() => getUser(1));
  if (user) {
    console.log('User:', user.data);
  }
})();
`
API를 설계하고 사용할 때의 베스트
타입 정의: 모든 요청/응답 데이터의 구조를 TypeScript 타입으로 명확히 정의.
모듈화: API 요청 함수를 재사용 가능한 형태로 분리.
에러 처리: 예외 상황을 적절히 처리하고 사용자에게 친화적인 피드백 제공.
토큰 관리: 인증이 필요한 API에는 Axios Interceptor를 활용해 토큰 자동 첨부.
`