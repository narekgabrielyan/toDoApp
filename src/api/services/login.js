export const login = ({ clientId, clientSecret, code }) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return new Promise((resolve, reject) => {
    fetch("https://todoist.com/oauth/access_token", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const res = JSON.parse(result);
        res.loginStatusId = 1;
        resolve(res);
      })
      .catch(reject);
  });
};
