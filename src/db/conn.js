const mongoose=require("mongoose");

const mongoDB = "mongodb://127.0.0.1:27017/Registration";
mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, { 
    useNewUrlParser: true ,
    useUniFiedTopology:true,
    // useCreateIndex:true
})
.then(() => {
  console.log("Database is connected");
},
(err) => {
console.log("There is problem while connecting database " + err);
});
// const testDbCollectionScheema= mongoose.Schema({
//     Name:{
//         type:String,
//         required:true
//     },
//     Email:{
//         type:String,
//         required:true
//         },
//     Password:{
//         type:String,
//         required:true
//         },

// });
// const TestDbCollection=new mongoose.model('TestDbCollection',testDbCollectionScheema);

// const createDocument=async ()=>{
//     try{
//         const mohitT=new TestDbCollection({
//             Name:"Depaali",
//             Email:"Mohit@gmail.com",          
//             Password:"654321"
        
//         });
//         const result=await mohitT.save();
//         console.log(result);
//     }catch(err){
//         console.log(err);
//     }
    
// }
// createDocument();