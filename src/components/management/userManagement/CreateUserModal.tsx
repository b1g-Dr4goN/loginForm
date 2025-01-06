import { Box, Fade, InputAdornment, Modal, Switch } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import {
  createUserSchema,
  TCreateUserSchema,
} from "../../../libs/CreateUserType";
import CssTextField from "../../formComponents/textField";
import CssButton from "../../formComponents/button";
import CssButton2 from "../../formComponents/button2";
import axiosCreateUser from "../../../apis/createUser";
import toast from "react-hot-toast";

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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full" >
            <div className="flex flex-row gap-5 w-full">
              <div
                className={`flex flex-col w-1/2 ${
                  Object.keys(errors).length > 2 ? "gap-2" : "gap-5"
                }`}
              >
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
                />

                <CssTextField
                  {...register("degreeName")}
                  autoComplete="off"
                  error={!!errors.degreeName}
                  className="w-full self-center"
                  id="outlined-basic degreeName"
                  label="Học vị"
                  variant="outlined"
                  size="small"
                  required={true}
                  helperText={errors.degreeName && errors.degreeName?.message}
                />
              </div>

              <div
                className={`flex flex-col w-1/2 ${
                  Object.keys(errors).length > 3 ? "gap-2" : "gap-5"
                }`}
              >
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
                />

                <div className="w-full flex flex-row justify-between h-8">
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
                    required={true}
                    helperText={errors.role && errors.role?.message}
                  />
                </div>
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
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateUserModal;
