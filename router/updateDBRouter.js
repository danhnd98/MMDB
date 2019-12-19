const express = require('express')
const MenJacket = require('../models/menJacket')
const MenShirt = require('../models/menShirt')
const MenShorts = require('../models/menShorts')
const MenTrouser = require('../models/menTrouser')
const MenTShirt = require('../models/menTShirt')
const Men = require('../models/men')
const WomenJacket = require('../models/womenJacket')
const WomenDress = require('../models/womenDress')
const WomenShirt = require('../models/womenShirt')
const WomenIShirt = require('../models/womenTShirt')
const Women = require('../models/women')

const router = new express.Router();

router.get('/categorybygender/man', async(req, res)=>{
    let menJacket = await MenJacket.find();
    let menShirt = await MenShirt.find();
    let menShorts = await MenShorts.find();
    let menTrouser = await MenTrouser.find();
    let menTShirt = await MenTShirt.find();
    
    menJacket.forEach(item => {
        let temp = newModel(item, process.env.JACKET, 1)
        temp.save();
    });

    menShirt.forEach(item => {
        let temp = newModel(item, process.env.SHIRT, 1)
        temp.save();
    });
    
    menShorts.forEach(item => {
        let temp = newModel(item, process.env.SHORT, 1)
        temp.save();
    });

    menTShirt.forEach(item => {
        let temp = newModel(item, process.env.TSHIRT, 1)
        temp.save();
    });

    menTrouser.forEach(item => {
        let temp = newModel(item, process.env.TROURER, 1)
        temp.save();
    });
})

router.get('/categorybygender/women', async(req, res)=>{
    let womenJacket = await WomenJacket.find();
    let womenShirt = await WomenShirt.find();
    let womenDress = await WomenDress.find();
    let womenTShirt = await WomenIShirt.find();
    
    womenJacket.forEach(item => {
        let temp = newModel(item, process.env.JACKET, 2)
        temp.save();
    });

    womenShirt.forEach(item => {
        let temp = newModel(item, process.env.SHIRT, 2)
        temp.save();
    });
    
    womenDress.forEach(item => {
        let temp = newModel(item, process.env.DRESS, 2)
        temp.save();
    });

    womenTShirt.forEach(item => {
        let temp = newModel(item, process.env.TSHIRT, 2)
        temp.save();
    });
})
function newModel (modelInput, category, gender){
    let model = null;
    if(gender == 1){
        model = new Men();
    }else{
        model = new Women();
    }
    
    model.image = modelInput.image
    model.price_regular = modelInput.price_regular
    model.link = modelInput.link
    model.final_price = modelInput.final_price
    model.title = modelInput.title
    model.category = category

    return model;
}

module.exports = router;