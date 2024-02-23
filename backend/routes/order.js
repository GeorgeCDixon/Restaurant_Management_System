const express = require('express');
const router = express.Router();
const database = require('../db/db');

//POst
router.route('/addorder').post(async (req, res) => {
    try {
        const {
            type,
            items,
            totalAmount,
            status,
            customerId,
            deliveryAddress,
            createdAt 
        } = req.body;

        const data ={
            type:type,
            items:items,
            totalAmount:totalAmount,
            status:status,
            customerId:customerId,
            deliveryAddress:deliveryAddress,
            createdAt:createdAt 
        }

        // const data = req.body;

        const results = await database.insert(data);

        if(results.ok){
            res.json({success: true, message: "Order added successfully"});
        }else{
            res.status(404).json({success: false, message: "Order adding failed"});
        }
    } catch (error) {
        res.status(500).json({success: false, error:error + 'failed to add order'});
    }
})

// get all orders
router.route('/getallorders').get(async(req, res)=>{
    try {
        const results = await database.list({include_docs:true});
        const order = results.rows.filter(row =>row.doc.type === "order").map((row)=> row.doc);
        res.json({success:true, data: order});    
    } catch (err) {
        res.status(500).json({err:"Error fetching order data"})
    }
});


// get single data
router.route("/getorder/:id").get(async(req, res)=>{
    try {
        const {id} = req.params;
        const document = await database.get(id);
        res.json({success:true , data:document});
    } catch (error) {
        res.status(500).json({error: 'Error fetching order'});
    }
});

//delete single doc
router.route('/deleteorder/:id').delete(async(req, res)=>{
    try {
        const {id} = req.params;
        const document = await database.get(id);
        const {_rev} = document;
        const results = await database.destroy(id, _rev);

    if(results.ok){
        res.status(200).json({success:true, message:'order deleted successfully'});
    }else{
        res.json({success:false, message:'Error deleting order'});
    }

    } catch (error) {
        res.status(500).json({error: error + 'Deleting order failed'});
    }
})

// update document
router.route("/updateorder/:id").put(async(req,res)=>{
    try {
        const {id} = req.params;
        const document = await database.get(id);
        
        const updateDoc ={
            ...document,
            ...req.body,
            _rev :document._rev
        };

        const results = await database.insert(updateDoc);


        if (results.ok){
            res.json({success:true, message:'Order updated successfully'});
        }else{
            res.json({success:false, message:"order updation failed"});
        }

    } catch (error) {
        res.status(500).json({error:error +'Error updating order'});
    }
})


module.exports = router;