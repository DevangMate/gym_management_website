const { data } = require("jquery");
const moment = require("moment")
const mongoose = require("mongoose");
const User = require("../models/user");
const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
      default: Date.now,
     
    },

    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
  }, {
  timestamps: true
});

attendanceSchema.virtual("formattedDate").get(function() {
  const date = this.date;
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
});

attendanceSchema.virtual("formattedTime").get(function() {
  const date = this.date;
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
});

//  creating models or collections
const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = attendance;
