require('dotenv').config();
const express = require('express');
const db = require('./db-connection');

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/blog');
});

app.get('/blog', async (req, res) => {
    try {
        const result  = await db.query('SELECT * FROM blog_post');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/blog', async (req, res) => {
    const { title, author, summary, content, s3_image_url } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO blog_post (title, author, summary, content, s3_image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, author, summary, content, s3_image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.put('/blog/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, summary, content, s3_image_url } = req.body;

    let query = 'UPDATE blog_post SET ';
    const params = [];
    let paramIndex = 1;

    if (title !== undefined) {
        query += `title = $${paramIndex++}, `;
        params.push(title);
    }
    if (author !== undefined) {
        query += `author = $${paramIndex++}, `;
        params.push(author);
    }
    if (summary !== undefined) {
        query += `summary = $${paramIndex++}, `;
        params.push(summary);
    }
    if (content !== undefined) {
        query += `content = $${paramIndex++}, `;
        params.push(content);
    }
    if (s3_image_url !== undefined) {
        query += `s3_image_url = $${paramIndex++}, `;
        params.push(s3_image_url);
    }

    query += `updated_at = CURRENT_TIMESTAMP WHERE id = $${paramIndex} RETURNING *`;
    params.push(id);

    try {
        const result = await db.query(query, params);
        if (result.rows.length === 0) {
            return res.status(404).send('Blog post not found');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/blog/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'DELETE FROM blog_post WHERE id = $1 RETURNING *',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Blog post not found');
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
