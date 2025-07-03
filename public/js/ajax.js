document.addEventListener("DOMContentLoaded", function () {

    // UTILISATION DE ASYNC AWAIT POUR GERER LA REQUETE AJAX ASYNCHRONE
    // CHOIX DE LA LISIBILITE COMPARER A LA CHAINE .THEN() QUI EST BASEE SUR LE MEME PRINCIPE DES PROMISES

    //DELETE VIDEO
    document.querySelectorAll(".delete-button").forEach(button => {
        button.addEventListener('click', async () => {
            let index = button.dataset.index;
            const idVideo = button.dataset.id;

            if (!confirm("Confirmer la suppression ?")) return;

            try {
                //ENVOI DE LA REQUETE POST VIA FETCH AVEC ASYNC / AWAIT
                const res = await fetch("/delete", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: idVideo })
                });

                //ATTENTE DE LA REPONSE TRANSFORME EN JSON
                const result = await res.json();
                console.log(result)

                //SI LA SUPPRESSION A REUSSI COTE SERVEUR
                if (result.success) {
                    alert('ELément supprimé');

                    //SUPPRESSION DU BLOC VIDEO DANS LE DOM
                    const card = document.querySelector(`#card-${index}`);
                    console.log(card)
                    if (card) card.remove();

                } else {
                    //AFFICHE L'ERRUR ENVOYE DU BACKEND
                    alert('Erreur :' + result.message)
                }
            } catch {
                // GESTION DES ERREURS D'EXECUTION
                console.error("Erreur")
            }
        })
    })

    //UPDATE VIDEO
    document.querySelectorAll(".update-button").forEach(button => {
        button.addEventListener('click', async () => {
            let index = button.dataset.index;
            const inputTitre = document.getElementById(`titre-${index}`).value;
            const inputResume = document.getElementById(`resume-${index}`).value;
            const idVideo = button.dataset.id;

            if (!confirm("Confirmer la modification ?")) return;

            try {
                //ENVOI DE LA REQUETE POST VIA FETCH AVEC ASYNC / AWAIT
                const res = await fetch("/update", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: idVideo, titre: inputTitre, resume: inputResume })
                });

                 //ATTENTE DE LA REPONSE TRANSFORME EN JSON
                const result = await res.json();
                console.log(result)

                //SI LA MODIFICATION A REUSSI COTE SERVEUR
                if (result.success) {
                    alert('ELément modifié');
                } else {
                    //AFFICHE L'ERRUR ENVOYE DU BACKEND
                    alert('Erreur :' + result.message)
                }
            } catch {
                // GESTION DES ERREURS D'EXECUTION
                console.error("Erreur")
            }
        })
    })
})
