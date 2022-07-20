const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const Book = require("../models/book");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/book", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});
const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post("/books/:id/image", upload.single("image"), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      throw new Error();
    }
    const buffer = await sharp(req.file.buffer).png().toBuffer();
    book.image = buffer;
    await book.save();
    res.send();
    (error, req, res, next) => {
      res.status(400).send({ error: error.message });
    };
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete("/books/:id/image", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      throw new Error();
    }
    res.send();
  } catch (e) {
    res.status(400).send();
  }
});
router.get("/books/:id/image", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book || !book.image) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(book.image);
  } catch (e) {
    res.status(404).send();
  }
});
// get recommendation
router.get("/books/recommendation", async (req, res) => {
  try {
    const book = await Book.find({}, "_id author title", { limit: 5 });
    res.send(book);
  } catch (e) {
    res.status(500).send();
  }
});
//get book details
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(
      req.params.id,
      "author title category country year pages link language"
    );

    if (!book) {
      throw new Error("No Book Found...");
    }

    res.send(book);
  } catch (e) {
    res.status(404).send();
  }
});
//pagination
router.get("/booksList", auth, async (req, res) => {
  const match = {};
  if (req.query.cat) {
    match.category = req.query.cat;
  }
  try {
    let bookobj = {};
    const booksList = await Book.find(match, "author title language category", {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
    });
    bookobj["booksList"] = booksList;
    let page = parseInt(req.query.skip) / parseInt(req.query.limit) + 1;
    bookobj["currentPage"] = page;
    let previous = page - 1;
    let next = page + 1;
    if (page > 1) {
      bookobj["previous"] = previous;
    }
    if (page < 3) {
      bookobj["next"] = next;
    }

    res.send(bookobj);
  } catch (e) {
    res.status(500).send(e);
  }
});
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
// router.get("/tasks", auth, async (req, res) => {
//   const match = {};
//   const sort = {};

//   if (req.query.completed) {
//     match.completed = req.query.completed === "true";
//   }

//   if (req.query.sortBy) {
//     const parts = req.query.sortBy.split(":");
//     sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
//   }

//   try {
//     await req.user
//       .populate({
//         path: "tasks",
//         match,
//         options: {
//           limit: parseInt(req.query.limit),
//           skip: parseInt(req.query.skip),
//           sort,
//         },
//       })
//       .execPopulate();
//     res.send(req.user.tasks);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// router.get("/tasks/:id", auth, async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const task = await Task.findOne({ _id, owner: req.user._id });

//     if (!task) {
//       return res.status(404).send();
//     }

//     res.send(task);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

// router.patch("/tasks/:id", auth, async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["description", "completed"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }

//   try {
//     const task = await Task.findOne({
//       _id: req.params.id,
//       owner: req.user._id,
//     });

//     if (!task) {
//       return res.status(404).send();
//     }

//     updates.forEach((update) => (task[update] = req.body[update]));
//     await task.save();
//     res.send(task);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// router.delete("/tasks/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findOneAndDelete({
//       _id: req.params.id,
//       owner: req.user._id,
//     });

//     if (!task) {
//       res.status(404).send();
//     }

//     res.send(task);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

module.exports = router;
