import React , { useState, useEffect }from 'react';
import { useAppData, useAppDispatch } from "../../Services/ContextProvider";

function Sidebar({type}) {
  const { search } = useAppData ();
  const dispatch = useAppDispatch();
  const [meta, setMeta] = useState()

  useEffect(()=>{
    const META = {
        "exercise" : {
             "contentType" : [
                {
                    "attr" : "words",
                    "value" : "Mots et phrases"
                },
                {
                    "attr" : "building",
                    "value" : "Structure de phrase"
                },
                {
                    "attr" : "and-you-say",
                    "value" : "Et tu réponds ..."
                },
                {
                    "attr" : "audio",
                    "value" : "A l'écoute"
                },
                {
                    "attr" : "writing",
                    "value" : "Ecrire"
                },
                {
                    "attr" : "game",
                    "value" : "Jeux"
                },
                {
                    "attr" : "hangman",
                    "value" : "Pendu"
                }
            ],
             "lang" :[
                {
                    "attr":"english",
                    "value" : "Anglais",
                },
                {
                    "attr":"french",
                    "value":"Français",
                },
                {
                    "attr":"deutch",
                    "value":"Allemand",
                },
                {
                    "attr":"malagasy",
                    "value":"Malgache",
                },
                {
                    "attr":"japanese",
                    "value":"Japonais",
                },
                {
                    "attr":"chinese",
                    "value":"Chinois",
                },
                {
                    "attr":"swahili",
                    "value":"Swahili",
                },
                {
                    "attr":"arabic",
                    "value":"Arabe",
                }
            ],
            "level" : [
                {
                    "attr":"beginner",
                    "value" : "Débutant"
                },
                {
                    "attr" :"intermediate",
                    "value" :"Intermédiaire"
                },
                {
                    "attr" : "advanced",
                    "value" : "Avancé"
                }
            ],
            "theme" : [
                {
                    "attr": "law",
                    "value" : "Droit"
                },
                {
                    "attr" : "food",
                    "value" : "Manger"
                },
                {
                    "attr" : "economics",
                    "value" : "Economie"
                },
                {
                    "attr":"tourism",
                    "value" :"Tourisme"
                },
                {
                    "attr":"greetings",
                    "value" :"Salutations"
                },
                {
                    "attr":"weather",
                    "value" :"Météo"
                }
            ]
        },
        "course" : {
            "contentType" : [
                {
                    "attr" : "words",
                    "value" : "Mots et phrases"
                },
                {
                    "attr" : "building",
                    "value" : "Structure de phrase"
                },
                {
                    "attr" : "and-you-say",
                    "value" : "Et tu réponds ..."
                },
                {
                    "attr" : "audio",
                    "value" : "A l'écoute"
                },
                {
                    "attr" : "writing",
                    "value" : "Ecrire"
                }
            ],
             "lang" :[
                {
                    "attr":"english",
                    "value" : "Anglais",
                },
                {
                    "attr":"french",
                    "value":"Français",
                },
                {
                    "attr":"deutch",
                    "value":"Allemand",
                },
                {
                    "attr":"malagasy",
                    "value":"Malgache",
                },
                {
                    "attr":"japanese",
                    "value":"Japonais",
                },
                {
                    "attr":"chinese",
                    "value":"Chinois",
                },
                {
                    "attr":"swahili",
                    "value":"Swahili",
                },
                {
                    "attr":"arabic",
                    "value":"Arabe",
                }
            ],
            "level" : [
                {
                    "attr":"beginner",
                    "value" : "Débutant"
                },
                {
                    "attr" :"intermediate",
                    "value" :"Intermédiaire"
                },
                {
                    "attr" : "advanced",
                    "value" : "Avancé"
                }
            ],
            "theme" : [
                {
                    "attr": "law",
                    "value" : "Droit"
                },
                {
                    "attr" : "food",
                    "value" : "Manger"
                },
                {
                    "attr" : "economics",
                    "value" : "Economie"
                },
                {
                    "attr":"tourism",
                    "value" :"Tourisme"
                },
                {
                    "attr":"greetings",
                    "value" :"Salutations"
                },
            ]
        }
    }
    setMeta(META[type])
    console.log("type ",type)
    console.log("load META", meta)
  },[])
  
  function handleOption(e,option){
    console.log("opt ",option);
   
    switch(option){
        case "lang":
            console.log("event ",e.target.value);
            dispatch({
                filters : {
                    ...search,
                    lang : e.target.value
                },
                type : "SEARCH"
            });
            break; 
        case "theme" : 
                dispatch({
                    filters : {
                        ...search,
                        theme : e.target.value
                    },
                    type : "SEARCH"
                });
                break;
        case "level" : 
                dispatch({
                    filters : {
                        ...search,
                        level : e.target.value
                    },
                    type : "SEARCH"
                });
                break;
        case "type" : 
            dispatch({
                filters : {
                    ...search,
                    type : e.target.value
                },
                type : "SEARCH"
            });
            break;
        default :
            console.log('default')
    }
  }
  return (
    <div className="sidebar">    
        <div className="attr_section">
            <h3>Langue</h3>
            <select value={search.lang} name="language" id="language" onChange={(e)=>handleOption(e,"lang")}>
                {meta && meta.lang.map( lang => (
                    <option value={lang.attr}>{lang.value}</option>
                ))}
            </select>
        </div>
        <div className="attr_section">
            <h3>Theme</h3>
            <select value={search.theme} name="theme" id="theme" onChange={(e)=>handleOption(e,"theme")}>
                {meta && meta.theme.map( th => (
                    <option value={th.attr}>{th.value}</option>
                ))}
            </select>
        </div>
        <div className="attr_section">
            <h3>Niveau</h3>
            <select value={search.level} name="level" id="level" onChange={(e)=>handleOption(e,"level")}>
                {meta && meta.level.map( lv => (
                        <option value={lv.attr}>{lv.value}</option>
                ))}
            </select>
        </div>
        <div className="attr_section">
            <h3 className="attr_title">Type</h3>
            <select value={search.type} name="type" id="type" onChange={(e)=>handleOption(e,"type")}>
                {meta && meta.contentType.map( tp => (
                        <option value={tp.attr}>{tp.value}</option>
                ))}
            </select>
        </div> 
    </div>
  )
}

export default Sidebar

