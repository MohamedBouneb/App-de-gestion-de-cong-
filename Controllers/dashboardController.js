exports.dashboard = (req, res) => {
    // Vérifier si l'utilisateur est connecté via la session
    if (!req.session.userId) {
      return res.redirect('/auth/login'); // Rediriger si non connecté
    }
  
    res.render('dashboard'); // Rendre la vue dashboard
  };
  