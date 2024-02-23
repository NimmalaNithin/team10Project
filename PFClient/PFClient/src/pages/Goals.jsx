import {
  Box,
  Button,
  Typography,
  Divider,
  Modal,
  Fade,
  TextField,
  Backdrop,
} from "@mui/material";
import GoalCards from "../components/GoalCards";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
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

function Goals() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [progressData, setProgressData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [inCompletedData, setInCompletedData] = useState([]);

  const getProgressGoals = async () => {
    const userid = localStorage.getItem("userid");
    const response = await axios.get(
      `http://127.0.0.1:3000/api/goals/${userid}/progressgoals`
    );
    setProgressData(response.data);
  };

  const getCompletedGoals = async () => {
    const userid = localStorage.getItem("userid");
    const response = await axios.get(
      `http://127.0.0.1:3000/api/goals/${userid}/completedgoals`
    );
    setCompletedData(response.data);
  };

  const getInCompletedGoals = async () => {
    const userid = localStorage.getItem("userid");
    const response = await axios.get(
      `http://127.0.0.1:3000/api/goals/${userid}/incompletedgoals`
    );
    setInCompletedData(response.data);
  };

  useEffect(() => {
    getProgressGoals();
    getCompletedGoals();
    getInCompletedGoals();
  }, []);

  const handleSubmitForm = async (event) => {
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
        const response = await axios.post(
          "http://127.0.0.1:3000/api/goals/goal",
          {
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
        getProgressGoals();
        getCompletedGoals();
        getInCompletedGoals();
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleOpen}
          startIcon={<AddIcon />}
        >
          Add Goal
        </Button>
      </Box>
      <Box sx={{ my: 2 }}>
        {progressData.length != 0 ? (
          <Box sx={{ my: 2 }}>
            <Typography variant="h5">Goals in Progress</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {progressData.map((row) => {
                return (
                  <GoalCards
                    key={row.id}
                    cardProps={{
                      row: row,
                      getProgressGoals: getProgressGoals,
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        ) : (
          <></>
        )}
        {completedData.length != 0 ? (
          <>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant="h5">Goals Completed</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {completedData.map((row) => {
                  return <GoalCards key={row.id} cardProps={{ row: row }} />;
                })}
              </Box>
            </Box>
          </>
        ) : (
          <></>
        )}
        {inCompletedData.length != 0 ? (
          <>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant="h5">Goals Incomplete</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {inCompletedData.map((row) => {
                  return <GoalCards key={row.id} cardProps={{ row: row }} />;
                })}
              </Box>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>

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

export default Goals;
