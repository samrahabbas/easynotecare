const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
morgan = require("morgan");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// const { errorHandler } = require("./middlewares/errorMiddleware");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes");
// const healthRouter = require("./routes/health.routes");
const healthRouter = require("./routes/health.routes");
const roleRouter = require("./routes/roles.routes");
const contactRouter = require("./routes/contacts.routes");
const clientRouter = require("./routes/clients.routes");
const programRouter = require("./routes/programs.routes");
const icd10Router = require("./routes/icd10.routes");
const icd9Router = require("./routes/icd9.routes");
const usersRouter = require("./routes/users.routes");
const agencyRouter = require("./routes/agency.routes");
const tlogsRouter = require("./routes/tlogs.routes");
const sharedRouter = require("./routes/sharedContacts.routes")
const sharedTypeContactTypeRouter = require("./routes/sharedContactTypes.routes.js")
const DDORouter = require("./routes/ddo.routes");


const app = express();

//middleware bodyparser
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(errorHandler);

// DB Config
const db = process.env.MONGO_URI;
// Connect to Mongo
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err.message))

app.use('/api/auth/', authRouter);
app.use('/api/users/', usersRouter);
app.use('/api/user/', userRouter);
// app.use('/api/health/', healthRouter);
app.use('/api/health/', healthRouter);
app.use('/api/role', roleRouter);
app.use('/api/contacts/', contactRouter);
app.use('/api/clients/', clientRouter);
app.use('/api/programs/', programRouter);
app.use('/api/agency/', agencyRouter);
app.use('/api/icd10', icd10Router);
app.use('/api/icd9', icd9Router);
app.use('/api/tlogs', tlogsRouter);
app.use('/api/shared', sharedRouter);
app.use('/api/sharedtype', sharedTypeContactTypeRouter)
app.use('/api/ddo', DDORouter);

app.use((err, req, res, next) => {
  // console.error(err);
  const code = err.status || 500;
  const errorResponce = {
    success: false,
    message: err.message || "Something happen",
    status: code,
  };
  console.error(errorResponce);
  return res.status(code).json(errorResponce);
});

const port = process.env.PORT || 4757;
console.log("process.env.PORT", process.env.PORT);

app.listen(port, () => console.log(`Server running on port ${port}`));

// uJqHnHZ8Oixh2gQm
