import mongoose from "mongoose";

// data schema, hoe and what will be stored
const whatsappSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

// collection
export default mongoose.model('messagecontents',whatsappSchema)