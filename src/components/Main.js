import {  VStack,  IconButton,  Box,  Heading,  useColorMode} from '@chakra-ui/react'; //ספריות עיצוב
import {  FaSun,  FaMoon} from "react-icons/fa";
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import {  useContext,  useState,  useEffect} from 'react';
import {  dataContext} from '../context'
import axios from 'axios';
function Main() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []); //נביא מידע מדאטא בייס
  const DataContext = useContext(dataContext)



  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

 async function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  async function addTodo(todo) {
    console.log(todo)
    try {
      const res =await axios.put('http://localhost:3005/api/users/addtodo',{
      todo,
      email :localStorage.email
    }
      )
        console.log("res.data:",res);
        setTodos(res.data);
    }
catch(err){
  console.log("main page:",err);
}

  }


const {  colorMode,  toggleColorMode} = useColorMode();

return ( 
  <VStack p = '4' >
  <IconButton icon = {colorMode === 'light' ? < FaMoon /> : < FaSun />  }  isRound = 'true'  size = 'lg'  alignSelf = 'flex-end'  onClick = { toggleColorMode  }/> 
  <Box >
  <Heading mb = '8'  fontWeight = 'extrabold'  size = '2xl'  bgGradient = 'linear(to-r, cyan.400, purple.400, pink.400)'  bgClip = 'text' > welcome { DataContext.name  }  to Todo List </Heading> 
   </Box>
    <TodoList todos = {todos}  deleteTodo = {deleteTodo}/> 
    <AddTodo addTodo = { addTodo}/>
     </VStack>
);
}

export default Main;