import React, { useState } from "react";
import s from './AddTodo.module.css'
import { v4 } from 'uuid';
import { Col, Row, Button, FormControl } from "react-bootstrap";

const AddTodo = ({todo, setTodo, isNewFirst}) => {
  const [value, setValue] = useState('')

  const addNewTodo = () => {
    if (value) {
      if (isNewFirst) {
        setTodo([
          {
            id: v4(),
            title: value,
            status: false
          },
          ...todo
        ]);
      } else {
        setTodo([
          ...todo,
          {
            id: v4(),
            title: value,
            status: false
          }
        ]);
      }
      setValue('');
    } else {
      alert('Type something!')
    }
  }

  return (
      <Row>
        <Col className={s.addTodoForm}>
          <FormControl placeholder="Type here..." value={value} onChange={(e) => setValue(e.target.value)}/>
          <Button className={s.submit} onClick={addNewTodo}>Submit</Button>
        </Col>
      </Row>
  );
}
export default AddTodo;