const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.redirect('/blog');
});

app.get('/blog', (req, res) => {
    res.send("Hello from blog");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
