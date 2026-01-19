import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getContactsForDMList,
  searchContacts,
} from "../controllers/contactsCtrl.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-contact-for-dm", verifyToken, getContactsForDMList);

export default contactsRoutes;
