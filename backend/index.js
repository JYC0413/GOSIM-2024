const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname, '../frontend');

app.use(express.static(staticPath));

//页面部分
app.get('/2024Participants', (req, res) => {
    res.sendFile(path.join(staticPath, '2024Participants.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});