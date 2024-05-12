import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  const params = new URL(request.url).searchParams;

  const mode = params.get("mode") || "signup";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Mode authentication is not login neither signup" });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 401 || response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: " Could not authentication user.", status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);

  return redirect("/");
};
