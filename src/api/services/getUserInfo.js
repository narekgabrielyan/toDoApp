export const getUserInfo = (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    fetch("https://sg-task-app.herokuapp.com/users/me", requestOptions)
        .then(response => response.text())
        .then(result => {
            localStorage.setItem('userInfo', result)
        })
        .catch(error => console.log('error', error));
}