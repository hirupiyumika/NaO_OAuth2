export function calenderEvent(gapi, data, callback) {
    console.log("creat calendar service")
    console.log('execute create calender event on google calender!');

    let request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': data
    });

    request.execute((event) => callback(event));
}

export function  getUserProfile(gapi){
        let request = gapi.client.drive.about.get({'fields': 'user'});

        // Execute the API request.
        request.execute(function (response) {
        });
}

export function  uploadDrive(gapi, data){
    console.log('execute upload file to google function!');
    console.log('printing uploaded file: ');
    console.log(data);

    // File name 
    let metadata = {
        name: `bank_slip.png`
    };

    //  get the access token from the gapi
    const accessToken = gapi.auth.getToken().access_token;


    let form = new FormData();
    form.append('',
        new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('', data);

    // send the POST request
    fetch(`${process.env.REACT_APP_GOOGLE_DRIVE_API_V3_CREATE_MULTIPART}`, {
        method: 'POST',
        headers: new Headers({'Authorization': 'Bearer ' + accessToken}),
        body: form,
    }).then((res) => {
        return res.json();
    }).then(function (val) {
        console.log(val);
    });
}

