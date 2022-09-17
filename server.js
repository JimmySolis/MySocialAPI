const express = require('express');
const db = require('./config/connection');
const routes = requires('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: ture}));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server runnning on ${PORT} 🚨`)
    })
});