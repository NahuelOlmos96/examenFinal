const {Router} = require('express');


const router = Router()

const { renderVotar ,  votarlogin , creardvotarlogin , alertavoto, mostrarEstadisticas , editarEstadisticas } =require('../controllers/votar.controllers');

router.get('/votar', renderVotar)
router.get('/login', votarlogin)

router.post('/login/add', creardvotarlogin)

router.get("/alerta", alertavoto)

router.put("/estadisticas/:id", editarEstadisticas)
router.get("/estadisticas" , mostrarEstadisticas)







module.exports = router