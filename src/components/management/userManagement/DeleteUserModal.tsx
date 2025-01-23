import { Box, Button, Fade, Modal } from "@mui/material";
import { TUserSchema } from "../../../libs/UserType";
import { Dispatch, SetStateAction } from "react";
import CssButton from "../../formComponents/button";
import axiosDeleteUser from "../../../APIs/userAPI/deleteUser";
import toast from "react-hot-toast";

type props = {
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
};

const DeleteUserModal = ({
  selectedRowValue,
  isShowModal,
  handleCloseModal,
  handleReload,
  setSelectedRow,
  setSelectedRowValue,
}: props) => {
  const handleCloseDeleteModal = () => {
    handleCloseModal();
    setSelectedRow(-1);
    setSelectedRowValue(undefined);
  };

  const handleDeleteUser = async () => {
    try {
      const res = await axiosDeleteUser(selectedRowValue?.userId || -1);
      if (res) {
        toast.success("Xóa nguời dùng thành công!");
        handleCloseDeleteModal();
      }
    } catch (err) {
      console.log(err);
    } finally {
      handleReload();
    }
  };

  return (
    <Modal open={isShowModal} onClose={handleCloseModal}>
      <Fade in={isShowModal} timeout={200}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "40%",
            left: "40%",
            height: "150px",
            width: "300px",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "8px",
          }}
        >
          <div className="h-10 flex items-center justify-center rounded-lg rounded-b-none bg-teal-300 border-x-[0.5px] border-y-[0.5px] border-gray-400">
            XOÁ NGƯỜI DÙNG
          </div>

          <div className="text-xs text-center my-1">
            Bạn có chắc chắn muốn xoá người dùng
          </div>

          <div className="text-md text-center font-semibold">
            {selectedRowValue.fullName} - {selectedRowValue.username}?
          </div>

          <div className="flex justify-between mx-3 mb-3 mt-auto">
            <Button
              variant="contained"
              className="self-end"
              color="error"
              onClick={handleDeleteUser}
            >
              XOÁ
            </Button>

            <CssButton
              variant="outlined"
              className="self-end"
              onClick={handleCloseDeleteModal}
            >
              HUỶ
            </CssButton>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteUserModal;
