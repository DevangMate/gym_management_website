const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema({
  MembershipName: {
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