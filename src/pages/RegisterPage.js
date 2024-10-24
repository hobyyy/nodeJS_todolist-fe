import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api"
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [secPassword,setSecPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
      if(!name){
        throw new Error("이름을 입력하세요.")
      }else if(!email){
        throw new Error("이메일을 입력하세요.")
      }else if(!password){
        throw new Error("패스워드를 입력하세요.")
      }else if(password !== secPassword) {  // 입력한 두개의 password가 일치하지 않으면
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.")
      }
      const response = await api.post('/user',{name,email,password})
      if(response.status===200) {
        alert(`회원가입이 완료되었습니다. ${name}님 환영합니다!`)
        navigate('/login');
      }else if (response.status === 409) { // 이미 가입한 이메일일 경우
        throw new Error("이미 가입한 유저입니다.");
      } else {
        throw new Error(response.data.error);
      }
    }catch(error) {
      setError(error.message)
      alert(error.message); // 팝업 창으로 오류 메시지 표시
    }
    
  }
  return (
    <div className="display-center">
      {/* 아래코드 팝업으로 변경 */}
      {/* {error && <div className="red-error">{error}</div>} */}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => setSecPassword(event.target.value)} />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;