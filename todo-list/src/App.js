import { BrowserRouter as Router } from 'react-router-dom';
import { UserRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/AuthContext';

import './App.scss';

function App() {
  const { token, login, logout, userLogin } = useAuth();
  const isAuthenticated = !!token;
  
  return (
    <AuthContext.Provider value={{ token, login, logout, userLogin }}>
      <Router>
        <div className="App">
          <UserRoutes isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
