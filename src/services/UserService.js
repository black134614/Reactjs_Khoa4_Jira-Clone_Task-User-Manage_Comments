import { baseService } from "./baseService";

export class UserService extends baseService {

    constructor() {
        super();
    }

    getUser = (keyWord) => {

        return this.get(`Users/getUser?keyword=${keyWord}`);
    }


    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`, userProject);
    }


    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`, userProject);
    }


    getUserByProjectId = (idProject) => {
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }
    //service sign up user viet dua theo class ke thua base service
    signupUser = (newUser) => {
        return this.post(`/Users/signup`, newUser)
    }
    getAllUser = (keyWord) => {
        if (keyWord === '' || keyWord === undefined) {
            return this.get("Users/getUser")
        }
        return this.get("Users/getUser?keyword=" + keyWord)
    }
    editUser = (user) => {
        return this.put("Users/editUser", user)
    }
    deleteUser = (userId) => {
        return this.delete("Users/deleteUser?id=" + userId)
    }
}


export const userService = new UserService();
