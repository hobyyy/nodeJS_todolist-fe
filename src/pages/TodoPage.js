import React, { useEffect, useState } from 'react'
import TodoBoard from "../components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "../../src/utils/api";

const TodoPage = () => {
  const [todoList, setTodoList]  = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const getTasks = async() => {
    try {
      const response = await api.get('/tasks')
      // response.data가 있다면 setTodoList로 상태 업데이트
      setTodoList(response?.data.data || []); // response.data가 없을 경우 빈 배열로 설정
    }catch(error) {
      console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
    }
  }

  const addTask = async() =>{
    try {
      if (!todoValue.trim()) {
        alert("할 일을 입력하세요!"); // 빈 값 처리
        return;
      }

      const response = await api.post('/tasks',{task: todoValue, isComplete: false});

      if(response.status===200) {// 일반적으로 생성 성공 시 201 반환
        // console.log('성공')
        setTodoList([...todoList, response.data.data]); // 추가한 항목을 todoList에 업데이트
        setTodoValue('')  // 입력 필드 초기화
        getTasks();
      }else {
        throw new Error('task can not be added')
      }
    }catch(err) {
      console.log('addTask error : ',err)
    }
  }

  const deleteTask = async(taskID) => {
    try {
      const response = await api.delete(`/tasks/${taskID}`);
      if(response.status===200) {
        setTodoList(todoList.filter(task => task.id !== taskID)); // 로컬 상태 업데이트
        getTasks();
      }
    }catch(err) {
      console.error('deleteTask error : ', err);
    }
  }

  const reverseTask = async(taskID,nowValue) => {
    try {
      const response = await api.put(`/tasks/${taskID}`, { isComplete: !nowValue });
      if(response.status===200) {
        setTodoList(todoList.map(task => task.id === taskID ? response.data : task)); // 로컬 상태 업데이트
        getTasks();
      }
    }catch(err) {
      console.error('reverseTask error :', err);
    }
  }

  useEffect(() => {
    getTasks();
  },[])
  
  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      {/* TodoBoard 컴포넌트를 여기서 렌더링, todoList를 props로 전달 */}
      <TodoBoard todoList={todoList} onDelete={deleteTask} onComplete={reverseTask} />
    </Container>
  );
}

export default TodoPage