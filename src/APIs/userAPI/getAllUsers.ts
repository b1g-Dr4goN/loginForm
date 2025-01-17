import axiosInstance from "../../utils/axiosInstance";

const axiosGetAllUsers = async (page: number, rowsPerPage: number)=> {
    try {
        const res = await axiosInstance.get(`/operate/get-all-user?page=${page}&size=${rowsPerPage}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default axiosGetAllUsers;
