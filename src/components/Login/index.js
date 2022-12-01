import { VStack, IconButton, Box, Heading, useColorMode } from '@chakra-ui/react';//ספריות עיצוב
import { FaSun, FaMoon } from "react-icons/fa";
import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../../context'
function Login() {
  const DataContext = useContext(dataContext)

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const passsword = e.target.elements.password.value;

    axios.post('http://localhost:3005/api/users/login', {
      email: email,
      password: passsword
    })
      .then((response) => {
        console.log("res:", response.data);
        DataContext.setName(response.data.token.name)
        localStorage.token = JSON.stringify(response.data.token.token);
        localStorage.email = email;
        
        if (response.data.token) {
          navigate("/main")
        }
      });

  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isInput2Valid, setIsInput2Valid] = useState(false);

  const onChange = (e) => {
    setIsInputValid(e.target.value);
    setIsDisabled(!e.target.value || !isInput2Valid);
  };

  const onChange2 = (e) => {
    setIsInput2Valid(e.target.value);
    setIsDisabled(!e.target.value || !isInputValid);
  };
  const toRegister = () => {
    navigate("/register")
  };
  const navigate = useNavigate()
  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <div>
<div className={styles.icon} >

      <IconButton icon={colorMode === 'light' ? < FaMoon/> : < FaSun/>} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode} />
</div>
    <VStack p='4'>
      <Box>
    <form className={styles.login} onSubmit={onSubmit}>
      {/* <h1 style={{fontSize:"50px", marginBottom:"20px"}}>welcome to ToDoList</h1> */}
      <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>welcome to ToDoList</Heading> 
      <div className={styles.form_field}>
        <input className={styles.inputEmail} type="email" name="email" placeholder="info@mailaddress.com" onChange={onChange} />
        {isInputValid && <span>✅</span>}
      </div>
      <br />
      <br />
      <div className={styles.form_field}>

        <input   type="password" name="password" placeholder="••••password••••" onChange={onChange2} />
        {isInput2Valid && <span>✅</span>}
      </div>
      <br />
      <div >
        <button className={styles.btn1} disabled={isDisabled}>Login</button>
        <button disabled={!isDisabled} onClick={toRegister} > Register </button>
      </div>
    </form>
      </Box>
    </VStack>
    </div>
  );
}

export default Login;
