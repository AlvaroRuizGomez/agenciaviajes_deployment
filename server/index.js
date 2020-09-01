// Importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config')
const db = require('./config/database');

require('dotenv').config({ path: 'variables.env' })


db.authenticate()
    .then(() => console.log('DB Conectada'))
    .catch(error => console.log(error));


// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estatica llamada public
app.use(express.static('public'));

// validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

// creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    // res.locals.saludo = 'Hola'
    // console.log(res.locals)
    return next();

})
// ejecutamos el bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Cargar las rutas
app.use('/', routes());

/** Haciendo el Deployment
 ** Puerto y host para la app 
 ** Dejamos el HOST y PORT libres para que heroku se los asigne, en caso contrario se los damos'0.0.0.0' 3000 */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor está funcionando', 'Port:', port, 'Host:', host);
});