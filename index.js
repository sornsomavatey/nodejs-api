const express = require('express');
const app = express();
app.use(express.json()); // for parsing application/json

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Registration - Post method
let users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Store the user in an array (In real apps, this will be a database)
  users.push({ username, password });
  res.status(201).send('User registered successfully');
});


// Login - Post method
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  });

// Search - Get method
app.get('/search', (req, res) => {
    const { username } = req.query;
    const user = users.find(u => u.username === username);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send('User not found');
    }
  });

// Profile update
app.put('/update-profile', (req, res) => {
    const { username, newPassword } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
      user.password = newPassword;
      res.status(200).send('Profile updated successfully');
    } else {
      res.status(404).send('User not found');
    }
  });

// Delete user
app.delete('/delete-user', (req, res) => {
    const { username } = req.body;
    users = users.filter(u => u.username !== username);
    res.status(200).send('User deleted successfully');
  });