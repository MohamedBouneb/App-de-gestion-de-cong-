document.getElementById('congeForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire

    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const type = document.getElementById('type').value;
    const desc = document.getElementById('desc').value;

    //console.log(startDate,endDate,type,desc)

    try {
        const response = await fetch('/user/conges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ startDate, endDate, type, desc }),
        });

        const data = await response.json();
        if (response.ok) {
            const userId = data.userId
            //console.log(data.userId)
            window.location.href = `/user/liste-des-conges` //'/admindashboard';
        } else {
            throw new Error(data.error || 'Une erreur est survenue');
        }
    } catch (error) {
        alert(error.message); // Gestion des erreurs
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Appeler l'API pour récupérer les données utilisateur
        const response = await fetch('/user/user-data');
        if (!response.ok) throw new Error('Erreur lors de la récupération des données utilisateur');

        const { user, conges } = await response.json();

        // Mettre à jour le message de bienvenue
        const userWelcome = document.getElementById('userWelcome');
        userWelcome.textContent = `Bienvenue, ${user.name} !`;

        // Afficher les demandes de congé
        const congeList = document.getElementById('congeList');
        congeList.innerHTML = conges.map(conge => `
            <tr>
                <td>${conge.startDate}</td>
                <td>${conge.endDate}</td>
                <td>${conge.type}</td>
                <td>${conge.status}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Erreur :', error.message);
    }
});

