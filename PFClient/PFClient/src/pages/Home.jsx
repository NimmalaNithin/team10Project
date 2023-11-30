import { Box, Stack } from "@mui/material";
import BannerCard from "../components/BannerCard";
import TransactionTable from "../components/TransactionTable";
import SavingsIcon from "@mui/icons-material/Savings";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import axios from "axios";

const StyledSavingsIcon = styled(SavingsIcon)({
  color: "#f0f0f0",
});
const StyledArrowCircleUpIcon = styled(ArrowCircleUpIcon)({
  color: "#f0f0f0",
});
const StyledArrowCircleDownIcon = styled(ArrowCircleDownIcon)({
  color: "#f0f0f0",
});

function Home() {
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [currentMonthSavings, setCurrentMonthSavings] = useState(0);
  const [monthlyIncomes, setMonthlyIncomes] = useState({});
  const [monthlyExpenses, setMonthlyExpenses] = useState({});
  const [monthlySavings, setMonthlySavings] = useState({});

  useEffect(() => {
    const getCurrentMonthIncome = async () => {
      const userid = localStorage.getItem("userid");
      const montlyIncomeResponse = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/currentmonthincome`
      );
      if (montlyIncomeResponse.data[0]["monthlyeis"]) {
        setCurrentMonthIncome(montlyIncomeResponse.data[0]["monthlyeis"]);
      }
    };

    const getCurrentMonthExpense = async () => {
      const userid = localStorage.getItem("userid");
      const montlyExpenseResponse = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/currentmonthexpense`
      );
      if (montlyExpenseResponse.data[0]["monthlyeis"]) {
        setCurrentMonthExpense(montlyExpenseResponse.data[0]["monthlyeis"]);
      }
    };

    const getCurrentMonthSavings = async () => {
      const userid = localStorage.getItem("userid");
      const montlySavingsResponse = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/currentmonthsavings`
      );
      setCurrentMonthSavings(montlySavingsResponse.data);
    };

    const getMonthlyIncomes = async () => {
      const userid = localStorage.getItem("userid");
      const montlyIncomesResponse = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/monthlyincomes`
      );
      setMonthlyIncomes(montlyIncomesResponse.data);
    };

    const getMonthlyExpenses = async () => {
      const userid = localStorage.getItem("userid");
      const montlyExpensesResponse = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/monthlyexpenses`
      );
      setMonthlyExpenses(montlyExpensesResponse.data);
    };

    const getMonthlySavings = async () => {
      const userid = localStorage.getItem("userid");
      const montlySavingsResponse = await axios.get(
        `http://127.0.0.1:3000/api/transactions/${userid}/monthlysavings`
      );
      setMonthlySavings(montlySavingsResponse.data);
    };

    getCurrentMonthIncome();
    getCurrentMonthExpense();
    getCurrentMonthSavings();
    getMonthlyIncomes();
    getMonthlyExpenses();
    getMonthlySavings();
  }, []);

  const incomeProp = {
    heading: "Income",
    bgColor: "green",
    amount: parseFloat(currentMonthIncome), // amt from api call
    monthlyEIS: monthlyIncomes, //api call
    icon: <StyledArrowCircleUpIcon />,
  };
  const expenseProp = {
    heading: "Expense",
    bgColor: "red",
    amount: parseFloat(currentMonthExpense), // amt from api call
    monthlyEIS: monthlyExpenses, //api call
    icon: <StyledArrowCircleDownIcon />,
  };
  const savingProp = {
    heading: "Savings",
    bgColor: "grey",
    amount: parseFloat(currentMonthSavings), // amt from api call
    monthlyEIS: monthlySavings, //api call
    icon: <StyledSavingsIcon />,
  };
  return (
    <Box m={4} width="100%">
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        justifyContent="space-between"
      >
        <BannerCard bannerProps={incomeProp} />
        <BannerCard bannerProps={expenseProp} />
        <BannerCard bannerProps={savingProp} />
      </Stack>

      <Box sx={{ display: "flex", py: 2 }}>
        <TransactionTable />
      </Box>
    </Box>
  );
}

export default Home;
