import { create } from "apisauce";

const AuthAPI = create({ baseURL: "http://localhost:3001/api/user" });

const Auth = {
  logout: () => {
    AuthAPI.get("/logout");
  },
  login: ({ email, password }) => {
    AuthAPI.post("/login", {
      email, password
    });
  }
};

export default Auth;
