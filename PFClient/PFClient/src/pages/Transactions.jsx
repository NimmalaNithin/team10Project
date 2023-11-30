import {
  Box,
  Typography,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullTransactions from "../components/FullTransactions";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

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
}; //

function Transactions() {
  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(true); 
  const handleClose = () => setOpen(false); 
  const [type, setType] = useState(""); 
  const [rows, setRows] = useState([]);

  const getRecentTransactions = async () => {
    const userid = localStorage.getItem("userid");
    const response = await axios.get(
      `http://127.0.0.1:3000/api/transactions/${userid}/alltransactions`
    );
    setRows(response.data);
  };
  useEffect(() => {
    getRecentTransactions();
  }, []);

  const handleChange = (event) => {
    const type = event.target.value;
    setType(type);
  };
  const handleTransactionAdded = () => {
    getRecentTransactions();
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const description = data.get("description");
    const amount = data.get("amount");
    const type = data.get("type");
    if (description.length > 0 && amount.length > 0 && type.length > 0) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/transactions/transaction",
          {
            description: description,
            amount: amount,
            type: type,
            userid: localStorage.getItem("userid"),
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
        handleTransactionAdded();
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
    <Box m={4} width="100%">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Transactions</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Add Transaction
        </Button>
      </Box>
      <FullTransactions
        transactions={{
          rows: rows,
          onTransactionAdded: handleTransactionAdded,
          handleClose: handleClose,
        }}
      />
      
      <Modal
        open={open}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmitForm}>
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
                  onClick={handleClose}
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

export default Transactions;
