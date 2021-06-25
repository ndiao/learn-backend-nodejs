# Gestion des utilisateurs avec NodeJS, Express, Sequelize et MySQL

## Projet
Développer une application de gestion des utilisateurs avec un systeme d'authentification avec Json Web Token (JWT). Vous apprendrez:
- Le processus d'inscription et d'authentification avec JWT
- Architecture de NodeJS Express avec les middlewares CORS, Authentication et Authorization
- Comment configurer les routes Express avec JWT
- Comment définir les modeles de données et les associations pour l'authentification et l'autorisation
- La façon de fonctionner Sequelize avec une base de données relationnelle comme MySQL

## L'authentification basée sur les tokens
En comparaison avec l’authentification basée sur la session qui doit stocker la session sur le cookie, le grand avantage de l’authentification basée sur les jetons est que nous stockons le jeton Web JSON (JWT) côté client: stockage local pour le navigateur, keychain pour IOS et SharedPreferences pour Android ... Nous n’avons donc pas besoin de créer un autre projet principal qui prend en charge les applications natives ou un module d’authentification supplémentaire pour les utilisateurs d’applications natives.

![Architecture JWT](jwt-token-based-authentication.png)

Il existe trois parties importantes d’un JWT : En-tête, Charge utile, Signature. 
Ensemble, ils sont combinés à une structure standard :
```
header.payload.signature
```
Le client attache typiquement JWT dans l’en-tête d’autorisation avec le préfixe de bearer :
```
Authorization: Bearer [header].[payload].[signature]
```
Ou uniquement dans l’en-tête x-access-token :
```
x-access-token: [header].[payload].[signature]
```

## Survole de NodeJS Express avec l'authentification JWT
Nous allons créer une application NodeJS Express dans laquelle:
- Les utilisateurs crée de nouveau compte, ou se logge avec username et password
- Les utilisateurs accèdent à leur espace en fonction des rôles (USER, APPRENANT, PROFESSEUR et ADMIN)

## les APIs fournies par l'application
| Methodes      | Urls                         | Action                                              |
| :---          | :----                        |          :---                                       |
| POST          | /api/auth/signup             | Créer un nouvel compte                              |
| POST          | /api/auth/signin             | Se connecter avec username et password              |
| GET           | /api/test/all                | Le contenu du grand public                          |
| GET           | /api/test/user               | Le contenu des utilisateurs avec le role USER       |
| GET           | /api/test/apprenant          | Le contenu des utilisateurs avec le role APPRENANT  |
| GET           | /api/test/admin              | Le contenu des utilisateurs avec le role ADMIN      |

## Processus d'inscription et de login avec JWT

![Flow Signup et Login](node-js-jwt-authentication-mysql-flow.png)

Un jeton JWT légal doit être ajouté à l'entete HTTP x-access-token si le client accède à des ressources protégées.

Vous devrez implémenter le jeton d’actualisation :

![Flow Signup et Login Rafraiche Token](jwt-refresh-token-node-js-example-flow.png)

## Architecture NodeJS Express avec Authentification et Autorisation
Vous pouvez avoir un aperçu de notre application Node.js Express avec le diagramme ci-dessous:

![Architecture App](node-js-jwt-authentication-mysql-architecture.png)

Via les routes Express, la requête HTTP qui correspond à une route sera vérifiée par l’intergiciel (middleware) CORS avant d’arriver à la couche de sécurité.

La couche de sécurité comprend :

* Middleware d’authentification JWT : vérifier l’inscription, vérifier le jeton
* Intergiciel (middleware) d’autorisation : vérifier les rôles de l’utilisateur avec l’enregistrement dans la base de données
Si ces intergiciels lèvent une erreur, un message sera envoyé en tant que réponse HTTP.

Les contrôleurs interagissent avec MySQL Database via Sequelize et envoient une réponse HTTP (jeton, informations utilisateur, données basées sur les rôles...) au client.

## Technologies
* Express 4.17.1
* Bcryptjs 2.4.3
* Jsonwebtoken 8.5.1
* Sequelize 5.21.3
* MySQL

## Structure du projet
- config
    + db.config.json: configuration de la base de données MySQL et Sequelize
    + auth.config.js: congiguration clé auth
- routes
    + auth.routes.js: POST signup & signin
    + user.routes.js: GET public & protected resources
- middlewares
    + verifySignUp.js: vérifier doublons sur Username ou Email
    + authJwt.js: vérifier Token, vérifier les roles des utilisateurs dans la base de données
- controllers
    + auth.controller.js: gérer les action d'inscription et de login
    + user.controller.js: returne les contenus publics et protégés
- models
    + user.model.js
    + role.model.js
- server.js: importation et initialisation des modules necessaires et les routes, ecoute pour les connexions.

## Lesson 1: Préparation du projet

1. Création du projet
```
$ mkdir backend
$ cd backend
$ npm init -y
$ npm install express@4.17.1 sequelize@6.6.2 mysql2@2.2.5 body-parser@1.19.0 cors@2.8.5 jsonwebtoken@8.5.1 bcryptjs@2.4.3 --save
```