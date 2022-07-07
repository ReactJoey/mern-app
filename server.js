const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3001;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/route1', require('./routes/route1lRoutes'));
// app.use('/api/route2', require('./routes/route2Routes'));

// This part is for serving static files to the client side (build).
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Brings user back to root route if entered erroneous url.
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'client/', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please switch to production mode.'));
};

app.use(errorHandler);

app.listen(port, () => console.log(`Express server initialized on port ${port}.`));