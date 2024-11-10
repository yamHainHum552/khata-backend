import mongoose from "mongoose";

const firmSchema = new mongoose.Schema({
  transactionDate: {
    type: String,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
});

const panSchema = new mongoose.Schema({
  panNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registeredName: {
    type: String,
    required: true,
  },
  firms: [
    {
      firmName: { type: String, required: false },
      transactions: { type: [firmSchema], required: false },
    },
  ],
});

const Pan = mongoose.model("Pan", panSchema);
export default Pan;
