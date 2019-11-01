const { SQL } = require("../../config/db");
const DBTypes = require("../../utils/commonTypes");

const Comment = SQL.define("comment", {
  id: DBTypes.ID,
  comment: DBTypes.NAME,
});

module.exports = Comment;
