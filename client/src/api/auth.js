import Axios from "axios";

const AuthAPI = Axios.create({
  baseURL: "http://localhost:3001/api/user",
  withCredentials: true
});

AuthAPI.interceptors.response.use((response) => {
  const transformed = { ...response };
  if (transformed.status < 400) {
    transformed.ok = true;
  }
  return transformed;
});

const Auth = {
  logout: () => AuthAPI.get("/logout"),
  login: ({ email, password }) => AuthAPI.post("/login", {
    email, password
  }),
  register: registerData => AuthAPI.post("/register", registerData),
  getUser: () => AuthAPI.get("/"),
  getDashboardProjects: () => AuthAPI.get("/projects-dashboard")

};

export default Auth;
