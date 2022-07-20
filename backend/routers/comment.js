const express = require("express");
const Comment = require("../models/comment");
const auth = require("../middleware/auth");
const router = new express.Router();
router.post("/comment/:bookId", auth, async (req, res) => {
  const comment = new Comment({
    name: req.user.name,
    userId: req.user._id,
    bookId: req.params.bookId,
    comment: req.body.comment,
  });
  try {
    await comment.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send({ message: "Error adding comment" });
  }
});
router.get("/comment/:bookId", auth, async (req, res) => {
  try {
    const comment = await Comment.find(
      {
        bookId: req.params.bookId,
      },
      "comment name userId"
    );
    if (!comment) {
      res.status(500).send();
    }
    res.status(200).send(comment);
  } catch (e) {
    res.status(500).send({ message: "Error getting comment" });
  }
});
router.delete("/comment/:commentId", auth, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) {
      res.status(500).send();
    }
    res.status(200).send(comment);
  } catch (e) {
    res.status(500).send({ message: "Error getting comment" });
  }
});

module.exports = router;
