import { useState } from "react";
import {
  Button,
  Card,
  Container,
  FormControl,
  TextField,
  Typography,
  Modal,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { MoneyType } from "../../types/types";

const MoneyCalculator = () => {
  const [dollarsInput, setdollarsInput] = useState<Record<number, number>>({});
  const [centsInput, setcentsInput] = useState<Record<number, number>>({});
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const dollars: MoneyType[] = [
    { name: "$100", value: 100 },
    { name: "$50", value: 50 },
    { name: "$20", value: 20 },
    { name: "$10", value: 10 },
    { name: "$5", value: 5 },
    { name: "$2", value: 2 },
    { name: "$1", value: 1 },
  ];

  const cents: MoneyType[] = [
    { name: "¢25", value: 0.25 },
    { name: "¢10", value: 0.1 },
    { name: "¢5", value: 0.05 },
  ];

  const handledollarsInputChange = (event: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = event.target;
    setdollarsInput({ ...dollarsInput, [name]: parseInt(value) || 0 });
  };

  const handlecentsInputChange = (event: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = event.target;
    setcentsInput({ ...centsInput, [name]: parseInt(value) || 0 });
  };

  const handleCalculateClick = () => {
    let totaldollars = 0;
    let totalcents = 0;
    for (let bill of dollars) {
      const quantity = dollarsInput[bill.value] || 0;
      totaldollars += bill.value * quantity;
    }
    for (let coin of cents) {
      const quantity = centsInput[coin.value] || 0;
      totalcents += coin.value * quantity;
    }
    const totalAmount = totaldollars + totalcents;
    setTotal(totalAmount);

    setModalOpen(true);
  };

  const handleResetClick = () => {
    setdollarsInput({});
    setcentsInput({});
    setTotal(0);
  };

  const handleSubmit = () => {};

  return (
    <Card
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <Typography variant="h5" margin={2}>
          Money Calculator
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
            <Typography>Input Numbers</Typography>
            {dollars.map((bill) => (
              <div className="input-area" key={bill.value}>
                <TextField
                  type="number"
                  id={bill.name}
                  label={bill.name}
                  name={bill.value.toString()}
                  value={dollarsInput[bill.value] || ""}
                  onChange={handledollarsInputChange}
                  sx={{ margin: "5px" }}
                  size="small"
                />
              </div>
            ))}

            {cents.map((coin) => (
              <div key={coin.value}>
                <TextField
                  type="number"
                  id={coin.name}
                  label={coin.name}
                  name={coin.value.toString()}
                  inputProps={{
                    step: coin.value,
                    min: "0",
                  }}
                  value={centsInput[coin.value] || ""}
                  onChange={handlecentsInputChange}
                  sx={{ margin: "5px" }}
                  size="small"
                />
              </div>
            ))}
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
          <Button color="secondary" onClick={handleResetClick}>
            Clear
          </Button>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Denomination</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dollars.map((dollar, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {dollar.name}
                    </TableCell>
                  </TableRow>
                ))}
                {cents.map((cent, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {cent.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        {/* <Card sx={{ width: "50vw" }}>
          <div>
            <Typography
              variant="h6"
              sx={{ marginBottom: "5px", textAlign: "center" }}
            >
              Total
            </Typography>
            {dollars.map((dollar) => (
              <div
                style={{
                  padding: "0.5rem 0",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                <Typography key={dollar.name}>{dollar.name}</Typography>
                <Typography key={dollar.value}>
                  ${(dollarsInput[dollar.value] || 0) * dollar.value}
                </Typography>
              </div>
            ))}
            {cents.map((coin) => (
              <Typography
                key={coin.value}
                sx={{
                  padding: "0.5rem 0",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                ${((centsInput[coin.value] || 0) * coin.value).toFixed(2)}
              </Typography>
            ))}
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              <span>Grand Total</span> {total.toFixed(2)}
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              <Button color="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card> */}
      </Modal>
    </Card>
  );
};

export default MoneyCalculator;
