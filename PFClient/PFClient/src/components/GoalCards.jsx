import {
  Box,
  Card,
  CardActions,
  Button,
  CardContent,
  Typography,
  Divider,
  CardHeader,
} from "@mui/material";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function GoalCards({ cardProps }) {
  return (
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
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteOutlineIcon color="red" />}
          sx={{ width: "50%" }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

GoalCards.propTypes = {
  cardProps: PropTypes.shape({
    row: PropTypes.object.isRequired,
  }).isRequired,
};

export default GoalCards;
