const express = require("express");
// const { getHealth} = require('../controllers/health.controller.js');
// const { protect } = require("../middlewares/authMiddleware.js");
const HealthAppointment = require("../models/health.appointment.model");
const BloodGlucose = require("../models/health.bloodglucose.model");
const HealthHeightWeight = require("../models/health.heightweight.model");


const healthRouter = express.Router();

/* HealthAppointment Routes */

// This section will help you get a list of all the documents.
healthRouter.route("/showappointment").get(async function (req, res) {

  HealthAppointment.find({}, function (err, result) {
      if (err) {
        res.status(400).send("Error fetching health appointment!");
      } else {
        res.json(result);
      }
    });
});


// This section will help you create a new document.
healthRouter.route("/newappointment").post(function (req, res) {

  const data = {
    id: req.body.id,
    form_id: req.body.form_id,
    program_site: req.body.program_site,
    individual: req.body.individual,
    entered_by: req.body.entered_by,
    appointment_date_from: req.body.appointment_date_from,
    appointment_date_to: req.body.appointment_date_to,
    specialty: req.body.specialty,
    appointment_reason: req.body.appointment_reason,
    appointment_status: req.body.appointment_status,
    notification_level: req.body.notification_level,
    status: req.body.status,
    consultant: req.body.consultant,
    hospital_name: req.body.hospital_name
  };

  HealthAppointment.create(data, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting appointemnts!");
    } else {
      console.log('Appointment Added');
      res.status(204).send();
    }
  });
});

// This section will help you update a document by id.
healthRouter.route("/updateappointment").post(function (req, res) {
  const healthQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  HealthAppointment.updateOne(healthQuery, updates, function (err, _result) {
    if (err) {
      res.status(400).send(`Error updating likes on listing with id ${healthQuery.id}!`);
    } else {
      console.log("1 document updated");
    }
  });
});

// This section will help you delete a record.
healthRouter.route("/deleteappointment/:id").delete((req, res) => {
  const healthQuery = { id: req.body.id };

  HealthAppointment.deleteOne(healthQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting listing with id ${healthQuery.id}!`);
    } else {
      console.log("1 document deleted");
    }
  });
});


/* BloodGlucose Routes */

// This section will help you get a list of all the documents.
healthRouter.route("/showbloodglucose").get(async function (req, res) {

  BloodGlucose.find({}, function (err, result) {
      if (err) {
        res.status(400).send("Error fetching health appointment!");
      } else {
        res.json(result);
      }
    });
});


// This section will help you create a new document.
healthRouter.route("/newbloodglucose").post(function (req, res) {

  const data = {
    id: req.body.id,
    form_id: req.body.form_id,
    program_site: req.body.program_site,
    individual: req.body.individual,
    entered_by: req.body.entered_by,
    submit_date_from: req.body.submit_date_from,
    submit_date_to: req.body.submit_date_to,
    specialty: req.body.specialty,
    notification_level: req.body.notification_level,
    status: req.body.status
  };

  BloodGlucose.create(data, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting appointemnts!");
    } else {
      console.log(`Added a new match with id ${result.insertedId}`);
      res.status(204).send();
    }
  });
});

// This section will help you update a document by id.
healthRouter.route("/updatebloodglucose").post(function (req, res) {
  const healthQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  BloodGlucose.updateOne(healthQuery, updates, function (err, _result) {
    if (err) {
      res.status(400).send(`Error updating likes on listing with id ${healthQuery.id}!`);
    } else {
      console.log("1 document updated");
    }
  });
});

// This section will help you delete a record.
healthRouter.route("/deletebloodglucose/:id").delete((req, res) => {
  const healthQuery = { id: req.body.id };

  BloodGlucose.deleteOne(healthQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting listing with id ${healthQuery.id}!`);
    } else {
      console.log("1 document deleted");
    }
  });
});


/* HeightWeight Routes */

// This section will help you get a list of all the documents.
healthRouter.route("/showheightweight").get(async function (req, res) {

  HealthHeightWeight.find({}, function (err, result) {
      if (err) {
        res.status(400).send("Error fetching health appointment!");
      } else {
        res.json(result);
      }
    });
});


// This section will help you create a new document.
healthRouter.route("/newheightweight").post(function (req, res) {

  const data = {
    id: req.body.id,
    form_id: req.body.form_id,
    program_site: req.body.program_site,
    individual: req.body.individual,
    entered_by: req.body.entered_by,
    submit_date_from: req.body.submit_date_from,
    submit_date_to: req.body.submit_date_to,
    notification_level: req.body.notification_level,
    status: req.body.status
  };

  HealthHeightWeight.create(data, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting appointemnts!");
    } else {
      console.log(`Added a new match with id ${result.insertedId}`);
      res.status(204).send();
    }
  });
});

// This section will help you update a document by id.
healthRouter.route("/updateheightweight").post(function (req, res) {
  const healthQuery = { _id: req.body.id };
  const updates = {
    $inc: {
      likes: 1
    }
  };

  HealthHeightWeight.updateOne(healthQuery, updates, function (err, _result) {
    if (err) {
      res.status(400).send(`Error updating likes on listing with id ${healthQuery.id}!`);
    } else {
      console.log("1 document updated");
    }
  });
});

// This section will help you delete a record.
healthRouter.route("/deleteheightweight/:id").delete((req, res) => {
  const healthQuery = { id: req.body.id };

  HealthHeightWeight.deleteOne(healthQuery, function (err, _result) {
    if (err) {
      res.status(400).send(`Error deleting listing with id ${healthQuery.id}!`);
    } else {
      console.log("1 document deleted");
    }
  });
});



module.exports = healthRouter;
