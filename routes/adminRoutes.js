const express = require('express');
const Conge = require('../model/Conge');
const User = require('../model/User');

const router = express.Router();

const checkAuth = (req, res, next) => {
    if (req.session.userId) return next();
    res.redirect('/auth/login');
};

router.get('/dashboard', checkAuth, async (req, res) => {

    const userAdminId = req.session.userId
    const currentUserName = await User.findOne({ _id: userAdminId }, 'fullname');

    const demandes = await Conge.find()
        .populate('user', 'fullname email')
        .exec();
    res.render('ListCongeAdminPage', { demandes, user: currentUserName });
});

router.post('/update-status', checkAuth, async (req, res) => {
    const { id, status } = req.body;

    try {

        const updatedConge = await Conge.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedConge) {
            return res.status(404).send('Demande non trouvée');
        }

        const userAdminId = req.session.userId
        const currentUserName = await User.findOne({ _id: userAdminId }, 'fullname');

        const demandes = await Conge.find()
            .populate('user', 'fullname email')
            .exec();

        res.render('ListCongeAdminPage', { demandes, user: currentUserName });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;