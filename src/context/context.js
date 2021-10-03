import React, {Component} from 'react';
import {calenderEvent,getUserProfile,uploadDrive} from '../service/google.service';
import appConfigarations from '../configarations/client_secret.json';

const GoogleContext = React.createContext({});

class GoogleProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accessToken: null,
            gapi: window.gapi,
            GoogleAuth: null,
            isAuthorized: false,
            currentApiRequest: null,
            currentUser: null,
            channelingDetails: null
        };
    }

    componentDidMount() {
        console.log('auth-context works!');

        //  initializing gapi
        this.state.gapi.load('client:auth2', () => {
            this.GapiClient();
            this.setState({
                GoogleAuth: this.state.gapi.auth2.getAuthInstance()
            });
            this.state.GoogleAuth?.isSignedIn?.listen(this.updateSigning.bind(this));
            this.setSigning();
        });
    }

    // gapi.client 
    GapiClient() {
        this.state.gapi.client.init({
            apiKey: appConfigarations.web.apiKey,
            clientId: appConfigarations.web.client_id,
            discoveryDocs: appConfigarations.web.discoveryDocs,
            scope: appConfigarations.web.scopes
        });
    }

    // Set access token
    IsAuthorized(isAuthorized) {
        this.setState({
            isAuthorized: isAuthorized
        });
    }

//    Set access token to the auth context
    AccessToken(token) {
        // console.log('token : ', token);
        this.setState(prevState => {
            prevState.accessToken = token;
            return prevState;
        });
    }

    // update the Signing Status
    updateSigning(isSignedIn) {
        console.log('updateSigningStatus works!');
        if (isSignedIn) {
            this.IsAuthorized(true);
            this.AccessToken(this.state.gapi.auth.getToken().access_token);
        } else {
            this.IsAuthorized(false);
        }
        console.log(`updateSigningStatus method----> isAuthorized: ${this.state.isAuthorized}`);
    }

    // Set signing status 
    setSigning() {
        let user = this.state.GoogleAuth.currentUser.get();
        let isAuthorized = user.hasGrantedScopes(appConfigarations.web.scopes);
        if (isAuthorized) {
            console.log('User is authorized!');
        } else {
            console.log('User is NOT authorized!');
        }
    }

    // Retrieves user details using google drive
    getUserProfile() {
        this.state.GoogleAuth.signIn().then(value => {
            getUserProfile();
        }).catch(reason => {
            console.log('User is NOT yet signed in, to get user details!', reason);
        });
    }

    //  Uploads file to google drive
    uploadToGoogleDrive(data) {
        this.state.GoogleAuth.signIn().then(value => {
            uploadDrive(this.state.gapi, data);
        }).catch(reason => {
            console.log('You should sign in in order to upload to drive, broh!: ', reason);
        });
    }

    // Creates an event on google calendar
    createCalendarEvent(data, callback) {
        this.state.GoogleAuth.signIn().then(value => {
            calenderEvent(this.state.gapi, data, callback);
        }).catch(reason => {
            console.log('You should sign in in order to create an calendar event, broh!: ', reason);
        });
    }



    // Setter for Booking details
    setBooking(channelingDetails) {
        console.log(channelingDetails);
        this.setState(prevState => {
            prevState.channelingDetails = channelingDetails;
            return prevState;
        });
    }

    // Retrieve Booking Details
    getBooking() {
        return this.state.channelingDetails;
    }

    // user log out the 
    logOut(){
        if (this.state.GoogleAuth.isSignedIn.get()){
            this.state.GoogleAuth.signOut();
        }
    }

    render() {
        return (
            <GoogleContext.Provider value={{
                accessToken: this.state.accessToken,
                isAuthorized: this.state.isAuthorized,
                GoogleAuth: this.state.GoogleAuth,
                AccessToken: this.AccessToken.bind(this),
                getUserProfile: this.getUserProfile.bind(this),
                uploadToGoogleDrive: this.uploadToGoogleDrive.bind(this),
                createCalendarEvent: this.createCalendarEvent.bind(this),
                setBooking: this.setBooking.bind(this),
                getBooking: this.getBooking.bind(this),
                logOut: this.logOut.bind(this)
            }}>
                {this.props.children}
            </GoogleContext.Provider>
        );
    }
}

const GoogleConsumer = GoogleContext.Consumer;
export {
    GoogleContext,
    GoogleProvider,
    GoogleConsumer
};
