const express = require("express");
const router = express.Router();

router.post("/foodData" , (req, res)=>{
  try {
    res.send([global.Food_Items, global.Food_Category])
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
})




module.exports = router;