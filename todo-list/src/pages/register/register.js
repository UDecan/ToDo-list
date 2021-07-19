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
    <div className="centeryForm">
      <div className="blackShadow auth_div">

        <Typography className="auth_title" variant="h5" color="primary">
          Регистрация
        </Typography>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="user_name">Имя</InputLabel>
          <Input
            className="form_control"
            type="text"
            id="user_name"
            placeholder="Ваше имя"
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="user_name">Фамилия</InputLabel>
          <Input
            className="form_control"
            type="text"
            id="user_name"
            placeholder="Ваша фамилия"
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InputLabel htmlFor="user_name">Отчествое (необязательно)</InputLabel>
          <Input
            className="form_control"
            type="text"
            id="user_name"
            placeholder="Ваше отчество"
          />
        </FormControl>

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
          <InputLabel htmlFor="user_password">Руководитель (необязательно)</InputLabel>
          <Input
            className="form_control"
            type="password"
            id="user_password"
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
