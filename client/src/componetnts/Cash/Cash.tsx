import CashHistory from "./CashHistory";
import MoneyCalculator from "./MoneyCalculator";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { SavedMoneyHistoryType, initialCashState } from "../../types/types";
import axios from "axios";
import { API } from "../../config/config";
import { useDispatch } from "react-redux";
import { getCashHistories } from "../../actions/authAction";

const Cash = () => {
  const [editingData, setEditingData] =
    useState<SavedMoneyHistoryType>(initialCashState);
  const [cashData, setCashData] = useState<SavedMoneyHistoryType[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API}/cash/history`)
      .then((res) => {
        const data = res.data.data;
        dispatch(getCashHistories(data));
      })
      .catch((error) => console.log(error));
  }, []);

  const cash = useSelector(
    (state: { cashReducer: SavedMoneyHistoryType[] }) => state.cashReducer
  );

  useEffect(() => {
    setCashData(cash);
  }, [cash]);

  useEffect(() => {
    console.log("cashData is changed", cashData);
  }, [cashData]);

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CashHistory cashData={cashData} setEditingData={setEditingData} />
        <MoneyCalculator
          editingData={editingData}
          setEditingData={setEditingData}
        />
      </div>
    </div>
  );
};

export default Cash;
