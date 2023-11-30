import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1363BF",
    color: theme.palette.common.white,
    width: "33px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TransactionTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getRecentTransactions = async () => {
      const userid = localStorage.getItem("userid");
      const response = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/recenttransactions`
      );
      setRows(response.data);
    };
    getRecentTransactions();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Date</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="center">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">{row.datetime}</StyledTableCell>
              <StyledTableCell align="center">
                {row.description}
              </StyledTableCell>
              <StyledTableCell>
                <Box display="flex" alignItems="center" justifyContent="center">
                  {row.amount}
                  {row.type == "income" ? (
                    <ArrowCircleUpIcon
                      sx={{
                        color: "green",
                        marginLeft: "10px",
                        textAlign: "center",
                      }}
                    />
                  ) : (
                    <ArrowCircleDownIcon
                      sx={{ color: "red", marginLeft: "10px" }}
                    />
                  )}
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionTable;
