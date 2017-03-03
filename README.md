# epsi-echec-client
[![Build Status](https://travis-ci.org/tsauvajon/epsi-echec-client.svg?branch=master)](https://travis-ci.org/tsauvajon/epsi-echec-client)

## A faire 1 fois :
- cloner le repértoire
- installer node LTS si c'est pas encore fait
- *installer yarn (facultatif)*


dans le terminal, à la racine du projet :
## npm

Installer les dépendences
``` bash
  npm install
  *ou*
  yarn
```

Pour tester :

``` bash
  npm test
  *ou*
  yarn test
```



Pour linter :

``` bash
  npm run lint
  *ou*
  yarn lint
```

Pour run :

``` bash
  npm start
  *ou*
  yarn start
```

## git
Pour récupérer les changements depuis git

``` bash
  git pull
```

Pour commit :

``` bash
  git add .
  git commit -m "[description du commit ...]"
  git push
```
Commit va lancer les pre-commit hooks : test et lint.
Si le lint / test ne passe pas, corriger les erreurs puis re-commit

Ensuite [Travis CI](https://travis-ci.org/tsauvajon/epsi-echec-client) va test, lint, et deploy sur https://tsauvajon.github.io/epsi-echec-client
