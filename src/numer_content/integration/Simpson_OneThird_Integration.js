import React, { useState } from 'react'
import { true_error } from '../../components/CalculateFunctions'
import Interval_setter from '../../components/Interval_selecter'
import TypeZero from "../../components/TypeZeroInput"
const { compile, abs } = require('mathjs')

const Simpson = (equation,a,b,n) =>{

    const EQ = num => compile(equation).evaluate({x:num})

    const num = (n <= 2)? 2:n
    const height = (b-a)/num
    
    let res = EQ(a) + EQ(b)

    for(let i=1;i<num;i++){ 
        let coff = (2*((i%2)+1)) 
        let interval = (a+(i*height))
        let r = coff * EQ(interval)
        console.log(coff,interval , EQ((interval)))
        res += coff * EQ(interval)
    }

    return (height/3)*res
}

const equation = '(x^7) + (2(x^3)) - 1'
// const equation = '(2*(x^3)) - (5*(x^2)) + (3*x) + 1'
const x0 = -1
const x1 = 2
// const x0 = 0
// const x1 = 2

const Simpsons_Integrate = () =>{

    const [ order, setOrder ] = useState(1)

    return(
        <div>
           <TypeZero 
                function={(equation,xL,xR)=>Simpson(equation,xL,xR,order)}
                addon={<Interval_setter 
                    isSimpson={true} 
                    setInterval={(n) => setInterval(n)}
                />}
                child={null}
            />
        </div>
    )

}

export default Simpsons_Integrate