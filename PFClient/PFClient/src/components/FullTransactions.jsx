import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import StyledCell from "./StyledCell";
import Options from "./Options";
import PropTypes from "prop-types";

const columns = [
  { id: "datetime", label: "Date Time", minWidth: 80, align: "center" },
  {
    id: "description",
    label: "Purpose",
    minWidth: 170,
    align: "center",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 70,
    align: "center",
  },
  {
    id: "options",
    label: "",
    minWidth: 50,
    align: "center",
  },
];

function FullTransactions({ transactions }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = transactions.rows;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", my: 2 }}>
      <TableContainer sx={{ maxHeight: 560 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#212121",
                    color: "white",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      const type = row["type"];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id == "amount" ? (
                            <StyledCell prop={{ val: value, type: type }} />
                          ) : column.id == "options" ? (
                            <Options
                              optionProps={{
                                transactionDetails: row,
                                refreshTrnsactions:
                                  transactions.onTransactionAdded,
                                handleClose: transactions.handleClose,
                              }}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

FullTransactions.propTypes = {
  transactions: PropTypes.shape({
    rows: PropTypes.array.isRequired,
    onTransactionAdded: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  }).isRequired,
};

export default FullTransactions;
