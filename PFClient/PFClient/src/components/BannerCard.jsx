import { Box, Card, CardContent, Icon, Typography } from "@mui/material";
import PropTypes from "prop-types";
import LineGraph from "./LineGraph";

function BannerCard({ bannerProps }) {
  const lineProps = {
    type: bannerProps.heading,
    months: bannerProps.months,
    EIS: bannerProps.monthlyEIS,
  };
  const card = (
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        p: 2,
        "&:last-child": { pb: 2 },
      }}
    >
      <Box>
        <Typography sx={{ fontSize: { xs: 18, sm: 22 } }} color="white">
          {bannerProps.heading}
        </Typography>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontSize: { xs: 24, sm: 26 },
              fontWeight: { xs: "medium", sm: "bold" },
            }}
            color="white"
          >
            {bannerProps.amount >= 0
              ? `$${bannerProps.amount}`
              : `-$${-1 * bannerProps.amount}`}
          </Typography>
          <Icon sx={{ px: 1 }}>{bannerProps.icon}</Icon>
        </Box>
      </Box>
      <Box>
        <LineGraph graphData={lineProps} />
      </Box>
    </CardContent>
  );

  return (
    <Box flex={1}>
      <Card variant="outlined" sx={{ backgroundColor: bannerProps.bgColor }}>
        {card}
      </Card>
    </Box>
  );
}

BannerCard.propTypes = {
  bannerProps: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    months: PropTypes.array.isRequired,
    monthlyEIS: PropTypes.array.isRequired,
    icon: PropTypes.element.isRequired,
  }).isRequired,
};

export default BannerCard;
