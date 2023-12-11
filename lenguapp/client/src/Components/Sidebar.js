import React from 'react'

function Sidebar() {
  return (
    <div className="sidebar">
                <div>
                    <h3>Langue</h3>
                    <select name="language" id="language" onChange={(e)=>handleOption(e,"language")}>
                        <option value="english">Anglais</option>
                        <option value="french">Français</option>
                        <option value="deutch">Allemand</option>
                        <option value="malagasy">Malagasy</option>
                    </select>
                </div>
                <div>
                    <h3>Theme</h3>
                    <select name="theme" id="theme" onChange={(e)=>handleOption(e,"theme")}>
                        <option value="law">Droit</option>
                        <option value="economics">Economie</option>
                        <option value="Tourisme">Tourisme</option>
                        <option value="food">Nourriture</option>
                    </select>
                </div>
                <div>
                    <h3>Niveau</h3>
                    <select name="level" id="level" onChange={(e)=>handleOption(e,"level")}>
                        <option value="beginner">Débutant</option>
                        <option value="intermediate">Intérmédiaire</option>
                        <option value="advanced">Avancé</option>
                    </select>
                </div>
                <div>
                    <h3>Type</h3>
                    <select name="type" id="type" onChange={(e)=>handleOption(e,"type")}>
                        <option value="words">Mots & Phrases</option>
                        <option value="building">Construction</option>
                        <option value="and-you-say">And you say ...</option>
                        <option value="Pendu">Pendu</option>
                        <option value="Jeu">Jeu</option>
                    </select>
                </div>

    </div>
  )
}

export default Sidebar