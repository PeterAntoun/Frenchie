# Frenchie — Révision pour la naturalisation française 🇫🇷

Application web d'entraînement aux questions de l'**examen civique** requis pour la
naturalisation française (en vigueur depuis le 1er janvier 2026). Aucune dépendance,
aucun build : HTML/CSS/JavaScript purs.

## Fonctionnalités

- **Flashcards** avec répétition espacée (les cartes ratées reviennent plus vite)
- **QCM d'entraînement** avec distracteurs tirés du même thème
- **Réponse libre** avec vérification approximative
- **Examen blanc au format officiel** : 40 questions, 45 minutes, seuil de réussite
  de 32/40 (80 %), une seule bonne réponse parmi 4 — conforme à l'arrêté du
  10 octobre 2025
- Résultats détaillés par thème, liste des erreurs, historique des tentatives
- Filtre « uniquement les cartes à revoir »
- **Pensé pour le mobile** : toucher la carte pour révéler la réponse, balayer
  à gauche/droite pour changer de question, question affichée en premier,
  grandes zones tactiles, installable sur l'écran d'accueil (PWA)
- Raccourcis clavier sur ordinateur (`1`–`4` répondre, `Espace` révéler,
  `←`/`→` naviguer)
- Progression sauvegardée en local (`localStorage`), export JSON
- Réponses modifiables carte par carte (panneau « Réponse de la carte »)

## Les 5 thèmes officiels

1. Principes et valeurs de la République
2. Système institutionnel et politique
3. Droits et devoirs
4. Histoire, géographie et culture
5. Vivre dans la société française

## Vérification des réponses

Toutes les réponses ont été relues et vérifiées (juillet 2026). Corrections apportées
par rapport à la version initiale générée par IA :

| Question | Correction |
|---|---|
| Le régime de la France est : | Simplifié en « une démocratie » (réponse attendue au QCM) |
| Une femme peut avorter : | Précision : l'IVG est inscrite dans la Constitution depuis 2024 |
| La peine de mort est : | Précision : abolie **depuis 1981** |
| Première démarche pour chercher un emploi | Réponse directe : s'inscrire à France Travail |
| Numéro des pompiers | Ajout du 112 (numéro d'urgence européen) |
| École obligatoire jusqu'à quel âge | Ajout de l'obligation de formation jusqu'à 18 ans |
| « Pour qui l'école est-elle obligatoire ? » | Doublon supprimé |
| Qui a fondé la Ve République ? | Réponse directe : Charles de Gaulle |

Le reste du deck (dates, institutions, chiffres : 577 députés, 101 départements,
13 régions métropolitaines, 27 États membres de l'UE, etc.) a été vérifié et est correct.

## Lancer en local

Ouvrez simplement `index.html` dans un navigateur, ou servez le dossier :

```bash
npx serve .
```

## Déployer sur Vercel

Le projet est un site statique : Vercel le déploie tel quel, sans build.

**Option A — depuis le tableau de bord :**
1. https://vercel.com/new → importer le dépôt GitHub `PeterAntoun/Frenchie`
2. Framework preset : **Other** (aucun build command, output directory vide)
3. Deploy

**Option B — en ligne de commande :**
```bash
npm i -g vercel
vercel        # prévisualisation
vercel --prod # production
```

## Structure

```
index.html   # interface (entraînement + examen blanc)
styles.css   # styles
data.js      # deck de questions/réponses vérifiées
app.js       # logique du jeu et de l'examen
vercel.json  # en-têtes de sécurité
docs/        # liste brute des questions d'origine
```

## Avertissement

Outil de révision non officiel. Référez-vous au site du ministère de l'Intérieur
(formation-civique.interieur.gouv.fr) pour les informations officielles sur l'examen.
