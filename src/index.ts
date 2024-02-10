const mongoose = require('mongoose');
const app = require('./app.ts');

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}`)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Start the server
connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   })
   .catch((err) => {
      console.error(err);
   });

