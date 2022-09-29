let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3OTM4Y2M0YjdiNzAwMTcxZjNjMWEiLCJpYXQiOjE1NzA5OTAxMTN9.r2hGcMnOQ7JDiUImLgHsBnxwHl2ZUcmw4foH6cQLjf4");

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

export const getUserLogIn = () => {
    fetch("https://sg-task-app.herokuapp.com/users/login", requestOptions)
        .then(response => response.text())
        .then(result => {
            const loginInfo = JSON.stringify(JSON.parse(result));
            localStorage.setItem('loginInfo', loginInfo);
        })
        .catch(error => console.log('error', error));
}