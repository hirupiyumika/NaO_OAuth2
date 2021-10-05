import React from 'react';
import { Switch, Route } from "react-router-dom";
import Calendar from '../component/calendar';
import GoogleDrive from '../component/googledrive';

const Routes = () => {
    return ( 

        // create routes path
        <Switch>
            <Route exact path="/" component={Calendar} />  
            <Route exact path="/google-drive" component={GoogleDrive} /> 
        </Switch>
     );
}
 
export default Routes;