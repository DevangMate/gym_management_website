const { type } = require("jquery");
const moment = require("moment")
const mongoose = require("mongoose");

// defining schema
const UserSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
        },
        UserID: {
            type: String,
            required: true,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
        },
        is_admin: {
            type: Number,
            required: true,
        },
        is_trainer: {
            type: Number,
            required: false,
        },
        Height: {
            type: Number,
            required: true
        },
        Weight: {
            type: Number,
            required: true
        },

        BirthDate: {
            type: Date,
            required: true,
            // get: v => moment(v).format('DD-MM-YYYY')
            
        },
       
       
        Phone: {
            type: String,
            required: true
        },
        AlternatePhone: {
            type: String,
        },
        Address: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        Client: {
            type: Array,
        },
        Gender: {
            type: String,
            required: true,

        },
        Status: {
            type: String,
            required: true,
        }


    }
);
UserSchema.virtual("age").get(function () {
    const today = new Date();
    const birthdate = this.BirthDate;
    let age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth() - birthdate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
        age = age - 1;
    }
    return age;
});

UserSchema.virtual("bmiIndex").get(function () {
    const height = this.Height;
    const weight = this.Weight;
    return weight / (height * height);
});

UserSchema.virtual('formattedBirthDate').get(function() {
    return this.BirthDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  });

//  creating models or collections
const User = mongoose.model("User", UserSchema);


module.exports = User;
