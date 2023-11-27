import argon2 from "argon2";
import jwt from "jsonwebtoken";
import query from "../db/index.js";

const AuthController = {
  getAuth: async (req, res) => {
    const { userId } = req;
    try {
      const data = await query(
        `SELECT * FROM users WHERE 
            id = $1`,
        [userId]
      );
      const user = data.rows[0];
      if (!user)
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Missing username and/or password",
        });
      }

      const data = await pool.query(
        `SELECT * FROM users WHERE 
            username = $1`,
        [username]
      );
      const checkExist = data.rows[0];
      if (checkExist) {
        return res.status(400).json({
          success: false,
          message: "User name has been taken!",
        });
      }
      const hashedPassword = await argon2.hash(password);
      const user = await pool.query(
        `INSERT INTO users(username, password)
            VALUES ($1, $2) RETURNING *`,
        [username, hashedPassword]
      );

      const accessToken = jwt.sign(
        {
          userId: user.rows[0].id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User created successfully",
        accessToken,
      });
    } catch (err) {
      console.error(err.message);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password)
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    try {
      // Check for existing user
      const data = await pool.query(
        `SELECT * FROM users WHERE 
            username = $1`,
        [username]
      );
      const user = data.rows[0];

      if (!user)
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });

      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });

      // // All good
      // // Return token
      const accessToken = jwt.sign(
        {
          userId: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "User logged in successfully",
        accessToken,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
export default AuthController;
