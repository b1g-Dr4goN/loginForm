import { TUpdateUserSchema } from "../libs/UpdateUserType";
import axiosInstance from "../utils/axiosInstance";

const axiosUpdateUser = async (data: TUpdateUserSchema, userId: number) => {
    try {
        const res = await axiosInstance.put(`/operate/update-user?userId=${userId}`, data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default axiosUpdateUser;