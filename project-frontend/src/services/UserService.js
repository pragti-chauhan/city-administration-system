import axios from "axios";

// const userUrl = 'https://jsonplaceholder.typicode.com/users';

const userUrl = 'http://localhost:8090/users';

const register = (appUser) => {
    console.log(appUser);
    return axios.post(userUrl, appUser);
};

const login = (username) => {
    console.log(username);
    return axios.get(`${userUrl}/${username}`);
};

const userUpdateUrl = 'http://localhost:8090/update-user';

const updateUser = (appUser) => {
    console.log(appUser);
    return axios.post(userUpdateUrl, appUser);
};

const userDeleteUrl = 'http://localhost:8090/delete-user';

const deleteUser = (appUser) => {
    console.log(appUser);
    return axios.delete(`${userDeleteUrl}/${appUser.id}`);
};

const logout = () => {
    console.log('logout');
};

const getAllUsers = () => {
    console.log('getAllUsers');
    return axios.get(userUrl);
};

// const checkUniqueUser = (appUser) => {
//     console.log(appUser);
//     const users =  axios.get(`${userUrl}`);
//     const userFound = users.find((user) => user.id === appUser.id);
//     if(userFound) return false;
//     return true;
// };

export { register, login, updateUser, logout, getAllUsers, deleteUser };