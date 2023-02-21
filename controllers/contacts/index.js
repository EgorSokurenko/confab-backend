const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { add } = require("./add");
const { deleteById } = require("./deleteById");
const { putById } = require("./putById");
const { patchFavorite } = require("./patchFavorite");
const { getAdminUsers } = require("./getAdminUsers")
module.exports = { getAll, getById, add, deleteById, putById, patchFavorite, getAdminUsers };
