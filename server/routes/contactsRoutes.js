import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getContactsForDMList,
  searchContacts,
  getAllContacts,
} from "../controllers/contactsCtrl.js";

const contactsRoutes = Router();

contactsRoutes.post("/search", verifyToken, searchContacts);
contactsRoutes.get("/get-contact-for-dm", verifyToken, getContactsForDMList);
contactsRoutes.get("/get-all-contacts", verifyToken, getAllContacts);
export default contactsRoutes;
