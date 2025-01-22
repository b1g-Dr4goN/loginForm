import { InputAdornment } from "@mui/material";
import CssButton from "../formComponents/button";
import CssTextField from "../formComponents/textField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import reactsvg from "../../assets/react.svg";
import axiosLogin from "../../APIs/userAPI/login";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, TLoginSchema } from "../../libs/LoginType";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema), mode: "onChange"});

  const phoneNumber = "0962.800.xxx";

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = async (data: TLoginSchema) => {
    try {
      const res = await axiosLogin(data.username, data.password);
      if (res === "ERR" || res === "or") {
        toast.error("Tên đăng nhập hoặc mật khẩu không đúng!");
      } else {
        toast.success("Đăng nhập thành công!");
        sessionStorage.setItem("authToken", res);
        navigate("/");
      }          // helperText="Mật khẩu có ít nhất 8 kí tự"
    } catch (err) {
      console.log(err);
    } finally {
      reset();
    }
  };

  return (
    <div className="bg-slate-100 flex flex-col gap-3 place-self-center w-[450px] h-[350px] rounded-sm">
      <img src={reactsvg} alt="" className="w-24 h-24 mx-auto mt-4 mb-6" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col place-self-center w-[450px] h-auto rounded-sm gap-1`}
      >
        <CssTextField
          {...register("username")}
          autoComplete="off"
          error={!!errors.username}
          className="w-[350px] self-center h-14"
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
          className="w-[350px] self-center h-14"
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

        <CssButton
          disabled={isSubmitting}
          className="w-[110px] self-center"
          variant="outlined"
          size="small"
          type="submit"
        >
          ĐĂNG NHẬP
        </CssButton>
      </form>
      <p className="font-semibold text-sm self-center mt-auto mb-3">
        Hỗ trợ kỹ thuật: {phoneNumber}
      </p>
    </div>
  );
};

export default Login;
