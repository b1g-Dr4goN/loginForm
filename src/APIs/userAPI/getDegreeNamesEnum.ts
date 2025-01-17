import axiosInstance from "../../utils/axiosInstance";

const axiosGetDegreeList = async () => {
  try {
    const res = await axiosInstance.get(`/operate/degree-list`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getDegreeList = async (): Promise<string[]> => {
  try {
    const res: Promise<string[]> = await axiosGetDegreeList();
    return res;
  } catch (err) {
    console.log(err);
    return [];
  }
};
