const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const userRouter = require("./routers/user");
const bookRouter = require("./routers/book");
const commentRouter = require("./routers/comment");


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(bookRouter);
app.use(commentRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
