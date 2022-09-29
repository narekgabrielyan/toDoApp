export const getUserLogIn = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "email": "nargabrielyan@mail.ru",
        "password": "thecrownprince"
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
            const loginInfo = JSON.stringify(JSON.parse(result));
            localStorage.setItem('loginInfo', loginInfo);
        })
        .catch(error => console.log('error', error));
}