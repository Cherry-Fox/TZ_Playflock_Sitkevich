const { MongoClient, ObjectId } = require('mongodb');
const { mongo } = require('../settings.json');

/**
 * Получение нового коннекта
 * 
 * @returns {MongoClient}
 */
function getMongoClient() {
    const host = mongo.host || 'mongodb';
    const port = mongo.port || 27017;
    const db = mongo.db || 'test';

    return new MongoClient(`mongodb://${host}:${port}/${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

let mongoClient = getMongoClient();
let connected = false;

process.once('exit', async () => {
    if (connected) 
        await mongoClient.close();
});

/**
 * Получение чата из монги
 * 
 * @async
 * @returns {Promise<Array<Object>>}
 */
async function allUnits() {
    if (!connected)
        throw new Error(`[MongoDb] Something went wrong: Connection is not initialized!`);
    return  await mongoClient.db(mongo.db || 'test').collection('units').find().toArray();
    
}

/**
 * Запись нового сообщения в монгу
 * 
 * @async
 * @param {Object} message
 * @returns {Promise<void>}
 */
async function unitCreate(unit) {
    
    if (!unit.Class)
        throw new Error('Write class Warrior, Mage or Ranger');
    switch (unit.Class) {
        case "Ranger":
            unit.Radius = 350;
            unit.baseDmg = 50;
            break;
        case "Mage":
            unit.Radius = 150;
            unit.baseDmg = 50;
            break;
        case "Warrior":
            unit.Radius = 10;
            unit.baseDmg = 70;

            break;
        default:
            throw new Error('Only 3 classes: Warrior, Mage and Ranger');
    }

    if ((!unit.name) ){
        throw new Error('[Somthing went wrong on name unit');
    }
    if ((!unit.HP) || (typeof (unit.HP) != 'number') || (unit.HP > unit.MaxHP) ){
        throw new Error('Somthing went wrong on HP');
    }
    if ((!unit.MaxHP) || (typeof (unit.MaxHP) != 'number') ){
        throw new Error('Somthing went wrong on Max HP');
    }
    if ((!unit.MP) || (typeof (unit.MP) != 'number') || (unit.MP > unit.MaxMP) ){
        throw new Error('Somthing went wrong on MP');
    }
    if ((!unit.MaxMP) || (typeof (unit.MaxMP) != 'number') ){
        throw new Error('Somthing went wrong on Max MP');
    }
    if ((!unit.Arrmor) || (typeof (unit.Arrmor) != 'number') ){
        throw new Error('Somthing went wrong on Arrmor');
    }
    if ((!unit.mRes) || (typeof (unit.mRes) != 'number') ){
        throw new Error('Somthing went wrong on Magic Resist');
    }
    if ((!unit.x) || (typeof (unit.x) != 'number') ){
        throw new Error('Somthing went wrong on x position');
    }
    if ((!unit.y) || (typeof (unit.y) != 'number') ){
        throw new Error('Somthing went wrong on y position');
    }
    await mongoClient.db(mongo.db || 'test').collection('units').insert(unit);
}

async function deleteUnit (unit) {
    const unit1 = await mongoClient.db(mongo.db || 'test').collection('units').findOne({_id: new ObjectId (unit.ID)});
    if (!unit1){
        throw new Error(`Something went wrong: ID is not exist!`);
        return;
    }
    if (!connected) {
        throw new Error(`[MongoDb] Something went wrong: Connection is not initialized!`);
    }
    await mongoClient.db(mongo.db || 'test').collection('units').remove({_id: new ObjectId(unit.ID)});
}

async function attackUnit(ID){
    const unit1 = await mongoClient.db(mongo.db || 'test').collection('units').findOne({_id: new ObjectId (ID.ID1)});
    const unit2 = await mongoClient.db(mongo.db || 'test').collection('units').findOne({_id: new ObjectId (ID.ID2)});
    
    if (!unit1 || !unit2){
        throw new Error(`Something went wrong on units`);
        return;
    }

    radius = unit1.Radius;
    distance = Math.sqrt (Math.pow ((unit2.x - unit1.x),2) + Math.pow (unit2.y - unit1.y , 2));
    if (radius < distance){
        throw new Error(`Something went wrong on Radius attack`);
        return;
    }
    switch (unit1.Class) {
        case "Warrior":
            dmg = (unit1.baseDmg + (unit1.MaxHP - unit1.HP) ) / (unit1.MaxHP*unit1.baseDmg);
            break; 
        case "Ranger":
            dmg = (unit1.baseDmg + distance)/(unit1.Radius*unit1.baseDmg);
            break;
        case "Mage":
            if (unit1.MP>1){
                dmg = unit1.baseDmg*2;
                mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id)}, {$set: {MP : unit1.MP / 2 }});
            } else dmg = unit1.baseDmg/2;
            break;
        default:
            throw new Error('Somthing went wrong on Attack');
    }

    if (unit1.Class!= "Mage"){
        mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit2._id) }, { $set : {HP : dmg - unit2.Armor}});
    } else mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit2._id) }, { $set : {HP : dmg - unit2.mRes}});
    
    if (unit2.HP < 1) {
        mongoClient.db(mongo.db || 'test').collection('units').remove({_id: new ObjectId(unit2._id)});
        throw new Error(`${unit2.name }, ${unit2.Class} has been slain`);
    }
}

async function updateUnit (unit) {
    const unit1 = await mongoClient.db(mongo.db || 'test').collection('units').findOne({_id: new ObjectId (unit.ID)});
    mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {Class: unit.Class, name : unit.name, HP : unit.HP, MP : unit.MP, MaxHP: unit.MaxHP, MaxMP: unit.MaxMP, Armor: unit.Armor, mRes: unit.mRes, x: unit.x, y: unit.y}});
    switch (unit.Class){
        case "Ranger":
            mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {Radius: 350}});
            mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {baseDmg: 50}});
            break;
        case "Mage":
            mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {Radius: 150}});
            mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {baseDmg: 50}});
            break;
        case "Warrior":
            mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {Radius: 10}});
            mongoClient.db(mongo.db || 'test').collection('units').updateOne({_id: new ObjectId(unit1._id) }, { $set : {baseDmg: 70}});
            break;
        default:
            throw new Error('Somthing went wrong on Class');
    }
}

/**
 * Инициализация подключения
 * 
 * @async
 * @returns {Promise<void>}
 */
async function init() {
    if (!connected)
        await mongoClient.connect();

    connected = true;
}



module.exports = {
    allUnits,
    unitCreate,
    deleteUnit,
    attackUnit,
    updateUnit,
    init
};