document.getElementById('registrationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  //const role = document.getElementById('role').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert(data.message);
    const userRole = data.userRole;
    console.log(userRole)
    if (userRole === 'ad') {
      window.location.href = '/admin/dashboard';
    } else {
      window.location.href = '/user/dashboard';
    }
  } else {
    alert(data.error);
  }
});
