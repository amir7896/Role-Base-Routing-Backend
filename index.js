const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const dbCon = require("./config/dbCon");
const cors = require("cors");
const userRoutes = require("./routes/user");
const testRoutes = require("./routes/test");

const app = express();
const PORT = process.env.PORT || 4000;
dbCon();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
  res.send("Dashboard App");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
