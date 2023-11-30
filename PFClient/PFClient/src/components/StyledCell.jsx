import { PropTypes } from "prop-types";
import { Box } from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

function StyledCell({ prop }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      {prop.val}
      {prop.type == "income" ? (
        <ArrowCircleUpIcon
          sx={{
            color: "green",
            marginLeft: "10px",
            textAlign: "center",
          }}
        />
      ) : (
        <ArrowCircleDownIcon sx={{ color: "red", marginLeft: "10px" }} />
      )}
    </Box>
  );
}

StyledCell.propTypes = {
  prop: PropTypes.shape({
    val: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default StyledCell;
