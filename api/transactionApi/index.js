import Pan from "../../schemas/panSchema.js";

export const AddTransaction = async (req, res) => {
  try {
    const { panNumber, firmName, transactionDate, transactionAmount } =
      req.body;

    const panRecord = await Pan.findOne({ panNumber });

    if (!panRecord) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    const firm = panRecord.firms.find((f) => f.firmName === firmName);

    if (!firm) {
      return res.status(404).json({ message: "Firm not found in PAN record" });
    }

    firm.transactions.push({ transactionDate, transactionAmount });

    await panRecord.save();

    res.status(201).json({
      message: "Transaction added successfully to the firm",
      data: panRecord,
    });
  } catch (error) {
    console.error("Error adding transaction to firm:", error);
    res
      .status(500)
      .json({ message: "Failed to add transaction", error: error.message });
  }
};

export const EditTransaction = async (req, res) => {
  try {
    const { panNumber, firmName, transactionId } = req.params;
    const { transactionDate, transactionAmount } = req.body;

    const panRecord = await Pan.findOne({ panNumber });
    if (!panRecord) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    const firm = panRecord.firms.find((f) => f.firmName === firmName);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    const transaction = firm.transactions.id(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.transactionDate = transactionDate;
    transaction.transactionAmount = transactionAmount;
    await panRecord.save();

    res
      .status(200)
      .json({ message: "Transaction updated successfully", data: panRecord });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update transaction",
      error: error.message,
    });
  }
};

export const DeleteTransaction = async (req, res) => {
  try {
    const { panNumber, firmName, transactionId } = req.params;

    const panRecord = await Pan.findOne({ panNumber });
    if (!panRecord) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    const firm = panRecord.firms.find((f) => f.firmName === firmName);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    firm.transactions = firm.transactions.filter(
      (t) => t._id.toString() !== transactionId
    );
    await panRecord.save();

    res
      .status(200)
      .json({ message: "Transaction deleted successfully", data: panRecord });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
};
