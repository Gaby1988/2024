-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------

Todo :

coté admin dans le profil de l'utilisateur rajouter les rectettes de cette utilisateur. Donc aller chercher la recette dans la base de donées.


@Marine BOULANGER // @Eric // @Олеся Тур et @Cyril Freeman // @Yoann Cantrelle // @Arnaud-CHANE (si disponible):
Fonctionnalisées de toutes les autres pages
À faire (par page) :

1. - [ ] Votre Profil de degustation - admin (en cours par @Eric)
+ Votre Profil de degustation - user (@Eric)
- [ ] Avoir toutes les images dans un dossier du back et les envoyer vers le front pour display
Pouvoir envoyer des photos dans le back et le stocker dans le public (quete multer parce que firebase et cloudinary pas demander pour le titre)



2. - [ ] Wine Description - admin (en cours par @Marine BOULANGER)
- [ ] Avoir toutes les images dans un dossier du back et les envoyer vers le front pour display
Pouvoir envoyer des photos dans le back et le stocker dans le public (quete multer parce que firebase et cloudinary pas demander pour le titre)


3. - [ ] Fiche Dégustation - user
Pour déterminer le profil à afficher dans la page de profil de dégustation :
En Front - 
- [ ] Algo pour déterminer le nom du goût ayant la note la plus élevée
Si même note, on prend celui qui est le plus haut dansl a liste
Envoyer dans le context le nom du goût ayant la note la plus élevée
UseContext + useEffect pour récup ce nom et l'envoyer dans le back

En Back - 
Récuperer toutes les données du profil de dégustation selon l'id du gout reçu
créer des routes comme pour sélection des vins avec url/:id pour afficher un profil particulier en params

+ Fiche Dégustation - admin
- [ ] Page de fiche dégustation coté admin, modal pour demander si sûr pour masquer un gout



4. - [ ] Atelier de creation - user
+ Atelier de creation - admin
(je propose d’envoyer les recettes par email à users et admin pour eviter faire des pages en plus)

5. - [ ] Profile - user (@cyrilFreeman)
+ Profile - admin
Faire en sorte d'afficher les infos du user dans la page profil membre (regarder comment @Олеся Тур a fait avec la page review)


6. - [ ] Members - admin
Admin :
- [ ] Le toggle membre admin, utiliser un handletoggle pour envoyer post en back directement
ou
- [ ] Mettre modal pour demander si "êtes vous sûr de vouloir supprimer/rendre un membre admin ?" pas besoin de modal pour passer en user seulement


7. - [ ] Vins list - admin
- [ ] Avoir toutes les images dans un dossier du back et les envoyer vers le front pour display
- [ ] Pouvoir envoyer des photos dans le back et le stocker dans le public (quete multer parce que firebase et cloudinary pas demander pour le titre)




8. - [ ] Profiles de degustation - admin (@Eric)
Sur page admin profil de dégustation :
- [ ] Enlever le Editée par "" et la date car pas d'info dans BDD
- [ ] Mettre editée le (date)





@Arnaud-CHANE :
- [ ] Algo pour définir “votre profil de degustation”
- [ ] Sécurité pour tout le site (pas de pression et oui, je sais q’il faut que on t’aide)

protected_pages_if_not_logged
Sécuriser les pages si pas login

access_control_as_admin
Sécuriser toutes les pages qui ont besoin d'une autorisation en tant qu'admin

access_control_as_user
Sécuriser toutes les pages qui ont besoin d'une autorisation en tant qu'user

redirect_if_not_logged_in_as_admin
Refaire des redirections sur les pages admin si pas autorisé

access_levels_system
Système de hierarchie des roles
https://code.pieces.app/blog/role-based-access-systems-in-nodejs




@Yoann Cantrelle :
Forbidden Page (seulement le display)
- [ ] Créer une page : "Vous n'avez pas les droits, veuillez contacter les administrateurs (trices) . Vous allez être redirigé(e)" Error 403



@Cyril Freeman :
Déconnexion
logout_feature
- [ ] Faire la déconnexion (donc aussi effacer le token)



Bonus:
Pop ups Les modals (toastify)
Créer un compte  pour des users - admin
Renseigner votre email & nouveau mot de passe - user 
Envoyer un mail pour newsletter
En Back - Envoyer un mail pour réinitialiser mot de passe 
Créer le lien sécurisé pour réinitialiser le mot de passe

-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------


Eric, Yoann

- [ ] Système de login opérationnelle qui permet de se login et de vérif si user existe ou pas (avoir une alerte si user n'existe pas)
- [ ] En Front - Système de login opérationnelle qui permet de se login et de vérif si user existe ou pas (avoir une alerte si user n'existe pas)
- [ ] En Front - remettre à jour les import de url depuis le .env
- [ ] Mettre à jour toutes les pages du figma pour que chaque pages soient identiques qu'importe le format
- [ ] Refaire toutes les redirections si on clique sur des boutons dans le Front
- [ ] Styliser les slider de la page de dégustation
- [ ] Mettre lien/link sur chaque element du menu burger
- [ ] Faire la page qui liste toutes les reviews
- [ ] Faire page qui liste tous les cépages
- [ ] Définir la couleur sur la liste des membres coté admin (toggle doit changer de couleur voir Marine)
- [ ] Mettre alt pour chaque image avec backtick et $ pour référencement naturelle
- [ ] Comment faire pour arriver sur page de conditions d'utilisations ?remettre à jour les import de url depuis le .env
- [ ] Mettre à jour toutes les pages du figma pour que chaque pages soient identiques qu'importe le format
- [ ] Refaire toutes les redirections si on clique sur des boutons dans le Front
- [ ] Styliser les slider de la page de dégustation
- [ ] Mettre lien/link sur chaque element du menu burger
- [ ] Faire la page qui liste toutes les reviews
- [ ] Faire page qui liste tous les cépages
- [ ] Définir la couleur sur la liste des membres coté admin (toggle doit changer de couleur voir Marine)
- [ ] Mettre alt pour chaque image avec backtick et $ pour référencement naturelle
- [ ] Comment faire pour arriver sur page de conditions d'utilisations ?


-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------

I want to secure some page with a login feature verification.
give me a list of 5 name of title for git branch of this feature with underscore to seperate words.

IDEAS :
page-security
authentication-system
not_logged_in_redirect
login_redirect_feature
user_auth_redirect
secure_page_redirect
session_termination
user_disconnect
logout_button
sign_out_functionality
roles_hierarchy_feature
permission_matrix_setup
role_based_access_control
multi_level_authorization
IDEAS :


-------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------




## Concept

This template is meant to serve as a foundation for every P2/P3 following the React-Express-MySQL stack, as learned in Wild Code School.
It's pre-configured with a set of tools which'll help students produce industry-quality and easier-to-maintain code, while staying as simple as possible to use.

## Setup & Use

### Windows users

Be sure to run these commands in a git terminal to avoid [issues with newline formats](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### Project Initialization

- In VSCode, install plugins **Prettier - Code formatter** and **ESLint** and configure them
- Clone this repo, enter it
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

## FAQ

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Deployment

For deployment, you have to go to `secrets` → app `actions` on the github repo to insert via `New repository secret` :

- CAPROVER_BACK_APPNAME : name app on caprover
- CAPROVER_FRONT_APPNAME : name app on caprover
- CAPROVER_PASSWORD : password caprover
- CAPROVER_SERVER : link of domain
