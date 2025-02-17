const mongoose = require("mongoose");

const LineStopSchema = new mongoose.Schema(
  {
    line: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Line",
      required: true,
    },
    stop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stop",
      required: true,
    },
    order: {
      type: Number,
      required: true,
      min: 0, 
    },
  },
  { timestamps: true } 
);

LineStopSchema.index({ line: 1, stop: 1 }, { unique: true });

module.exports = mongoose.model("LineStop", LineStopSchema);
