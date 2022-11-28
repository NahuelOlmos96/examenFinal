// servidor y configuracion

const express = require('express')
 const exphbs = require('express-handlebars');
const { use } = require('passport');
const path = require('path')
const morgan = require('morgan')
const methodOverride =require('method-override')

const app = express();


// sttting
app.set('port', process.env.port || 3000) // colando un puerto por defecto
app.set('views',  path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({
        defaultlayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname:'.hbs'

})); // motor de pantillas

app.set('view engine' , '.hbs')

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(methodOverride('_method'));

// global variable


//Router

app.use(require('./routes/index.routes')); // intacia la ruta inicial
app.use(require('./routes/votar.routes'));
//estatic file

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app; 