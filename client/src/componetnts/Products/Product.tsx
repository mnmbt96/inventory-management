import {
  Card,
  CardMedia,
  Typography,
  MenuItem,
  FormControl,
  Select,
  TextField,
  InputAdornment,
  Avatar,
  ClickAwayListener,
  Button,
} from "@mui/material";
import { DeleteRounded, Edit } from "@mui/icons-material";
import {
  ProductType,
  initialProductState,
  categories,
} from "../../types/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  changeStatus,
  changeDiscount,
} from "../../actions/action";
import { API } from "../../config/config";
import NoImg from "../../assets/noimage.png";

interface ProductProps {
  product: ProductType;
  setEditingData: React.Dispatch<React.SetStateAction<ProductType>>;
}

const Product: React.FC<ProductProps> = ({ product, setEditingData }) => {
  const [productData, setProductData] =
    useState<ProductType>(initialProductState);
  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductData(product);
  }, [product]);

  const handleSelectChange = (event: { target: { value: string } }) => {
    const newStatus = event.target.value;

    if (
      newStatus === "" ||
      newStatus === "gift" ||
      newStatus === "expired" ||
      newStatus === "soldout"
    ) {
      dispatch(changeStatus(productData._id, newStatus));
      API.put("/products/edit", {
        ...productData,
        status: newStatus,
        discount: 0,
      }).catch((error) => console.log(error));
    }

    if (newStatus === "discount") setIsDiscountFormOpen(true);
  };

  const handleDiscountChange = (event: { target: { value: any } }) => {
    dispatch(changeDiscount(productData._id, "discount", event.target.value));
    API.put("/products/edit", {
      ...productData,
      status: "discount",
      discount: event.target.value,
    }).catch((error) => console.log(error));
  };

  const handleClickAway = () => {
    setIsDiscountFormOpen(false);
  };

  useEffect(() => {
    if (isDiscountFormOpen) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setIsDiscountFormOpen(false);
    }
  };

  const handleEditClick = () => {
    setEditingData(productData);
  };

  const handleDeleteClick = () => {
    dispatch(deleteProduct(productData._id));
    API.delete(`/products/delete/${productData._id}`).catch((error) =>
      console.log(error)
    );
  };

  const getDueDate = (dueDateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dueDateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return { color: { color: "orange" }, warning: "Today" };
    } else if (diffDays < 0) {
      return { color: { color: "red" }, warning: "Expired" };
    } else if (diffDays === 1) {
      return { color: { color: "orange" }, warning: "Tomorrow" };
    } else if (diffDays === 2) {
      return { color: { color: "orange" }, warning: `${diffDays} Days` };
    } else if (diffDays <= 7) {
      return { color: { color: "blue" }, warning: `${diffDays} Days` };
    } else if (diffDays > 7) {
      return { color: { color: " green" }, warning: `${diffDays} Days` };
    }
  };

  return (
    <Card
      sx={{
        padding: "10px",
        minWidth: "180px",
        width: "calc(20%  10px)",
        maxWidth: "150px",
        height: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {productData.discount > 0 &&
            !isDiscountFormOpen &&
            productData.status === "discount" && (
              <Avatar sx={{ bgcolor: "red", padding: "5px" }}>
                {productData.discount}%
              </Avatar>
            )}
        </div>
        <div>
          {!isDiscountFormOpen && (
            <FormControl variant="standard">
              <Select
                onChange={handleSelectChange}
                value={productData.status}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
                <MenuItem value="gift">Gift</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
                <MenuItem value="soldout">Sold Out</MenuItem>
                <Button onClick={handleEditClick}>
                  <Edit />
                  Edit
                </Button>
                <Button onClick={handleDeleteClick}>
                  <DeleteRounded />
                  Delete
                </Button>
              </Select>
            </FormControl>
          )}
          {isDiscountFormOpen && (
            <ClickAwayListener onClickAway={handleClickAway}>
              <TextField
                label="Discount"
                size="small"
                inputRef={inputRef}
                onChange={handleDiscountChange}
                onKeyDown={handleEnterKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                  inputProps: {
                    style: { textAlign: "right" },
                  },
                }}
              />
            </ClickAwayListener>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <CardMedia
          component="img"
          image={product.image || NoImg}
          title={product.name}
          style={{
            maxHeight: "120px",
            maxWidth: "100px",
            height: "auto",
            objectFit: "contain",
            margin: "5px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "3px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {product.categories.map((category) => (
            <Typography
              sx={{
                backgroundColor: "lightblue",
                padding: "2px 5px",
                borderRadius: "10px",
                fontSize: "10px",
              }}
            >
              {categories.find((cat) => cat.value === category)?.name || ""}
            </Typography>
          ))}
        </div>

        <Typography sx={{ fontWeight: "bold" }}>{productData.name}</Typography>
        <Typography>{productData.date}</Typography>
        <Typography color={getDueDate(productData.date)?.color}>
          {getDueDate(productData.date)?.warning}
        </Typography>
        <Typography>{productData.memo}</Typography>
      </div>
    </Card>
  );
};

export default Product;
