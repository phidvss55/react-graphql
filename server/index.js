const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();

const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());

// Connect to DB
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development", // if we are in development mode, we want to show the graphiql interface
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
