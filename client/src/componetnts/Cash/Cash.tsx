import CashHistory from "./CashHistory";
import MoneyCalculator from "./MoneyCalculator";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { SavedMoneyHistoryType, initialCashState } from "../../types/types";
import { API } from "../../config/config";
import { useDispatch } from "react-redux";
import { getCashHistories } from "../../actions/action";
import NoUser from "../Auth/NoUser";

const Cash = () => {
  const [editingData, setEditingData] =
    useState<SavedMoneyHistoryType>(initialCashState);
  const [cashData, setCashData] = useState<SavedMoneyHistoryType[]>([]);
  const dispatch = useDispatch();

  const localStorageUser = localStorage.getItem("user");
  const user = localStorageUser !== null ? JSON.parse(localStorageUser) : "";

  useEffect(() => {
    API.get("/cash/history")
      .then((res) => {
        const data = res.data.data;
        dispatch(getCashHistories(data));
      })
      .catch((error) => console.log(error));
  }, []);

  const cash = useSelector(
    (state: { cashReducers: SavedMoneyHistoryType[] }) => state.cashReducers
  );

  useEffect(() => {
    setCashData(cash);
  }, [cash]);

  return (
    <>
      {user ? (
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
      ) : (
        <NoUser />
      )}
    </>
  );
};

export default Cash;
