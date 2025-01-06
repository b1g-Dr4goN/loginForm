import axiosInstance from "../utils/axiosInstance";
import { TUserSchema } from "../libs/UserType";

const axiosGetAllUsers = async (): Promise<TUserSchema[]>=> {
    try {
        const res = await axiosInstance.get("/operate/get-all-user");
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default axiosGetAllUsers;
