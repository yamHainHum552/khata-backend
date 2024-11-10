import Pan from "../../schemas/panSchema.js";

export const AddPan = async (req, res) => {
  try {
    const { panNumber, registeredName } = req.body;

    const newPan = new Pan({
      panNumber,
      registeredName,
    });

    await newPan.save();

    res
      .status(201)
      .json({ message: "PAN record added successfully", data: newPan });
  } catch (error) {
    console.error("Error adding PAN record:", error);
    res
      .status(500)
      .json({ message: "Failed to add PAN record", error: error.message });
  }
};

export const EditPan = async (req, res) => {
  try {
    const { panNumber } = req.params;
    const { registeredName } = req.body;

    const updatedPan = await Pan.findOneAndUpdate(
      { panNumber },
      { registeredName },
      { new: true }
    );

    if (!updatedPan) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    res
      .status(200)
      .json({ message: "PAN record updated successfully", data: updatedPan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update PAN record", error: error.message });
  }
};
export const DeletePan = async (req, res) => {
  try {
    const { panNumber } = req.params;

    const deletedPan = await Pan.findOneAndDelete({ panNumber });

    if (!deletedPan) {
      return res.status(404).json({ message: "PAN record not found" });
    }

    res.status(200).json({ message: "PAN record deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete PAN record", error: error.message });
  }
};
