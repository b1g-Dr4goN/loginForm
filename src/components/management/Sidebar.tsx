import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleDown,
  faUserGear,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  showUsers: boolean;
  setShowUsers: (value: boolean) => void;
}

const Sidebar = ({ showUsers, setShowUsers }: SidebarProps) => {
  const [isOpenMenu, setOpenMenu] = useState(false);

  const [isOpenUserManagement, setOpenUserManagement] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu((menu) => !menu);
  };

  const handleOpenUserManagement = () => {
    setOpenUserManagement((menu) => !menu);
  };

  const handleToggleUsersModal = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="flex flex-col items-center w-72 bg-slate-100 border-gray-400 border-x-[0.5px] min-h-screen">
      <div
        className="w-full h-10 px-4 font-semibold text-white bg-teal-700 content-center hover:cursor-pointer"
        onClick={handleOpenMenu}
      >
        QUẢN TRỊ HỆ THỐNG
        <FontAwesomeIcon
          className="float-right my-1"
          icon={isOpenMenu ? faAngleDown : faAngleRight}
        />
      </div>

      {isOpenMenu ? (
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
          {isOpenUserManagement ? (
            <div
              className="flex items-center h-8 hover:cursor-pointer"
              onClick={handleToggleUsersModal}
            >
              <FontAwesomeIcon className="pl-8 pr-3" icon={faFolder} />
              Người dùng
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Sidebar;
