const express = require('express');
const { allUnits, unitCreate, deleteUnit, attackUnit, updateUnit } = require('./mongo');
const { http } = require('../settings.json');
const res = require('express/lib/response');
const port = http.port || 25665;

let app;

/**
 * Инициализация http-server'а
 * 
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    return await new Promise((resolve, reject) => {
        try {
            app = express();
            app.use(express.json());
    
            app.get('/api/unit/list', async (req, res) => {
                res.json(await allUnits());
            });
    
            app.post('/api/unit/create', async (req, res) => {                
                try {
                    data = req.body
                    await unitCreate(data);
                    res.json({response: true});
                } catch (e) {
                    res.status (400).send({error: e.message});
                }
                
            });
            app.post ('/api/unit/remove', async (req,res) => {
                try {
                    data = req.body
                     await deleteUnit(data);
                    res.json({response: true});
                }catch (e){
                    res.status(400).send({error:e.message});
                }
                
            })
            app.post ('/api/unit/attack', async (req,res) =>{
                try {
                    data = req.body
                    await attackUnit (data);
                    res.json ({response: true});
                } catch (e){
                    res.status (400).send ({error: e.message});
                }
                
            })
            app.post('/api/unit/edit', async (req,res) => {
                try {
                    data = req.body
                    await updateUnit (data);
                    res.json({response: true});
                }catch(e){
                    res.status(400).send({error: e.message});
                }   
            })
            app.listen(port, () => {
                console.log(`Example app listening on port ${port}`);
                resolve();
            });
        } catch(e) {
            console.error(e.stack);
            reject(e);
        }
    });
}

module.exports = { app, init };