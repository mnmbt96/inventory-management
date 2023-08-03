import { Request, Response } from "express";
import User from "../schema/userSchema";
import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import randomColor from "randomcolor";

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 16);

    const nameInitials =
      firstName
        .split(" ")
        .map((word: string) => word.charAt(0))
        .join("") + lastName.split(" ").map((word: string) => word.charAt(0));

    const color = randomColor();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      initials: nameInitials,
      color: color,
    });

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    // if (!emailValidator.validate(email)) {
    //   return res.status(400).json({ message: "Invalid email address" });
    // }

    if (!user && password === confirmPassword) {
      newUser
        .save()
        .then(() => {
          res.status(200).send({
            message: "User data saved successfully.",
            data: newUser,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send("Error saving user data.");
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
