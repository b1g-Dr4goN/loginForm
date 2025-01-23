import axiosInstance from "../../utils/axiosInstance";

const axiosFilterUsersByName = async (name: string, page: number, rowsPerPage: number) => {
    try {
        const res = await axiosInstance.post(`/operate/filter-by-name?name=${name}&page=${page}&size=${rowsPerPage}`);
        return res.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default axiosFilterUsersByName;