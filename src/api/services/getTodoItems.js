import { getAccessToken } from "../../js/utils";

export const getTodoItems = (callback) => {
  const accessToken = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`https://api.todoist.com/rest/v2/tasks`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const res = JSON.parse(result);
      callback?.(res);
    })
    .catch((error) => console.log("error", error));
};
