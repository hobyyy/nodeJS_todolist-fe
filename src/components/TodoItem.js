import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, onDelete, onComplete }) => {  
  // console.log('item', item)
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete? 'item-complete' : ''}`}> 
          <div className="todo-content">
            <span>{item.task}</span>
            <span>by {item?.author.name}</span>
          </div>

          <div className="todo-btn">
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
