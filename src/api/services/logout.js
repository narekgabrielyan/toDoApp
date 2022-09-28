let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDk3OTM4Y2M0YjdiNzAwMTcxZjNjMWEiLCJpYXQiOjE1NzA5OTAxMTN9.r2hGcMnOQ7JDiUImLgHsBnxwHl2ZUcmw4foH6cQLjf4");

let requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders
};

export const getUserLogOut = () => {
    fetch("https://sg-task-app.herokuapp.com/users/logout", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}