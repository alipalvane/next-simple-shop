import mongoose from "mongoose";

async function connect(){
    //connect to batabase (MongoDB | noSQL type)
    await mongoose.connect('mongodb://127.0.0.1:27017/shopping')
    console.log('Connected.')
}

const db = {connect}
export default db