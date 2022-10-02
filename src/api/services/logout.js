
export const getUserLogOut = (token) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://sg-task-app.herokuapp.com/users/logout", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}