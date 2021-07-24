import React, { useState } from "react";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import validateLogin from '../../validators/login';
import validatePassword from '../../validators/password';
import AdditionalInfo from "../../additionalInfo/additionalInfo";

import "./register.scss";

export default function Register(props) {
  const [state, setState] = useState({
    login: "",
    password: "",
    passwordConf: ""
  });

  const changeHandler = (e) => {
    const target = e.target;
    setState({
      ...state,
      [target.id]: target.value,
    });
  }

  return (
    <div className="centeryForm">
      <div className="blackShadow auth_div">

        <Typography className="auth_title" variant="h5" color="primary">
          Регистрация
        </Typography>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="name">Имя</InputLabel>
          <Input
            className="form_control"
            type="text"
            name="name"
            id="name"
            placeholder="Ваше имя"
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="surname">Фамилия</InputLabel>
          <Input
            className="form_control"
            type="text"
            name="surname"
            id="surname"
            placeholder="Ваша фамилия"
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

        {!validateLogin(state.login) && !(state.login === "") ?
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

        {!validatePassword(state.password) && !(state.password === "") ?
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

        {state.password !== state.passwordConf && !(state.passwordConf === "") ?
          <AdditionalInfo type="hidden" text="Пароли не совпадают" />
          : ''
        }

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="supervisor">Руководитель (необязательно)</InputLabel>
          <Input
            className="form_control"
            type="password"
            name="supervisor"
            id="supervisor"
            placeholder="Логин руководителя"
          />
        </FormControl>

        <div className="buttons">
          <Button variant="contained" color="primary" fullWidth={true}>
            Зарегистрироваться
          </Button>
        </div>
        <div className="buttons">
          <Button fullWidth={true} href="/authorize">
            Войти
          </Button>
        </div>

      </div>
    </div>
  );
}
