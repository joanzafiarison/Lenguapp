import React , {useState } from "react"


export default function Learn (props) {
    const [step,setStep] = useState(1)
    const [contents,setContent] = useState(["A","B","C","D"])
    return(
        <div className="mainElement">
            <p>LEARN</p>
            <p>Theme</p>
            <p>Langage</p>
            <p>{contents[step]}</p>
            <p>{step+1}/{contents.length}</p>

            <div className="progressBar">
                {contents != null ?
                    contents.map((content,key) => (
                        <div className={step === key ? "step actual" :"step"}>{content}</div>
                    ))
                     :
                    null
                }
            </div>
            <button className ="btn" disabled = {step == contents.length -1  ? true :false}onClick ={() => setStep(step + 1)}>Suivant</button>
            <button className ="btn" disabled = {step == 0 ? true :false} onClick ={() => setStep(step - 1)}>Précédent</button>
            

        </div>
    )
}