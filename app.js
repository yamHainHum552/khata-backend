import express from "express";
import { dbConnect } from "./db.js";
import Pan from "./schemas/panSchema.js";
import { AddPan, DeletePan, EditPan } from "./api/panApi/index.js";
import { AddFirm, DeleteFirm, EditFirm } from "./api/firmApi/index.js";
import {
  AddTransaction,
  DeleteTransaction,
  EditTransaction,
} from "./api/transactionApi/index.js";
const app = express();

app.use(express.json());

async function startServer() {
  try {
    await dbConnect();

    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();

app.get("/", (req, res) => {
  res.send({ message: "Hello there" });
});

app.post("/api/pan/addPan", AddPan);
app.post("/api/firm/addFirm", AddFirm);
app.post("/api/transaction/addTransaction", AddTransaction);

app.put("/api/pan/:panNumber", EditPan);
app.delete("/api/pan/:panNumber", DeletePan);
app.put("/api/pan/:panNumber/firm/:firmName", EditFirm);
app.delete("/api/pan/:panNumber/firm/:firmName", DeleteFirm);
app.put(
  "/api/pan/:panNumber/firm/:firmName/transaction/:transactionId",
  EditTransaction
);
app.delete(
  "/api/pan/:panNumber/firm/:firmName/transaction/:transactionId",
  DeleteTransaction
);

app.get("/api/getAllData", async (req, res) => {
  try {
    const allData = await Pan.find({});

    res
      .status(200)
      .json({ message: "Data fetched successfully", data: allData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
});
