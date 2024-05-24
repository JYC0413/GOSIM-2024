const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = new express();
const port = 4096;

const staticPath = path.join(__dirname, 'frontend');

app.use(express.static(staticPath));
app.use(bodyParser.json());

//api请求部分

app.post('/_api/getIssuesList', async (req, res) => {
    console.log(req.body)
    const data = await fetch(`https://code.flows.network/webhook/5xAx1Yru2BqZ9PUacb3q/issues?page=${req.query.page}&page_size=${req.query.page_size}`, {
        method: 'POST',
        body: JSON.stringify(req.body)
    })
    res.send(await data.json())
});

app.post('/_api/getProjectsList', async (req, res) => {
    const data = await fetch(`https://code.flows.network/webhook/5xAx1Yru2BqZ9PUacb3q/projects?page=${req.query.page}&page_size=${req.query.page_size}`)
    try{
        res.send(await data.json())
    }catch (e) {
        res.status(500).send(JSON.stringify({message:"fetch fall!"}))
    }
});

app.get('/_api/getIssuesList', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

//页面部分
app.get('/', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});

app.get('/2024Participants', (req, res) => {
    res.sendFile(path.join(staticPath, '2024Participants.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(staticPath, 'adminPage.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;