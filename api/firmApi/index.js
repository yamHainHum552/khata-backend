import Pan from "../../schemas/panSchema.js";

export const AddFirm = async (req, res) => {
  try {
    const { panNumber, firmName } = req.body;

    const panRecord = await Pan.findOne({ panNumber });

    if (!panRecord) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    panRecord.firms.push({ firmName, transactions: [] });

    await panRecord.save();

    res.status(201).json({
      message: "Firm added successfully to the PAN record",
      data: panRecord,
    });
  } catch (error) {
    console.error("Error adding firm to PAN record:", error);
    res
      .status(500)
      .json({ message: "Failed to add firm", error: error.message });
  }
};

export const EditFirm = async (req, res) => {
  try {
    const { panNumber, firmName } = req.params;
    const { newFirmName } = req.body;

    const panRecord = await Pan.findOne({ panNumber });
    if (!panRecord) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    const firm = panRecord.firms.find((f) => f.firmName === firmName);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    firm.firmName = newFirmName;
    await panRecord.save();

    res
      .status(200)
      .json({ message: "Firm updated successfully", data: panRecord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update firm", error: error.message });
  }
};

export const DeleteFirm = async (req, res) => {
  try {
    const { panNumber, firmName } = req.params;

    const panRecord = await Pan.findOne({ panNumber });
    if (!panRecord) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    panRecord.firms = panRecord.firms.filter((f) => f.firmName !== firmName);
    await panRecord.save();

    res
      .status(200)
      .json({ message: "Firm deleted successfully", data: panRecord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete firm", error: error.message });
  }
};
