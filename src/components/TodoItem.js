import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onDelete, onComplete }) => {  
  // console.log('item', item)
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete? 'item-complete' : ''}`}> 
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={() => onDelete(item._id)}>삭제</button>
            <button className="button-delete" onClick={() => onComplete(item._id, item.isComplete)}>
              {item.isComplete? '되돌리기':'끝남'}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
