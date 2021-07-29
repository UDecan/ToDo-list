import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  CardContent,
  Card,
  CardActions,
  Modal,
} from "@material-ui/core";
import TaskModal from "../taskModal/taskModal";

import "./card.scss";

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function OneCard(props) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({})
  const timestamp = props.task.expiration_date.split("T")[0];

  useEffect(() => { setState(props.task); }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className="paperModal">
      <TaskModal value={props.task} userRole={props.userRole} />
    </div>
  );

  const colorHeader = () => {
    if (state.status === 'выполнена' || state.status === 'отменена') {
      return 'completedTask';
    };

    if ((state.status === 'выполняется' || state.status === 'к выполнению') && timestamp < new Date().toJSON().slice(0, 10)) {
      return 'unfinishedTask';
    }

    return 'otherTask';
  };

  const date = props.task.expiration_date.split("T")[0].split("-");

  return (
    <div className="cardsLocation">
      <Card className="rootCard">
        <CardContent className="MuiCard-root">

          <Typography variant="h5" component="h2">
            <div className={colorHeader()}>
              {props.task.heading}
            </div>
          </Typography>

          <Typography variant="inherit" component="p">
            Приоритет: {props.task.priority}
          </Typography>

          <Typography variant="inherit" component="p">
            Дата окончания: {`${date[2]}.${date[1]}.${date[0]}`}
          </Typography>

          <Typography variant="inherit" component="p">
            Ответственный: {props.task.responsible}
          </Typography>

          <Typography variant="inherit" component="p">
            Статус: {props.task.status}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={handleOpen}>Подробнее...</Button>
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
