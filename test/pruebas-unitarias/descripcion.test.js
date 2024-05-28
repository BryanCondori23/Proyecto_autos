/*const express = require('express');
const request = require('supertest');
//const autoRutas = require('../../rutas/autoRutas');
const descripcionRutas = require('../../rutas/descripcionRutas');
//const RecetaModel = require('../../models/Auto');
const mongoose = require('mongoose');
//const AutoModel = require('../../models/Auto');
const DescripcionModel = require('../../models/descripcion');
const app = express();
app.use(express.json());
//app.use('/autos', autoRutas);
app.use('/decripcion', descripcionRutas);

describe('Pruebas Unitarias para DESCRIPCION', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/appautos',{
            useNewUrlParser : true,            
        });
        await DescripcionModel.deleteMany({});
    });
    // al finalziar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
      });

//test 1 para mostrar
test('Deberia agregar un nuevo  POST: /agregardescripcion', async() => {
    const nuevaDescripcion = {
        categoria: 'pickup', 
        marca: 'nissan', 
        potecncia: 480 
    };
    const res =  await request(app)
                        .post('/Descripcion/agregardescripcion')
                        .send(nuevaDescripcion);
    expect(res.statusCode).toEqual(201);
    expect(res.body.nombre).toEqual(nuevaDescripcion.nombre);
});

//test 2 para mostrar
test('Deberia Traer todas las descripciones: GET: getDescripcion', async() =>{
    await AutoModel.create({ categoria: 'suv', marca: 'kia', potencia: 250 });
    await AutoModel.create({ categoria: 'sedan', marca: 'susuki', potencia: 150 });
    
    // solicitud - request
    const res =  await request(app).get('/autos/getAutos');
    //verificar la respuesta
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
}, 10000);
});*/
