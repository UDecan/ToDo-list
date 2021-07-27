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
    try {
      const getInfo = async () => {
        const data = await request('/api/task/getalltask', 'GET', null,
          { authorization: `Bearer ${token}` });
        setStateData(data.tasksList ? [...data.tasksList] : null);
      };
      getInfo();
    }
    catch (e) {
      console.log(e.message)
    }
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      const data = await request('/api/user/getuserinfo', 'POST', null,
        { authorization: `Bearer ${token}` });
      setUserInfo({ ...data.candidate });
    };
    getInfo();
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    };

    setToggleState({ ...toggleState, [anchor]: open });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <div
      className="rightPanel"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['На день', 'На неделю', 'На месяц', 'На будущее', 'По дате обновления', 'По ответственным'].map((text) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const modalBody = (
    <div style={modalStyle} className="paperModal">
      <TaskModal value={props.task} userRole={props.userRole} />
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
            <Button color="inherit" onClick={handleOpen} >
              Создать задачу
            </Button>
          ) : ''}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {modalBody}
          </Modal>

          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button color="inherit" onClick={toggleDrawer(anchor, true)}>Фильтры</Button>
              <Drawer anchor={anchor} open={toggleState[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}

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