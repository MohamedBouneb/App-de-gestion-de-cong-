const express = require('express');
const path = require('path');
const router = express.Router();
const Conge = require('../model/Conge');
const User = require('../model/User');

function checkAuth(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/auth/login');
}

router.get('/dashboard', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../view/conge.html'));
});

router.post('/conges', checkAuth, async (req, res) => {
  try {

    const { startDate, endDate, type, desc } = req.body;

    const conge = new Conge({
      startDate,
      endDate,
      type,
      desc,
      status: 'En attente',
      user: req.session.userId,
    });

    await conge.save();
    res.status(201).json({ userId: req.session.userId, message: 'Demande de congé soumise avec succès' });
  } catch (error) {
    console.error('Erreur lors de la soumission de la demande de congé:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la soumission de la demande de congé' });
  }
});

router.get('/liste-des-conges', checkAuth, async (req, res) => {
  try {
    const userId = req.session.userId
    const currentUserName = await User.findOne({ _id: userId }, 'fullname');
    if (!currentUserName) {
      return res.status(404).send('Utilisateur non trouvé.');
    }


    const demandes = await Conge.find({ user: userId })
      .populate('user', 'fullname email')
      .exec();

    res.render('admindashboard', { demandes, user: currentUserName });
  } catch (error) {

  }

})


module.exports = router;
