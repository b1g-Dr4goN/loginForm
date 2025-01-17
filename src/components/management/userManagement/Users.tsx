import { useEffect, useState } from "react";
import { InputAdornment, TableHead, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenClip,
  faPlus,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { TUserSchema } from "../../../libs/UserType";
import { ClipLoader } from "react-spinners";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../Sidebar";
import TablePaginationActions from "./UserTablePagination";
import axiosGetAllUsers from "../../../APIs/userAPI/getAllUsers";
import toast from "react-hot-toast";
import axiosDeleteUser from "../../../APIs/userAPI/deleteUser";
import UpdateUserModal from "./UpdateUserModal";
import CreateUserModal from "./CreateUserModal";
import Header from "../../Header";

const header = [
  "ID",
  "Tên đăng nhập",
  "Tên người dùng",
  "Mã người dùng",
  "Số điện thoại",
  "Khoa phòng",
  "Đối tượng",
  "Học vị",
  "Cấp hệ thống",
  "Trạng thái",
];

const Users = () => {
  const [rows, setRows] = useState<TUserSchema[]>([]);
  const [page, setPage] = useState(0);
  const [userCnt, setUserCnt] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await axiosGetAllUsers(page, rowsPerPage);
      setRows(users.content);
      setUserCnt(users.page.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  const handleReload = () => {
    fetchUsers();
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedRowValue, setSelectedRowValue] = useState<TUserSchema>();

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (idx: number) => {
    if ((selectedRow !== -1 && idx === selectedRow) || idx === -1) {
      setSelectedRow(-1);
      setSelectedRowValue(undefined);
    } else {
      setSelectedRow(idx);
      setSelectedRowValue(rows[idx]);
    }
  };

  const handleOpenCreateModal = () => {
    setIsShowCreateModal(true);
  };

  const handleOpenUpdateModal = () => {
    if (selectedRow !== -1) {
      setIsShowUpdateModal(true);
    } else {
      toast.error("Chọn một người dùng để sửa!");
    }
  };

  const handleCloseCreateModal = () => {
    setIsShowCreateModal(false);
  };

  const handleCloseUpdateModal = () => {
    setIsShowUpdateModal(false);
  };

  const handleDeleteUser = async () => {
    if (selectedRow === -1) {
      toast.error("Chọn một người dùng để xóa!");
    } else {
      try {
        const res = await axiosDeleteUser(selectedRowValue?.userId || -1);
        if (res) {
          toast.success("Xóa nguời dùng thành công!");
        }
      } catch (err) {
        console.log(err);
      } finally {
        handleReload();
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-slate-200 flex flex-row">
        <Sidebar />
        <div className="w-[83.33%] flex flex-col gap-3 mx-auto">
          <div className="h-10 font-semibold content-center ml-3 mr-auto border-b-[0.5px] border-teal-600">
            NGƯỜI DÙNG
          </div>
          <div className="self-center w-full z-0">
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 666, zIndex: 1000 }}
            >
              <Table
                sx={{ minWidth: 1200 }}
                aria-label="custom pagination table sticky"
              >
                <TableHead
                  sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                  }}
                >
                  <TableRow className="bg-white">
                    <TableCell colSpan={2} sx={{ padding: "0 16px" }}>
                      <FontAwesomeIcon
                        className="size-4 hover:text-teal-600 mr-5 mt-1"
                        title="Làm mới (Alt + F5)"
                        icon={faRotateRight}
                        onClick={handleReload}
                      />
                      <FontAwesomeIcon
                        className="size-4 hover:text-teal-600 mr-5 mt-1"
                        title="Tạo mới"
                        icon={faPlus}
                        onClick={handleOpenCreateModal}
                      />
                      <FontAwesomeIcon
                        className={`size-4 mr-5 mt-1 ${
                          selectedRow === -1
                            ? "text-slate-400"
                            : "hover:text-teal-600 text-slate-900"
                        }`}
                        title="Sửa"
                        icon={faPenClip}
                        onClick={handleOpenUpdateModal}
                      />
                      <FontAwesomeIcon
                        className={`size-4 mt-1 ${
                          selectedRow === -1
                            ? "text-slate-400"
                            : "hover:text-teal-600 text-slate-900"
                        }`}
                        title="Xoá"
                        icon={faTrash}
                        onClick={handleDeleteUser}
                      />
                    </TableCell>
                    <TablePagination
                      rowsPerPageOptions={[
                        { label: "5 users", value: 5 },
                        { label: "10 users", value: 10 },
                        { label: "25 users", value: 25 },
                        // { label: "Tất cả", value: -1 },
                      ]}
                      colSpan={5}
                      count={userCnt}
                      labelRowsPerPage="Hiển thị / 1 trang:"
                      labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} tổng số ${
                          count !== -1 ? count : `nhiều hơn ${to}`
                        }`
                      }
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        },
                      }}
                      sx={{ justifyItems: "center", padding: "0 16px" }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                    <TableCell colSpan={3} sx={{ padding: "0 16px" }}>
                      <TextField
                        className="w-full"
                        size="small"
                        placeholder="Người dùng"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </InputAdornment>
                          ),
                        }}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-teal-400">
                    {header.map((val, idx) => (
                      <TableCell
                        key={idx}
                        className="border-x-[0.5px]"
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {val}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow className="h-56">
                      <TableCell colSpan={10}>
                        <p className="flex items-center">
                          <ClipLoader
                            className="ml-auto mr-auto"
                            size={35}
                            color="#36d7b7"
                          />
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((user, idx) => (
                      <TableRow
                        key={user.userId}
                        className={`hover:bg-teal-100 cursor-pointer ${
                          selectedRow === idx
                            ? "bg-teal-200 hover:bg-teal-200"
                            : ""
                        }`}
                        onClick={() => handleSelectRow(idx)}
                      >
                        <TableCell
                          className="border-x-[0.5px]"
                          sx={{ textAlign: "center" }}
                        >
                          {page * rowsPerPage + idx + 1}
                        </TableCell>
                        <TableCell className="border-x-[0.5px] min-w-32">
                          {user.username}
                        </TableCell>
                        <TableCell className="border-x-[0.5px]">
                          {user.fullName}
                        </TableCell>
                        <TableCell className="border-x-[0.5px]">
                          {user.userId}
                        </TableCell>
                        <TableCell className="border-x-[0.5px]">
                          {user.phone}
                        </TableCell>
                        <TableCell className="border-x-[0.5px]">
                          {user.facultyOrDepartment}
                        </TableCell>
                        <TableCell className="border-x-[0.5px]">
                          {user.subject}
                        </TableCell>
                        <TableCell className="border-x-[0.5px]">
                          {user.degreeName}
                        </TableCell>
                        <TableCell
                          className="border-x-[0.5px]"
                          sx={{ textAlign: "center" }}
                        >
                          {user.systemLevel}
                        </TableCell>
                        <TableCell
                          className="border-x-[0.5px]"
                          sx={{ textAlign: "center" }}
                        >
                          {user.status ? "Hoạt động" : "Đã nghỉ"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {selectedRowValue && isShowUpdateModal && (
              <UpdateUserModal
                selectedRowValue={selectedRowValue}
                setSelectedRow={setSelectedRow}
                setSelectedRowValue={setSelectedRowValue}
                isShowModal={isShowUpdateModal}
                handleCloseModal={handleCloseUpdateModal}
              />
            )}

            {isShowCreateModal && (
              <CreateUserModal
                isShowModal={isShowCreateModal}
                handleCloseModal={handleCloseCreateModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
