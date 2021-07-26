import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useHttp } from "../../hooks/httpHook";
import { AuthContext } from "../../context/AuthContext";

import "./authorize.scss";

const navLinkStyle = {
  color: "white",
  textDecoration: "none"
}

export default function Authorize(props) {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    login: '',
    password: '',
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }

  /*useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);*/

  const authorizeHandler = async () => {
    try {
      const data = await request('/api/user/authorize', 'POST', { ...form });
      auth.login(data.token, data.userLogin);
    } catch (e) { }
  }

  return (
    <div className="centeryForm">
      <div className="blackShadow auth_div">

        <Typography variant="h5" color="primary" >
          Вход в систему
        </Typography>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="login">Логин</InputLabel>
          <Input
            className="form_control"
            type="text"
            id="login"
            name="login"
            placeholder="Ваш логин"
            onChange={changeHandler}
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="password">Пароль</InputLabel>
          <Input
            className="form_control"
            type="password"
            id="password"
            name="password"
            placeholder="Ваш пароль"
            onChange={changeHandler}
          />
        </FormControl>

        <div className="buttons">
          <Button variant="contained"
            color="primary"
            fullWidth={true}
            onClick={authorizeHandler}
            disabled={loading}
          >
            Войти
          </Button>
        </div>

        <div className="buttons">
          <NavLink to='/register' style={navLinkStyle}>
            <Button fullWidth={true}
              disabled={loading}
            >
              Регистрация
            </Button>
          </NavLink>
        </div>

      </div>
    </div>
  );
}
