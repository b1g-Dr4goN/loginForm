import axiosInstance from "../../utils/axiosInstance";

const axiosGetAllUsers = async (userId: number) => {
    try {
        const res = await axiosInstance.get(`/todo-list/get-all-user-task/${userId}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default axiosGetAllUsers;