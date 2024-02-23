const express = require("express");
const router = express.Router();
const database = require("../db/db");

//POst
router.route("/addemployee").post(async (req, res) => {
  try {

      
    const { type, name, role, phone, shifts} = req.body;

    const data = {
        type: type,
        name: name,
        role: role,
        phone: phone,
        shifts: shifts
    };

    // const data = req.body;

    const results = await database.insert(data);

    if (results.ok) {
      res.json({ success: true, message: "employee added successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "employee adding failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error + "failed to add employee" });
  }
});

// get all orders
router.route("/getallemployees").get(async (req, res) => {
  try {
    const results = await database.list({ include_docs: true });
    const order = results.rows
      .filter((row) => row.doc.type === "employee")
      .map((row) => row.doc);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ err: "Error fetching employee data" });
  }
});

// get single data
router.route("/getemployee/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee" });
  }
});

//delete single doc
router.route("/deleteemployee/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    const { _rev } = document;
    const results = await database.destroy(id, _rev);

    if (results.ok) {
      res
        .status(200)
        .json({ success: true, message: "employee deleted successfully" });
    } else {
      res.json({ success: false, message: "Error deleting employee" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Deleting employee failed" });
  }
});

// update document
router.route("/updateemployee/:id").put(async (req, res) => {
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
      res.json({ success: true, message: "employee updated successfully" });
    } else {
      res.json({ success: false, message: "employee updation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Error updating employee" });
  }
});

module.exports = router;
