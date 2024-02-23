const express = require("express");
const router = express.Router();
const database = require("../db/db");

//POst
router.route("/addtable").post(async (req, res) => {
  try {

    const { type, number, capacity, status} = req.body;

    const data = {
        type: type,
        number: number,
        capacity: capacity,
        status: status,
       
    };

    // const data = req.body;

    const results = await database.insert(data);

    if (results.ok) {
      res.json({ success: true, message: "table added successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "table adding failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error + "failed to add table" });
  }
});

// get all orders
router.route("/getalltables").get(async (req, res) => {
  try {
    const results = await database.list({ include_docs: true });
    const order = results.rows
      .filter((row) => row.doc.type === "table")
      .map((row) => row.doc);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ err: "Error fetching table data" });
  }
});

// get single data
router.route("/gettable/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: "Error fetching table" });
  }
});

//delete single doc
router.route("/deletetable/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    const { _rev } = document;
    const results = await database.destroy(id, _rev);

    if (results.ok) {
      res
        .status(200)
        .json({ success: true, message: "table deleted successfully" });
    } else {
      res.json({ success: false, message: "Error deleting table" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Deleting table failed" });
  }
});

// update document
router.route("/updatetable/:id").put(async (req, res) => {
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
      res.json({ success: true, message: "table updated successfully" });
    } else {
      res.json({ success: false, message: "table updation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Error updating table" });
  }
});

module.exports = router;
