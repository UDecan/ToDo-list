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

export default function Tasks(props) {
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
      const data = await request(`/api/task/${e.target.id}`, 'GET', null,
        { authorization: `Bearer ${token}` });
      setStateData(data.tasksList ? [...data.tasksList] : null);
      setAnchorEl(null);
    }
    catch {
      setAnchorEl(null);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className="paperModal taskModalPosition">
      <TaskModal userRole={userInfo.role} flag={"newTask"} />
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className="titlePage">
            ????????????
          </Typography>

          {userInfo.role === 'admin' ? (
            <div>
              <Button color="inherit" onClick={handleOpen} >
                ?????????????? ????????????
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
            ??????????????
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={changeHandler}
          >
            <MenuItem id="getdaytask" onClick={changeHandler}>???? ????????</MenuItem>
            <MenuItem id="getweektask" onClick={changeHandler}>???? ????????????</MenuItem>
            <MenuItem id="getmoremonthtask" onClick={changeHandler}>???? ??????????????</MenuItem>
            {userInfo.role === 'admin' ?
              (
                <MenuItem id="getresponsibletask" onClick={changeHandler}>???? ??????????????????????????</MenuItem>
              ) : ''
            }
            <MenuItem id="getupdatedatetask" onClick={changeHandler}>?????? ??????????????????????</MenuItem>
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
            return item ? (<OneCard key={item.id} task={item} userRole={userInfo.role} />) : ''
          })
        }
      </div>
    </div>
  );
}