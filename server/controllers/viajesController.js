const Viaje = require('../models/Viajes');

/* Esta es una versión anterior a 8 NoteJS es correcta pero ahora acepta async await, y Sequelize entrega promises
    exports.mostrarViajes = (req, res) => {
    Viaje.findAll()
        .then((viajes) =>  res.render('viajes', {
             pagina: 'Próximos Viajes',
             viajes
        }))
        .catch(error => console.log(error))
 } */
 /* como se hace acon async await */
 exports.mostrarViajes = async (req, res) => {
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

 exports.mostrarViaje = async (req, res) => {
    const viaje = await Viaje.findByPk(req.params.id)
    res.render('viaje', {
        viaje
    })
}