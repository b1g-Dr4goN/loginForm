import {
  Box,
  Fade,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  SelectChangeEvent,
} from "@mui/material";
import {
  TUpdateUserSchema,
  updateUserSchema,
} from "../../../libs/UpdateUserType";
import { TUserSchema } from "../../../libs/UserType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFacultyList } from "../../../APIs/userAPI/getFacultiesEnum";
import { ClipLoader } from "react-spinners";
import CssTextField from "../../formComponents/textField";
import CssButton from "../../formComponents/button";
import CssButton2 from "../../formComponents/button2";
import axiosUpdateUser from "../../../APIs/userAPI/updateUser";
import toast from "react-hot-toast";
import CssSelect from "../../formComponents/select";

interface props {
  selectedRowValue: TUserSchema;
  isShowModal: boolean;
  handleReload: () => void;
  handleCloseModal: () => void;
  setSelectedRow: Dispatch<SetStateAction<number>>;
  setSelectedRowValue: Dispatch<
    SetStateAction<
      | {
          userId: number;
          username: string;
          degreeName: string;
          email: string;
          facultyOrDepartment: string;
          fullName: string;
          password: string;
          phone: string;
          role: string;
          status: boolean;
          subject: string;
          systemLevel: number;
          tasks: string[];
        }
      | undefined
    >
  >;
}

const UpdateUserModal = ({
  selectedRowValue,
  setSelectedRowValue,
  setSelectedRow,
  isShowModal,
  handleCloseModal,
  handleReload,
}: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TUpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      userId: selectedRowValue?.userId,
      username: selectedRowValue?.username,
      email: selectedRowValue?.email,
      facultyOrDepartment: selectedRowValue?.facultyOrDepartment,
      fullName: selectedRowValue?.fullName,
      password: selectedRowValue?.password,
      phone: selectedRowValue?.phone,
      subject: selectedRowValue?.subject,
      systemLevel: selectedRowValue?.systemLevel,
    },
  });

  const onSubmit = (data: TUpdateUserSchema) => {
    // console.log(data)
    try {
      const updatedData = {
        ...selectedRowValue,
        ...data,
      };
      axiosUpdateUser(updatedData, data.userId);
      reset();
      handleCloseModal();
      setSelectedRow(-1);
      setSelectedRowValue(undefined);
      toast.success("Sửa người dùng thành công!");
    } catch (err) {
      console.log(err);
    } finally {
      handleReload();
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [facultyList, setFacultyList] = useState<string[]>([]);

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

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
    field: string,
  ) => {
    if (selectedRowValue) {
      setSelectedRowValue({
        ...selectedRowValue,
        [field]: event.target.value,
      });
    }
  };

  // console.log(errors)

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
            SỬA THÔNG TIN NGƯỜI DÙNG
          </div>
          {facultyList.length !== 0 ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full p-6"
            >
              <div className="flex flex-row gap-5 w-full">
                <div className="flex flex-col gap-2 w-1/2">
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
                    onChange={(e) => handleChange(e, "fullName")}
                  />

                  <CssTextField
                    {...register("userId", { valueAsNumber: true })}
                    autoComplete="off"
                    error={!!errors.userId}
                    disabled
                    className="w-full self-center h-14"
                    id="outlined-basic userId"
                    label="Mã người dùng"
                    variant="outlined"
                    size="small"
                    helperText={errors.userId && errors.userId?.message}
                    onChange={(e) => handleChange(e, "userId")}
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
                    value={selectedRowValue?.phone || ""}
                    onChange={(e) => handleChange(e, "phone")}
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
                    value={selectedRowValue?.email || ""}
                    onChange={(e) => handleChange(e, "email")}
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
                      Khoa phòng
                    </InputLabel>
                    <CssSelect
                      {...register("facultyOrDepartment")}
                      labelId="demo-select-small-label facultyOrDepartment"
                      id="demo-select-small facultyOrDepartment"
                      value={selectedRowValue?.facultyOrDepartment || ""}
                      label="Khoa phòng"
                      onChange={(e) => {handleChange(e, "facultyOrDepartment")}}
                      error={!!errors.facultyOrDepartment}
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
                      <FormHelperText sx={{color: "red"}}>
                        {errors.facultyOrDepartment?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>

                <div className="flex flex-col gap-2 w-1/2">
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
                    value={selectedRowValue?.username || ""}
                    onChange={(e) => handleChange(e, "username")}
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
                    value={selectedRowValue?.password || ""}
                    onChange={(e) => handleChange(e, "password")}
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
                    value={selectedRowValue?.subject || ""}
                    onChange={(e) => handleChange(e, "subject")}
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
                    value={selectedRowValue?.systemLevel || ""}
                    onChange={(e) => handleChange(e, "systemLevel")}
                  />
                </div>
              </div>
              <div className="flex flex-row w-full justify-between self-end mt-auto">
                <CssButton2
                  variant="contained"
                  className="self-end"
                  type="submit"
                  disabled={isSubmitting}
                >
                  THAY ĐỔI
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

export default UpdateUserModal;
