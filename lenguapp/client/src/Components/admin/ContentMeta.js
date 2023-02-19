import React ,{useState} from "react";
import {useCourseDispatch,useCourse} from "../../Services/CourseContextProvider";



function ContentMeta(){
    //console.log("context",step)
    const [options,setOptions] = useState({})
    const [hasDialecte,setDialect] =useState(false)
    const dispatch = useCourseDispatch();
    const {step} = useCourse();
    console.log("course flow step",step)

    function metaHandler(e){
        const optionValue = e.target.value;
        console.log(e.target.name)
        setOptions({...options,[e.target.name]:optionValue});
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(e.target);
        console.log("submit action")
        if(step<3){
            dispatch({
                    step : step+1,
                    type:'nextStep'
            })

        }
        else{
            console.log("publishing")
        }

    } 

    return(
        <div className="centered">
            <h1>ContentMeta</h1>
            <form onSubmit={handleSubmit}>
                <p>
                   Nom : <input type="text"name="name" onChange={(e)=>metaHandler(e)}></input>
                </p>
                <select defaultValue="fr" name="language_src" onChange={(e)=>metaHandler(e)}>
                    <option value="fr">Français</option>
                    <option value="eng">Anglais</option>
                    <option value="jp">Japonais</option>
                    <option value="mg">Malgache</option>
                </select>
                <select defaultValue="fr" name="language_dest" onChange={(e)=>metaHandler(e)}>
                    <option value="fr">Français</option>
                    <option value="eng">Anglais</option>
                    <option value="jp">Japonais</option>
                    <option value="mg">Malgache</option>
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
        </div>
    )
}

export default ContentMeta;