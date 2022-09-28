let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3OTM4Y2M0YjdiNzAwMTcxZjNjMWEiLCJpYXQiOjE1NzA5OTAxMTN9.r2hGcMnOQ7JDiUImLgHsBnxwHl2ZUcmw4foH6cQLjf4");

let rawCreate = JSON.stringify({
    "age": 32,
    "name": "Joker",
    "email": "nargabrielyan@mail.ru",
    "password": "thecrownprince"
});

let rawLogin = JSON.stringify({
    "email": "nargabrielyan@mail.ru",
    "password": "thecrownprince"
});

let raw = JSON.stringify({
    "email": "animastemail@mail.ru"
});


let requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://sg-task-app.herokuapp.com/users/me", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));