const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  
  Duration: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});
const MembershipPlan = mongoose.model('MembershipPlan', membershipPlanSchema);
module.exports = MembershipPlan;