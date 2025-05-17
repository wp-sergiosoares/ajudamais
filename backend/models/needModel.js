const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const needSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
    tipo: {
      type: String,
      required: true,
    },
    urgente: {
      type: String,
      required: true,
    },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // }

    // user_id: {
    //     type: String,
    //     required: true
    // }
  },
  { timestamps: true }
);

// needSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Need", needSchema);
