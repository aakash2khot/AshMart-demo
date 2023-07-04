const mongoose = require('mongoose');
const mongoURI = 'mongodb://AshMart:mern1234@ac-pcjg4qg-shard-00-00.eioachd.mongodb.net:27017,ac-pcjg4qg-shard-00-01.eioachd.mongodb.net:27017,ac-pcjg4qg-shard-00-02.eioachd.mongodb.net:27017/AshMart_data?ssl=true&replicaSet=atlas-l13u10-shard-0&authSource=admin&retryWrites=true&w=majority'
// const mongoDB = async () => {

//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true }, await console.log("Connected to mongo `Successful"))

//         // console.log('Mongo connected');
//         const food = mongoose.connection.collection("food_items");
//         try {
//             const data = await food.find({}).toArray();
//             // console.log(data);
//         }
//         catch (error) {
//             console.error('Error retrieving data:', error);
//         }
//     }
//     catch (error) {
//         console.log(error)

//     }

// }
const mongoDB = async () => {
    await mongoose.connect(mongoURI, await console.log("Connected to mongo `Successful"))
    const fetch_data1 = mongoose.connection.db.collection("food_items").find({})
    const foodItems = await fetch_data1.toArray();
    const fetch_data2 = mongoose.connection.db.collection("food_category").find({})
    const foodCategory = await fetch_data2.toArray();
    global.food_items = foodItems;
    global.food_category = foodCategory;
    // console.log(foodItems)
    // console.log(foodCategory)
    // if (foodItems.length > 0) {
    //     foodItems.forEach((foodItems, i) => {
    //         global.food_items = foodItems;
    //         console.log(global.food_items)
    //     })
    // } else {
    //     console.log(`No listings found`);
    // }
    // if (foodCategory.length > 0) {
    //     foodCategory.forEach((foodCategory, i) => {
    //         global.food_categroy = foodCategory;
    //         console.log(global.food_category)
    //     })
    // } else {
    //     console.log(`No listings found`);
    // }

}
module.exports = mongoDB;
