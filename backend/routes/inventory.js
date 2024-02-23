const express = require("express");
const router = express.Router();
const database = require("../db/db");

//POst
router.route("/addinventory").post(async (req, res) => {
  try {


    const { type, name, quantity, unit, restockThreshold, supplier } = req.body;

    const data = {
        type: type,
        name: name,
        quantity: quantity,
        unit: unit,
        restockThreshold: restockThreshold,
        supplier: supplier,
    };

    // const data = req.body;

    const results = await database.insert(data);

    if (results.ok) {
      res.json({ success: true, message: "inventory added successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "inventory adding failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error + "failed to add inventory" });
  }
});

// get all orders
router.route("/getallinventory").get(async (req, res) => {
  try {
    const results = await database.list({ include_docs: true });
    const order = results.rows
      .filter((row) => row.doc.type === "inventory")
      .map((row) => row.doc);
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ err: "Error fetching inventory data" });
  }
});

// get single data
router.route("/getinventory/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    res.json({ success: true, data: document });
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory" });
  }
});

//delete single doc
router.route("/deleteinventory/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const document = await database.get(id);
    const { _rev } = document;
    const results = await database.destroy(id, _rev);

    if (results.ok) {
      res
        .status(200)
        .json({ success: true, message: "inventory deleted successfully" });
    } else {
      res.json({ success: false, message: "Error deleting inventory" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Deleting inventory failed" });
  }
});

// update document
router.route("/updateinventory/:id").put(async (req, res) => {
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
      res.json({ success: true, message: "inventory updated successfully" });
    } else {
      res.json({ success: false, message: "inventory updation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error + "Error updating inventory" });
  }
});

module.exports = router;
