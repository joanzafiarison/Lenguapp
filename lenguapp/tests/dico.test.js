const db = require("../config/database");
const DicoSchema = require("../models/dico");
const Dico = db.model("Dictionnaries", DicoSchema );

test("find word ", async () =>{
    const word = await Dico.find({"word" : "bread"});

    expect(word[0].word).toBe("bread");
})