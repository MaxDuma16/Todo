import { useState } from 'react'; 
import './App.css';
import AddTodo from './components/AddTodo/AddTodo';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import { Container } from 'react-bootstrap';

function App() {
  const [todo, setTodo] = useState([])
  const [isNewFirst, setIsNewFirst] = useState(true)

  return (
    <Container>
     <Header />
     <AddTodo todo={todo} setTodo={setTodo} isNewFirst={isNewFirst} />
     <TodoList todo={todo} setTodo={setTodo} isNewFirst={isNewFirst} setIsNewFirst={setIsNewFirst} />
    </Container>
  );
}

export default App;
