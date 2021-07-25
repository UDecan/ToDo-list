import React from "react";
import Authorize from './pages/authorize/authorize';
import Register from './pages/register/register';
import Lk from './pages/lk/lk';
import Tasks from './pages/tasks/tasks';
import { Redirect, Route, Switch } from 'react-router';


export const UserRoutes = ({ isAuthenticated }) => {
  console.log('1');
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/tasks' component={Tasks} />
        <Route exact path='/lk' component={Lk} />
        <Redirect to='/tasks' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/authorize' component={Authorize} />
      <Route exact path='/register' component={Register} />
      <Redirect to='/authorize' />
    </Switch>
  )
}