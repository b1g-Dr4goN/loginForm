import styled from "styled-components";
import { Select } from "@mui/material";

const CssSelect = styled(Select)({
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
    padding: "7.375px",
  },
});

export default CssSelect;