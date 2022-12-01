import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../../context'
function Register() {
  const DataContext = useContext(dataContext)

  const onSubmit = (e) => {
    e.preventDefault();
    const first_name = e.target.elements.fname.value;
    const last_name = e.target.elements.lname.value;
    const email = e.target.elements.email.value;
    const passsword = e.target.elements.password.value;

    console.log(email, first_name, last_name, passsword);
    axios.post('http://localhost:3005/api/users/register', {
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: passsword
    })
      .then((response) => {
        console.log("res:", response);
        DataContext.setName(first_name)
        localStorage.token = response.data;
        if (response.data) {
          navigate("/main")
        }
      });

  };

  const
    [isDisabled, setIsDisabled] = useState(true),
    [isInputValid, setIsInputValid] = useState(false),
    [isInput1Valid, setIsInput1Valid] = useState(false),
    [isInput2Valid, setIsInput2Valid] = useState(false),
    [isInput3Valid, setIsInput3Valid] = useState(false);

  const
    onChange = (e) => {
      setIsInputValid(e.target.value);
      setIsDisabled(!e.target.value || !isInputValid);
    },
    onChange1 = (e) => {
      setIsInput1Valid(e.target.value);
      setIsDisabled(!e.target.value || !isInput1Valid);
    },
    onChange2 = (e) => {
      setIsInput2Valid(e.target.value);
      setIsDisabled(!e.target.value || !isInput2Valid);
    },
    onChange3 = (e) => {
      setIsInput3Valid(e.target.value);
      setIsDisabled(!e.target.value || !isInput3Valid);
    };

  const navigate = useNavigate()

  return (
    <form className={styles.register} onSubmit={onSubmit}>
      <h1 className={styles.headline} >יאללה תירשם כבר</h1>
      <div className={styles.form_field}>
        <input type="text" name="fname" placeholder="first name" onChange={onChange} />
        {isInputValid && <span>✅</span>}
      </div>
      <br />
      <br />
      <div className={styles.form_field}>
        <input type="text" name="lname" placeholder="last name" onChange={onChange1} />
        {isInput1Valid && <span>✅</span>}
      </div>
      <br />
      <br />
      <div className={styles.form_field}>
        <input type="email" name="email" placeholder="info@mailaddress.com" onChange={onChange2} />
        {isInput2Valid && <span>✅</span>}
      </div>
      <br />
      <br />
      <div className={styles.form_field}>

        <input type="password" name="password" placeholder="••••password••••" onChange={onChange3} />
        {isInput3Valid && <span>✅</span>}
      </div>
      <br />
      <button disabled={isDisabled}>Register</button>
    </form>
  );
}

export default Register;
