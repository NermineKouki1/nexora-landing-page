# Nexora — solutions numériques

Landing page responsive pour Nexora, une startup fictive de Sousse. Projet pédagogique FIA3 réalisé à l'ISSAT Sousse par le Groupe 1, sous-groupe 2.

## Fonctionnalités

- HTML5 sémantique et CSS responsive, sans bibliothèque ni framework.
- Navigation adaptée au mobile, indicateur de section active et en-tête masqué pendant le défilement vers le bas.
- Carrousel de témoignages accessible, pilotable au clavier et au tactile, avec lecture automatique désactivable.
- Validation accessible du formulaire, compteur de caractères et confirmation de soumission simulée (aucune donnée n'est transmise).
- Offre promotionnelle sous forme de dialogue natif, avec mémorisation locale de sa fermeture.
- Révélation au défilement et compteurs animés, avec respect de la préférence de réduction des mouvements.
- Métadonnées Open Graph, données structurées Schema.org, fichier `robots.txt` et sitemap XML.

## Modules JavaScript ES6

- `js/main.js` : point d'entrée qui initialise les fonctionnalités.
- `js/modules/storage.js` : accès protégé au stockage local et préférence de mouvement réduit.
- `js/modules/menu.js` : comportement de l'en-tête, navigation mobile et scrollspy.
- `js/modules/carousel.js` : classe `Carousel` et commandes du carrousel.
- `js/modules/form.js` : validation, accessibilité et confirmation du formulaire.
- `js/modules/modal.js` : ouverture, fermeture et persistance de la boîte de dialogue.
- `js/modules/reveal.js` : apparition progressive des éléments.
- `js/modules/counters.js` : animation des statistiques.

## Lancement local

Les modules ES doivent être servis via HTTP plutôt qu'ouverts directement en `file://`.

1. Ouvrir le dossier du projet dans Visual Studio Code.
2. Installer l'extension **Live Server** si elle n'est pas déjà disponible.
3. Ouvrir `index.html`, puis choisir **Open with Live Server**.

Le formulaire est une démonstration côté navigateur : il n'envoie ni n'enregistre les informations saisies.

## Vérification

Les pages peuvent être contrôlées avec le [validateur HTML du W3C](https://validator.w3.org/) et le [validateur CSS du W3C](https://jigsaw.w3.org/css-validator/). L'adresse de canonical et celles du sitemap correspondent au déploiement GitHub Pages prévu pour ce dépôt.
