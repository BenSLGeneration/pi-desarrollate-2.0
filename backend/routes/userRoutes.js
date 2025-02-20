const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } = require("../controllers/userController");
const authJWT = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", authJWT, updateUser);
router.delete("/:id", authJWT, deleteUser);
router.post("/:id", loginUser);

module.exports = router;
