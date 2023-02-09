import React, {useState} from 'react'
import HeroStatement from '../Components/HeroStatement'
import Download from '../Components/Download'
import MyCloud from '../Components/Cloud'


function randomPos(){
    return Math.round(Math.random()*100);
}

const language = [
    {
        "lang":"de",
        "hello":"Gutten tag"
    },
    {
        "lang":"fr",
        "hello":"Bonjour",
    },
    {
        "lang":"ch",
        "hello":"你好",
    },
    {
        "lang":"kr",
        "hello":"안녕",
    },
    {
        "lang":"jp",
        "hello" :"こにちは"
    }
]

export default function HomePage (){
        return(
            <>
                <div id="hero" style={{position:"relative",marginBottom:80}}>
                    <div>
                        <p className='hero_word'>
                            Nouveaux <span>Mots</span>
                        </p>
                        <p className='hero_word'>
                            Nouveaux <span>Horizons</span>
                        </p>
                    </div>
                    <MyCloud data={language}/>
                
                </div>
                

                
                <HeroStatement title="Learn with your goal in sight" statement="Travel the world, prepare for new jobs ,
 make new friends with interesting people form all around the world" button="Lets go" orientation/>

                <HeroStatement title="Fun is not an option , its mandatory !" statement="Travel the world, prepare for new jobs ,
 make new friends with interesting people form all around the world" button="Allons y quoi"/>
                
                <Download/>
                
            </>
        )
}