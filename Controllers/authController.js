const User = require('../models/User');

// Inscription
exports.signup = async (req, res) => {
  try {
    const { fullname, email, password, confirmPassword, role } = req.body;

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      return res.status(400).send({ error: 'Passwords do not match' });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already in use' });
    }
    // creer utilisateur jdid
    const user = new User({ fullname, email, password, role });
    await user.save();
    
    res.status(201).send({ message: 'Account created successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to create account' });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email, role });
    if (!user || user.password !== password) {
      return res.status(401).send({ error: 'Invalid credentials or role' });
    }

    res.status(200).send({ message: 'Login successful', role: user.role });
  } catch (error) {
    res.status(500).send({ error: 'Failed to log in' });
  }
};
