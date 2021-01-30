// Import Modules
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors') //Enable cors request
const cron = require('node-cron')
const cronJob = require('./cron')

app.use(cors())

// Import Routes
const userRoutes = require('./routes/userRoutes.js')
const contestRoutes = require('./routes/contestRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')
const paymentRoutes = require('./routes/paymentRoutes')

// Parsing the body of incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Static files
app.use(express.static('public'))

// Connect the routes with
app.use('/user', userRoutes);
app.use('/contest', contestRoutes);
app.use('/admin', adminRoutes); 
app.use('/payment', paymentRoutes)

// Listen to port 3000 
app.listen(3000,()=> console.log("server running on http://localhost:3000")); 

cron.schedule('0 0 0 * * *', async () => {
  cronJob.rContestDel(),
  cronJob.rProviderPay()
  }
)

module.exports = app


