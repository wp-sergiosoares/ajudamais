const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    typeOfTicket: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pendente",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ticketSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Ticket", ticketSchema);
