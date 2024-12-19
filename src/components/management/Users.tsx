import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { InputAdornment, TableHead, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenClip,
  faPlus,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <>Trang {page + 1}</>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  id: string,
  userName: string,
  name: string,
  userId: string,
  phoneNumber: string,
  department: string,
  object: string,
  academicRank: string,
  systemRank: number | undefined,
  status: string
) {
  return {
    id,
    userName,
    name,
    userId,
    phoneNumber,
    department,
    object,
    academicRank,
    systemRank,
    status,
  };
}

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

const rows = [
  createData(
    "1",
    "sysadmin",
    "SYSADMIN",
    "sysadmin",
    "",
    "Phòng IT",
    "SYSADMIN",
    "",
    0,
    "Hoạt động"
  ),
  createData(
    "2",
    "bscdha1",
    "Nhữ Anh Hùng",
    "bscdha1",
    "",
    "Khoa CĐHA",
    "IMAGING_DOCTOR",
    "",
    undefined,
    "Hoạt động"
  ),
  createData(
    "4",
    "phuonghoa",
    "Nguyễn Phương Hoa",
    "phuonghoa",
    "",
    "",
    "",
    "",
    2,
    "Hoạt động"
  ),
  createData(
    "5",
    "anhbth",
    "Bùi Thị Hà Anh",
    "anhbth",
    "",
    "",
    "",
    "",
    0,
    "Hoạt động"
  ),
  createData(
    "6",
    "BinhNT2",
    "Nguyễn Thái Bình",
    "BinhNT2",
    "",
    "",
    "",
    "",
    1,
    "Hoạt động"
  ),
  createData(
    "8",
    "ktv",
    "Kỹ thuật viên",
    "ktv",
    "",
    "",
    "",
    "",
    0,
    "Hoạt động"
  ),
];

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
  return (
    <div className="w-10/12 flex flex-col gap-3 mx-auto">
      <div className="h-10 font-semibold content-center ml-3 mr-auto border-b-[0.5px] border-teal-600">
        NGƯỜI DÙNG
      </div>
      <div className="self-center w-11/12">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1200 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} sx={{ padding: "0 16px" }}>
                  <FontAwesomeIcon
                    className="size-4 hover:text-teal-600 mr-5 mt-1"
                    title="Làm mới (Alt + F5)"
                    icon={faRotateRight}
                  />
                  <FontAwesomeIcon
                    className="size-4 hover:text-teal-600 mr-5 mt-1"
                    title="Tạo mới"
                    icon={faPlus}
                  />
                  <FontAwesomeIcon
                    className="size-4 hover:text-teal-600 mr-5 mt-1"
                    title="Sửa"
                    icon={faPenClip}
                  />
                  <FontAwesomeIcon
                    className="size-4 hover:text-teal-600 mt-1"
                    title="Xoá"
                    icon={faTrash}
                  />
                </TableCell>
                <TablePagination
                  rowsPerPageOptions={[
                    { label: "5 users", value: 5 },
                    { label: "10 users", value: 10 },
                    { label: "25 users", value: 25 },
                    { label: "Tất cả", value: -1 },
                  ]}
                  colSpan={5}
                  count={rows.length}
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
              <TableRow className="bg-teal-300">
                {header.map((val) => (
                  <TableCell
                    className="border-x-[0.5px]"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {val}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((user) => (
                <TableRow key={user.id} className="hover:bg-teal-100">
                  <TableCell
                    className="border-x-[0.5px]"
                    sx={{ textAlign: "center" }}
                  >
                    {user.id}
                  </TableCell>
                  <TableCell className="border-x-[0.5px] min-w-32">
                    {user.userName}
                  </TableCell>
                  <TableCell className="border-x-[0.5px]">
                    {user.name}
                  </TableCell>
                  <TableCell className="border-x-[0.5px]">
                    {user.userId}
                  </TableCell>
                  <TableCell className="border-x-[0.5px]">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell className="border-x-[0.5px]">
                    {user.department}
                  </TableCell>
                  <TableCell className="border-x-[0.5px]">
                    {user.object}
                  </TableCell>
                  <TableCell className="border-x-[0.5px]">
                    {user.academicRank}
                  </TableCell>
                  <TableCell
                    className="border-x-[0.5px]"
                    sx={{ textAlign: "center" }}
                  >
                    {user.systemRank}
                  </TableCell>
                  <TableCell
                    className="border-x-[0.5px]"
                    sx={{ textAlign: "center" }}
                  >
                    {user.status}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Users;
