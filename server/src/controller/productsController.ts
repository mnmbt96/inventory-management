import { Request, Response } from "express";
import Product from "../schema/productSchema";
import mongoose from "mongoose";

export const getProductList = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Error getting product list", error });
    });

    res
      .status(200)
      .send({ message: "Successfully get cash Histories", data: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const getProductBySearch = async (req: Request, res: Response) => {
  const { searchQuery, categories, status } = req.query;

  try {
    let query: any = {};

    if (searchQuery !== "none") {
      const titleRegex = new RegExp(String(searchQuery), "i");
      query.name = titleRegex;
    }

    if (Array.isArray(categories) && categories.length > 0) {
      query.categories = { $in: categories };
    } else if (typeof categories === "string" && categories !== "none") {
      query.categories = { $in: categories.split(",") };
    }

    if (status && status !== "all") {
      query.status = status;
    }

    const products = await Product.find({
      $and: [query],
    });

    res.json({ data: products });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const registerProduct = async (req: Request, res: Response) => {
  const { name, categories, date, memo, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      categories,
      date,
      memo,
      image,
    });

    newProduct
      .save()
      .then(() => {
        res.status(200).send({
          message: "Product data saved successfully.",
          data: newProduct,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error saving product data.");
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  const product = req.body;
  console.log(product);
  try {
    if (!mongoose.Types.ObjectId.isValid(product._id)) {
      return res.status(404).send({ message: "No data with that id" });
    }
    const updateProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        ...product,
      },
      {
        new: true,
      }
    );
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No data with that id");
    }
    await Product.findByIdAndRemove(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};
