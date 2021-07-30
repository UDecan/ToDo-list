import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Modal,
  Menu,
  MenuItem
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AccountCircle } from '@material-ui/icons';
import OneCard from "../../components/card/card";
import { useHttp } from "../../hooks/httpHook";
import { AuthContext } from '../../context/AuthContext'
import TaskModal from "../../components/taskModal/taskModal";

import "./tasks.scss";

const navLinkStyle = {
  color: "white",
  textDecoration: "none"
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Tasks(props) {
  const [modalStyle] = useState(getModalStyle);
  const [stateData, setStateData] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    try {
      const getInfo = async () => {
        const dataTask = await request('/api/task/getalltask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(dataTask.tasksList ? [...dataTask.tasksList] : null);
        const dataUser = await request('/api/user/getuserinfo', 'POST', null,
          { authorization: `Bearer ${token}` });
        setUserInfo({ ...dataUser.candidate });
      };
      getInfo();
    }
    catch { }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeHandler = async (e) => {
    try {
      if (e.target.id === 'oneDay') {
        const data = await request('/api/task/getdaytask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(data.tasksList ? [...data.tasksList] : null);
      }
      if (e.target.id === 'oneWeek') {
        const data = await request('/api/task/getweektask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(data.tasksList ? [...data.tasksList] : null);
      }
      if (e.target.id === 'moreWeek') {
        const data = await request('/api/task/getmoremonthtask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(data.tasksList ? [...data.tasksList] : null);
      }
      if (e.target.id === 'updateDate') {
        const data = await request('/api/task/getupdatedatetask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(data.tasksList ? [...data.tasksList] : null);
      }
      if (e.target.id === 'onResponsible') {
        const data = await request('/api/task/getresponsibletask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(data.tasksList ? [...data.tasksList] : null);
      }
      setAnchorEl(null);
    }
    catch { }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className="paperModal">
      <TaskModal userRole={userInfo.role} flag={"newTask"} />
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className="titlePage">
            Задачи
          </Typography>

          {userInfo.role === 'admin' ? (
            <div>
              <Button color="inherit" onClick={handleOpen} >
                Создать задачу
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {modalBody}
              </Modal>
            </div>
          ) : ''}

          <Button color="inherit" onClick={handleClick}>
            Фильтры
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={changeHandler}
          >
            <MenuItem id="oneDay" onClick={changeHandler}>На день</MenuItem>
            <MenuItem id="oneWeek" onClick={changeHandler}>На неделю</MenuItem>
            <MenuItem id="moreWeek" onClick={changeHandler}>На будущее</MenuItem>
            {userInfo.role === 'admin' ?
              (
                <MenuItem id="onResponsible" onClick={changeHandler}>По ответственным</MenuItem>
              ) : ''
            }
            <MenuItem id="updateDate" onClick={changeHandler}>Без группировок</MenuItem>
          </Menu>

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
      <div className="cards">
        {
          stateData?.map((item) => {
            return item ? (<OneCard key={item.id} task={item} userRole={userInfo.role} />)
              :
              (
                <Typography variant="h6" style={{ color: 'black' }}>
                  Задач нет!
                </Typography>
              );
          }
          )}
      </div>
    </div>
  );
}