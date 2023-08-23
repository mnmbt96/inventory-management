import DailyCash from "./DailyCash";
import { SavedMoneyHistoryType } from "../../types/types";

interface CashHistoriesProps {
  cashData: SavedMoneyHistoryType[];
  setEditingData: React.Dispatch<React.SetStateAction<SavedMoneyHistoryType>>;
}

const CashHistories: React.FC<CashHistoriesProps> = ({
  cashData,
  setEditingData,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {cashData.map((cash: SavedMoneyHistoryType) => (
        <DailyCash key={cash._id} cash={cash} setEditingData={setEditingData} />
      ))}
    </div>
  );
};

export default CashHistories;
