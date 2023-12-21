const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/mydb.js");
const bodyParser = require("body-parser")


const app = express();
const PORT = 3000;

app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

const AuthRouter = require("./routes/auth.js");
const adminRouter = require("./routes/admin.js");
const productRouter = require("./routes/product.js");
const userRouter = require("./routes/user.js");
app.use(AuthRouter);
app.use(adminRouter)
app.use(productRouter)
app.use(userRouter)

connectToDatabase();
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});


