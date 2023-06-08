const connectDB = require("../config/db");
const { createServer } = require("./server");
const port = process.env.BACKEND_PORT;
const connectionObject = connectDB(process.env.MONGO_URI);
const app = createServer();

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
