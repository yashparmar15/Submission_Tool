const express = require("express");
const keys = require("./config/keys");
const mogoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
var cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const userRoutes = require('./routes/userRoutes');
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


// app.use(
// 	cookieSession({
// 		name: "college",
// 		maxAge: 30 * 24 * 60 * 60 * 1000,
// 		keys: [keys.cookieKey],
// 	})
// );

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler)
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});
