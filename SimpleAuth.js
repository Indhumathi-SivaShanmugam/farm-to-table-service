const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Parse incoming JSON

// Hardcoded users
const users = {
    '100F': { password: 'FBIRD', role: 'farmer' },
    '100D': { password: 'DBIRD', role: 'distributor' },
};

// Simple login route
app.post('/login', (req, res) => {
    const { logID, logpass } = req.body;
    console.log('Received login attempt:', { logID, logpass });

    const user = users[logID];
    if (!user || user.password !== logpass) {
        console.log('Login failed for:', logID);
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: `Welcome, ${logID}!`, role: user.role });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
