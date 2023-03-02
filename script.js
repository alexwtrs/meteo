let data;

fetch("weatherparis.json")
    .then(async (res) => {
        data = await res.json();
        console.log(data);
        // On récupère les informations de la ville (premier objet du tableau)
        const city = data[0].city;
        // On récupère la température actuelle (premier enregistrement)
        const currentTemp = data[0].records[0].temperature;
        const currentImg = data[0].records[0].img;
        // On affiche la ville et la température dans la carte
        const cardTitleEl = document.querySelectorAll(".card-title");
        cardTitleEl[0].textContent = city;
        //console.log(cardTitleEl[1])
        cardTitleEl[1].src = `${currentTemp}`;
        cardTitleEl[1].textContent = `${currentTemp} °C`;
        // On récupère le tableau des prévisions météo
        const tableEl = document.querySelector(".table tbody");
        // On boucle sur les enregistrements pour remplir le tableau
        data[0].records.forEach((record, index) => {
            const rowEl = tableEl.children[index];
            rowEl.children[0].textContent = record.day;
            rowEl.children[1].firstChild.src = `${record.img}`
            //rowEl.children[1].src = `${record.img} °C`;
            rowEl.children[2].textContent = `${record.temperature} °C`;
        });
    })
    .catch(console.error);

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('./service-worker.js')
            .then(function(registration) {
              console.log('Service worker registered successfully');
            })
            .catch(function(error) {
              console.log('Service worker registration failed:', error);
            });
        });
      }
      