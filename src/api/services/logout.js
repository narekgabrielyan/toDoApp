export const getUserLoggedOut = (token, callback) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://sg-task-app.herokuapp.com/users/logout", requestOptions)
        .then(response => response.text())
        .then(result => {
            if(callback) {
                callback(result)
            }
        })
        .catch(error => console.log('error', error));
}
