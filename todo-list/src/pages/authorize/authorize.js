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
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({
    user_name: '',
    user_password: '',
  });

  const changeHandler = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/authorize', 'POST', { ...form });
      console.log("Data: ", data);
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
          <InputLabel htmlFor="user_name">Логин</InputLabel>
          <Input
            className="form_control"
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Ваш логин"
            onChange={changeHandler}
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="user_password">Пароль</InputLabel>
          <Input
            className="form_control"
            type="password"
            id="user_password"
            name="user_password"
            placeholder="Ваш пароль"
            onChange={changeHandler}
          />
        </FormControl>

        <div className="buttons">
          <Button variant="contained"
            color="primary"
            fullWidth={true}
            onChange={registerHandler}
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
