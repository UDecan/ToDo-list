import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  ListItemText,
  List,
  ListItem,
  Drawer,
  Modal
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
  const [toggleState, setToggleState] = useState({
    right: false,
  });
  const [stateData, setStateData] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);

  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const getInfo = async () => {
      const dataTask = await request('/api/task/getalltask', 'GET', null,
        { authorization: `Bearer ${token}` });
      setStateData(dataTask.tasksList ? [...dataTask.tasksList] : null);
      const dataUser = await request('/api/user/getuserinfo', 'POST', null,
        { authorization: `Bearer ${token}` });
      setUserInfo({ ...dataUser.candidate });
    };
    getInfo();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    };

    setToggleState({ ...toggleState, [anchor]: open });
  };

  const changeHandler = async (e) => {
    console.log(e.target.id);
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

          <React.Fragment key='right'>
            <Button color="inherit" onClick={toggleDrawer('right', true)}>Фильтры</Button>
            <Drawer anchor='right' open={toggleState['right']} onClose={toggleDrawer('right', false)}>
              <div
                className="rightPanel"
                onClick={toggleDrawer('right', false)}
                onKeyDown={toggleDrawer('right', false)}
              >
                <List>
                  <ListItem button key="На день">
                    <Button id="oneDay" onClick={changeHandler}>
                      На день
                    </Button>
                  </ListItem>

                  <ListItem button key="На неделю">
                    <Button id="oneWeek" onClick={changeHandler}>
                      <ListItemText primary="На неделю" />
                    </Button>
                  </ListItem>

                  <ListItem button key="Больше чем на неделю">
                    <Button id="moreWeek" onClick={changeHandler}>
                      <ListItemText primary="Больше чем на неделю" />
                    </Button>
                  </ListItem>

                  <ListItem button key="По дате обновления">
                    <Button id="updateDate" onClick={changeHandler}>
                      <ListItemText primary="По дате обновления" />
                    </Button>
                  </ListItem>

                  <ListItem button key="По ответственным">
                    <Button id="onResponsible" onClick={changeHandler}>
                      <ListItemText primary="По ответственным" />
                    </Button>
                  </ListItem>

                </List>
              </div>
            </Drawer>
          </React.Fragment>

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