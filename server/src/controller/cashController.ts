import { Request, Response } from "express";
import Cash from "../schema/cashSchema";
import mongoose from "mongoose";

export const registerCash = async (req: Request, res: Response) => {
  const { dollars, cents, customers, total, create } = req.body;

  try {
    const newCash = new Cash({
      dollars,
      cents,
      customers,
      total,
      create,
      update: {},
    });

    newCash
      .save()
      .then(() => {
        res.status(200).send({
          message: "Cash data saved successfully.",
          data: newCash,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send("Error saving cash data.");
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const getCashHistory = async (req: Request, res: Response) => {
  try {
    const cashes = await Cash.find().catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Error getting cash history", error });
    });

    res
      .status(200)
      .send({ message: "Successfully get cash Histories", data: cashes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const confirmCash = async (req: Request, res: Response) => {
  const { cash, user, date, time } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(cash._id)) {
      return res.status(404).send({ message: "No data with that id" });
    }
    const updateCash = await Cash.findByIdAndUpdate(
      cash._id,
      { ...cash, update: { user, date, time } },
      {
        new: true,
      }
    );
    res.json(updateCash);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const editCash = async (req: Request, res: Response) => {
  const { _id, dollars, cents, customers, total, create, update } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: "No data with that id" });
    }

    const updateCash = await Cash.findByIdAndUpdate(
      _id,
      {
        ...create,
        ...update,
        dollars: dollars,
        cents: cents,
        customers: customers,
        total: total,
      },
      {
        new: true,
      }
    );
    res.json(updateCash);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};

export const deleteCash = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No data with that id");
    }

    await Cash.findByIdAndRemove(id);
    res.json({ message: "Cash deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error", error });
  }
};
