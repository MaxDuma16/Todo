import React, { useEffect, useState } from "react";
import { Row, Button, ButtonGroup, Col } from "react-bootstrap";
import s from './TodoList.module.css'

const TodoList = ({todo, setTodo, isNewFirst, setIsNewFirst}) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState('');
  const [filtredTodo, setFiltredTodo] = useState(todo);
  const [keepCheckedOnTop, setKeepCheckedOnTop] = useState(false)

  useEffect(() => {
    setFiltredTodo(todo)
  }, [todo])

  const deleteTodo = (id) => {
    let newTodo = [...todo].filter(i => i.id !== id)
    setTodo(newTodo)
  }

  const statusTodo = (id) => {
    let newTodo = [...todo].filter(i => {
      if(i.id === id) {
        i.status = !i.status
      }
      return i
    })
    setTodo(newTodo)
  }

  const editTodo = (id, title) => {
    setEdit(id)
    setValue(title)
  }

  const saveTodo = (id) => {
    let newTodo = [...todo].map(item => {
      if(item.id === id) {
        item.title = value
      }
      return item
    })

    setTodo(newTodo)
    setEdit(null)
  }

  const todoFilter = (status) => {
    switch(status) {
      case 'all': {
        setFiltredTodo(todo)
        break;
      }
      case 'done': {
        let newTodo = [...todo].filter(item => item.status === true)
        setFiltredTodo(newTodo)
        break;
      }
      case 'undone': {
        let newTodo = [...todo].filter(item => item.status === false)
        setFiltredTodo(newTodo)
        break;
      }
      case 'newfirst': {
        setIsNewFirst(!isNewFirst)
        let newTodo = [...todo].reverse()
        setTodo(newTodo)
        break;
      }
      case 'keepchecked': {
        setKeepCheckedOnTop(!keepCheckedOnTop)
        let newTodo;
        if (keepCheckedOnTop) {
          newTodo = [...todo].sort((a, b) => a.status - b.status)
        } else {
          newTodo = [...todo].sort((a, b) => b.status - a.status)
        }
        setTodo(newTodo)
        break;
      }
      default: setFiltredTodo(todo)
    }
  }

  return (
    <div className={s.wrapper}>
      <Row>
        <Col className={s.btnCol}>
          <ButtonGroup aria-label="Basic example" className={s.btns} >
            <Button variant="secondary" onClick={() => todoFilter('all')}>All</Button>
            <Button variant="secondary"onClick={() => todoFilter('undone')} >Undone</Button>
            <Button variant="secondary" onClick={() => todoFilter('done')}>Done</Button>
            <Button variant="secondary" onClick={() => todoFilter('newfirst')}>{isNewFirst ? 'Old First' : 'New First'}</Button>
            <Button variant="secondary" onClick={() => todoFilter('keepchecked')}>{keepCheckedOnTop ? "Keep checked on bottom" : "Keep checked on top"} </Button>
          </ButtonGroup>
        </Col>
        
      </Row>
        {filtredTodo.length === 0 ? 
        <div className={s.noTask}>
          No task yet :(
        </div>
          :
          null
        }
        <div className={s.viewStatus}>{`All tasks: ${filtredTodo.length}`}</div>
        {filtredTodo.length > 0 && 
        <div className={s.viewStatusWrapper}>
         <div className={s.viewStatus}>{`Status: ${isNewFirst ? 'New task first' : 'Old task first'}`}</div>
         <div className={s.viewStatus}>{`Checked on ${keepCheckedOnTop ? "top" : "bottom"}`}</div>
        </div>
        }
        {filtredTodo.map(i => (
          <div key={i.id} className={s.listItem}>
            { edit === i.id ? 
              <input placeholder="Type here..." value={value} onChange={(e) => setValue(e.target.value)} />
            :
              <div className={i.status ? s.titleDone : s.title}>{i.title}</div>
            }
            {
              edit === i.id ? 
                <Button variant="success" className={s.btn} onClick={() => saveTodo(i.id)}>Save</Button> 
              :
              <div>
                <Button variant="success"className={s.btn} onClick={() => statusTodo(i.id)}>{i.status ? "Undone" : "Done"}</Button>
                <Button className={s.btn} onClick={() => editTodo(i.id, i.title)}>Edit</Button>
                <Button variant="danger" className={s.btn} onClick={() => deleteTodo(i.id)}>Delete</Button>
              </div>
            }
          </div>
          ))
        }
    </div>
  )
}
export default TodoList;