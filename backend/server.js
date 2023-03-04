const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/userRoutes');
const cors = require('cors')
// Set up Express server
const app = express();
// mongodb://localhost:27017/userModelCrud
let mongourl='mongodb+srv://manish:manish@cluster0.nd2fk.mongodb.net/?retryWrites=true&w=majority'
// Connect to MongoDB database using Mongoose
mongoose.connect(mongourl, {
  useNewUrlParser: true,
//   useCreateIndex: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Set up middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors())
// Set up routes for user APIs
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
