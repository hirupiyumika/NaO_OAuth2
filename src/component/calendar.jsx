import React,{useState, useContext} from 'react';
import { GoogleContext } from '../context/context';
import './style.css';

const Calendar = () => {

    const { createCalendarEvent } = useContext(GoogleContext);
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState("2021-09-07T09:00:00-07:00");
    const [timeZone, setTimeZone] = useState("America/Los_Angeles");
    const [endDate, setEndDate] = useState("2021-09-08T09:00:00-08:00");

    const onSubmit = (e) => {
        e.preventDefault();
        createCalendarEvent(genarateCalendarData(),()=>{
            window.location = "/google-drive"
    
        })
    }

    //   Calendar data generation

      const genarateCalendarData = () => {
        let data = {
            'summary': subject,
            'location': location,
            'description': title,
            'start': {
                'dateTime': startDate,
                'timeZone': timeZone
            },
            'end': {
                'dateTime': endDate,
                'timeZone': timeZone
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
                {'email': email}
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        return data;
      };

    return ( 
        <div className="registration-form">
            <form onSubmit={onSubmit}>
            <h3 style={{textAlign:"center"}}>You Are Free To Book</h3>
            <br/>
                <div className="form-group">
                    <input type="text" className="form-control item" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" placeholder="Start Date" value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" placeholder="End Date" value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}/>
                </div>
                <div className="form-group d-grid gap-2">
                    <button type="submit" className="btn btn-block create-account">BOOKING</button>
                </div>
            </form>
        </div>
     );
}
 
export default Calendar;
