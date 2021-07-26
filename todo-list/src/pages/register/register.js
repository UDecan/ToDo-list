import React, { useState } from "react";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import validateLogin from '../../validators/login';
import validatePassword from '../../validators/password';
import AdditionalInfo from "../../additionalInfo/additionalInfo";
import { useHttp } from "../../hooks/httpHook";


import "./register.scss";

const navLinkStyle = {
  color: "white",
  textDecoration: "none"
}

export default function Register(props) {
  const { loading, request } = useHttp();
  const [state, setState] = useState({
    name: "",
    surname: "",
    lastname: "",
    login: "",
    password: "",
    passwordConf: "",
    leader: ""
  });

  const alertLogin = !validateLogin(state.login) && state.login !== "";
  const alertPassword = !validatePassword(state.password) && state.password !== "";
  const alertPasswordConf = state.password !== state.passwordConf && state.passwordConf !== "";

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/user/register', 'POST', { ...state });
    } catch (e) {

    }
  }

  return (
    <div className="centeryForm">
      <div className="blackShadow auth_div">

        <Typography className="auth_title" variant="h5" color="primary">
          Регистрация
        </Typography>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="surname">Фамилия</InputLabel>
          <Input
            className="form_control"
            type="text"
            name="surname"
            id="surname"
            placeholder="Ваша фамилия"
            onChange={changeHandler}
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="name">Имя</InputLabel>
          <Input
            className="form_control"
            type="text"
            name="name"
            id="name"
            placeholder="Ваше имя"
            onChange={changeHandler}
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="lastname">Отчество (необязательно)</InputLabel>
          <Input
            className="form_control"
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Ваше отчество"
            onChange={changeHandler}
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="login">Логин</InputLabel>
          <Input
            className="form_control"
            type="text"
            name="login"
            id="login"
            placeholder="Ваш логин"
            onChange={changeHandler}
          />
        </FormControl>

        {alertLogin ?
          <AdditionalInfo type="hidden" text="Длина от 4 до 32 символов. Использовать только англ. буквы, цифры и '-' '_'." />
          : ''
        }

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            className="form_control"
            type="password"
            name="password"
            id="password"
            placeholder="Ваш пароль"
            onChange={changeHandler}
          />
        </FormControl>

        {alertPassword ?
          <AdditionalInfo type="hidden" text="Длина от 4 до 32 символов. Должен включать как нижний, так и верхний регистр. Должен включать буквы и цифры. Использовать только англ. буквы." />
          : ''
        }

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="passwordConf">Повторный пароль</InputLabel>
          <Input
            className="form_control"
            type="password"
            name="passwordConf"
            id="passwordConf"
            placeholder="Повторите пароль"
            onChange={changeHandler}
          />
        </FormControl>

        {alertPasswordConf ?
          <AdditionalInfo type="hidden" text="Пароли не совпадают" />
          : ''
        }

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="leader">Руководитель (необязательно)</InputLabel>
          <Input
            className="form_control"
            type="password"
            name="leader"
            id="leader"
            placeholder="Логин руководителя"
            onChange={changeHandler}
          />
        </FormControl>

        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            fullWidth={true}
            onClick={registerHandler}
            disabled={alertLogin || alertPassword || alertPasswordConf || state.name === "" || state.surname === ""}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className="buttons">
          <NavLink to='/authorize' style={navLinkStyle}>
            <Button fullWidth={true}>
              Войти
            </Button>
          </NavLink>
        </div>

      </div>
    </div>
  );
}
