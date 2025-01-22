import {
  Box,
  Fade,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Switch,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  createUserSchema,
  TCreateUserSchema,
} from "../../../libs/CreateUserType";
import { getFacultyList } from "../../../APIs/userAPI/getFacultiesEnum";
import { ClipLoader } from "react-spinners";
import CssTextField from "../../formComponents/textField";
import CssButton from "../../formComponents/button";
import CssButton2 from "../../formComponents/button2";
import axiosCreateUser from "../../../APIs/userAPI/createUser";
import toast from "react-hot-toast";
import CssSelect from "../../formComponents/select";
import { getDegreeList } from "../../../APIs/userAPI/getDegreeNamesEnum";

interface props {
  isShowModal: boolean;
  handleCloseModal: () => void;
}

const CreateUserModal = ({ isShowModal, handleCloseModal }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    mode: "onChange",
  });

  const onSubmit = (data: TCreateUserSchema) => {
    try {
      axiosCreateUser(data);
      reset();
      handleCloseModal();
      toast.success("Tạo người dùng thành công!");
    } catch (err) {
      console.log(err);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [faculty, setFaculty] = useState<string | unknown>("");

  const [facultyList, setFacultyList] = useState<string[]>([]);

  const [degreeName, setDegreeName] = useState<string | unknown>("");

  const [degreeNameList, setDegreeNameList] = useState<string[]>([]);

  const getFaculties = async () => {
    try {
      const res = await getFacultyList();
      return res;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchFaculties = async () => {
      const token = sessionStorage.getItem("authToken");
      if (token && token !== "ERR" && token !== "OR") {
        const faculties = await getFaculties();
        setFacultyList(faculties);
      }
    };

    fetchFaculties();
  }, []);

  const getDegreeNames = async () => {
    try {
      const res = await getDegreeList();
      return res;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  useEffect(() => {
    const fetchDegrees = async () => {
      const token = sessionStorage.getItem("authToken");
      if (token && token !== "ERR" && token !== "OR") {
        const degrees = await getDegreeNames();
        setDegreeNameList(degrees);
      }
    };

    fetchDegrees();
  }, []);

  return (
    <Modal open={isShowModal} onClose={handleCloseModal}>
      <Fade in={isShowModal} timeout={200}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "22.5%",
            left: "17.5%",
            height: "50%",
            width: "66%",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "8px",
          }}
        >
          <div className="h-10 flex items-center justify-center rounded-lg rounded-b-none bg-teal-300 border-x-[0.5px] border-y-[0.5px] border-gray-400">
            TẠO MỚI NGƯỜI DÙNG
          </div>
          {facultyList.length !== 0 ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full p-6"
            >
              <div className="flex flex-row gap-5 w-full">
                <div
                  className={`flex flex-col w-1/2 gap-1`}
                >
                  <CssTextField
                    {...register("fullName")}
                    autoComplete="off"
                    error={!!errors.fullName}
                    className="w-full self-center h-14"
                    id="outlined-basic fullName"
                    label="Tên người dùng"
                    variant="outlined"
                    size="small"
                    helperText={errors.fullName && errors.fullName?.message}
                  />

                  <CssTextField
                    {...register("phone")}
                    autoComplete="off"
                    error={!!errors.phone}
                    className="w-full self-center h-14"
                    id="outlined-basic phone"
                    label="Điện thoại"
                    variant="outlined"
                    size="small"
                    helperText={errors.phone && errors.phone?.message}
                  />

                  <CssTextField
                    {...register("email")}
                    autoComplete="off"
                    error={!!errors.email}
                    className="w-full self-center h-14"
                    id="outlined-basic email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    helperText={errors.email && errors.email?.message}
                  />

                  <div className="w-full flex flex-row justify-between h-8 mb-6">
                    <p className="self-center">Trạng thái</p>
                    <Switch
                      {...register("status")}
                      id="status"
                      size="small"
                      className="self-center"
                    />
                    <CssTextField
                      {...register("role")}
                      autoComplete="off"
                      error={!!errors.role}
                      className="w-7/12 self-end"
                      id="outlined-basic role"
                      label="Vai trò"
                      variant="outlined"
                      size="small"
                      helperText={errors.role && errors.role?.message}
                    />
                  </div>

                  <FormControl
                    sx={{ minWidth: 120, width: "100%" }}
                    size="small"
                    className="w-full self-center h-14"
                  >
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ fontSize: "12px" }}
                    >
                      Khoa phòng
                    </InputLabel>
                    <CssSelect
                      {...register("facultyOrDepartment")}
                      labelId="demo-select-small-label facultyOrDepartment"
                      id="demo-select-small facultyOrDepartment"
                      label="Khoa phòng"
                      error={!!errors.facultyOrDepartment}
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value || "")}
                    >
                      <MenuItem key="none" value="">
                        None
                      </MenuItem>
                      {facultyList.map((val) => (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </CssSelect>
                    {errors.facultyOrDepartment && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.facultyOrDepartment?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>

                <div
                  className={`flex flex-col w-1/2 gap-1`}
                >
                  <CssTextField
                    {...register("username")}
                    autoComplete="off"
                    error={!!errors.username}
                    className="w-full self-center h-14"
                    id="outlined-basic username"
                    label="Tên đăng nhập"
                    variant="outlined"
                    size="small"
                    helperText={errors.username && errors.username?.message}
                  />

                  <CssTextField
                    {...register("password")}
                    autoComplete="off"
                    error={!!errors.password}
                    className="w-full self-center h-14"
                    id="outlined-basic password"
                    label="Mật khẩu"
                    variant="outlined"
                    size="small"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className="cursor-pointer"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </InputAdornment>
                      ),
                    }}
                    helperText={errors.password && errors.password?.message}
                  />

                  <CssTextField
                    {...register("subject")}
                    autoComplete="off"
                    error={!!errors.subject}
                    className="w-full self-center h-14"
                    id="outlined-basic subject"
                    label="Đối tượng"
                    variant="outlined"
                    size="small"
                    helperText={errors.subject && errors.subject?.message}
                  />

                  <CssTextField
                    {...register("systemLevel", { valueAsNumber: true })}
                    autoComplete="off"
                    error={!!errors.systemLevel}
                    className="w-full self-center h-14"
                    id="outlined-basic systemLevel"
                    label="Câp người dùng"
                    variant="outlined"
                    size="small"
                    helperText={
                      errors.systemLevel && errors.systemLevel?.message
                    }
                  />

                  <FormControl
                    sx={{ minWidth: 120, width: "100%" }}
                    size="small"
                    className="w-full self-center h-14"
                  >
                    <InputLabel
                      id="demo-select-small-label"
                      sx={{ fontSize: "12px" }}
                    >
                      Học vị
                    </InputLabel>
                    <CssSelect
                      {...register("degreeName")}
                      labelId="demo-select-small-label degreeName"
                      id="demo-select-small degreeName"
                      label="Học vị"
                      error={!!errors.degreeName}
                      value={degreeName}
                      onChange={(e) => setDegreeName(e.target.value || "")}
                    >
                      <MenuItem key="none" value="">
                        None
                      </MenuItem>
                      {degreeNameList.map((val) => (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      ))}
                    </CssSelect>
                    {errors.facultyOrDepartment && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.facultyOrDepartment?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>
              <div className="flex flex-row w-full justify-between self-end mt-auto">
                <CssButton2
                  variant="contained"
                  className="self-end"
                  type="submit"
                  disabled={isSubmitting}
                >
                  TẠO
                </CssButton2>
                <CssButton
                  variant="outlined"
                  className="self-end"
                  onClick={handleCloseModal}
                >
                  ĐÓNG
                </CssButton>
              </div>
            </form>
          ) : (
            <p className="h-5/6 flex justify-center items-center">
              <ClipLoader
                className="ml-auto mr-auto"
                size={35}
                color="#36d7b7"
              />
            </p>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateUserModal;
