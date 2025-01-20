const express = require('express');
const path = require('path');
const User = require('../model/User');
const router = express.Router();

// Route d'inscription et de connexion
router.get('/signup', (req, res) => res.sendFile(path.join(__dirname, '../view/signup.html')));
router.get('/login', (req, res) => res.sendFile(path.join(__dirname, '../view/login.html')));

// Middleware pour vérifier si l'utilisateur est connecté
const checkAuth = (req, res, next) => {
  if (req.session.userId) return next();
  res.redirect('/auth/login');
};

// Route pour afficher le dashboard après la connexion
router.get('/dashboard', checkAuth, (req, res) => res.sendFile(path.join(__dirname, '../view/conge.html')));

// Route pour traiter l'inscription
router.post('/signup', async (req, res) => {
  const { fullname, email, password, role } = req.body;

  // console.log(fullname, email, password, role)

  if (!fullname || !email || !password || !role) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  const validRoles = ['ut', 'ad'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `Le rôle doit être l'un de ces choix : ${validRoles.join(', ')}` });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email déjà utilisé' });
  }

  try {
    const user = new User({ fullname, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    // console.log(error)
    //console.error('Erreur pendant l\'inscription :', error);
    res.status(400).json({ error: 'Erreur d\'inscription' });
  }
});

// Route pour traiter la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

  if (user.password === password) {
    req.session.userId = user._id;
    req.session.fullname = user.fullname;
    return res.status(200).json({ userRole: user.role, message: 'Connexion réussie' });
  }

  res.status(401).json({ error: 'Mot de passe incorrect' });
});

module.exports = router;
