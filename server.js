const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fr', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index_fr.html'));
});


app.post('/', (req, res) => {
    console.log(req.body);
})


app.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
