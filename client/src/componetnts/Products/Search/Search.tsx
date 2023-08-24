import {
  Autocomplete,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { ProductType, categories } from "../../../types/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../../config/config";
interface SearchProps {
  setProductData: React.Dispatch<React.SetStateAction<ProductType[]>>;
}

const Search: React.FC<SearchProps> = ({ setProductData }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState([]);
  const [searchStatus, setSearchStatus] = useState("all");

  const searchProducts = async () => {
    if (search.trim() || searchCategory.length > 0 || searchStatus) {
      console.log(search, searchCategory, searchStatus);
      try {
        const response = await API.get(
          `/products/search?searchQuery=${search || "none"}&categories=${
            searchCategory.join(",") || "none"
          }&status=${searchStatus}`
        );

        setProductData(response.data.data);
        navigate(
          `/products/search?searchQuery=${search || "none"}&categories=${
            searchCategory.join(",") || "none"
          }&status=${searchStatus}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeyPress = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      searchProducts();
    }
  };

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleCategoriesChange = (event: any, newValue: any) => {
    console.log(event);
    const selectedCategories = newValue.map(
      (categoryName: string) =>
        categories.find((cat) => cat.name === categoryName)?.value ||
        categoryName
    );
    setSearchCategory(selectedCategories);
  };

  const handleStatusChange = (event: { target: { value: any } }) => {
    setSearchStatus(event.target.value);
  };

  useEffect(() => {
    searchProducts();
  }, [searchCategory, searchStatus]);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "start",
        alignItems: "center",
        marginTop: "15px",
        width: "75vw",
      }}
    >
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">
          Search by item's name
        </InputLabel>
        <OutlinedInput
          onKeyDown={handleKeyPress}
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" onClick={searchProducts}>
                <SearchRounded />
              </IconButton>
            </InputAdornment>
          }
          label=" Search by item's name"
        />
      </FormControl>
      <Autocomplete
        multiple
        options={categories.map((category) => category.name)}
        filterSelectedOptions
        fullWidth
        value={searchCategory.map(
          (categoryValue: string) =>
            categories.find((cat) => cat.value === categoryValue)?.name ||
            categoryValue
        )}
        onChange={handleCategoriesChange}
        renderInput={(params) => (
          <TextField {...params} label="Search by categories" />
        )}
      />
      <FormControl sx={{ width: "400px" }}>
        <InputLabel>Search by status</InputLabel>
        <Select
          label="Search by status"
          onChange={handleStatusChange}
          value={searchStatus}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
          <MenuItem value="gift">Gift</MenuItem>
          <MenuItem value="expired">Expired</MenuItem>
          <MenuItem value="soldout">Sold Out</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Search;
