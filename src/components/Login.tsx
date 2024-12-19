import { Button, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch, SetStateAction, useState } from "react";
import reactsvg from "../assets/react.svg";
import toast from "react-hot-toast";

interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const phoneNumber = "0962.800.xxx | Usr: sysadmin, Pass: 12345678";

  const [usernameInputValue, setUsernameInputValue] = useState("");

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameInputValue(event.target.value);
  };

  const [passwordInputValue, setPasswordInputValue] = useState("");

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordInputValue(event.target.value);
  };

  const handleLogin = () => {
    if (
      usernameInputValue === "sysadmin" &&
      passwordInputValue === "12345678"
    ) {
      setIsLoggedIn(true);
      toast.success("Đăng nhập thành công!");
    } else {
      toast.error("Đăng nhập không thành công!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const [hoverBtn, setHoverBtn] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleHoverBtn = () => setHoverBtn((hovered) => !hovered);

  return (
    <div className="bg-slate-100 flex flex-col gap-[18px] place-self-center w-[450px] h-[350px] rounded-sm">
      <img src={reactsvg} alt="" className="w-24 h-24 mx-auto mt-4 mb-6" />

      <TextField
        error={false}
        className="w-[350px] self-center"
        id="outlined-basic"
        label="Tên đăng nhập"
        variant="outlined"
        size="small"
        required={true}
        onChange={handleUsernameInputChange}
      />

      <TextField
        className="w-[350px] self-center"
        id="outlined-basic"
        label="Mật khẩu"
        variant="outlined"
        size="small"
        required={true}
        // helperText="Mật khẩu có ít nhất 8 kí tự"
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
        onChange={handlePasswordInputChange}
      />

      <Button
        className="w-[110px] self-center"
        variant={hoverBtn ? "contained" : "outlined"}
        size="small"
        onPointerEnter={handleHoverBtn}
        onPointerLeave={handleHoverBtn}
        onClick={handleLogin}
      >
        ĐĂNG NHẬP
      </Button>

      <p className="font-semibold text-sm self-center">
        Hỗ trợ kỹ thuật: {phoneNumber}
      </p>
    </div>
  );
};

export default Login;
