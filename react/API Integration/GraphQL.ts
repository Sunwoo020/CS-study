`
GraphQL은 Facebook이 개발한 데이터 쿼리 언어로, 
클라이언트가 요청하는 데이터의 형태를 정확히 정의할 수 있는 API 설계 및 실행 환경이다.
REST API의 단점을 보완하여 더욱 유연하고 효율적인 데이터 통신을 제공한다.

TypeScript를 활용해 GraphQL의 개념과 동작 원리를 자세히 설명하겠다.

GraphQL의 개념

클라이언트 중심 설계
클라이언트는 필요한 데이터와 구조를 요청(Query)한다.
불필요한 데이터를 가져오거나, 여러 요청을 보낼 필요가 없다.

단일 엔드포인트
GraphQL 서버는 단일 엔드포인트(/graphql)를 통해 모든 요청을 처리한다.

Strongly Typed
GraphQL은 **스키마(schema)**를 기반으로 데이터 타입과 쿼리 가능한 필드를 명확히 정의한다.

유연한 요청
클라이언트는 요청 시 필요한 필드만 지정할 수 있다.
중첩된 데이터(네스팅)도 한 번의 요청으로 가져올 수 있다.

운영 방식
Query: 데이터 조회
Mutation: 데이터 변경(생성, 수정, 삭제)
Subscription: 실시간 데이터 변경 (WebSocket 기반)

GraphQL 스키마 예제
GraphQL 스키마는 서버의 데이터 모델과 API의 규칙을 정의한다.
# 사용자 타입 정의
`
type User {
  id: ID!
  name: String!
  email: String!
}
`
# 쿼리 타입 정의
`
type Query {
  users: [User!]!
  user(id: ID!): User
}
`
# 뮤테이션 타입 정의
`
type Mutation {
  createUser(name: String!, email: String!): User!
}
`
TypeScript를 활용한 GraphQL 예제
TypeScript와 GraphQL 클라이언트(graphql-request)를 활용

GraphQL 클라이언트 설정
GraphQL 요청은 graphql-request 패키지를 통해 처리할 수 있다.
`
// npm install graphql-request

import { GraphQLClient, gql } from 'graphql-request';

// GraphQL 클라이언트 생성
const client = new GraphQLClient('https://example.com/graphql');

// 공통 타입 정의
interface GraphQLResponse<T> {
  data: T;
}
`
GraphQL Query: 데이터 조회
GraphQL Query를 사용해 데이터를 조회한다.

GraphQL Query 정의
`
query GetUsers {
  users {
    id
    name
    email
  }
}
`
TypeScript 코드
`
// 사용자 데이터 타입 정의
interface User {
  id: string;
  name: string;
  email: string;
}

// GraphQL Query 작성
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

// 사용자 데이터 가져오기 함수
const fetchUsers = async (): Promise<User[]> => {
  const response = await client.request<GraphQLResponse<{ users: User[] }>>(GET_USERS);
  return response.data.users;
};

// 실행 예제
(async () => {
  const users = await fetchUsers();
  console.log('Fetched Users:', users);
})();
`
GraphQL Mutation: 데이터 변경
GraphQL Mutation을 사용해 데이터를 생성한다.

GraphQL Mutation 정의
`
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}
`
TypeScript 코드
`
// GraphQL Mutation 작성
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// 사용자 생성 함수
const createUser = async (name: string, email: string): Promise<User> => {
  const variables = { name, email };
  const response = await client.request<GraphQLResponse<{ createUser: User }>>(CREATE_USER, variables);
  return response.data.createUser;
};

// 실행 예제
(async () => {
  const newUser = await createUser('Jane Doe', 'jane.doe@example.com');
  console.log('Created User:', newUser);
})();
`
GraphQL Variables
GraphQL 요청은 **변수(variables)**를 통해 동적으로 값을 전달할 수 있습니다.

예제
`
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

const fetchUser = async (id: string): Promise<User> => {
  const variables = { id };
  const response = await client.request<GraphQLResponse<{ user: User }>>(GET_USER, variables);
  return response.data.user;
};

// 실행 예제
(async () => {
  const user = await fetchUser('1');
  console.log('Fetched User:', user);
})();
`
GraphQL Subscription
GraphQL Subscription은 실시간 데이터를 처리하는 데 사용된다. 
Apollo Client를 사용해 WebSocket 기반의 실시간 통신을 구현할 수 있다.

GraphQL의 장점
유연성: 클라이언트는 필요한 데이터만 요청 가능.
효율성: 중첩된 데이터를 한 번의 요청으로 가져올 수 있음.
타입 안정성: 스키마 기반으로 데이터 구조를 검증.
단일 엔드포인트: 관리가 간편하고 직관적.

GraphQL과 REST 비교
REST API는 여러 엔드포인트
GraphQL는 단일 엔드포인트

REST API는 대이터 크기가 과잉 또는 부족
GraphQL는 필요한 데이터만 가져옴

REST API는 데이터 스키마가 서버에 따라 다르고
GraphQL는 데이터 스키마가 강력한 타입 스키마 제공

REST API는 실시간 지원 별도 설정이 필요
GraphQL는 Subscription으로 기본 제공

GraphQL의 한계
학습 곡선: REST보다 복잡한 초기 설정.
캐싱 어려움: REST의 캐싱 방식보다 어렵고 추가 설정 필요.
서버 부하: 유연한 쿼리로 인해 서버가 과부하될 가능성 있음.
`