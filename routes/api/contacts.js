const express = require("express");
const {
  validateSchema,
} = require("../../model/contacts/contact");
const contacts = require("../../controllers/contacts");
const { validation, token, ctrlWrapper } = require("../../middlewares");
const router = express.Router();

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/:contactId", ctrlWrapper(contacts.getById));

router.get("/:contactId/admin", token,  ctrlWrapper(contacts.getAdminUsers));

router.post("/",  ctrlWrapper(contacts.add));

router.delete("/:contactId", ctrlWrapper(contacts.deleteById));

router.put(
  "/:contactId",
  validation(validateSchema),
  ctrlWrapper(contacts.putById)
);

module.exports = router;
