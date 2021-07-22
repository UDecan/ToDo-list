import React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField
} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';

import "./lk.scss";


export default function Lk(props) {
  return (
    <div className="body">
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className="title">
            Личный кабинет
          </Typography>

          <Button color="inherit" href="/tasks">Задачи</Button>
          <Button color="inherit" href="/authorize">Выйти</Button>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            href="/lk"
          >
            <AccountCircle />
          </IconButton>

        </Toolbar>
      </AppBar>
      <form className="textRoot" noValidate autoComplete="off">
        <div className="elementsWidth">
          <Typography variant="h5" color="primary" >
            Личная информация
          </Typography>
          <TextField required label="Имя" defaultValue="Имя" margin="dense" fullWidth={true} />
          <TextField required label="Фамилия" defaultValue="Фамилия" margin="dense" fullWidth={true} />
          <TextField label="Отчество" defaultValue="Отчество" margin="dense" fullWidth={true} />
          <TextField
            label="Роль"
            defaultValue="Роль"
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
          />
          <TextField
            label="Логин"
            defaultValue="Логин"
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
          />
          <TextField
            label="Руководитель"
            defaultValue="Руководитель"
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
          />
          <div className="saveButton">
            <Button variant="contained"
              color="primary"
              fullWidth={true}
              href="/lk"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
