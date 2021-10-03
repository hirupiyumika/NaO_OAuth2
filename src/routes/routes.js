import React from 'react';
import { Switch, Route } from "react-router-dom";
import Calendar from '../component/calendar';
import GoogleDrive from '../component/googledrive';

const Routes = () => {
    return ( 

        <Switch>
            <Route exact path="/calendar" component={Calendar} />  
            <Route exact path="/google-drive" component={GoogleDrive} /> 
        </Switch>
     );
}
 
export default Routes;