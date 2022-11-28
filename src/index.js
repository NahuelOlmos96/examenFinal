 // archivo que inicia el servidor
 require('dotenv').config();
 console.log(process.env.TESTING);
 
 const app =require('./server.js');
 require('./database')

 // conectando a la base da tados


 app.listen(app.get('port'), () => {
        console.log(" server on port" , app.get('port'))
 })