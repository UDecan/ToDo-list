import React, { useContext, useState} from "react";
import 'date-fns';
import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button
} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useHttp } from "../../hooks/httpHook";
import { AuthContext } from '../../context/AuthContext'

import "./taskModal.scss";

export default function TaskModal(props) {
  const [state, setState] = useState({
    heading: props.value.heading,
    description: props.value.description,
    expiration_date: props.value.expiration_date,
    date_of_creation: props.value.date_of_creation,
    update_date: props.value.update_date,
    priority: props.value.priority,
    status: props.value.status,
    the_creator: props.value.the_creator,
    responsible: props.value.responsible,
  });
  const { token } = useContext(AuthContext);
  const { request } = useHttp();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const saveChange = async (e) => {
    const data = await request('/api/task/edittask', 'PATCH', { ...state },
      { authorization: `Bearer ${token}`, "Content-Type": 'application/json' });
  }
  return (
    <>
      <div className="textFiledPosition">
        <div className="priorityMargin">
          <Typography >
            Заголовок:
          </Typography>
        </div>

        <div className="txMargin">
          <TextField
            required
            value={state.heading}
            fullWidth={true}
            id="heading"
            onChange={handleChange}
          />
        </div>
      </div>


      <div className="textFiledPosition">
        <div className="priorityMargin">
          <Typography >
            Описание:
          </Typography>
        </div>

        <div className="txMargin">
          <TextField
            required
            value={state.description}
            fullWidth={true}
            id="description"
            onChange={handleChange}
          />
        </div>
      </div>


      <div className="timePicker">
        <Typography>
          Дата окончания:
        </Typography>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="expiration_date"
              value={props.value.expiration_date}
              InputProps={{
                readOnly: props.userRole === 'admin' ? true : false,
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              onChange={handleChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>


      <div className="timePicker">
        <Typography>
          Дата создания:
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date_of_creation"
              value={props.value.date_of_creation}
              InputProps={{
                readOnly: props.userRole === 'admin' ? true : false,
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              onChange={handleChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>

      <div className="timePicker">
        <Typography>
          Дата обновления:
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="update_date"
              value={props.value.update_date}
              InputProps={{
                readOnly: props.userRole === 'admin' ? true : false,
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              onChange={handleChange}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>

      <div className="dropDownList">
        <Typography className="priorityMargin">
          Приоритет:
        </Typography>

        <FormControl className="formSelect">
          <Select
            labelId="demo-simple-select-label"
            id="priority"
            value={state.priority}
            onChange={handleChange}
          >
            <MenuItem value={"высокий"}>высокий</MenuItem>
            <MenuItem value={"средний"}>средний</MenuItem>
            <MenuItem value={"низкий"}>низкий</MenuItem>
          </Select>
        </FormControl>
      </div>


      <div className="dropDownList">
        <Typography className="priorityMargin">
          Статус:
        </Typography>

        <FormControl className="formSelect">
          <Select
            labelId="demo-simple-select-label"
            id="status"
            value={state.status}
            onChange={handleChange}
          >
            <MenuItem value={"к выполнению"}>к выполнению</MenuItem>
            <MenuItem value={"выполняется"}>выполняется</MenuItem>
            <MenuItem value={"выполнена"}>выполнена</MenuItem>
            <MenuItem value={"отменена"}>отменена</MenuItem>
          </Select>
        </FormControl>
      </div>



      <div className="textFiledPosition">
        <div className="priorityMargin">
          <Typography>
            Создатель:
          </Typography>
        </div>

        <div className="txMargin">
          <TextField
            required
            value={state.the_creator}
            fullWidth={true}
            id="the_creator"
          />
        </div>
      </div>

      <div className="textFiledPosition">
        <div className="priorityMargin">
          <Typography>
            Ответственный:
          </Typography>
        </div>

        <div className="txMargin">
          <TextField
            required
            value={state.responsible}
            fullWidth={true}
            id="responsible"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bttMurgin">
        <Button variant="contained"
          color="primary"
          fullWidth={true}
          onClick={saveChange}
        >
          Сохранить
        </Button>
      </div>
    </>
  );
}
