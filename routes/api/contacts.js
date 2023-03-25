const express = require("express");
const contacts = require("../../controllers/contacts");
const {  token, ctrlWrapper } = require("../../middlewares");
const router = express.Router();

router.get("/", ctrlWrapper(contacts.getAll));

router.get("/get/:contactId", ctrlWrapper(contacts.getById));

router.get("/admin", token,  ctrlWrapper(contacts.getAdminUsers));
router.get("/admin/:contactId", token,  ctrlWrapper(contacts.getAdminUsers));

router.post("/",  ctrlWrapper(contacts.add));

router.delete("/:contactId", ctrlWrapper(contacts.deleteById));

router.get("/count", ctrlWrapper(contacts.count))

router.get("/:contactId/pdf", ctrlWrapper(contacts.pdf))

router.get("/staying", ctrlWrapper(contacts.getForStay))

router.patch(
  "/:contactId",
  token,
  ctrlWrapper(contacts.putById)
);

module.exports = router;
