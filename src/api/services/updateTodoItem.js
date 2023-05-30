import { getAccessToken } from "../../js/utils";

export const updateTodoItem = (updateItem, callback) => {
  const accessToken = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  let raw = JSON.stringify(updateItem);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `https://api.todoist.com/rest/v2/tasks/${updateItem.id}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      const res = JSON.parse(result);
      callback?.(res);
    })
    .catch((error) => console.log("error", error));
};
