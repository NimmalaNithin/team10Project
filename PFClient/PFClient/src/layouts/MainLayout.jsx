import { Box, Stack } from "@mui/material";
import Navbar from "../globalComponents/Navbar";
import Aside from "../globalComponents/Aside";

function MainLayout() {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" justifyContent="space-between">
        <Aside />
      </Stack>
    </Box>
  );
}

export default MainLayout;
