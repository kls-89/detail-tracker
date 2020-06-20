import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Appbar from './components/Appbar';
import AdminDashboard from './pages/AdminDashboard';
import AgencyPage from './pages/AgencyPage';
import NewAgencyForm from './components/NewAgencyForm';

function App(props) {
  return (
    <div className="App">
      <Appbar {...props} />
      <Switch>
        <Route
          exact
          path="/admin"
          render={routeProps => <AdminDashboard {...routeProps} />}
        />
        <Route
          exact
          path="/agency/:id"
          render={routeProps => <AgencyPage {...routeProps} />}
        />
        <Route
          exact
          path="/admin/agency/new"
          render={routeProps => <NewAgencyForm {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
