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
    <div>
      {cashData.map((cash: SavedMoneyHistoryType) => (
        <DailyCash key={cash._id} cash={cash} setEditingData={setEditingData} />
      ))}
    </div>
  );
};

export default CashHistories;
