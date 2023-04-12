const fs = require('fs')
const path = `${__dirname}/../chapter`
const ObjectId = require('mongoose').Types.ObjectId;

const { User } = require('../models/user');
const { Book } = require('../models/book');

async function ChapCreate(req, res){
    const id = ObjectId(req.params.id);
    const appendType = req.query.q;

    try{
        if(appendType !== 'publish' || appendType !== 'draft') 
            throw new Error("Invalid Request");

        const ValidQry = await User.findOne({ _id: req.user._id, book_id: id })
        
        if(!ValidQry) throw new Error("Un-authorized access");
        
        let BookExist;
        
        if(appendType === 'publish'){
            BookExist = await Book.findOne()
        }
        const date = new Date();

        fs.writeFile(`${path}/${id}_${date.getTime()}`, req.body.content, err => {
            if(err) console.log(err); //logger
            res.send("Done");
        })
    } catch(err){
        res.status(403).send("")
    }
}

async function OpenChap(req, res){
    const file = req.params.id
    fs.readFile(`${path}/${file}`, {encoding: "utf8"}, (err, file) => {
        if(err) {
            console.log(err);
            //logger
        }
        res.send(file);
    })
}

module.exports = { ChapCreate, OpenChap }