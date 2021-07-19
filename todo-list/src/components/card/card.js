import React from "react";
import {
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
  makeStyles,
  Modal
} from "@material-ui/core";
import TextModal from "../textmodal/textmodal";

import "./card.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStylesModal = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function OneCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const modalClasses = useStylesModal();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={modalClasses.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <TextModal />
    </div>
  );

  return (
    <div className="cardsLocation">
      <Card className={classes.root}>
        <CardContent>

          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>

          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>

          <Typography variant="body2" component="p">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>

        </CardContent>

        <CardActions>
          <Button size="small" onClick={handleOpen}>Learn More</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </CardActions>

      </Card>
    </div>
  );
}
