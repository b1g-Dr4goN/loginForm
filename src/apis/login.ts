import axiosInstance from "../utils/axiosInstance";

const axiosLogin = async (usr: string, pass: string): Promise<string> => {
    try {
        const res = await axiosInstance.post(`/auth/login`, { userName: usr, password: pass });
        return res.data.split(" ").map((val: string) => val)[2];
    } catch (err) {
        console.log(err);
        return "ERR";
    }
};

export default axiosLogin;
