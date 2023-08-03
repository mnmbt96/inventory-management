import CashHistory from "./CashHistory";
import MoneyCalculator from "./MoneyCalculator";
import Header from "../Header/Header";

const Cash = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CashHistory />
        <MoneyCalculator />
      </div>
    </div>
  );
};

export default Cash;
