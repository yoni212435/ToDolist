import { VStack, IconButton, Box, Heading, useColorMode } from '@chakra-ui/react';//ספריות עיצוב
import { FaSun, FaMoon } from "react-icons/fa";
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { useState, useEffect } from 'react';

function Main() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);//נביא מידע מדאטא בייס




  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  const {colorMode, toggleColorMode} = useColorMode();
  
  return (
    <VStack p='4'>
      <IconButton icon={colorMode === 'light' ? < FaMoon/> : < FaSun/>} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode} />
      <Box>
        <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>Todo List</Heading> 
      </Box>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
}

export default Main;