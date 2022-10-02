export const getUserLogIn = (username, password, handler) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": username,
        "password": password
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://sg-task-app.herokuapp.com/users/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            const parsedResult = JSON.parse(result);
            const loginInfo = JSON.stringify(parsedResult);
            localStorage.setItem('loginInfo', loginInfo);
        })
        .catch(error => console.log('error', error));
}