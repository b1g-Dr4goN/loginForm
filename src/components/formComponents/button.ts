import { Button, styled } from "@mui/material";

const CssButton = styled(Button)({
  color: '#008080',
  borderColor: '#008080',

  '&:hover': {
    backgroundColor: '#008080',
    borderColor: '#008080',
    color: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },

  '&.Mui-disabled': {
    backgroundColor: '#e0e0e0',
    color: '#a0a0a0',
  },

  '&:focus': {
    outline: '2px solid #008080',
    outlineOffset: '2px',
  },

  '&:active': {
    backgroundColor: '#008080',
  },
});

export default CssButton;