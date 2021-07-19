import React from "react";
import {
  Button,
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  IconButton
} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            Главная
          </Typography>

          <Button color="inherit" href="tasks">Задачи</Button>

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

    </div>
  );
}