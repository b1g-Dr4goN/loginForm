import { Autocomplete, styled } from "@mui/material";

const CssAutocomplete = styled(Autocomplete)({
  "& label": {
    fontSize: "13px",
    marginTop: "-8px",
  },

  "& .Mui-focused label": {
    marginTop: "0px",
  },

  "& .MuiInputBase-root": {
    height: "32px",
  },

  "& .MuiInputBase-input": {
    fontSize: "12px",
    padding: "10px",
  }
});

export default CssAutocomplete;
