import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faUserGear,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [isOpenMenu, setOpenMenu] = useState(true);
  const [isOpenUserManagement, setOpenUserManagement] = useState(true);
  const [isOpenTodoManagement, setOpenTodoManagement] = useState(true);

  const navigate = useNavigate();

  const handleOpenMenu = () => {
    setOpenMenu((menu) => !menu);
    // navigate("/");
  };

  const handleOpenUserManagement = () => {
    setOpenUserManagement((menu) => !menu);
  };

  const handleOpenTodoManagement = () => {
    setOpenTodoManagement((menu) => !menu);
  };

  const handleOpenUserModal = () => {
    navigate("/users");
  };

  const handleOpenTodoModal = () => {
    navigate("/todos");
  }

  return (
    <div
      className={
        `flex flex-col items-center bg-slate-100 border-gray-400 border-x-[0.5px] min-h-screen transition-all ` +
        (isOpenMenu ? "w-72" : "w-11")
      }
    >
      <div
        className="w-full h-10 px-4 font-semibold text-white bg-teal-700 content-center hover:cursor-pointer"
        onClick={handleOpenMenu}
      >
        {isOpenMenu && "QUẢN TRỊ HỆ THỐNG"}
        <FontAwesomeIcon
          className="float-right my-1"
          icon={isOpenMenu ? faAngleRight : faAngleLeft}
        />
      </div>

      {isOpenMenu && (
        <>
          <div className="w-full flex flex-col">
            <div
              className="flex items-center h-10 py-2 hover:cursor-pointer"
              onClick={handleOpenUserManagement}
            >
              <FontAwesomeIcon className="px-3" icon={faUserGear} />
              Quản lý người dùng
              <FontAwesomeIcon
                className="ml-auto mr-4"
                icon={isOpenUserManagement ? faAngleDown : faAngleRight}
              />
            </div>

            {isOpenUserManagement && (
              <div
                className="flex items-center h-8 hover:cursor-pointer"
                onClick={handleOpenUserModal}
              >
                <FontAwesomeIcon className="pl-8 pr-3" icon={faFolder} />
                Người dùng
              </div>
            )}

            <div
              className="flex items-center h-10 py-2 hover:cursor-pointer"
              onClick={handleOpenTodoManagement}
            >
              <FontAwesomeIcon className="px-3" icon={faUserGear} />
              Quản lý công việc
              <FontAwesomeIcon
                className="ml-auto mr-4"
                icon={isOpenTodoManagement ? faAngleDown : faAngleRight}
              />
            </div>

            {isOpenTodoManagement && (
              <div
                className="flex items-center h-8 hover:cursor-pointer"
                onClick={handleOpenTodoModal}
              >
                <FontAwesomeIcon className="pl-8 pr-3" icon={faFolder} />
                Công việc
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
