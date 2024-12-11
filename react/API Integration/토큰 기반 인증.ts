`
토큰 기반 인증(Token-Based Authentication)
토큰 기반 인증(Token-Based Authentication)은 사용자가 애플리케이션에 로그인하면 
서버가 액세스 토큰(Access Token)을 발급하고, 클라이언트가 이후의 모든 요청에 이 토큰을 포함하여 인증을 수행하는 방식이다.
이 방식은 세션 쿠키 기반 인증의 대안으로 많이 사용되며, 대표적인 구현 방식으로 JWT (JSON Web Token)이 있다.

토큰 기반 인증의 동작 원리
로그인 요청:
클라이언트가 이메일, 비밀번호와 같은 인증 정보를 서버에 보낸다.

서버 인증:
서버는 클라이언트의 인증 정보를 확인하고 액세스 토큰(Access Token)과 선택적으로 리프레시 토큰(Refresh Token)을 생성한다.

토큰 반환:
서버는 클라이언트에 액세스 토큰을 반환하고, 선택적으로 리프레시 토큰도 반환한다.

API 요청:
클라이언트는 서버로부터 받은 액세스 토큰을 Authorization 헤더에 포함하여 API 요청을 보낸다.

서버 인증 확인:
서버는 Authorization 헤더에 포함된 액세스 토큰을 검증하고, 유효한 경우 요청을 처리하고 응답을 반환한다.

토큰 갱신 (옵션):
액세스 토큰이 만료되면 리프레시 토큰을 사용해 새로운 액세스 토큰을 발급받는다.

주요 개념
액세스 토큰 (Access Token)
클라이언트가 요청을 보낼 때 Authorization 헤더에 추가하는 토큰이다.
만료 시간(exp, expiration time)을 지정할 수 있어, 보안에 유리하다.
일반적으로 JWT(JSON Web Token)로 구현되며, 인코딩된 페이로드에 사용자 정보와 권한 정보가 포함될 수 있다.

리프레시 토큰 (Refresh Token)
액세스 토큰이 만료되었을 때, 새로운 액세스 토큰을 발급받기 위해 사용된다.
리프레시 토큰은 더 긴 만료 기간을 갖고, 주로 서버의 데이터베이스에 저장된다.
리프레시 토큰은 절대 클라이언트 측(localStorage, sessionStorage)에 저장하지 않는 것이 권장된다.

Bearer Token
클라이언트가 서버로 요청을 보낼 때 Authorization 헤더에 Bearer 토큰을 추가한다.
형식:
`
Authorization: Bearer <Access_Token>
`

토큰 기반 인증의 구조
JWT (JSON Web Token)은 토큰 기반 인증의 대표적인 구현 방법이다. 
JWT는 Header, Payload, Signature로 구성된다.
`
HEADER.PAYLOAD.SIGNATURE
`
Header (헤더)
토큰의 유형(JWT)과 해시 알고리즘(예: HMAC, SHA256)을 지정한다.
`
{
  "alg": "HS256",
  "typ": "JWT"
}
`
Payload (페이로드)
사용자 정보와 만료 시간 등의 클레임(Claim)이 포함된다.
`
{
  "sub": "user_id_123",
  "name": "John Doe",
  "role": "admin",
  "exp": 1698725761
}
`
Signature (서명)
서버의 비밀 키(secret key)를 사용하여 Header와 Payload의 조합에 서명을 추가한다.
`
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload), 
  secret_key
)
`
토큰 기반 인증의 구현
서버 구현 (Node.js + Express + JWT)
`
npm install express jsonwebtoken bcryptjs
`
서버 설정
`
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const SECRET_KEY = 'your_secret_key';

app.use(express.json());

// 더미 사용자 데이터
const users = [
  { id: 1, email: 'user1@example.com', password: bcrypt.hashSync('password1', 8) },
];

// 로그인 엔드포인트
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Access Token 발급
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ accessToken: token });
});

// 보호된 엔드포인트
app.get('/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    res.json({ message: 'This is a protected route', user: decoded });
  });
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
`
4.2. 클라이언트 구현 (React)
`
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      localStorage.setItem('accessToken', response.data.accessToken);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
`
토큰 기반 인증의 장점
무상태성 (Stateless): 서버는 클라이언트의 상태를 저장하지 않는다.
확장성: 서버 간 요청에 유리하며, 로드 밸런싱이 쉬움.
보안성: 액세스 토큰의 만료 시간을 설정하여 보안을 강화할 수 있다.
Cross-Origin 지원: 다른 도메인 간 요청에 사용할 수 있다.

토큰 기반 인증의 단점
토큰 탈취 위험: 액세스 토큰이 노출되면 다른 사용자가 권한을 탈취할 수 있다.
토큰 만료 관리: 액세스 토큰이 만료되면 클라이언트가 리프레시 토큰을 사용해 새 토큰을 요청해야 한다.
Payload 노출: JWT는 Base64로 인코딩되므로 쉽게 디코딩할 수 있다. 민감한 정보를 페이로드에 넣지 않는 것이 중요하다.

보안 모범 사례
HTTP Only, Secure Cookie 사용:
액세스 토큰을 localStorage에 저장하지 않고 HTTP-Only 쿠키에 저장한다.

리프레시 토큰 보안:
리프레시 토큰은 서버 측에만 저장하고, 클라이언트에 노출되지 않도록 한다.

만료 시간 설정:
액세스 토큰의 만료 시간을 짧게 설정하고, 리프레시 토큰을 통해 새 토큰을 발급한다.

Payload 최소화:
중요한 정보(비밀번호 등)는 페이로드에 포함시키지 않는다.
`