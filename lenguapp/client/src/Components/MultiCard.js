import React ,{useState}  from "react"; 

const word_ = "Troglodyte";
const letters_ = "abcdefghijklmnopqrstuvwxyz";

const Multicard = () => {
    const  [word,setWord] = useState(word_)
    console.log(word.split(""))
    return(
        <div>
            <div className="hangman" >
                <canvas></canvas>
                <div className="word_guess" style={{display:"flex",width:"80%",justifyContent:"space-between"}}>
                    {word.split("").map((wd)=>(
                        <div>_</div>
                    ))}
                </div>
            </div>
            <div className="letters" style={{display:"flex",flexWrap:"wrap",width:"80%"}}>
                {letters_.split(",").map((lt)=>{
                    <div>{lt}</div>
                })}
            </div>
        </div>
    )
}


export default Multicard;