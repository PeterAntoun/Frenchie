// Deck officiel : questions de l'examen civique / entretien de naturalisation.
// Format : "Question|Réponse" ; une ligne se terminant par ":" ouvre un thème.
// Les réponses ont été vérifiées (juillet 2026) — voir README.md pour les corrections.
const RAW_DECK = `
Principes et valeurs de la République :
À quoi correspond la date du 14 juillet ?|La fête nationale française, qui rappelle notamment la prise de la Bastille en 1789 et la Fête de la Fédération de 1790.
Quel est l’un des symboles de la République française ?|Le drapeau tricolore est l’un des symboles officiels de la République.
Le principe d’égalité signifie que :|Tous les citoyens sont égaux devant la loi, sans distinction d’origine, de sexe, de religion ou de situation.
"Liberté, égalité, fraternité", c’est :|La devise de la République française.
A-t-on le droit d'insulter publiquement quelqu’un parce qu’il est différent (handicap, apparence physique, sexe…) ?|Non. Les injures et discriminations publiques sont interdites et peuvent être sanctionnées.
Certains métiers peuvent-ils être réservés aux hommes ?|Non. Les femmes et les hommes ont les mêmes droits d’accès au travail, sauf exigences très particulières prévues par la loi.
De quand date la Constitution de la Ve République ?|Elle date du 4 octobre 1958.
Le régime de la France est :|Une démocratie : la France est une République démocratique.
Lequel de ces symboles représente officiellement la République française ?|Marianne, le drapeau tricolore, La Marseillaise et la devise sont des symboles de la République.
Où peut-on voir la devise de la République ?|Sur les bâtiments publics, les mairies, les écoles et certains documents officiels.
Quels sont des symboles officiels de la République française ?|Le drapeau bleu-blanc-rouge, La Marseillaise, Marianne, la devise et le 14 Juillet.
Qu’est-ce que l’égalité ?|Le fait d’avoir les mêmes droits et devoirs devant la loi.
Que signifie la liberté ?|Pouvoir agir, penser, croire et s’exprimer dans le respect de la loi et des droits des autres.
Que signifie le mot "fraternité" dans la devise française ?|La solidarité, l’entraide et le respect entre les personnes.
Quel animal est un symbole de la France ?|Le coq gaulois.
Quel est l’un des rôles des associations ?|Réunir des personnes autour d’un projet, défendre une cause, aider les autres ou organiser des activités.
Quel est le nom de l'hymne national ?|La Marseillaise.
Quel symbole de la République française est tricolore ?|Le drapeau français.
Quelle est la date de la fête nationale française ?|Le 14 juillet.
Quelle est la devise de la République française ?|Liberté, Égalité, Fraternité.
Quelle est la langue officielle de la République française ?|Le français.
Quelle est la place de la langue française dans la République ?|Le français est la langue officielle de la République.
Quelle liberté permet à chacun d’exprimer ses idées ?|La liberté d’expression.
Quelle proposition est correcte ? La liberté d'expression :|Elle permet d’exprimer ses opinions, mais elle a des limites comme l’interdiction de la diffamation, de l’injure et de l’incitation à la haine.
Quelles sont les couleurs du drapeau français ?|Bleu, blanc et rouge.
Qu'est-ce que la Marseillaise ?|L’hymne national français.
Qu'est ce qui est traditionnellement organisé sur les Champs Élysées le 14 juillet pour célébrer la fête nationale ?|Un défilé militaire.
Qui est Marianne ?|Une figure symbolique de la République française.
Une personne peut-elle changer librement de religion ?|Oui. La liberté de conscience permet de choisir, changer ou quitter une religion.
"La France est une République indivisible, ..., démocratique et sociale". Complétez cette phrase extraite de l'article 1er de la Constitution :|Laïque.
En quelle année la loi de séparation des Églises et de l'État a-t-elle été votée ?|En 1905.
Que permet le principe de laïcité ?|La liberté de conscience, la neutralité de l’État et l’égalité des citoyens quelles que soient leurs croyances.
Quel droit est garanti par la laïcité ?|La liberté de conscience et la liberté de croire ou de ne pas croire.
Pourquoi le principe de laïcité doit-il être respecté à l'école ?|Pour garantir la neutralité de l’école publique, l’égalité des élèves et la liberté de conscience.
Qu'est-ce que la laïcité ?|La séparation des institutions publiques et des religions, avec neutralité de l’État et liberté de conscience.
Un enfant peut-il refuser d’aller à l’école pour une raison religieuse ?|Non. L’instruction est obligatoire.
Une personne a-t-elle le droit de ne pas croire en une religion ?|Oui. C’est la liberté de conscience.
Système institutionnel et politique :
Qui nomme le Premier ministre ?|Le président de la République.
Le Parlement est composé :|De l’Assemblée nationale et du Sénat.
Qu'est-ce que le pouvoir exécutif ? Le pouvoir :|Le pouvoir de faire appliquer les lois et de conduire la politique du pays.
Les dirigeants sont élus par les citoyens dans :|Une démocratie.
A-t-on le droit de ne pas respecter une loi ?|Non. La loi s’impose à tous.
Qui doit respecter la loi ?|Tout le monde : citoyens, habitants, élus, ministres et agents publics.
Quel est le rôle de l'autorité judiciaire ?|Faire respecter la loi, protéger les libertés et juger les litiges ou infractions.
Quel pouvoir détient un juge ? Le pouvoir :|Le pouvoir judiciaire.
L'autorité judiciaire est exercée par :|Les magistrats, notamment les juges et les procureurs.
Que se passe-t-il si un ministre ne respecte pas la loi ?|Il peut être poursuivi et sanctionné par la justice.
Qui est élu lors des élections législatives ?|Les députés.
Combien de députés composent l’Assemblée nationale ?|577 députés.
Quand sont élus les sénateurs ?|Ils sont élus au suffrage universel indirect et renouvelés par moitié tous les trois ans.
Qui est élu lors des élections municipales ?|Les conseillers municipaux, qui élisent ensuite le maire.
Qui est élu lors des élections présidentielles ?|Le président de la République.
À partir de quel âge a-t-on le droit de voter ?|À partir de 18 ans.
Pour combien de temps est élu le président de la République française ?|Pour 5 ans.
Pour combien de temps sont élus les députés ?|Pour 5 ans.
Pour combien de temps sont élus les sénateurs ?|Pour 6 ans.
Qui possède le pouvoir exécutif ?|Le président de la République et le Gouvernement.
Quelle condition est nécessaire pour voter aux élections ?|Être inscrit sur les listes électorales et remplir les conditions de nationalité et d’âge.
Qui peut voter aux élections en France ?|Les citoyens français majeurs inscrits sur les listes électorales. Les citoyens de l’Union européenne peuvent voter aux municipales et européennes en France.
Que signifie « suffrage universel » ?|Le droit de vote pour tous les citoyens remplissant les conditions prévues par la loi.
Concernant les partis politiques, quelle proposition est correcte ?|Ils participent à la vie démocratique et expriment différentes opinions politiques.
Quel est le rôle des députés ?|Voter les lois, contrôler le Gouvernement et représenter la Nation.
La séparation des pouvoirs est un principe fondamental. Quels sont les trois pouvoirs concernés ?|Le pouvoir exécutif, le pouvoir législatif et le pouvoir judiciaire.
Qui possède le pouvoir législatif ?|Le Parlement.
Qui sanctionne l'auteur d'un vol ?|La justice.
Qui élit les députés ?|Les citoyens français inscrits sur les listes électorales.
Qui vote les lois ?|Le Parlement.
Qui réside au palais de l'Élysée ?|Le président de la République.
Combien y a-t-il de départements en France ?|101 départements, en comptant les départements d’outre-mer.
Qui représente l'État dans un département ?|Le préfet.
Qui dirige la commune ?|Le maire, avec le conseil municipal.
Est-ce que le président de la République a tous les pouvoirs ?|Non. Les pouvoirs sont séparés et encadrés par la Constitution.
Qui est le préfet ?|Le représentant de l’État dans un département ou une région.
Quel est le rôle du Parlement ?|Voter les lois, contrôler l’action du Gouvernement et évaluer les politiques publiques.
Quel est le régime politique de la France aujourd'hui ?|Une République démocratique, indivisible, laïque et sociale.
Combien d'États font partie de l'Union européenne au 1er janvier 2025 ?|27 États membres.
Quel État n'est pas membre de l'Union européenne ?|Le Royaume-Uni n’est plus membre de l’Union européenne.
Quelle condition est nécessaire pour voter aux élections européennes ?|Être citoyen français ou citoyen d’un autre État de l’Union européenne, majeur et inscrit sur les listes électorales.
À quelle fréquence les élections européennes sont-elles organisées ?|Tous les 5 ans.
Quel pays est un pays fondateur de l'Union européenne ?|La France fait partie des pays fondateurs.
Quelle est la monnaie utilisée en France ?|L’euro.
Qui élit les députés européens ?|Les citoyens de l’Union européenne, au suffrage universel direct.
Quand célèbre-t-on la journée de l'Europe ?|Le 9 mai.
Droits et devoirs :
Comment s’appelle la Constitution actuelle de la France ?|La Constitution de la Ve République.
Comment s'appelle le texte qui énonce les droits et devoirs des personnes résidant en France ?|La Déclaration des droits de l’homme et du citoyen de 1789 est le texte fondateur ; la Constitution garantit aussi ces droits et devoirs.
Concernant les droits individuels, quelle proposition est correcte ?|Les droits individuels sont garantis par la loi mais s’exercent dans le respect des droits des autres et de l’ordre public.
De quelle année date la Déclaration des droits de l’homme et du citoyen ?|1789.
Lequel de ces droits est un droit fondamental ?|La liberté d’expression est un droit fondamental.
Parmi ces textes, lequel garantit les droits et libertés en France ?|La Constitution, qui renvoie notamment à la Déclaration des droits de l’homme et du citoyen.
Qu’est-ce que la liberté d’expression ?|Le droit d’exprimer ses idées et opinions, dans les limites prévues par la loi.
Quel droit permet à une personne de se défendre devant la justice ?|Les droits de la défense.
Quel est le texte fondateur établissant en France les droits et les devoirs de chaque citoyen ?|La Déclaration des droits de l’homme et du citoyen de 1789.
Quel texte a été adopté pendant la Révolution française ?|La Déclaration des droits de l’homme et du citoyen.
Quelle liberté permet à une personne de ne pas avoir de religion ?|La liberté de conscience.
Une femme peut avorter :|Si elle le décide : l’IVG est légale et la liberté d’y recourir est inscrite dans la Constitution depuis 2024.
Est-il toujours possible de divorcer ?|Oui. Le divorce est légal en France.
La peine de mort est :|Abolie en France depuis 1981.
Concernant les limites aux libertés individuelles, quelle proposition est correcte ?|Les libertés peuvent être limitées par la loi pour protéger les droits des autres, la sécurité et l’ordre public.
En France, est-ce légal d'être marié à plusieurs personnes en même temps ?|Non. La polygamie est interdite.
Faut-il réduire ses déchets ?|Oui. Chacun doit contribuer à limiter, trier et recycler ses déchets.
Jeter une bouteille dans la rue est :|Interdit et passible d’une sanction.
Pourquoi les libertés individuelles peuvent-elles être limitées ?|Pour respecter les droits d’autrui, la sécurité, la santé publique et l’ordre public.
Que doit faire une personne en cas d’accident ?|Protéger, alerter les secours et porter assistance si possible sans se mettre en danger.
Que permet la citoyenneté française ?|Voter, être éligible, participer à la vie civique et bénéficier de la protection de la France.
Que risque une personne qui ne respecte pas la loi ?|Une sanction : amende, peine de prison ou autre mesure prévue par la loi.
Quel est le rôle de la gendarmerie ?|Assurer la sécurité, faire respecter la loi et protéger les personnes, surtout en zones rurales et périurbaines.
Quel est le rôle de la police ?|Protéger les personnes et les biens, prévenir les infractions et faire respecter la loi.
Qu'est-ce qu'une infraction ?|Un comportement interdit par la loi et puni par une sanction.
Comment peut-on réduire ses déchets ?|Trier, recycler, réparer, réutiliser, composter et éviter le gaspillage.
Déposer une machine à laver cassée sur le trottoir est :|Interdit hors collecte ou point de dépôt autorisé.
En quoi consiste la traite des êtres humains ?|Exploiter une personne par contrainte, menace, tromperie ou abus, par exemple pour le travail forcé ou l’exploitation sexuelle.
Que doit faire une victime de violences ?|Chercher de l’aide, appeler les secours en urgence, porter plainte ou contacter une association spécialisée.
Quelle est l'infraction la plus grave ?|Le crime.
Histoire géographie et culture :
En quelle année a débuté la Révolution française ?|En 1789.
Qui était Napoléon Ier ?|Un général devenu empereur des Français.
Lequel de ces personnages historiques est français ?|Napoléon Bonaparte est un personnage historique français.
Dans quelle République est-on aujourd'hui ?|La Ve République.
Qu'est-ce que la Shoah ?|Le génocide des Juifs d’Europe par le régime nazi pendant la Seconde Guerre mondiale.
Quel pays ou région du monde a été colonisé par la France ?|L’Algérie a été colonisée par la France.
Qui a rendu l’école gratuite, laïque et obligatoire ?|Jules Ferry, avec les lois scolaires des années 1880.
Quand a eu lieu la Seconde Guerre mondiale ?|De 1939 à 1945.
Quand a eu lieu la Première Guerre mondiale ?|De 1914 à 1918.
En quelle année a été créée la Communauté Économique Européenne (CEE) ?|En 1957, par le traité de Rome.
Le 11 novembre est un jour férié. À quoi correspond cette date ?|À l’armistice de 1918 mettant fin aux combats de la Première Guerre mondiale.
Qui a été le premier Président élu sous la Ve République ?|Charles de Gaulle.
En quelle année l'esclavage a-t-il été aboli définitivement en France ?|En 1848.
Depuis quelle année l'école publique est-elle gratuite ?|Depuis 1881.
Combien y a-t-il eu de républiques en France ?|Cinq.
Qui était le roi de France au moment de la Révolution française ?|Louis XVI.
Qui a fondé la Ve République ?|Charles de Gaulle.
Que célèbre-t-on le 14 juillet ?|La fête nationale française.
Quelle guerre a eu lieu entre 1914 et 1918 ?|La Première Guerre mondiale.
Pourquoi l’année 1958 est importante pour la France ?|C’est l’année de la Constitution de la Ve République.
Quel fleuve coule en France ?|La Seine est un fleuve qui coule en France.
Quelle ville est française ?|Paris est une ville française.
Quel océan borde la côte ouest française ?|L’océan Atlantique.
Qu'est-ce que Paris ?|La capitale de la France.
Quelle est la capitale de la France ?|Paris.
Sur quel continent se situe la France métropolitaine ?|En Europe.
Quelle île est un département d'outre-mer français ?|La Réunion.
Combien y a-t-il de régions en France métropolitaine ?|13 régions.
Quelle ville est un grand port maritime ?|Marseille est un grand port maritime.
Quelle est la mer au sud de la France métropolitaine ?|La mer Méditerranée.
Quelle ville est située au bord de la mer Méditerranée ?|Marseille.
Où se situe la Corse ?|En mer Méditerranée, au sud-est de la France métropolitaine.
Quelle chaîne de montagnes est située entre la France et l'Italie ?|Les Alpes.
Qui était Molière ?|Un grand auteur de théâtre français du XVIIe siècle.
Qui était Charles Baudelaire ?|Un poète français, auteur des Fleurs du mal.
Qui était George Sand ?|Une écrivaine française du XIXe siècle.
Qui était Simone de Beauvoir ?|Une écrivaine et philosophe française, figure du féminisme.
Qui était Albert Camus ?|Un écrivain et philosophe français, prix Nobel de littérature.
Qui était Paul Cézanne ?|Un peintre français.
Qui était Marc Chagall ?|Un peintre associé à l’art moderne, naturalisé français.
Qui était Joséphine Baker ?|Une artiste, résistante et militante entrée au Panthéon.
Qui était une chanteuse française célèbre ?|Édith Piaf.
Qu'est-ce que le Louvre ?|Un grand musée national situé à Paris.
Qui était Jean de la Fontaine ?|Un écrivain français célèbre pour ses fables.
Quel écrivain est français ?|Victor Hugo est un écrivain français.
Dans quelle ville se trouve la tour Eiffel ?|À Paris.
Quand célèbre-t-on Noël ?|Le 25 décembre.
Vivre dans la société française :
Quel numéro d'urgence permet d'appeler le SAMU ?|Le 15.
Quel numéro d'urgence permet d'appeler les pompiers ?|Le 18 (le 112 est le numéro d'urgence européen).
Après avoir obtenu le permis de conduire, que faut-il faire pour pouvoir conduire sa voiture ?|Assurer le véhicule et respecter les obligations administratives comme l’immatriculation.
À quelles conditions un mariage est-il reconnu juridiquement ?|Il doit être célébré civilement à la mairie par un officier d’état civil.
Quand faut-il déclarer son enfant au service d'état civil de la mairie ?|Dans les cinq jours qui suivent la naissance.
Le travail non déclaré est :|Interdit.
Que doit faire un employeur pour fixer un salaire ?|Respecter le droit du travail, la convention collective applicable et au moins le SMIC.
Qu'est-ce que le SMIC ?|Le salaire minimum légal en France.
Quelle est la première démarche à réaliser pour chercher un emploi ?|S’inscrire à France Travail, le service public de l’emploi.
Quelle est la durée légale du temps de travail par semaine ?|35 heures par semaine.
Qui est aidé par France Travail ?|Les personnes à la recherche d’un emploi et les employeurs qui recrutent.
Une personne étrangère en situation régulière peut créer son entreprise :|Oui, si son titre de séjour l’autorise.
Une femme peut-elle créer son entreprise ?|Oui. Les femmes et les hommes ont les mêmes droits.
À partir de quel âge un mineur peut-il travailler ?|En principe à partir de 16 ans, avec des exceptions encadrées.
Auprès de quel organisme faut-il demander le remboursement des frais de santé ?|L’Assurance Maladie, notamment la CPAM.
Qu’est-ce qu’un numéro d’urgence ?|Un numéro gratuit permettant de joindre rapidement les secours.
Concernant l'accès aux soins, quelle proposition est correcte ?|Toute personne doit pouvoir accéder aux soins selon sa situation et ses droits à l’assurance maladie.
En cas de problème de santé non urgent, à qui faut-il s’adresser en premier ?|À son médecin traitant ou à un médecin généraliste.
Quel est le rôle du médecin traitant ?|Assurer le suivi médical et orienter vers des spécialistes si nécessaire.
Dans quelles situations doit-on se rendre aux urgences de l'hôpital ?|En cas de problème grave ou immédiat : accident sérieux, douleur intense, malaise, détresse respiratoire.
Quel est l’objectif des vaccinations obligatoires ?|Protéger la personne vaccinée et la population contre des maladies graves.
À quoi sert la carte Vitale ?|À justifier ses droits et faciliter le remboursement des soins.
À quoi sert une mutuelle santé ?|À compléter les remboursements de l’Assurance Maladie.
Jusqu'à quel âge l'école est-elle obligatoire ?|L’instruction est obligatoire jusqu’à 16 ans, puis une obligation de formation s’applique jusqu’à 18 ans.
L'autorité parentale prévoit l'obligation :|De protéger, nourrir, éduquer et assurer la santé de l’enfant.
Pour qui l'école est-elle obligatoire ?|Pour tous les enfants résidant en France, français ou étrangers, de 3 à 16 ans.
Quel diplôme obtient-on à la fin du lycée ?|Le baccalauréat, pour les élèves qui réussissent l’examen.
Dans quels établissements scolaires vont les élèves après l'école élémentaire ?|Au collège.
Un enfant inscrit à l'école :|Doit assister aux cours avec assiduité, sauf absence justifiée.
Les enfants qui ne parlent pas français :|Ont droit à la scolarisation et peuvent bénéficier d’un accompagnement pour apprendre le français.
`;
