const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors')

app.use(
  cors({
    origin:"http://localhost:3001",
    methods:["POST", "PUT", "GET","DELETE"],
  })
);
app.use(express.static('images'));
const items = [];
// make random data
for (let i = 1; i <= 24; i++) {
  const item = {
    image: `./Image/monkey.jpg`, 
    title: `Item ${i}`,
    unique_plays: Math.floor(Math.random() * 1000),
    total_plays: Math.floor(Math.random() * 5000),
    completion_rate: Math.floor(Math.random() * 100)
  };
  items.push(item);
}

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
