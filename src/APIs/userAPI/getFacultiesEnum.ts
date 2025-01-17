import axiosInstance from "../../utils/axiosInstance";

const axiosGetFacultyList = async () => {
  try {
    const res = await axiosInstance.get(`/operate/faculty-list`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getFacultyList = async (): Promise<string[]> => {
  try {
    const res: Promise<string[]> = await axiosGetFacultyList();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};
