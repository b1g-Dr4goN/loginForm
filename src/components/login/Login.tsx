import {
  Button,
  InputAdornment,
  TextField,
  FormControl,
  styled,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import reactsvg from "../../assets/react.svg";
import toast from "react-hot-toast";
import { z } from "zod";

interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const CssTextField = styled(TextField)({
  "& label": {
    fontSize: "13px",
  },
  "&:hover label": {
    color: "#00AEAE",
  },
  "&:hover .MuiInputAdornment-root": {
    color: "#00AEAE",
  },
  "& label.Mui-focused": {
    color: "#008080",
    fontSize: "12px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1D1E3AB2",
    },
    "&:hover fieldset": {
      borderColor: "#00AEAE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#008080",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "12px",
    height: "12px",
    padding: "10px",
  },
});

const CssButton = styled(Button)({
  color: '#008080',
  borderColor: '#008080',

  '&:hover': {
    backgroundColor: '#008080',
    borderColor: '#008080',
    color: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },

  '&.Mui-disabled': {
    backgroundColor: '#e0e0e0',
    color: '#a0a0a0',
  },

  '&:focus': {
    outline: '2px solid #008080',
    outlineOffset: '2px',
  },

  '&:active': {
    backgroundColor: '#008080',
  },
});

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(8),
  });

  const phoneNumber = "0962.800.xxx | Usr: sysadmin, Pass: 12345678";

  const usernameInput = useRef<HTMLInputElement>();
  const passwordInput = useRef<HTMLInputElement>();

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameHelperText, setUsernameHelperText] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState(false);

  const handleCheck = () => {
    const formData = {
      username: usernameInput.current?.value.trim(),
      password: passwordInput.current?.value.trim(),
    };

    const results = loginSchema.safeParse(formData);
    if (!results.success) {
      const formattedErrors = results.error.format();
      const usernameErr = formattedErrors.username?._errors;
      const passwordErr = formattedErrors.password?._errors;
      if (usernameErr) {
        setUsernameError(true);
        setUsernameHelperText(true);
      } else {
        setUsernameError(false);
        setUsernameHelperText(false);
      }
      if (passwordErr) {
        setPasswordError(true);
        setPasswordHelperText(true);
      } else {
        setPasswordError(false);
        setPasswordHelperText(false);
      }
    } else {
      setUsernameError(false);
      setUsernameHelperText(false);
      setPasswordError(false);
      setPasswordHelperText(false);
    }
  };

  const handleLogin = () => {
    if (
      usernameInput.current?.value.trim() === "sysadmin" &&
      passwordInput.current?.value.trim() === "12345678"
    ) {
      setTimeout(toast.success("Đăng nhập thành công!"), 2000);
      setIsLoggedIn(true);
    } else {
      toast.error("Đăng nhập không thành công!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="bg-slate-100 flex flex-col gap-3 place-self-center w-[450px] h-[350px] rounded-sm">
      <img src={reactsvg} alt="" className="w-24 h-24 mx-auto mt-4 mb-6" />
      <FormControl
        className={
          "flex flex-col place-self-center w-[450px] h-auto rounded-sm " +
          (usernameError && passwordError ? "gap-2" : "gap-6")
        }
      >
        <CssTextField
          autoComplete="off"
          error={usernameError}
          className="w-[350px] self-center"
          id="outlined-basic"
          label="Tên đăng nhập"
          variant="outlined"
          size="small"
          required={true}
          inputRef={usernameInput}
          onBlur={handleCheck}
          helperText={usernameHelperText ? "Tên đăng nhập trống!" : null}
        />

        <CssTextField
        autoComplete="off"
          error={passwordError}
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
          inputRef={passwordInput}
          onBlur={handleCheck}
          helperText={
            passwordHelperText ? "Mật khẩu phải có ít nhất 8 ký tự!" : null
          }
        />

        <CssButton
          className="w-[110px] self-center"
          variant="outlined"
          size="small"
          onClick={handleLogin}
          type="submit"
        >
          ĐĂNG NHẬP
        </CssButton>
      </FormControl>
      <p className="font-semibold text-sm self-center mt-auto mb-3">
        Hỗ trợ kỹ thuật: {phoneNumber}
      </p>
    </div>
  );
};

export default Login;
