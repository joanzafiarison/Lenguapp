import React from 'react'

function ResponseBox({result}) {
  return (
        <div className="response_box">
            { result === "" ?
                <p>Réponse en cours d'envoi ..</p>
                :
                <div>
                    <p>Vous avez trouvé {result.score}/{result.total} mots</p>
                    <p>{Math.round(result.score/result.total*100)}%</p>
                </div>
                
            }
        </div>

  )
}

export default ResponseBox