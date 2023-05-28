const mongoose = require("mongoose");
const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a todo title"],
    },
    completed: { type: Boolean, default: false },
    completedTime: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", todoSchema);
