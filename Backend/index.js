const express = require("express");
const fileUpload = require('express-fileupload');
require("dotenv").config();
const keys = require("./config/keys");
const mogoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const postRoutes = require('./routes/postRoutes')
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

app.use("/public", express.static("public"));
const PORT = process.env.PORT || 3000;


mogoose.connect(
	keys.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
	).then(() => {
		console.log("Connected to DB");
	}).catch((err) => {
		console.log(err);
	}
);
app.use('/api/users', userRoutes);
app.use('/api/class', classRoutes);
app.use('/api/posts', postRoutes);
app.use(notFound);
app.use(errorHandler)
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
