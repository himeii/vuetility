import { create } from "apisauce";

const AuthAPI = create({ baseURL: "localhost:3001/auth" });

const Auth = {
  logout: () => {
    AuthAPI.get("/logout");
  }
};

export default Auth;
