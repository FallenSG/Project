const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function idCheck(req, res, next){
    try{
        let id;
        if(req.params.id) id = req.params.id;
        else if(req.body.id) id = req.body.id;
        else throw new Error("No ID available");

        if (ObjectId.isValid(id)) {
            if ((String)(new ObjectId(id)) === id) return next();
            throw new Error("Not Valid Id");
        }
        throw new Error("Error Happened");
    } catch(err) {
        return res.status(404).send("Not Valid ID");
    }
}
