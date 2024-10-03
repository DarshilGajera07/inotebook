const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.error("Error connecting to MongoDB: ", err));
};

module.exports = connectToMongo;