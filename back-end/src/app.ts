import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/algo', require('./routes/algo'))
app.use('/api/leaderboard', require('./routes/leaderboard'))
app.use('/api/profile', require('./routes/profile'))

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
