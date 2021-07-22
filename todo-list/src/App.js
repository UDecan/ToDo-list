import { Redirect, Route, Switch } from 'react-router';
import Authorize from './pages/authorize/authorize';
import Register from './pages/register/register';
import Lk from './pages/lk/lk';
import Tasks from './pages/tasks/tasks';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/authorize' component={Authorize} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/lk' component={Lk} />
        <Route exact path='/tasks' component={Tasks} />
        <Redirect to='/authorize' />
      </Switch>
    </div>
  );
}

export default App;
