import {
  Box,
  Card,
  CardActions,
  Button,
  CardContent,
  Typography,
  Divider,
  CardHeader,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Backdrop,
  Fade,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {axios} from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

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

function GoalCards({ cardProps }) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };
  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleUpdateSubmitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const purpose = data.get("purpose");
    const amount = data.get("amount");
    const goalPeriod = data.get("goalPeriod");
    const percentageOfSavings = data.get("percentageOfSavings");
    if (
      title.length > 0 &&
      purpose.length > 0 &&
      amount.length > 0 &&
      goalPeriod.length > 0 &&
      percentageOfSavings.length > 0
    ) {
      try {
        const response = await axios.put(
          "http://127.0.0.1:3000/api/goals/goal",
          {
            id: cardProps.row.id,
            userid: localStorage.getItem("userid"),
            title: title,
            purpose: purpose,
            amount: amount,
            goalPeriod: goalPeriod,
            percentageOfSavings: percentageOfSavings,
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
        cardProps.getProgressGoals();
        handleUpdateClose();
      } catch (error) {
        console.log(error.message);
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

  const handleDelete = async () => {
    try {
      const id = cardProps.row.id;
      const userid = localStorage.getItem("userid");
      const response = await axios.delete(
        `http://127.0.0.1:3000/api/goals/${userid}/goal/${id}`
      );
      cardProps.getProgressGoals();
      handleClose();
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
  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          m: 1,
          width: "30%",
          backgroundColor:
            cardProps.row.status == "inprogress"
              ? "rgba(230,230,230,0.4)"
              : cardProps.row.status == "incomplete"
              ? "rgba(239,83,80,0.7)"
              : "rgba(165,214,167,0.7)",
        }}
      >
        <CardHeader
          title={cardProps.row.title}
          subheader={cardProps.row.purpose}
        />
        <Divider />
        <CardContent>
          <Box sx={{ m: 1 }}>
            <Typography>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Amount:
              </Typography>{" "}
              ${cardProps.row.amount}
            </Typography>
            <Typography>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Goal Period:
              </Typography>{" "}
              {cardProps.row.goalperiod} months
            </Typography>
            <Typography>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Amount per Month:
              </Typography>{" "}
              ${cardProps.row.amountpermonth.toFixed(2)}
            </Typography>
            <Typography>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Amount Saved:
              </Typography>{" "}
              ${cardProps.row.amountsaved.toFixed(2)}
            </Typography>
            <Typography>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                % of Savings:
              </Typography>{" "}
              {cardProps.row.percentageofsavings}%
            </Typography>
            <Typography>
              <Typography sx={{ display: "inline", fontWeight: 500 }}>
                Created On:
              </Typography>{" "}
              {cardProps.row.createdon}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{
            m: 1,
            display: cardProps.row.status == "inprogress" ? "flex" : "none",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon color="blue" />}
            sx={{ width: "50%" }}
            onClick={handleUpdateOpen}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon color="red" />}
            sx={{ width: "50%" }}
            onClick={handleOpen}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
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
                <Typography variant="body1">Enter Goal Details</Typography>
              </Box>

              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of the Goal"
                name="title"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={cardProps.row.title}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="purpose"
                label="Purpose of the Goal"
                name="purpose"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={cardProps.row.purpose}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="amount"
                label="Amount ($)"
                name="amount"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={cardProps.row.amount}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="goalPeriod"
                label="Goal Period (in months)"
                name="goalPeriod"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={cardProps.row.goalperiod}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="percentageOfSavings"
                label="Percentage of savings towards this goal"
                name="percentageOfSavings"
                autoFocus
                sx={{ my: "10px" }}
                defaultValue={cardProps.row.percentageofsavings}
              />

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
    </>
  );
}

GoalCards.propTypes = {
  cardProps: PropTypes.shape({
    row: PropTypes.object.isRequired,
    getProgressGoals: PropTypes.func.isRequired,
  }).isRequired,
};

export default GoalCards;
