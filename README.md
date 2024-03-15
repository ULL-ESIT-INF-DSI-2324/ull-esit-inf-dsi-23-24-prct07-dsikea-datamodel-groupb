- Autor: **Omar Suárez Doro** 
- Email: **alu0101483474@ull.edu.es**
- Asignatura: **Desarrollo de Sistemas Informáticos**
  
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct06-generics-solid-OmarSuarezDoro/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct06-generics-solid-OmarSuarezDoro?branch=main)
# Índice
- [Índice](#índice)
- [1. 📚 Introducción 📚](#1--introducción-)
- [2. 🧠 Trabajo previo 🧠](#2--trabajo-previo-)
- [3. 🖥️ Desarrollo de la práctica 🖥️](#3-️-desarrollo-de-la-práctica-️)
  - [Ejercicio 1 - La mudanza](#ejercicio-1---la-mudanza)
  - [Ejercicio 2 - Facturas en diferentes formatos](#ejercicio-2---facturas-en-diferentes-formatos)
  - [Ejercicio 3 - Gestor de ficheros](#ejercicio-3---gestor-de-ficheros)
  - [Ejercicio 4 - Impresoras y escáneres](#ejercicio-4---impresoras-y-escáneres)
  - [Ejercicio 5 - Servicio de mensajería](#ejercicio-5---servicio-de-mensajería)
  - [Modificación 1 - Arithmeticable](#modificación-1---arithmeticable)
- [4. 💡 Conclusiones 💡](#4--conclusiones-)
- [5. 📘 Infografía y Webgrafía 📘](#5--infografía-y-webgrafía-)

# 1. 📚 Introducción 📚
Este informe tiene como objetivo la redacción de los pasos seguidos durante el desarrollo de la séptima practica de la asignatura **Desarrollo de Sistemas Informáticos**.

# 2. 🧠 Trabajo previo 🧠

Para la realización de esta práctica, en primer lugar se han visualizado los vídeos respecto a [Integración continua de código fuente TypeScript ejecutado en Node.js a través de una GitHub Action](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view) y [configuración de workflow de GitHub Actions para enviar información de cubrimiento a Coveralls](https://drive.google.com/file/d/1hwtPovQlGvthaE7e7yYshC4v8rOtLSw0/view).

Se han realizado los siguientes resúmenes:

> [!Important]
> # GitHub Actions
> 1. Nos dirigimos a la pestaña `actions` en el repositorio de GitHub. Si nos centramos en *Continuous integration workflows*, seleccionamos [Node.js](https://nodejs.org/en).
> 
> 2. La estructura del archivo `node.js.yml` es la siguiente:
> - name: Nombre del flujo de trabajo
> - Pull y Push: Cada vez que se realice un push o un pull en la rama main, se realizarán los jobs especificados.
> - jobs: Los trabajos a realizar, un ejemplo sería el siguiente.
> ```js
> name: Tests
> on:
>   push:
>      branches: [ main ]
>   pull_request:
>      branches: [ main ]
> 
> jobs:
>  build:
>    runs-on: ubuntu-latest # Se debe correr en la última versión de ubuntu estable
>
>    strategy:
>      matrix:
>        node-version: [16.x, 18.x, 19.x, 20.x, 21.x] # Se ejecuta en todos estornos.
>        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/
>
>    steps: # Pasos a arealizar
>    - uses: actions/checkout@v4
>    - name: Use Node.js ${{ matrix.node-version }}
>      uses: actions/setup-node@v4
>      with:
>        node-version: ${{ matrix.node-version }} # Configuración del entorno.
>    - run: npm install
>    - run: npm test
> ```
> 3. Realizar un commit (se habrá creado un fichero para nuestra github action).
> 4. Se puede crear un badge (opcional)
> # Integración de Coveralls en GitHub action
> 5. Desinstalamos Coveralls `npm uninstall coveralls`.
> 6. Modificación del script coverage
> ```json
> "coverage": "nyc npm test && nyc report --reporter=lcov",
> ```
> 7. Creamos en el directorio `.github/workflows` un nuevo fichero `coveralls.yml`.
>
> ```js
> name: Coveralls
> on:
>   push:
>      branches: [ main ]
>   pull:
>      branches: [ main ]
> 
> jobs:
>  build:
>
>    runs-on: ubuntu-latest
>
>    steps:
>    - name: Cloning repo
>      uses: actions/checkout@v4
>    - name: Use Node.js 21.x
>      uses: actions/setup-node@v4
>      with:
>        node-version: 21.x
>    - name: Installing dependencies
>      run: npm install
>    - name: Generating coverage information
>      run: npm run coverage
>    - name: Coveralls GitHub Action
>      uses: coverallsapp/github-action@v2.2.3
>      with:
>        github-token: ${{ secrets.GITHUB_TOKEN }}
> ```
> 
> # Integración de SonarCloud en GitHub action
> 8. Inicio de sesión en la web de [SonarCloud](https://sonarcloud.io)
> 9. Se añade el repositorio en cuestión.
> 10. Nos dirigimos a la pestaña de `Administration > Analysis Method` y desactivamos el análisis automático.
> 11. En esa misma pestaña, en el apartado `with Github Actions` hacemos click y copiamos el token.
> 12. En Github en la configuración del repositorio, concretamente en el apartado `Secrets and variables`, añadimos un nuevo secreto con la información obtenida.
> 13. En la misma página que estábamos seleccionamos la opción de JS en el siguiente paso y copiamos el contenido que se proporciona para la action.


...
