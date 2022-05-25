import React, { useState } from 'react'
// import { true_error } from '../../components/CalculateFunctions'
import Interval_setter from '../../components/Interval_selecter'
import TypeZero from "../../components/TypeZeroInput"
const { compile } = require('mathjs')

const Simpson = (equation,a,b,n) =>{

    const EQ = num => compile(equation).evaluate({x:num})

    const num = (n <= 2)? 2:n
    const height = (b-a)/num
    
    let res = EQ(a) + EQ(b)

    for(let i=1;i<num;i++){ 
        let coff = (2*((i%2)+1)) 
        let interval = (a+(i*height))
        res += coff * EQ(interval)
    }

    return{
        Answer : ( 
            <p>{(height/3)*res}</p>
        )
    }
}

const SimpsonsIntegrate = () =>{

    const [ order, setOrder ] = useState(1)

    return(
        <div>
           <TypeZero 
                function={(equation,xL,xR)=>Simpson(equation,xL,xR,order)}
                addon={<Interval_setter 
                    isSimpson={true} 
                    setInterval={(n) => setOrder(n)}
                />}
                child={null}
            />
        </div>
    )

}

export default SimpsonsIntegrate