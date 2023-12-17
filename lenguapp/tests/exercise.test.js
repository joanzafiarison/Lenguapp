const db = require("../config/database");
const ExerciseSchema = require("../models/exercise");
const Exercise = db.model("Exercise", ExerciseSchema);

test("find exercise" , async () => {
    const exercise = await Exercise.find({theme :"food"});
    expect(exercise[0].theme).toBe("food")
});


test("create exercise", async () => {
    const newEx ={
        theme : "food",
        language :"malagasy",
        level :" beginner",
        type :"words",
        name : "mg test",
        content :[]
    }
    await Exercise.create(newEx);
    const found_ex = await Exercise.find({name : "mg test" });
    await Exercise.deleteOne({name : "mg test"})
    expect(found_ex[0].name).toBe("mg test");
})


test("create many exercise", async () => {
    const newExercises =[
        {
            theme : "food",
            language :"malagasy",
            level :" beginner",
            type :"words",
            name : "food-test",
            content :[
                {
                    item : {
                        word : "anana",
                        phonetics :"anana",
                        type : "dest",
                    },
                    solution : {
                        word : "légume"
                    },
                    choices :[
                        {
                            word :"riz"  
                        },
                        {
                            word :"eau"  
                        },
                        {
                            word :"pomme de terre"  
                        },
                        {
                            word :"cuire"  
                        },
                    ]
                }
            ]
        },
        {
            theme : "weather",
            language :"malagasy",
            level :" beginner",
            type :"words",
            name : "weather-test",
            content :[
                {
                    item : {
                        word : "rivotra",
                        phonetics :"rivocha",
                        type : "dest",
                    },
                    solution : {
                        word : "vent"
                    },
                    choices :[
                        {
                            word :"mer"  
                        },
                        {
                            word :"orage"  
                        },
                        {
                            word :"vent"  
                        },
                        {
                            word :"pluie"  
                        },
                    ]
                }
            ]
        },
        {
            theme : "greetings",
            language :"malagasy",
            level :" beginner",
            type :"words",
            name : "salutations-test",
            content :[
                {
                    item : {
                        word : "salama",
                        phonetics :"salama",
                        type : "dest",
                    },
                    solution : {
                        word : "bonjour"
                    },
                    choices :[
                        {
                            word :"bonjour"  
                        },
                        {
                            word :"au revoir"  
                        },
                        {
                            word :"il fait beau"  
                        },
                        {
                            word :"je m'appelle"  
                        },
                    ]
                }
            ]
        },
        {
            theme : "food",
            language :"malagasy",
            level :" beginner",
            type :"and-you-say",
            name : "at restaurant-test",
            content : [          
                {
                    item : {
                        word : "mila bebe kokoa ianao ?",
                        phonetics :"mila bébé coucou a i a now",
                        type : "dest",
                    },
                    solution : {
                        word : "eny, ampio kelikely azafady"
                    },
                    choices :[
                        {
                            word :"za fa voky"  
                        },
                        {
                            word :"eny, ampio kelikely azafady"  
                        },
                        {
                            word :"aiza ny toerana fantatranao ?"  
                        },
                        {
                            word :"efa masaka ny sakafo"  
                        },
                    ]
                }
            ]
        },
        {
            theme : "food",
            language :"malagasy",
            level :" beginner",
            type :"buildings",
            name : "phrase a reproduire quand on a faim-test",
            content :[
                {
                    item : {
                        word : "Nous allons manger",
                        type : "source",
                    },
                    solution : {
                        word : "handeha mihinana zahay",
                    },
                    choices :[
                            { "word": "hisotro", "type": "V" },
                            { "word": "hihinana", "type": "V" },
                            { "word": "handeha", "type": "V" },
                            { "word": "hiresaka", "type": "V" },
                            { "word": "mahandro", "type": "V" },
                            { "word": "mivanga", "type": "V" },
                            { "word": "mihinana", "type": "V" },
                            { "word": "mamaky", "type": "V" },
                            { "word": "mandeha", "type": "V" },
                            { "word": "miresaka", "type": "V" },
                            { "word": "zahay", "type": "S" },
                            { "word": "zaho", "type": "S" },
                            { "word": "aho", "type": "S" },
                            { "word": "anao", "type": "S" },
                            { "word": "zare", "type": "S" },
                            { "word": "nareo", "type": "S" },
                            { "word": "rano", "type": "N" },
                            { "word": "masoandro", "type": "N" },
                            { "word": "mofo", "type": "N" }
                    ]
                }
            ]
        }
    ]
    await Exercise.insertMany(newExercises);
    const found_ex = await Exercise.find({name : { $regex : /-test/ } });
    await Exercise.deleteMany({ name : { $regex : /-test/ } });
    expect(found_ex.map( ex => ex.name)).toBe("at restaurant-test");
})


test("add content node to exercise ", async() => {

    const query = {
        "name" : "at restaurant",
        "content" : [
            {
                item : {
                    word : "efa nifidy sakafonao ve ianao?",
                    phonetics :"éfa nifidi sakafouna o vé ia now ",
                    type : "dest",
                },
                solution : {
                    word : "eny, atao akoho sauce azafady"
                },
                choices :[
                    {
                        word :"za mosary"  
                    },
                    {
                        word :"eny, ampio kelikely azafady"  
                    },
                    {
                        word :"eny, atao akoho sauce azafady"  
                    },
                    {
                        word :"efa masaka ny sakafo"  
                    },
                ]
            },
        ]
    };

    await Exercise.updateOne(
        {
            name : query.name
        },
        {
            $push : {
                "content" : query.content
            }
        }
    );
    const updatedExercise = await Exercise.find({name : query.name})

    expect(updatedExercise[0].content[1].item.word).toBe("efa nifidy sakafonao ve ianao?")
    
})