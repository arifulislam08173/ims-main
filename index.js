const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config  = require('./Server/config');
const jwt = require('jsonwebtoken');
// import axios from 'axios';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));


// Connect to MySQL database
config.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to MySQL database');
    // Start the server
    app.listen(4391, () => {
      console.log('Server is running on port 4391');
    });
  }
});


// User signUpd
app.post('/signup', (req, res) => {
  // console.log("k")
   const { name, email, password } = req.body;

   config.query('INSERT INTO users (Username, Email, Password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
     if (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
       return;
     }
     res.json({ message: 'User signed up successfully', id: result.insertId });
   });
 });




// Handle login request
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  config.query('SELECT * FROM users WHERE Email = ? AND Password = ?', [email, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      
      return;
    }
    if (result.length > 0) {
      const user = result[0];
      const token = jwt.sign({ userId: user.id, Username:user.Username, email: user.Email, Role_id:user.Role_id}, 'secret_key');
      res.status(200).json({ token });
    } else {
      res.status(401).send('Invalid email or password');
    }
  });
});



// Fetch all users Data
app.get('/users', (req, res) => {
  config.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result);
  });
});

// Update user
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  
  config.query('UPDATE users SET Username=?, Email=? WHERE id=?', [name, email, userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Delete user 
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  config.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

// Fetch user profile
app.get('/user/profile', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      res.status(401).send('Unauthorized');
      return;
    }
    const userId = decoded.userId;
    config.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (result.length > 0) {
        const user = result[0];
        res.json({ name: user.Username, email: user.Email, password: user.Password });
      } else {
        res.status(404).send('User not found');
      }
    });
  });
});

// app.listen(4391);


