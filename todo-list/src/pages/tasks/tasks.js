import React, { useState } from "react";
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
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { AccountCircle } from '@material-ui/icons';
import OneCard from "../../components/card/card";

import "./tasks.scss";

const navLinkStyle = {
  color: "white",
  textDecoration: "none"
}

export default function Tasks(props) {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
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

  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className="titlePage">
            Задачи
          </Typography>

          {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button color="inherit" onClick={toggleDrawer(anchor, true)}>Фильтры</Button>
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
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
          [...Array(80)].map((_, index) => (<OneCard key={index} />))
        }
      </div>
    </div>
  );
}