import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  Container,
  FormControl,
  TextField,
  Typography,
  Modal,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import {
  MoneyType,
  SavedMoneyHistoryType,
  UserType,
  initialCashState,
  initialUserState,
  initialDollars,
  initialCents,
} from "../../types/types";
import { API } from "../../config/config";
import moment from "moment";
import { registerCashAmount, editCashAmount } from "../../actions/action";

interface MoneyCalculatorProps {
  editingData: SavedMoneyHistoryType;
  setEditingData: React.Dispatch<React.SetStateAction<SavedMoneyHistoryType>>;
}

const MoneyCalculator: React.FC<MoneyCalculatorProps> = ({
  editingData,
  setEditingData,
}) => {
  const dispatch = useDispatch();
  const [dollarsInput, setDollarsInput] = useState<MoneyType[]>(initialDollars);
  const [centsInput, setCentsInput] = useState<MoneyType[]>(initialCents);
  const [customersInput, setCustomersInput] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setDollarsInput(editingData.dollars);
    setCentsInput(editingData.cents);
    setCustomersInput(editingData.customers);
  }, [editingData]);

  const handleDollarsInputChange = (event: {
    target: {
      name: any;
      value: any;
    };
  }) => {
    const { name, value } = event.target;
    const total = parseInt(value) * parseInt(name);

    setDollarsInput((prevDollars) => {
      return prevDollars.map((dollar) =>
        dollar.value === parseInt(name)
          ? { ...dollar, quantity: parseInt(value), totalAmount: total }
          : dollar
      );
    });
  };

  const handleCentsInputChange = (event: {
    target: {
      name: any;
      value: any;
    };
  }) => {
    const { name, value } = event.target;
    const total = parseInt(value) * parseFloat(name);

    setCentsInput((prevCents) => {
      return prevCents.map((cent) =>
        cent.value === parseFloat(name)
          ? { ...cent, quantity: parseInt(value), totalAmount: total }
          : cent
      );
    });
  };

  const handleCustomersChange = (event: {
    target: {
      value: any;
    };
  }) => {
    const { value } = event.target;
    setCustomersInput(value);
  };

  const handleCalculateClick = () => {
    let totaldollars = 0;
    let totalcents = 0;

    for (let dollar of dollarsInput) {
      const quantity = dollar.quantity || 0;
      totaldollars += dollar.value * quantity;
    }
    for (let cent of centsInput) {
      const quantity = cent.quantity || 0;
      totalcents += cent.value * quantity;
    }

    const totalAmount = totaldollars + totalcents;
    setTotalAmount(totalAmount);

    setModalOpen(true);
  };

  const handleReset = () => {
    setEditingData(initialCashState);
    setDollarsInput(initialDollars);
    setCentsInput(initialCents);
    setCustomersInput(0);
  };

  const handleSubmit = () => {
    let loginUser: UserType = initialUserState;
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage !== null) {
      loginUser = JSON.parse(userFromStorage);
    }
    const date = new Date();
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const formattedTime = moment(date).format("hh:mm");

    const sendData = {
      customers: customersInput,
      dollars: dollarsInput,
      cents: centsInput,
      total: totalAmount,
      create: { user: loginUser, date: formattedDate, time: formattedTime },
      update:
        editingData?._id !== ""
          ? editingData.update
          : {
              user: initialUserState,
              date: "",
              time: "",
            },
      _id: editingData?._id !== "" ? editingData._id : "",
    };

    if (editingData?._id !== "") {
      dispatch(editCashAmount(sendData));
      API.put("/cash/edit", sendData).catch((error) => console.log(error));
    } else {
      dispatch(registerCashAmount(sendData));
      API.post("/cash/register", sendData).catch((error) => console.log(error));
    }

    setModalOpen(false);
    handleReset();
  };

  return (
    <Card sx={{ margin: "10px 0", height: "100%" }}>
      <div>
        <Typography margin={2}>
          {editingData._id !== "" ? "Edit" : "Register"} Cash Amounts
        </Typography>
        <Container sx={{ display: "flex" }}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            {dollarsInput.map((dollar) => (
              <div className="input-area" key={dollar.value}>
                <TextField
                  type="number"
                  id={dollar.name}
                  label={dollar.name}
                  name={dollar.value.toString()}
                  value={dollar.quantity || ""}
                  onChange={handleDollarsInputChange}
                  sx={{ margin: "5px" }}
                  size="small"
                />
              </div>
            ))}

            {centsInput.map((cent) => (
              <div key={cent.value}>
                <TextField
                  type="number"
                  id={cent.name}
                  label={cent.name}
                  name={cent.value.toString()}
                  inputProps={{
                    step: cent.value,
                    min: "0",
                  }}
                  value={cent.quantity === 0 ? "" : cent.quantity}
                  onChange={handleCentsInputChange}
                  sx={{ margin: "5px" }}
                  size="small"
                />
              </div>
            ))}
            <div>
              <TextField
                type="number"
                label="Customers"
                name="customers"
                value={customersInput === 0 ? "" : customersInput}
                onChange={handleCustomersChange}
                sx={{ margin: "5px" }}
                size="small"
              />
            </div>
          </FormControl>
        </Container>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={handleCalculateClick}>
            Calculate
          </Button>
          <Button color="secondary" onClick={handleReset}>
            Clear
          </Button>
        </div>
      </div>
      {/* ---------- Modal ---------- */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ width: "50vw" }}
      >
        <Card>
          <TableContainer sx={{ margin: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Denomination</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dollarsInput.map((dollar) => (
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
                {centsInput.map((cent) => (
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
          </TableContainer>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Total: ${totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Customers:{customersInput}
          </Typography>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      </Modal>
    </Card>
  );
};

export default MoneyCalculator;
