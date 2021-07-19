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

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function OneCard(props) {
  const bull = <span className="bulletCard">•</span>;

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className="paperModal">
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <TextModal />
    </div>
  );

  return (
    <div className="cardsLocation">
      <Card className="rootCard">
        <CardContent>

          <Typography className="titleCard" color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>

          <Typography variant="h5" component="h2">
            be{bull}nev{bull}o{bull}lent
          </Typography>

          <Typography className="posCard" color="textSecondary">
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
            {modalBody}
          </Modal>
        </CardActions>

      </Card>
    </div>
  );
}
