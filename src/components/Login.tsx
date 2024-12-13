import { Button, InputAdornment, TextField } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import reactsvg from "../assets/react.svg"

const Login = () => {
  const phoneNumber = "0962.800.xxx"

  const [showPassword, setShowPassword] = useState(false)

  const [hoverBtn, setHoverBtn] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleHoverBtn = () => setHoverBtn(hovered => !hovered)

  return (
    <div className="bg-slate-100 flex flex-col gap-[18px] place-self-center w-[450px] h-[350px] rounded-sm">

      <img 
        src={reactsvg}
        alt=""
        className="w-24 h-24 mx-auto mt-4 mb-6" 
      />

      <TextField
        className="w-[350px] self-center"
        id="outlined-basic"
        label="Tên đăng nhập"
        variant="outlined"
        size="small"
      />

      <TextField
        className="w-[350px] self-center"
        id="outlined-basic"
        label="Mật khẩu"
        variant="outlined"
        size="small"
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment:
            <InputAdornment position="end" className="cursor-pointer" onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </InputAdornment>
        }}
      />

      <Button 
        className="w-[110px] self-center"
        color="success"
        variant={hoverBtn ? "contained" : "outlined"}
        size="small"
        onPointerEnter={handleHoverBtn}
        onPointerLeave={handleHoverBtn}
      >
        ĐĂNG NHẬP
      </Button>

      <p className="font-semibold text-sm self-center">
        Hỗ trợ kỹ thuật: {phoneNumber}
      </p>

    </div>
  )
}

export default Login