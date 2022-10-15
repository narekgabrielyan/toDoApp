export const getUserLoggedIn = (username, password, callback) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  let raw = JSON.stringify({
    email: username,
    password: password,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://sg-task-app.herokuapp.com/users/login', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    });
};
