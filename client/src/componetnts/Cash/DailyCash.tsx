import {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import {
  SavedMoneyHistoryType,
  UserType,
  initialUserState,
} from "../../types/types";
import { useEffect, useState } from "react";
import { API } from "../../config/config";
import moment from "moment";
import { useDispatch } from "react-redux";
import { confirmCashAmount, deleteCash } from "../../actions/action";

interface CashHistoriesProps {
  cash: SavedMoneyHistoryType;
  setEditingData: React.Dispatch<React.SetStateAction<SavedMoneyHistoryType>>;
}

const DailyCash: React.FC<CashHistoriesProps> = ({ cash, setEditingData }) => {
  let loginUser: UserType = initialUserState;
  const userFromStorage = localStorage.getItem("user");
  if (userFromStorage !== null) {
    loginUser = JSON.parse(userFromStorage);
  }
  const [cashData, setCashData] = useState(cash);
  const [isConfirmed, setIsConfirmed] = useState(
    cash.update && cash.update.date !== "" ? true : false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setCashData(cash);
  }, [cash]);

  const handleConfirm = async () => {
    const date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const formattedTime = moment(date).format("hh:mm");
    setIsConfirmed(true);

    const newData = {
      ...cash,
      update: {
        date: formattedDate,
        time: formattedTime,
        user: loginUser,
      },
    };

    setCashData(newData);
    dispatch(confirmCashAmount(newData));

    API.put("/cash/update", {
      cash: cash,
      user: loginUser,
      date: formattedDate,
      time: formattedTime,
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleEdit = () => {
    setEditingData(cashData);
  };

  const handleDelete = () => {
    dispatch(deleteCash(cashData._id));
    API.delete(`/cash/delete/${cashData._id}`).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Card
      key={cashData._id}
      sx={{ marginTop: "10px", padding: "10px", width: "300px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>{cashData.create.date}</Typography>
        <div>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {cashData.dollars.map((dollar) => (
              <TableRow key={dollar.name}>
                <TableCell align="center" scope="dollar">
                  {dollar.name}
                </TableCell>

                <TableCell align="center" scope="dollar">
                  {dollar.quantity}
                </TableCell>
                <TableCell align="center" scope="dollar">
                  {dollar.totalAmount}
                </TableCell>
              </TableRow>
            ))}
            {cashData.cents.map((cent) => (
              <TableRow key={cent.name}>
                <TableCell align="center" scope="cent">
                  {cent.name}
                </TableCell>
                <TableCell align="center">{cent.quantity}</TableCell>
                <TableCell align="center">
                  {cent.totalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Total: ${cashData.total}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Customers: {cashData.customers}
          </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          {cashData.create.user && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography>{cashData.create.user.firstName}</Typography>
              <Avatar
                sx={{
                  bgcolor: cashData.create.user.color,
                  margin: "5px",
                }}
              >
                {cashData.create.user.initials}
              </Avatar>
            </div>
          )}
          {isConfirmed && cashData.update.user && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography> {cashData.update.user.firstName}</Typography>
              <Avatar
                sx={{
                  bgcolor: cashData.update.user?.color,
                  margin: "5px",
                }}
              >
                {cashData.update.user.initials}
              </Avatar>
            </div>
          )}
          {!isConfirmed && (
            <div>
              <Button onClick={handleConfirm}>Confirm</Button>
            </div>
          )}
        </div>
      </TableContainer>
    </Card>
  );
};

export default DailyCash;
