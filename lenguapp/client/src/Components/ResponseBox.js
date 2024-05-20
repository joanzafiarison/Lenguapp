import React from 'react';
import { Link } from "react-router-dom";
import { FaGraduationCap } from 'react-icons/fa';

function ResponseBox({result}) {
  return (
        <div className="response_box">
            { result === "" ?
                <p>Réponse en cours d'envoi ..</p>
                :
                <div>
                    <p>Vous avez trouvé {result.score}/{result.total} mots</p>
                    <p>{Math.round(result.score/result.total*100)}%</p>
                    <FaGraduationCap />
                    <Link to="/user">Retour</Link>
                </div>
                
            }
        </div>

  )
}

export default ResponseBox