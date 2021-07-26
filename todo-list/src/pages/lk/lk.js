import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AccountCircle } from '@material-ui/icons';
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from "react-router";
import { useHttp } from "../../hooks/httpHook";

import "./lk.scss";

const navLinkStyle = {
  color: "white",
  textDecoration: "none"
}

export default function Lk(props) {
  const [state, setState] = useState({
    name: "",
    surname: "",
    lastName: "",
    role: "",
    login: "",
    leader: ""
  });
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getInfo = async () => {
      const data = await request('/api/user/getuserinfo', 'POST', null,
        { authorization: `Bearer ${token}` });
      setState({ ...data.candidate });
    };
    getInfo();
  }, []);

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    })
  }

  const history = useHistory();
  const logoutHadler = (e) => {
    e.preventDefault();
    auth.logout();
    history.push('/authorize');
  };

  const saveChange = async (e) => {
    const data = await request('/api/user/edit', 'PATCH', { ...state },
      { authorization: `Bearer ${token}`, "Content-Type": 'application/json' });
  }

  return (
    <div className="body">
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className="title">
            Личный кабинет
          </Typography>

          <NavLink to='/tasks' style={navLinkStyle}>
            <Button color="inherit" >Задачи</Button>
          </NavLink>

          <NavLink to='/authorize' style={navLinkStyle}>
            <Button color="inherit" onClick={logoutHadler}>Выйти</Button>
          </NavLink>

          <NavLink to='/lk' style={navLinkStyle}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </NavLink>

        </Toolbar>
      </AppBar>
      <form className="textRoot" noValidate autoComplete="off">
        <div className="elementsWidth">
          <Typography variant="h5" color="primary" >
            Личная информация
          </Typography>
          <TextField
            required
            label="Имя"
            value={state.name}
            margin="dense"
            fullWidth={true}
            id="name"
            onChange={changeHandler}
          />
          <TextField
            required
            label="Фамилия"
            value={state.surname}
            margin="dense"
            fullWidth={true}
            id="surname"
            onChange={changeHandler}
          />
          <TextField
            label="Отчество"
            value={state.lastName ? state.lastName : ""}
            margin="dense"
            fullWidth={true}
            id="lastName"
            onChange={changeHandler}
          />
          <TextField
            label="Роль"
            value={state.role}
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
            id="role"
          />
          <TextField
            label="Логин"
            value={state.login}
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
            id="login"
          />
          <TextField
            label="Руководитель"
            value={state.leader ? state.leader : ""}
            margin="dense"
            fullWidth={true}
            id="leader"
            onChange={changeHandler}
          />
          <div className="saveButton">
            <NavLink to='/lk' style={navLinkStyle}>
              <Button variant="contained"
                color="primary"
                fullWidth={true}
                onClick={saveChange}
              >
                Сохранить
              </Button>
            </NavLink>
          </div>
        </div>
      </form>
    </div >
  );
}
