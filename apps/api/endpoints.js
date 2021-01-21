import client from "./client";

const userEndpoint = "/users/";
const userAuth = "/auth/";
const currentUser = "/users/me"


const SignUpUser = (userData) => {
  const data = new FormData();
  data.append("username", userData.username);
  data.append("useremail", userData.useremail);
  data.append("password", userData.password);
  data.append("phone", userData.phone);

  data.append("file_name", {
    name: "_image_" + Date.now() + ".jpg",
    type: "image/jpeg",
    uri: userData.image,
  });

  return client.post(userEndpoint, data);
};

const updateInfo = (updateData,token) => {
  const data = new FormData();
  data.append("username", updateData.username);
  data.append("useremail", updateData.email);
  data.append("phone", updateData.phone);
  data.append("file_name", {
    name: "_image_" + Date.now() + ".jpg",
    type: "image/jpeg",
    uri: updateData.image,
  });

  return client.put(userEndpoint, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      "x-auth-token": token      },
  });
};


const getCurrentUser = (token) => {

return client.get(currentUser,{
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "x-auth-token": token      }
})
}



const Login = (email, password) => {
  return client.post(userAuth, { useremail: email, password: password });
};

export default {
  getCurrentUser,
  SignUpUser,
  updateInfo,
  Login,
};
