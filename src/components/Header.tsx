import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { TUserSchema } from "../libs/UserType";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import CssButton from "./formComponents/button";
import axiosCurrentUser from "../APIs/userAPI/getCurrentUser";

const Header = () => {
  const [user, setUser] = useState<TUserSchema | undefined>(undefined);

  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const res = await axiosCurrentUser();
      setUser(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleSignOut = () => {
    navigate("/login");
    toast.success("Đăng xuất thành công!");
    sessionStorage.setItem("authToken", "");
  };

  return (
    <div className="w-full h-12 bg-teal-950 text-white flex flex-row justify-between items-center text-2xl">
      <CssButton
        sx={{ marginLeft: "20px" }}
        variant="text"
        onClick={() => navigate("/")}
      >
        TRANG CHỦ
      </CssButton>
      <h1 className="relative w-1/2 text-center">USER MANAGEMENT APPLICATION</h1>
      <div className="flex flex-row gap-6 mr-6 w-80 justify-between">
        {user ? (
          <div>
            <h3 className="text-xs text-white">
              <b>Người dùng:</b> {user?.fullName}
            </h3>
            <h3 className="text-xs text-white">
              <b>Username:</b> {user?.username}
            </h3>
          </div>
        ) : (
          <p className="flex items-center">
            <ClipLoader className="ml-auto mr-auto" size={18} color="#36d7b7" />
          </p>
        )}
        <Button className="" variant="contained" color="error" onClick={handleSignOut}>
          <Link to="/login">ĐĂNG XUẤT</Link>
        </Button>
      </div>
    </div>
  );
};

export default Header;
