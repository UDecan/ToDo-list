import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Snackbar
} from "@material-ui/core";
import Alert from '../../components/alert/alert';
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
    middle_name: "",
    role: "",
    login: "",
    leader: ""
  });
  const { request, error, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
    clearError();
  };

  useEffect(() => {
    try {
      const getInfo = async () => {
        const data = await request('/api/user/getuserinfo', 'POST', null,
          { authorization: `Bearer ${token}` });
        setState({ ...data.candidate });
      };
      getInfo();
    }
    catch { }
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
    try {
      const data = await request('/api/user/edit', 'PATCH', { ...state },
        { authorization: `Bearer ${token}`, "Content-Type": 'application/json' });
      setMessage(data.message);
      setOpenSuccess(true);
    }
    catch {
      setMessage(error);
      setOpenError(true);
    }
  }

  return (
    <div className="body">
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className="title">
            ???????????? ??????????????
          </Typography>

          <NavLink to='/tasks' style={navLinkStyle}>
            <Button color="inherit" >????????????</Button>
          </NavLink>

          <NavLink to='/authorize' style={navLinkStyle}>
            <Button color="inherit" onClick={logoutHadler}>??????????</Button>
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
            ???????????? ????????????????????
          </Typography>
          <TextField
            required
            label="??????"
            value={state.name}
            margin="dense"
            fullWidth={true}
            id="name"
            onChange={changeHandler}
          />
          <TextField
            required
            label="??????????????"
            value={state.surname}
            margin="dense"
            fullWidth={true}
            id="surname"
            onChange={changeHandler}
          />
          <TextField
            label="????????????????"
            value={state.middle_name}
            margin="dense"
            fullWidth={true}
            id="middle_name"
            onChange={changeHandler}
          />
          <TextField
            label="????????"
            value={state.role}
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
            id="role"
          />
          <TextField
            label="??????????"
            value={state.login}
            InputProps={{
              readOnly: true,
            }}
            margin="dense"
            fullWidth={true}
            id="login"
          />
          <TextField
            label="????????????????????????"
            value={state.leader}
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
                ??????????????????
              </Button>
            </NavLink>

            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {message}
              </Alert>
            </Snackbar>

            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                {message}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </form>
    </div >
  );
}
