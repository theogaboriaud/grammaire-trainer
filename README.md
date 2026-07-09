# Atelier Grammaire

Application web statique prête à être mise en ligne sur GitHub Pages.

## Lancer l'application

Ouvrir simplement [index.html](./index.html) dans un navigateur, ou servir le
dossier via un petit serveur HTTP local.

## Fonctionnement

- une seule page d'entraînement
- réponse libre avec autocomplétion
- scores calculés en arrière-plan pour orienter les questions suivantes
- stockage local au navigateur uniquement
- notions actives pilotées par [config.js](./config.js)

## Modifier les notions actives

Éditer le tableau `activeIds` dans [config.js](./config.js).

## Remarque

La proposition subordonnée relative existe toujours dans la base, mais elle est
désactivée par défaut dans la configuration initiale.
