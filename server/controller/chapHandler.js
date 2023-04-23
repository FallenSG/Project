const fs = require('fs')
const path = require('path')
const ObjectId = require('mongoose').Types.ObjectId;

const { User } = require('../models/user');
const { Book } = require('../models/book');

const Path = path.join(__dirname, '..', 'chapter');

async function ChapCreate(req, res){
    const id = ObjectId(req.params.id);
    const appendType = req.query.q;

    try{
        if(appendType !== 'publish' && appendType !== 'draft') 
            throw new Error("Invalid Request");
        
        const date = new Date();
        const fileName = `${id}_${date.getTime()}`
        const filePath = `${Path}/${fileName}`

        // const TitleExist = await Book.findOne({ 
        //     $or: [ 
        //         { 'publish[0]': req.body.title },
        //         { 'draft[0]': req.body.title }
        //     ]
        // })

        // if(TitleExist)
        //     throw new Error("Chapter with same title already exists");

        fs.writeFile(filePath, req.body.content, err => {
            if(err){
                console.log(err) //logger
                res.status(403).send("Error happened while trying to write chapter. Please try again later")
            }
            
            const upData = { 
                $push: { 
                    [appendType]: [ req.body.title, fileName ]
                }
            };

            Book.findOneAndUpdate({ _id: id }, upData)
                .then(data => res.send("Chapter Added"))
                .catch(err => {
                    fs.unlink(filePath, (err) => {
                        //logger
                    })
                    res.status(403).send("Couldn't add your chapter in the Collection.")
                })
        })
    } catch(err){
        console.log(err); //logger
        res.status(403).send(err.message)
    }
}

async function OpenChap(req, res){
    const file = req.params.id
    fs.readFile(`${Path}/${file}`, {encoding: "utf8"}, (err, file) => {
        if(err) {
            console.log(err);
            //logger
        }
        res.send(file); 
    })
}

module.exports = { ChapCreate, OpenChap }