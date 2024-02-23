const express = require("express");
const router = express.Router();
const database = require("../db/db");

//POst
router.route("/addreservation").post(async (req, res) => {
  try {

    const { type, customerId, reservationId, startTime,endTime,status} = req.body;

    const data = {
        type: type,
        customerId: customerId,
        reservationId: reservationId,
        startTime: startTime,
        endTime:endTime,
        status:status   
    };

    // const data = req.body;

    const results = await database.insert(data);

    if (results.ok) {
      res.json({ success: true, message: "reservation added successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "reservation adding failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error + "failed to add reservation" });
  }
});

// get all orders
router.route("/getallreservations").get(async (req, res) => {
  try {
    const results = await database.list({ include_docs: true });
    const order = results.rows
      .filter((row) => row.doc.type === "reservation")
      .map((row) => row.doc);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ err: "Error fetching reservation data" });
  }
});

// get single data
router.route("/getreservation/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: "Error fetching reservation" });
  }
});

//delete single doc
router.route("/deletereservation/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    const { _rev } = document;
    const results = await database.destroy(id, _rev);

    if (results.ok) {
      res
        .status(200)
        .json({ success: true, message: "reservation deleted successfully" });
    } else {
      res.json({ success: false, message: "Error deleting reservation" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Deleting reservation failed" });
  }
});

// update document
router.route("/updatereservation/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);

    const updateDoc = {
      ...document,
      ...req.body,
      _rev: document._rev,
    };

    const results = await database.insert(updateDoc);

    if (results.ok) {
      res.json({ success: true, message: "reservation updated successfully" });
    } else {
      res.json({ success: false, message: "reservation updation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Error updating reservation" });
  }
});

module.exports = router;
