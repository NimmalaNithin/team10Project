import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  MenuItem,
  Modal,
  Fade,
  Typography,
  Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Options({ optionProps }) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [type, setType] = useState(optionProps.transactionDetails.type);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const type = event.target.value;
    setType(type);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleDelete = async () => {
    try {
      const id = optionProps.transactionDetails.id;
      const userid = localStorage.getItem("userid");
      console.log(typeof userid, typeof id);
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/transactions/${userid}/transaction/${id}`
      );
      optionProps.refreshTrnsactions();
      optionProps.handleClose();
      toast.success(response.data, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      handleClose();
    } catch (error) {
      console.log(error);
      toast.error("OOPS there is some error...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleUpdateSubmitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const description = data.get("description");
    const amount = data.get("amount");
    const type = data.get("type");
    if (description.length > 0 && amount.length > 0 && type.length > 0) {
      try {
        const response = await axios.put(
          "http://127.0.0.1:3000/api/transactions/transaction",
          {
            description: description,
            amount: amount,
            type: type,
            userid: localStorage.getItem("userid"),
            id: optionProps.transactionDetails.id,
          }
        );
        toast.success(response.data, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        optionProps.refreshTrnsactions();
        handleUpdateClose();
      } catch (error) {
        console.log(error);
        toast.error("OOPS there is some error...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Fill all details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <IconButton aria-label="edit" size="small" onClick={handleUpdateOpen}>
        <EditIcon fontSize="inherit" sx={{ color: "#616161" }} />
      </IconButton>
      <IconButton aria-label="delete" size="small" onClick={handleClickOpen}>
        <DeleteIcon fontSize="inherit" sx={{ color: "#dd2c00" }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="title">{"Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            Are you sure, want to delete the transaction ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={openUpdate}
        onClose={handleUpdateClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openUpdate}>
          <Box sx={style}>
            <form onSubmit={handleUpdateSubmitForm}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "15px",
                  backgroundColor: "#212121",
                  border: 1,
                  borderColor: "#212121",
                  color: "white",
                  p: "10px",
                  my: "10px",
                }}
              >
                <Typography variant="body1">
                  Enter Transaction Details
                </Typography>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Purpose of Transaction"
                name="description"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={optionProps.transactionDetails.description}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount"
                name="amount"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={optionProps.transactionDetails.amount}
              />
              <Box sx={{ my: "5px" }}>
                <TextField
                  select
                  id="type"
                  name="type"
                  value={type}
                  label="Type of Transaction"
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </TextField>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  my: "25px",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mx: "10px" }}
                  onClick={handleUpdateClose}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit" color="success">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

Options.propTypes = {
  optionProps: PropTypes.shape({
    transactionDetails: PropTypes.object.isRequired,
    refreshTrnsactions: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  }).isRequired,
};

export default Options;
