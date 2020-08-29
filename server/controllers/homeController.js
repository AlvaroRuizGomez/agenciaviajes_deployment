const Viaje = require('../models/Viajes');
const Testimonial = require('../models/Testimoniales');

exports.consultasHomepage = async (req, res) => {
    // Solo muestro 3 registros testimoniales
    const viajes = await Viaje.findAll({ limit: 3 });  
    // Solo muestro 3 registros testimoniales
    const testimoniales = await Testimonial.findAll({ limit: 3 }) 
    // // pasar el promise y ejecutarlo
    // const resultado = Promise.all(promises);
    res.render('index', {
        pagina: 'Próximos Viajes',
        clase: 'home',
        viajes,
        testimoniales
   })
}