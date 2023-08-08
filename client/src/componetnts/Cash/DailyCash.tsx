import {
  TableContainer,
  Table,
  TableHead,
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
import axios from "axios";
import { API } from "../../config/config";
import moment from "moment";
import { useDispatch } from "react-redux";
import { confirmCashAmount, deleteCash } from "../../actions/authAction";

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

    await axios
      .put(`${API}/cash/update`, {
        cash: cash,
        user: loginUser,
        date: formattedDate,
        time: formattedTime,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = () => {
    setEditingData(cashData);
  };

  const handleDelete = () => {
    dispatch(deleteCash(cashData._id));
    axios.delete(`${API}/cash/delete/${cashData._id}`).catch((error) => {
      console.log(error);
    });
  };

  return (
    <Card key={cashData._id} sx={{ margin: "15px", padding: "10px" }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>{cashData.create.date}</Typography>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </TableCell>
            </TableRow>
          </TableHead>
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
            <TableRow>
              <TableCell>Total: ${cashData.total}</TableCell>
              <TableCell>Customers: {cashData.customers} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {cashData.create.user && (
                  <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: cashData.create.user.color }}>
                      {cashData.create.user.initials}
                    </Avatar>
                    <Typography>{cashData.create.user.firstName}</Typography>
                  </div>
                )}
                {isConfirmed && cashData.update.user && (
                  <div style={{ display: "flex" }}>
                    <Avatar sx={{ bgcolor: cashData.update.user?.color }}>
                      {cashData.update.user.initials}
                    </Avatar>
                    <Typography> {cashData.update.user.firstName}</Typography>
                  </div>
                )}
                {!isConfirmed && (
                  <div>
                    <Button onClick={handleConfirm}>Confirm</Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DailyCash;
