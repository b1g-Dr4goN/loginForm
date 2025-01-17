import axiosInstance from "../../utils/axiosInstance";

const axiosCurrentUser = async () => {
    try {
        const res = await axiosInstance.get(`/operate/current-info`);
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export default axiosCurrentUser;
