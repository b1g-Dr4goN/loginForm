import axiosInstance from "../../utils/axiosInstance";

const axiosDeleteUser = async (userId: number) => {
    try {
        const res = await axiosInstance.delete(`/operate/delete/${userId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export default axiosDeleteUser;