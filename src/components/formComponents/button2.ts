import { Button, styled } from "@mui/material";

const CssButton2 = styled(Button)({
  color: '#e0e0e0',
  borderColor: '#008080',
  backgroundColor: '#008080',

  '&:hover': {
    backgroundColor: '#00A0A0',
    borderColor: '#00A0A0',
    color: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },

  '&.Mui-disabled': {
    backgroundColor: '#e0e0e0',
    color: '#a0a0a0',
  },

  '&:focus': {
    outline: '2px solid #e0e0e0',
    outlineOffset: '2px',
  },

  '&:active': {
    backgroundColor: '#00A0A0',
  },
});

export default CssButton2;