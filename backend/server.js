const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your_secret_key'; // Replace with a strong secret key

app.use(cors());
app.use(bodyParser.json());

const users = {
    '100F': 'FBIRD', // Farmer credentials
    '100D': 'DBIRD', // Distributor credentials
};

app.post('/api/login', (req, res) => {
    const { logID, logpass } = req.body;

    if (users[logID] && users[logID] === logpass) {
        const token = jwt.sign({ id: logID }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, message: 'Login successful!' });
    }

    res.status(401).json({ message: 'Login failed. Invalid ID or password.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
