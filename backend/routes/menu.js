const express = require("express");
const router = express.Router();
const database = require('../db/db');


//Post a new menu to db
router.route("/addMenu").post(async (req, res) => {
  try {
    const {
    //   id,
      menutype,
      name,
      price,
      category,
      ingredients,
      allergens,
      available,
    } = req.body;
    console.log("test1");

    const data = {
    //   id: id,
      menutype: menutype,
      name: name,
      price: price,
      category: category,
      ingredients: ingredients,
      allergens: allergens,
      available: available,
    };

    const results = await database.insert(data);
    console.log("test2");

    if (results.ok) {
      res.json({ success: true, data: results });
      console.log("test3");
    } else {
      res
        .status(500)
        .json({ success: false, error: "error posting data to database " });
      console.log("test4");
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        error: "error posting data to database " + error,
      });
  }
});

//get all data from db
router.route("/getAllMenus").get(async (req, res) => {
  try {
    const results = await database.list({ include_docs: true });
    const menu = results.rows.filter(row =>row.doc.menutype === "menu").map((row)=> row.doc);
    res.json({ success: true, data: menu });
  } catch (error) {
    res.status(500).json({ error: "Error Fetching data from database" });
  }
});

//get single document
router.route("/getmenu/:id").get(async(req, res) =>{
  try {

    const {id} =req.params;
    const document = await database.get(id);
    res.json({ success:true, data: document});

  } catch (error) {
    res.status(500).json({error: "Error fetching data from database"})
  }
})

//delete single document
router.route("/deletemenu/:id").delete(async(req, res) =>{
  try {
    const {id} = req.params;
    const document = await database.get(id);
    const {_rev} = document;
    const results = await database.destroy(id , _rev);

    if(results.ok){
      res.json({success:true, message:'Successfully deleted'});
    }else{
      res.status(404).json({success:false, message:'Document not found'});
      // console.log("404");
    }
   
  } catch (error) {
    res.status(500).json({error: error + "Error deleting"});
  }
})


//update document
router.route("/updatemenu/:id").put(async(req, res)=>{
try {
  const {id} = req.params;
  const existDoc = await database.get(id);
  const {_rev} = existDoc;

  const updatedDoc ={
    ...existDoc,
    ...req.body,
    _rev: existDoc._rev
  };

  const results =await database.insert(updatedDoc);

  if(results.ok){
    res.json({success:true, message:'Document updated successfully'});
  }else{
    res.status(500).json({success:false, message:'Document updating fail'});
  }

} catch (error) {
  res.status(500).json({error:error +"Error updating the document"})
}
})



module.exports = router;
