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
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
