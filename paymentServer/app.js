const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const accountRoutes = require("./routes/accountRoutes");



// Load env var
require("dotenv").config();
const port = process.env.PORT;
// Configuration
const connectDatabase = require("./config/database");


// Create express app
const app = express();

// Connect to dbs
connectDatabase();


// Middleware
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use('/accounts', accountRoutes);


//test route, cần test thì gắn tên file view vào ngay dòng res.render mà test
// app.get('/test', (req, res)=>{
//   //localhost:5000/test
//   res.render('tourInfo', {user: {
//     fullName: 'Hello Kong ne',
//     _id: '123456'
//   }});
// })

// Đường dẫn đến các tệp chứng chỉ và khóa riêng tư
const sslOptions = {
    key: fs.readFileSync('./certificates/key.pem'),
    cert: fs.readFileSync('certificates/cert.pem')
  };
  
  const server = https.createServer(sslOptions, app);

  server.listen(port, () => {
    console.log(`Server is running on port ${port} over HTTPS`);
  });
