import express from "express";
import { addShayari, deleteShayari, getUserShayaris,getUserShayari ,deleteAllShayaris} from "../../controller/shayri/shayriController.js";


const router = express.Router();
router.get("/", getUserShayari); // Get all shayaris
router.post("/", addShayari); // Create or Append shayari
router.delete("/:email/:shayariId", deleteShayari); // Delete shayari
router.delete("/",deleteAllShayaris)
router.post("/email", getUserShayaris); // Get all shayaris of a user



export default router;
