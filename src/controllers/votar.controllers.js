const mongoose = require("mongoose");

const votarCtrl = {};

const candidatos = require("../models/candidatos");
const votantes = require("../models/votantes");
const votos = require("../models/votos");

var nombreNewvotante = null
var dniNewVotante = null
var sexoNewVotante = null
//mostrar los condidatos
votarCtrl.renderVotar = async (req, res) => {
  const mostrarcandidatos = await candidatos.find().lean();

  res.render("votar", { mostrarcandidatos, nombreNewvotante, dniNewVotante, sexoNewVotante  });
  
};
//verifico y cargo de votantes
votarCtrl.creardvotarlogin = async (req, res) => {
  const { nombre, dni, sexo } = req.body;

  const newvotantes = new votantes({ nombre: nombre, dni: dni, sexo: sexo });
  nombreNewvotante = newvotantes.nombre
  dniNewVotante = newvotantes.dni
  sexoNewVotante = newvotantes.sexo
  const basevotantes = await votantes.find().lean();
  var validar;
  basevotantes.map((votos) => {


    if (newvotantes.dni == votos.dni) {
      
        validar = true;
      
    } else {
      validar = false;
    }
  });
     
  if (validar == true) {
    res.redirect("/alerta");
  } else {
    
    
     res.redirect("/votar");
    
  }
  
};

//carga el login
votarCtrl.votarlogin = async (req, res) => {
  res.render("login");
};
//carga alerta
votarCtrl.alertavoto = (req, res) => {
  res.render("alerta");
};
// mostramos estadistica y actualizamos porcentajes y cambiamos el true y else
votarCtrl.mostrarEstadisticas = async (req, res) => {
  const mostrarcandidatos = await candidatos.find().lean();

  res.render("estadisticas", { mostrarcandidatos });
};


//carga y actualizacion votos
votarCtrl.editarEstadisticas = async (req, res) => {
  const { voto,  dni , nombre, sexo } = req.body;
  const votosT = await votos.find().lean();
  const sumvotos = Number(voto) + 1;
  const votostotal = Number(votosT[0].votosTotal) + 1;

  const actualizarPorcentuaje = async (v) => {
    const mostrarcandidatos = await candidatos.find().lean();
    await candidatos.findByIdAndUpdate(
      { _id: 1 },
      { porcentajevotos: ((mostrarcandidatos[0].numvotos * 100) / v).toFixed() }
    );
    await candidatos.findByIdAndUpdate(
      { _id: 2 },
      { porcentajevotos: ((mostrarcandidatos[1].numvotos * 100) / v).toFixed() }
    );
    await candidatos.findByIdAndUpdate(
      { _id: 3 },
      { porcentajevotos: ((mostrarcandidatos[2].numvotos * 100) / v).toFixed() }
    );
    await candidatos.findByIdAndUpdate(
      { _id: 4 },
      { porcentajevotos: ((mostrarcandidatos[3].numvotos * 100) / v).toFixed() }
    );

    console.log("estos son los votos totales" + v);
  };

  // const porcetanjepasar =   porcentaje(votostotal, sumvotos).toFixed()

  await candidatos.findByIdAndUpdate(
    { _id: req.body.id },
    { numvotos: sumvotos }
  );

  actualizarPorcentuaje(votostotal);

  await votos.findByIdAndUpdate({ _id: 1 }, { votosTotal: votostotal });

  console.log(" este es el arreglo " + nombre + sexo + dni )

  const newvotantes2 = new votantes({ nombre, dni, sexo });
  await newvotantes2.save();

    
  res.redirect("/estadisticas");
  
};

module.exports = votarCtrl;
