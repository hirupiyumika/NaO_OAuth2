import React,{useState, useContext} from 'react';
import { GoogleContext } from '../context/context';
const Calendar = () => {

    const { createCalendarEvent,isAuthorized } = useContext(GoogleContext);
    const [email, setEmail] = useState("hirupiyumika@gmail.com");
    const [subject, setSubject] = useState("Booking");
    const [location, setLocation] = useState("Malabe");
    const [title, setTitle] = useState("Book a car");
    const [startDate, setDescription] = useState("2021-11-06T09:00:00-07:00");
    const [timeZone, setTimeZone] = useState("America/Los_Angeles");
    const [endDate, setEndDate] = useState("2021-11-06T17:00:00-07:00");

    const handleCalendarEvent = () => {
        createCalendarEvent(genarateCalendarData(),()=>{
            console.log('Google event eka create una!');
    
        })
      };

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
        <>
        <p>calander</p>
        <button onClick={handleCalendarEvent} >ADD CALENDAR EVENT</button>
        {isAuthorized}
        </>
     );
}
 
export default Calendar;
