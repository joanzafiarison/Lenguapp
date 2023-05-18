import React ,{useState} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";

const defaultValue = {
    "name" : "intro",
    "language_dest" :"fr",
    "language_src" :"mg",
    "theme": "nouriture",
    "type":"And You Say",
    "level":"beginner"
}

const supportedLanguages = [
    {
        "lang":"jp",
        "name":"Japonais",
    },
    {
        "lang":"eng",
        "name":"Anglais",
    },
    {
        "lang":"fr",
        "name":"Français",
    },
    {
        "lang":"mg",
        "name":"Malgache"
    }
]

function ContentMeta(){
    //console.log("context",step)
    const [options,setOptions] = useState(defaultValue)
    const [hasDialecte,setDialect] =useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useCourseDispatch();
    const {step} = useCourse();
    console.log("course flow step",step)

    function metaHandler(e){
        const optionValue = e.target.value;
        console.log(e.target.name)
        setOptions({...options,[e.target.name]:optionValue});
        console.log("options ",options)
    }

    function check_required_keys(data){
        const keys = [
            "name",
            "language_dest",
            "language_src",
            "theme",
            "type",
            "level"
        ]
        let data_keys = Object.keys(data);
        let missing_keys=[];
        for(let key of keys){
            if(data_keys.indexOf(key) == -1){
                missing_keys.push(key);
            }
        }
        return missing_keys;
    }
    function handleSubmit(e){

        e.preventDefault()
        console.log(e.target);
        console.log("submit action")
        let check_key_list = check_required_keys(options);
        if(check_key_list.length == 0){
            if(step<3){

                dispatch({
                    step : step+1,
                    type:'nextStep'
                })
                dispatch({
                    options : options,
                    type : 'updateMeta'
                })

                
      
            }
            else{
                console.log("publishing")
            }
        }
        else{
            console.log("missing keys ",check_key_list)
            setErrorMessage("Merci de renseigner les informations suivantes "+ check_key_list.join(", "));
        }


    } 

    return(
        <div className="centered" >
            <h1>définition du cours/exercices</h1>
            <form onSubmit={handleSubmit}>
                <p>
                   Nom : <input type="text"name="name" onChange={(e)=>metaHandler(e)}/>
                </p>
                <select defaultValue="fr" name="language_src" onChange={(e)=>metaHandler(e)}>
                    {supportedLanguages.map(sp_lang => (
                        <option value={sp_lang.lang}>{sp_lang.name}</option>
                    ))}
                </select>
                <select defaultValue="fr" name="language_dest" onChange={(e)=>metaHandler(e)}>
                    {supportedLanguages.filter(lg => lg.lang !== options.language_src ).map(sp_lang_ => (
                        <option value={sp_lang_.lang}>{sp_lang_.name}</option>
                    ))}
                </select>
                <fieldset>
                    <legend>Cela concerne t-il un dialecte ?</legend>
                    <div>
                        <input type="radio" name="dialect" id="dialectok" value="oui" onClick={()=>setDialect(true)}/>
                        <label for="dialectok">Oui</label>
                    </div>
                    <div>
                        <input type="radio" name="dialect" id="dialectnok" value="non" onClick={()=>setDialect(false)} />
                        <label for="dialectnok">Non</label>
                    </div>
                </fieldset>
                <select  name="dialecte" onChange={(e)=>metaHandler(e)} style={{display: hasDialecte?"block":"none"}} >
                    <option value="vezo">vezo</option>
                    <option value="betsimisaraka">betsimisaraka</option>
                    <option value="antankarana">antankarana</option>
                    <option value="merina">Merina</option>
                </select>
                <select name="theme" onChange={(e)=>metaHandler(e)}>
                    <option value="food">Nourriture</option>
                    <option value="economics">Economie</option>
                    <option value="daily">Quotidien</option>
                    <option value="law">Droit</option>
                </select>
                <select name="level" onChange={(e)=>metaHandler(e)}>
                    <option value="beginner">Débutant</option>
                    <option value="intermediate">Intermédiaire</option>
                    <option value="advanced">Avancée</option>
                </select>
                <select name="type" onChange={(e)=>metaHandler(e)}>
                    <option value="words">Mots & Phrase</option>
                    <option value="andyousay">And You Say</option>
                    <option value="build">Grammaire</option>
                </select>
                <input type="submit" value="Allez"/>
                <input type="submit" value="Retour"/>
            </form>
            {errorMessage !== ""?
                <div style={{color:"red", position:"absolute",top:"50%", left:"60%",backgroundColor:"grey",width:200}}>
                    <p>{errorMessage}</p>
                </div> :
                null
            }

        </div>
    )
}

export default ContentMeta;