import { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { editProduct, registerProduct } from "../../actions/action";
import FileBase64 from "react-file-base64";
import { API } from "../../config/config";
import {
  ProductType,
  initialProductState,
  categories,
} from "../../types/types";
import NoImg from "../../assets/noimage.png";

interface InputFormProps {
  editingData: ProductType;
  setEditingData: React.Dispatch<React.SetStateAction<ProductType>>;
}

const InputForm: React.FC<InputFormProps> = ({
  editingData,
  setEditingData,
}) => {
  const [product, setProduct] = useState<ProductType>({
    ...initialProductState,
    status: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(editingData);
  }, [editingData]);

  const handleInputChange = (event: {
    target: {
      name: string;
      value: string;
    };
  }) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickCategory = (value: any, newValue: any) => {
    const selectedCategories = [
      ...new Set([
        ...product.categories,
        ...newValue.map(
          (newCategory: string) =>
            categories.find((cat) => cat.name === newCategory)?.value ||
            newCategory
        ),
      ]),
    ];

    setProduct((prev) => ({
      ...prev,
      categories: selectedCategories,
    }));
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    const updatedCategories = product.categories.filter(
      (category) => category !== categoryToDelete
    );
    setProduct((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  const handleCalendarChange = (value: Date | null) => {
    if (value) {
      setProduct((prev) => ({
        ...prev,
        date: value.toISOString().split("T")[0],
      }));
    }
  };

  const handleClear = () => {
    setProduct(initialProductState);
    setEditingData(initialProductState);
  };

  const handleSubmit = () => {
    if (editingData._id) {
      dispatch(editProduct(product));
      API.put("/products/edit", product).catch((error) => {
        console.log(error);
      });
    } else {
      dispatch(registerProduct(product));
      API.post("/products/register", product).catch((error) => {
        console.log(error);
      });
    }

    setEditingData(initialProductState);
    handleClear();
  };

  return (
    <Card
      sx={{
        margin: "15px 0 0 15px",
        padding: "15px",
        height: "100%",
        width: "30vw",
      }}
    >
      <Typography variant="h6">Enter Items</Typography>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {!product.image && <img src={NoImg} />}
        {product.image && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={product.image}
              alt="Selected"
              style={{
                maxHeight: "200px",
                margin: "10px 0",
                objectFit: "contain",
              }}
            />
          </div>
        )}
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }: { base64: string }) =>
            setProduct((prev) => ({ ...prev, image: base64 }))
          }
          style={{ display: "none" }}
        />
        <TextField
          name="name"
          label="Name"
          value={product.name}
          sx={{ width: "100%" }}
          onChange={handleInputChange}
          required
        />
        <Autocomplete
          multiple
          id="tags-outlined"
          options={categories.map((category) => category.name)}
          value={product.categories.map(
            (category) =>
              categories.find((cat) => cat.value === category)?.name || category
          )}
          onChange={handleClickCategory}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                onDelete={() =>
                  handleDeleteCategory(
                    categories.find((cat) => cat.name === option)?.value ||
                      option
                  )
                }
              />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Expiry date"
            sx={{ width: "100%" }}
            format="YYYY-MM-DD"
            onChange={handleCalendarChange}
          />
        </LocalizationProvider>
        <TextField
          name="memo"
          label="Memo"
          value={product.memo}
          fullWidth
          multiline
          rows={1.7}
          onChange={handleInputChange}
        />
      </form>
      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        disabled={!product.name || product.categories.length === 0}
        sx={{ margin: "10px 0" }}
      >
        Submit
      </Button>
      <Button color="secondary" fullWidth onClick={handleClear}>
        Clear
      </Button>
    </Card>
  );
};

export default InputForm;
