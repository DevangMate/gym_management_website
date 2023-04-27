const User = require("../models/user");
const Attendance = require("../models/attendance")
const MembershipPlan = require("../models/plan")
const moment = require("moment");
var session = require('express-session')

const verifyLogin = async (req, res) => {
  try {
    const UserID = req.body.UserID;
    const Password = req.body.Password;

    const Userdata = await User.findOne({ UserID: UserID });
    // req.session.user_id= Userdata?.UserID;
    // req.session.user_id=req.session.sessionuserid;
    if (Userdata?.Password == Password) {
      const sessionuserid = Userdata?._id;
      req.session.user_id = sessionuserid;
      req.session.is_admin = Userdata?.is_admin;
      req.session.is_trainer = Userdata?.is_trainer;

      if (Userdata?.is_admin == 1) {

        res.status(201).redirect("/dashboard");
      }
      else if (Userdata?.is_trainer == 1) {
        res.status(201).redirect("/trainerdashboard")
      }
      else if (Userdata?.is_admin == 0 && Userdata?.is_trainer == 0) {
        res.status(201).redirect("/userdashboard")
      }




    } else {
      res.render("login", { message: "invalid userID" })
    }

  } catch (error) {
    res.status(400).send(error.message)

  }
}

const loadDashboard = async (req, res) => {
  try {
    res.render('dashboard');
  } catch (error) {
    console.log(error.message);
  }
}
const loaduserDashboard = async (req, res) => {
  try {
    const userData = await User.findById(req.session.user_id).populate('MembershipPlan');
    res.render('userdashboard', { user: userData });
  } catch (error) {
    console.log(error.message);
  }
}
const loadtrainerDashboard = async (req, res) => {
  try {
    res.render('trainerdashboard');
  } catch (error) {
    console.log(error.message);
  }
}



const logout = async (req, res) => {
  try {

    req.session.destroy();

    res.redirect('/login');
  } catch (error) {
    console.log(error.message)
  }

}


const getAnalysisData = async (req, res) => {
  try {
    const maleCount = await User.countDocuments({ Gender: 'Male', is_admin: 0, is_trainer: 0 });
    const femaleCount = await User.countDocuments({ Gender: 'Female', is_admin: 0, is_trainer: 0 });
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // set start of day to 00:00:00.000
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // set end of day to 23:59:59.999
    const attendanceCount = await Attendance.countDocuments({ date: { $gte: startOfDay, $lte: endOfDay } });
    const mostActiveTime = await Attendance.aggregate([
      { $match: { date: { $gte: startOfDay, $lte: endOfDay } } },
      { $group: { _id: { $hour: "$date" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    const analysisData = {
      maleCount: maleCount,
      femaleCount: femaleCount,
      attendanceCount: attendanceCount,
      mostActiveTime: mostActiveTime.length > 0 ? `${mostActiveTime[0]._id}:00 - ${mostActiveTime[0]._id}:59` : 'N/A'

    };

    res.render('analysis', { analysisData });
  } catch (err) {
    res.status(500).send({ message: "Error fetching analysis data" });
  }
};

const express = require('express');
const router = express.Router();

const getMonthlySalesData = async (year) => {
  // Get the start and end date of the year
  const startDate = moment(year, "YYYY").startOf("year").toDate();
  const endDate = moment(year, "YYYY").endOf("year").toDate();

  // Get the monthly sales data for the given year
  const salesData = await User.aggregate([
    // Match users with membership plans
    {
      $match: {
        MembershipPlan: { $exists: true }
      }
    },
    // Unwind the membership plans array
    {
      $unwind: "$MembershipPlan"
    },
    // Match membership plans with membership start date in the given year
    {
      $match: {
        "MembershipPlan.MembershipStartDate": {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    // Group by month and calculate the total sales
    {
      $group: {
        _id: { $month: "$MembershipPlan.MembershipStartDate" },
        sales: { $sum: "$MembershipPlan.Price" }
      }
    },
    // Sort the sales data by month
    {
      $sort: { _id: 1 }
    }
  ]);

  // Convert the sales data into an array of sales for each month
  const monthlySales = Array.from({ length: 12 }, (_, i) => {
    const sales = salesData.find(data => data._id === i + 1);
    return sales ? sales.sales : 0;
  });

  return monthlySales;
};

// Route handler for the dashboard page
const dashboardPage = async (req, res) => {
  try {
    // Get the current year's sales data
    const currentYear = new Date().getFullYear();
    const currentYearSalesData = await getMonthlySalesData(currentYear);

    // Get the previous year's sales data
    const previousYear = currentYear - 1;
    const previousYearSalesData = await getMonthlySalesData(previousYear);

    // Combine the sales data for the current and previous year
    const salesData = {
      currentYear: currentYearSalesData,
      previousYear: previousYearSalesData
    };

    // Render the dashboard page with the sales data
    res.render("dashboard", { salesData });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  verifyLogin,
  loadDashboard,
  loaduserDashboard,
  loadtrainerDashboard,
  logout,
  getAnalysisData,
  getMonthlySalesData,dashboardPage


};