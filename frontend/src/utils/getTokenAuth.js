import { redirect } from "react-router-dom";

export const getTokenAuth = () => {
  const token = localStorage.getItem("token");
  return token;
};

export function checkAuthLoader() {
  // this function will be added in the next lecture
  // make sure it looks like this in the end
  debugger;
  const token = getTokenAuth();
  console.log(token);

  if (!token) {
    return redirect("/auth");
  }

  return null; // this is missing in the next lecture video and should be added by you
}
