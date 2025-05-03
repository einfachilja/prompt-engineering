// Array mit den Bildpfaden
let images = [
    './assets/img/aircraft-4885805_640.jpg',
    './assets/img/airplane-4885803_640.jpg',
    './assets/img/beach-6354498_640.jpg',
    './assets/img/boat-4474975_640.jpg',
    './assets/img/cruise-3703999_640.jpg',
    './assets/img/cruise-4339923_640.jpg',
    './assets/img/houses-4093227_640.jpg',
    './assets/img/petra-6294051_640.jpg',
    './assets/img/sea-4768869_640.jpg',
];

// Funktion zum Rendern der Bilder in die Galerie
function render() {
    // Hole das Div mit der ID 'content'
    let contentDiv = document.getElementById('content');
    // Leere den Inhalt des Divs, falls schon etwas drin ist
    contentDiv.innerHTML = '';

    // Erstelle HTML für alle Bilder
    let imagesHTML = '';
    for (let i = 0; i < images.length; i++) {
        // Füge jedes Bild mit onclick Event hinzu
        contentDiv.innerHTML += `<img class="gallery-image" src="${images[i]}" onclick="showImage('${images[i]}')" alt="Image ${i + 1}" style="margin:5px; max-width:200px;">`;
    }
}

// Funktion zum Anzeigen eines großen Bildes im Overlay
function showImage(src) {
    // Finde den Index des aktuellen Bildes
    let currentIndex = images.indexOf(src);

    // Erstelle Overlay-Div
    let overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Erstelle das große Bild
    let largeImg = document.createElement('img');
    largeImg.src = src;
    overlay.appendChild(largeImg);

    // Erstelle linken Pfeil (zurück)
    let leftArrow = document.createElement('div');
    leftArrow.innerHTML = '&#10094;'; // « Symbol
    leftArrow.style.position = 'absolute';
    leftArrow.style.left = '20px';
    leftArrow.style.top = '50%';
    leftArrow.style.transform = 'translateY(-50%)';
    leftArrow.style.fontSize = '48px';
    leftArrow.style.color = 'white';
    leftArrow.style.cursor = 'pointer';
    leftArrow.style.userSelect = 'none';

    // Erstelle rechten Pfeil (vor)
    let rightArrow = document.createElement('div');
    rightArrow.innerHTML = '&#10095;'; // » Symbol
    rightArrow.style.position = 'absolute';
    rightArrow.style.right = '20px';
    rightArrow.style.top = '50%';
    rightArrow.style.transform = 'translateY(-50%)';
    rightArrow.style.fontSize = '48px';
    rightArrow.style.color = 'white';
    rightArrow.style.cursor = 'pointer';
    rightArrow.style.userSelect = 'none';

    // Event Listener für linken Pfeil (vorheriges Bild)
    leftArrow.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert Schließen des Overlays beim Klicken
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        largeImg.src = images[currentIndex];
    });

    // Event Listener für rechten Pfeil (nächstes Bild)
    rightArrow.addEventListener('click', function(event) {
        event.stopPropagation(); // Verhindert Schließen des Overlays beim Klicken
        currentIndex = (currentIndex + 1) % images.length;
        largeImg.src = images[currentIndex];
    });

    // Füge Pfeile dem Overlay hinzu
    overlay.appendChild(leftArrow);
    overlay.appendChild(rightArrow);

    // Event Listener zum Schließen des Overlays nur bei Klick außerhalb des Bildes
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    // Füge Overlay zum Body hinzu
    document.body.appendChild(overlay);
}
