import React, { useContext, useState } from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button
} from "@material-ui/core";
import { useHttp } from "../../hooks/httpHook";
import { AuthContext } from '../../context/AuthContext'
import { NavLink } from "react-router-dom";

import "./taskModal.scss";

const navLinkStyle = {
  color: "white",
  textDecoration: "none"
}

export default function TaskModal(props) {
  const [state, setState] = useState({
    id: props.value?.id,
    heading: props.value?.heading,
    description: props.value?.description,
    expiration_date: props.value?.expiration_date?.split("T")[0],
    date_of_creation: props.value?.date_of_creation?.split("T")[0],
    update_date: props.value?.update_date?.split("T")[0],
    priority: props.value?.priority,
    status: props.value?.status,
    the_creator: props.value?.the_creator,
    responsible: props.value?.responsible,
  });

  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const ifAdmin = props.userRole === 'admin' ? false : true;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const statusHandler = (e) => {
    setState({
      ...state,
      status: e.target.value
    });

  };

  const priorityHandler = (e) => {
    setState({
      ...state,
      priority: e.target.value
    });
  };

  const saveChange = async (e) => {
    try {
      if (props.flag === 'newTask') {
        await request('/api/task/newtask', 'POST', { ...state },
          { authorization: `Bearer ${token}`, "Content-Type": 'application/json' });
      }
      else {
        await request('/api/task/edittask', 'PATCH', { ...state },
          { authorization: `Bearer ${token}`, "Content-Type": 'application/json' });
      }
    }
    catch { }
  }

  return (
    <>
      <div className="textFiledPosition">
        <div className="priorityMargin">
          <Typography >
            Заголовок:
          </Typography>
        </div>

        <TextField
          required
          value={state.heading}
          fullWidth={true}
          multiline
          rowsMax={4}
          InputProps={{
            readOnly: ifAdmin,
          }}
          id="heading"
          onChange={handleChange}
        />
      </div>


      <div className="textFiledPosition">
        <div className="priorityMargin">
          <Typography >
            Описание:
          </Typography>
        </div>

        <TextField
          required
          value={state.description}
          fullWidth={true}
          multiline
          rowsMax={4}
          InputProps={{
            readOnly: ifAdmin,
          }}
          id="description"
          onChange={handleChange}
        />
      </div>


      <div className="timePicker">
        <Typography>
          Дата окончания:
        </Typography>

        <TextField
          id="expiration_date"
          type="date"
          className="timeWith"
          value={state.expiration_date}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: ifAdmin,
          }}
          onChange={handleChange}
        />
      </div>




      {props.flag === 'newTask' ? '' :
        (
          <div className="timePicker">
            <Typography>
              Дата создания:
            </Typography>

            <TextField
              id="date_of_creation"
              type="date"
              className="timeWith"
              value={state.date_of_creation}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
              onChange={handleChange}
            />
          </div>
        )}

      {props.flag === 'newTask' ? '' :
        (
          <div className="timePicker">
            <Typography>
              Дата обновления:
            </Typography>

            <TextField
              id="update_date"
              type="date"
              className="timeWith"
              value={state.update_date}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: ifAdmin,
              }}
              onChange={handleChange}
            />
          </div>
        )
      }


      <div className="timePicker">
        <Typography className="priorityMargin">
          Приоритет:
        </Typography>

        <FormControl className="formSelect">
          <Select
            id="priority"
            value={state.priority}
            onChange={priorityHandler}
            onOpen={ifAdmin}
          >
            <MenuItem value={"высокий"}>высокий</MenuItem>
            <MenuItem value={"средний"}>средний</MenuItem>
            <MenuItem value={"низкий"}>низкий</MenuItem>
          </Select>
        </FormControl>
      </div>

      {props.flag === 'newTask' ? '' :
        (
          <div className="timePicker">
            <Typography className="priorityMargin">
              Статус:
            </Typography>

            <FormControl className="formSelect">
              <Select
                id="status"
                value={state.status}
                onChange={statusHandler}
              >
                <MenuItem value={"к выполнению"}>к выполнению</MenuItem>
                <MenuItem value={"выполняется"}>выполняется</MenuItem>
                <MenuItem value={"выполнена"}>выполнена</MenuItem>
                <MenuItem value={"отменена"}>отменена</MenuItem>
              </Select>
            </FormControl>
          </div>
        )
      }

      {props.flag === 'newTask' ? '' : (
        <div className="timePicker">
          <div className="priorityMargin">
            <Typography>
              Создатель:
            </Typography>
          </div>

          <div className="timeWith">
            <TextField
              required
              value={state.the_creator}
              fullWidth={true}
              id="the_creator"
              InputProps={{
                readOnly: ifAdmin,
              }}
            />
          </div>
        </div>)
      }


      <div className="timePicker">
        <div className="priorityMargin">
          <Typography>
            Ответственный:
          </Typography>
        </div>

        <div className="timeWith">
          <TextField
            required
            value={state.responsible}
            fullWidth={true}
            id="responsible"
            InputProps={{
              readOnly: ifAdmin,
            }}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bttMurgin">
        <NavLink to='/register' style={navLinkStyle}>
          <Button variant="contained"
            color="primary"
            fullWidth={true}
            onClick={saveChange}
          >
            {props.flag === 'newTask' ? 'Создать' : 'Сохранить'}
          </Button>
        </NavLink>
      </div>
    </>
  );
}
