const login = "select id from userdetails where email = $1 and password = $2";
const getUserFirstNameByUserId =
  "select first_name from userdetails where id = $1";
const registeruser =
  "insert into userdetails (first_name,last_name,email,password) values ($1,$2,$3,$4)";

module.exports = {
  login,
  getUserFirstNameByUserId,
  registeruser,
};
