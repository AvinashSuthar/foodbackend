require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = process.env.MONGOURI;
async function connectDB() {
    await mongoose.connect(mongoURI).then(async ()=>{
        const fetched_data = await mongoose.connection.db.collection("fooddatas");
        fetched_data.find({}).toArray().then(async (ans)=>{
            const foodCategory = await mongoose.connection.db.collection("foodcategories");
            foodCategory.find({}).toArray().then((catData)=>{
                // console.log(catData)
                global.Food_Items = ans;
                global.Food_Category = catData;
            })
            // console.log(ans);
        }).catch((e)=>{console.log(e)});
    })


          
          
    
}

module.exports = connectDB;