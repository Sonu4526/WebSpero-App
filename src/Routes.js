import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignUp from './User/SignUp';
import SignIn from './User/SignIn';
import PrivateRoute from './Auth/PrivateRoute';
import Dashboard from './User/UserDashboard';
import Popular from './Core/UserList';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/dashboard" exact component={Popular} />
                <Route path="/SignIn" exact component={SignIn} />
                <Route path="/SignUp" exact component={SignUp} />
                <PrivateRoute
                    path="/dashboard/user"
                    exact component={Dashboard}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;