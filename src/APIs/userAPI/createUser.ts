import { TCreateUserSchema } from "../../libs/CreateUserType";
import axiosInstance from "../../utils/axiosInstance";

const axiosCreateUser = async (data: TCreateUserSchema) => {
    try {
        const res = await axiosInstance.post(`/auth/register`, data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default axiosCreateUser;