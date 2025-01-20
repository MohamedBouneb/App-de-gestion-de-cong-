document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fields = {
    fullname: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    role: document.getElementById('role').value
  };

  // Log pour vérifier la valeur de role
  //console.log('Role sélectionné:', fields.role);

  // Validation
  if (fields.password !== fields.confirmPassword) {
    return alert('Les mots de passe ne correspondent pas');
  }

 // console.log(fields)
  if (!['ad', 'ut'].includes(fields.role)) {
    return alert('Le rôle doit être soit "user" soit "admin"');
  }
  //console.log(fields)
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });

    const data = await response.json();
   // console.log(data)
    if (response.ok) {
      alert(data.message);
      window.location.href = '/auth/login';
    } else {
      //console.log(data.error)
      alert(data.error || 'Une erreur est survenue');
    }

  } catch (error) {
    //console.log(error)
   // console.error('Erreur inattendue:', error);
    alert('Une erreur inattendue est survenue. Veuillez réessayer.');
  }
});
