import { getAccessToken } from "../../js/utils";

export const removeTodoItem = (id, callback) => {
  const accessToken = getAccessToken();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  let requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, requestOptions)
    .then((response) => {
      callback?.();
      return response.text();
    })
    .catch((error) => console.log("error", error));
};
