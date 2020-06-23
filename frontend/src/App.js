import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AgencyPage from './pages/AgencyPage';
import NewAgencyForm from './components/NewAgencyForm';
import EditAgencyForm from './components/EditAgencyForm';
import AppNavbar from './components/AppNavbar';

function App(props) {
  return (
    <div className="App">
      {/* <Appbar {...props} /> */}
      <AppNavbar />
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
          path="/agency/:id/edit"
          render={routeProps => <EditAgencyForm {...routeProps} />}
        />
        <Route
          exact
          path="/admin/agency/new"
          render={routeProps => <NewAgencyForm {...routeProps} />}
        />
        <Route
          exact
          path="/"
          render={routeProps => <LandingPage {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;
