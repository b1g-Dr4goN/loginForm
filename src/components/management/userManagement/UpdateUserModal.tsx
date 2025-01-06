import { Box, Fade, InputAdornment, Modal } from "@mui/material";
import CssTextField from "../../formComponents/textField";
import CssButton from "../../formComponents/button";
import CssButton2 from "../../formComponents/button2";
import {
  TUpdateUserSchema,
  updateUserSchema,
} from "../../../libs/UpdateUserType";
import { TUserSchema } from "../../../libs/UserType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosUpdateUser from "../../../apis/updateUser";
import toast from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";

interface props {
  selectedRowValue: TUserSchema;
  isShowModal: boolean;
  handleCloseModal: () => void;
  setSelectedRow: Dispatch<SetStateAction<number>>;
  setSelectedRowValue: Dispatch<
    SetStateAction<
      | {
          userId: number;
          username: string;
          degreeName: string;
          email: string;
          falcultyOrDepartment: string;
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
      falcultyOrDepartment: selectedRowValue?.falcultyOrDepartment,
      fullName: selectedRowValue?.fullName,
      password: selectedRowValue?.password,
      phone: selectedRowValue?.phone,
      subject: selectedRowValue?.subject,
      systemLevel: selectedRowValue?.systemLevel,
    },
  });

  const onSubmit = (data: TUpdateUserSchema) => {
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
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Modal open={isShowModal}>
      <Fade in={isShowModal} timeout={200}>
        <Box
          sx={{
            position: "absolute",
            top: "22.5%",
            left: "17.5%",
            height: "50%",
            width: "66%",
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: "8px",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <div className="flex flex-row gap-5 w-full">
              <div className="flex flex-col gap-5 w-1/2">
                <CssTextField
                  {...register("fullName")}
                  autoComplete="off"
                  error={!!errors.fullName}
                  className="w-full self-center"
                  id="outlined-basic fullName"
                  label="Tên người dùng"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.fullName && errors.fullName?.message}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        fullName: e.target.value,
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("userId", { valueAsNumber: true })}
                  autoComplete="off"
                  error={!!errors.userId}
                  disabled
                  className="w-full self-center"
                  id="outlined-basic userId"
                  label="Mã người dùng"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.userId && errors.userId?.message}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        userId: Number(e.target.value),
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("phone")}
                  autoComplete="off"
                  error={!!errors.phone}
                  className="w-full self-center"
                  id="outlined-basic phone"
                  label="Điện thoại"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.phone && errors.phone?.message}
                  value={selectedRowValue?.phone || ""}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        phone: e.target.value,
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("email")}
                  autoComplete="off"
                  error={!!errors.email}
                  className="w-full self-center"
                  id="outlined-basic email"
                  label="Email"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.email && errors.email?.message}
                  value={selectedRowValue?.email || ""}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        email: e.target.value,
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("falcultyOrDepartment")}
                  autoComplete="off"
                  error={!!errors.falcultyOrDepartment}
                  className="w-full self-center"
                  id="outlined-basic falcultyOrDepartment"
                  label="Khoa phòng"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={
                    errors.falcultyOrDepartment &&
                    errors.falcultyOrDepartment?.message
                  }
                  value={selectedRowValue?.falcultyOrDepartment || ""}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        falcultyOrDepartment: e.target.value,
                      });
                    }
                  }}
                />
              </div>

              <div className="flex flex-col gap-5 w-1/2">
                <CssTextField
                  {...register("username")}
                  autoComplete="off"
                  error={!!errors.username}
                  className="w-full self-center"
                  id="outlined-basic username"
                  label="Tên đăng nhập"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.username && errors.username?.message}
                  value={selectedRowValue?.username || ""}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        username: e.target.value,
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("password")}
                  autoComplete="off"
                  error={!!errors.password}
                  className="w-full self-center"
                  id="outlined-basic password"
                  label="Mật khẩu"
                  variant="outlined"
                  size="small"
                  required={true}
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
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        password: e.target.value,
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("subject")}
                  autoComplete="off"
                  error={!!errors.subject}
                  className="w-full self-center"
                  id="outlined-basic subject"
                  label="Đối tượng"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.subject && errors.subject?.message}
                  value={selectedRowValue?.subject || ""}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        subject: e.target.value,
                      });
                    }
                  }}
                />

                <CssTextField
                  {...register("systemLevel", { valueAsNumber: true })}
                  autoComplete="off"
                  error={!!errors.systemLevel}
                  className="w-full self-center"
                  id="outlined-basic systemLevel"
                  label="Câp người dùng"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.systemLevel && errors.systemLevel?.message}
                  value={selectedRowValue?.systemLevel || ""}
                  onChange={(e) => {
                    if (selectedRowValue) {
                      setSelectedRowValue({
                        ...selectedRowValue,
                        systemLevel: Number(e.target.value),
                      });
                    }
                  }}
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateUserModal;
