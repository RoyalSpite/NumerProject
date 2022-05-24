import React, { useState } from 'react'
import { funct, true_error,drawEquationLine } from '../../components/CalculateFunctions'
import Interval_setter from '../../components/Interval_selecter'
import TypeZero from "../../components/TypeZeroInput"

const trapezoidal = (equation,a,b,n) =>{

    const color = "rgba(0,0,255,0.5)"

    if(equation === undefined) return

    const data = {
        Answer: 0,
        plotData : []
    }
    
    data.plotData.push(drawEquationLine(equation,a,b))

    const height = (b-a)/n

    const res = (funct(equation,b) + funct(equation,a))

    data.plotData.push(
        {
            x : [a,a],
            y : [0,funct(equation,a)],
            mode: 'lines',
            line: { 
                color: 'black',
                width: 0.8
            }
        },
        {
            x : [b,b],
            y : [0,funct(equation,b)],
            mode: 'lines',
            line: { 
                color: 'black',
                width: 0.8
            }
        }
    )
    
    if(n === 1){
        data.plotData.push(
            {
                x : [a, b],
                y : [funct(equation,a), funct(equation,b)],
                fill: 'tozeroy',
                fillcolor: color,
                hoverinfo: 'skip',
                type: 'scatter',
                line: { 
                    color: 'black',
                    width: 0.7,
                }
            }
        )
    }
    
    let interval = 0
    let LeftBoundInterval = a
    let RightBoundInterval
    for(let i=1;i<n;i++){

        RightBoundInterval = a + (height*i)

        data.plotData.push(
            {
                x : [LeftBoundInterval, RightBoundInterval],
                y : [funct(equation,LeftBoundInterval), funct(equation,RightBoundInterval)],
                fill: 'tozeroy',
                fillcolor: color,
                hoverinfo: 'skip',
                type: 'scatter',
                line: { 
                    color: 'black',
                    width: 0.7
                }
            },
            {
                x : [RightBoundInterval,RightBoundInterval],
                y : [0,funct(equation,RightBoundInterval)],
                type: 'scatter',
                line: { 
                    color: 'black',
                    width: 0.7
                }
            }

        )

        interval += funct(equation,RightBoundInterval)

        LeftBoundInterval = RightBoundInterval

        if(i === (n-1)){
            data.plotData.push(
                {
                    x : [RightBoundInterval,b],
                    y : [funct(equation,RightBoundInterval),funct(equation,b)],
                    fill: 'tozeroy',
                    fillcolor: color,
                    hoverinfo: 'skip',
                    type: 'scatter',
                    line: { 
                        color: 'black',
                        width: 0.7
                    }
                }
            )
        }
    }

    data.Answer = (height/2)*(res + (2*interval))

    return data
}

const Trapezoidal_Integrate = () =>{

    const [ interval, setInterval ] = useState(1)

    return(
        <div>
           <TypeZero 
                function={(equation,xL,xR)=> trapezoidal(equation,xL,xR,interval)}
                addon={<Interval_setter 
                    isSimpson={false} 
                    setInterval={(n) => setInterval(n)}
                />}
                child={'Graph'}
            />
        </div>
    )
}

export default Trapezoidal_Integrate
