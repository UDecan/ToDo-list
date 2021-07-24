import React, { useState } from "react";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";

import { useHttp } from "../../hooks/httpHook";
import "./authorize.scss";

export default function Authorize(props) {
  const { loading, request } = useHttp();
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

  const registerHandler = async () => {
    try {
      console.log('1');
      const data = await request('/api/user/authorize', 'POST', { ...form });
      console.log("Data: " + data);
    } catch (e) {

    }
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
            onClick={registerHandler}
            disabled={loading}
          >
            Войти
          </Button>
        </div>

        <div className="buttons">
          <Button fullWidth={true}
            href="/register"
            disabled={loading}
          >
            Регистрация
          </Button>
        </div>

      </div>
    </div>
  );
}
