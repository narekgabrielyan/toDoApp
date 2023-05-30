import { getAccessToken } from "../../js/utils";

export const addTodoItem = (content, callback) => {
  const accessToken = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  let raw = JSON.stringify({
    content: content,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.todoist.com/rest/v2/tasks", requestOptions)
    .then((response) => {
      if (!response.ok) {
        // get error message from body or default to response status
        const error =
          (response.json() && response.json().message) || response.status;
        return new Error(error);
      } else {
        return response.text();
      }
    })
    .then((result) => {
      callback(JSON.parse(result));
    })
    .catch((error) => console.log("error", error));
};
