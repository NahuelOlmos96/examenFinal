const mongoose = require("mongoose");

const votarCtrl = {};

const candidatos = require("../models/candidatos");
const votantes = require("../models/votantes");
const votos = require("../models/votos");

votarCtrl.renderVotar = async (req, res) => {
  const mostrarcandidatos = await candidatos.find().lean();

  res.render("votar", { mostrarcandidatos });
};

votarCtrl.creardvotarlogin = async (req, res) => {
  const { nombre, dni, sexo } = req.body;

  const newvotantes = new votantes({ nombre: nombre, dni: dni, sexo: sexo });

  const basevotantes = await votantes.find().lean();
  var validar;
  basevotantes.map((votos) => {
    if (newvotantes.dni == votos.dni) {
      if (newvotantes.voto == true) {
        validar = false;
      } else {
        validar = true;
      }
    } else {
      validar = false;
    }
  });

  if (validar == true) {
    res.redirect("/alerta");
  } else {
    await newvotantes.save();
    console.log("se guado" + newvotantes);
    res.redirect("/votar");
  }

  
};
votarCtrl.votarlogin = async (req, res) => {
  res.render("login");
};

votarCtrl.alertavoto = (req, res) => {
  res.render("alerta");
};

votarCtrl.mostrarEstadisticas = async (req, res) => {
  const mostrarcandidatos = await candidatos.find().lean();
  const porcentajesvotos = await votos.find().lean();
  porcentajeEstadistica = ((porcentajesvotos[0].porcentajevotos).toString())
 

  res.render("estadisticas", { mostrarcandidatos, porcentajeEstadistica });
};

votarCtrl.editarEstadisticas = async (req, res) => {
  const { voto } = req.body;
  const votosT = await votos.find().lean();
  const sumvotos = Number(voto) + 1;
  const votostotal = Number(votosT[0].votosTotal) + 1;

  
  
  const porcentaje =(v, s) => {
    
    por = (s*100)/v ;
    
    
    
    return por
  };
  

  const porcetanjepasar =   porcentaje(votostotal, sumvotos).toFixed()
  


  await candidatos.findByIdAndUpdate({ _id: req.body.id }, { votos: sumvotos });
  
await votos.findByIdAndUpdate({ _id: 1 }, { votosTotal: votostotal , porcentajevotos: porcetanjepasar });
  
  res.redirect("/estadisticas");
};

module.exports = votarCtrl;
