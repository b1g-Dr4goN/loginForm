import axiosInstance from "../../utils/axiosInstance";

const axiosGetUserByFaculty = async (faculty: string) => {
    try {
        const res = await axiosInstance.get(`/operate/get-user-by-faculty/${faculty}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default axiosGetUserByFaculty;