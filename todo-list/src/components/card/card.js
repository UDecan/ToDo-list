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

export default function OneCard(props) {
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
    <div className="paperModal taskModalPosition">
      <TaskModal value={props.task} userRole={props.userRole} />
    </div>
  );

  const colorHeader = () => {
    if (['выполнена', 'отменена'].includes(state.status)) {
      return 'completedTask';
    };

    if (['выполняется', 'к выполнению'].includes(state.status) && timestamp < new Date().toJSON().slice(0, 10)) {
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
