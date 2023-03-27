// importing
import express from 'express';
import mongoose from  'mongoose';
import Messages from "./dbMessages.js";
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1573889",
    key: "4493e6fa96ebfc4b41bf",
    secret: "3c12a1ce1c0703503d65",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json());
app.use(cors());

// used cors
// app.use((req, res, next) => {
//     console.log("CORS middleware");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//     next();
// });



//DB config
const connection_url = "mongodb+srv://hrithikgupta52:Hrithik8436@cluster0.os48d7q.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    // useCreateIndex: true,
    // useNweUrlParser: true,
    // useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open',()=>{
    console.log('DB connected');

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetials = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetials.name,
                message: messageDetials.message,
                timestamp: messageDetials.timestamp,
                recived: messageDetials.recived,
            });
        }else{
            console.log('Error triggered Pusher')
        }

    });
});

//???????

// api routes
app.get("/",(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) =>{
    Messages.find((err, data) => {   
        if (err) {
            res.status(500).send(err)
    }else{
        res.status(200).send(data)
    }
});
});

app.post("/messages/new", function(req, res) {
    const dbMessage = req.body

    Messages.create(dbMessage, function(err, data) {
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    });
});

//listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));