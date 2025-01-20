const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Routes d'authentification
const homeRoutes = require('./routes/homeRoutes'); // Routes de la page d'accueil
const dashboardRoutes = require('./routes/dashboardRoutes');


const AdminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware pour analyser le corps des requêtes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour la gestion de session
app.use(session({
  secret: 'secretKey',  // tu peux garder cette valeur pour l'instant
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));


// Configurer les fichiers statiques (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/user', dashboardRoutes);
app.use('/admin', AdminRoutes)


// Connexion à MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/gestion_conge', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((err) => console.error('Erreur de connexion MongoDB:', err));

// Gestion des erreurs globales

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send('Page non trouvée');
});

// Middleware pour les erreurs générales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose a mal tourné !');
});

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
