import React from "react";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  Typography,
} from "@material-ui/core";

import "./register.scss";

export default function Register(props) {
  return (
    <div className="blackShadow auth_div">

      <Typography className="auth_title" variant="h5" color="primary">
        Регистрация
      </Typography>

      <FormControl fullWidth={true} margin="dense">
        <InputLabel htmlFor="user_name">Логин</InputLabel>
        <Input
          className="form_control"
          type="text"
          id="user_name"
          placeholder="Ваш логин"
        />
      </FormControl>

      <FormControl fullWidth={true} margin="dense">
        <InputLabel htmlFor="user_password">Пароль</InputLabel>
        <Input
          className="form_control"
          type="password"
          id="user_password"
          placeholder="Ваш пароль"
        />
      </FormControl>

      <FormControl fullWidth={true} margin="dense">
        <InputLabel htmlFor="user_password">Повторный пароль</InputLabel>
        <Input
          className="form_control"
          type="password"
          id="user_password"
          placeholder="Повторите пароль"
        />
      </FormControl>

      <FormControl fullWidth={true} margin="dense">
        <InputLabel htmlFor="user_password">Код приглашения</InputLabel>
        <Input
          className="form_control"
          type="password"
          id="user_password"
          placeholder="Код приглашения"
        />
      </FormControl>

      <div className="buttons">
        <Button variant="contained" color="primary" fullWidth={true}>
          Зарегистрироваться
        </Button>
      </div>
      <div className="buttons">
        <Button fullWidth={true}>
          Войти
        </Button>
      </div>

    </div>
  );
}
