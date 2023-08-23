import Product from "./Product";
import Header from "../Header/Header";
import InputForm from "./InputForm";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, initialProductState } from "../../types/types";
import { useEffect, useState } from "react";
import { API } from "../../config/config";
import { getProductList } from "../../actions/action";
import Search from "./Search/Search";
import { Typography } from "@mui/material";
import NoUser from "../Auth/NoUser";

const Products = () => {
  const [editingData, setEditingData] =
    useState<ProductType>(initialProductState);
  const [productData, setProductData] = useState<ProductType[]>([]);
  const dispatch = useDispatch();

  const localStorageUser = localStorage.getItem("user");
  const user = localStorageUser !== null ? JSON.parse(localStorageUser) : "";

  useEffect(() => {
    API.get("/products/list").then((res) => {
      const data = res.data.data;
      dispatch(getProductList(data));
    });
  }, []);

  const products = useSelector(
    (state: { productsReducers: ProductType[] }) => state.productsReducers
  );

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <>
      {user ? (
        <>
          <Header />
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <InputForm
              editingData={editingData}
              setEditingData={setEditingData}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Search setProductData={setProductData} />
              {productData.length === 0 ? (
                <Typography>No product found</Typography>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    justifyContent: "start",
                    marginTop: "15px",
                  }}
                >
                  {productData.map((product) => (
                    <Product
                      key={product._id}
                      product={product}
                      setEditingData={setEditingData}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <NoUser />
      )}
    </>
  );
};

export default Products;
