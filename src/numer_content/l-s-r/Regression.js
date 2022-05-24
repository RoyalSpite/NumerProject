import { funct } from '../../components/CalculateFunctions'
import React from 'react'
import { InlineMath } from 'react-katex'
const { matrix, inv, multiply, subset, index, pow, compile } = require('mathjs')

const sumX = (ArrX,n) =>{
    let sum = 0
    ArrX.forEach( x => sum += pow(x,n) )
    return sum
}

const sumXY = (ArrX,ArrY,n) =>{
    let sum = 0
    for(let i=0;i<ArrX.length;i++) sum += (pow(ArrX[i],n)*ArrY[i])
    return sum
}

export const Regression = (ArrX,ArrY,deg,input_x) =>{

    if(ArrX === null) return
    const X = []

    const data = {
        Answer: 0,
        plotData : []
    }

    for(let i=0;i<=deg;i++){
        X.push([])
        for(let j=i;j<=(deg+i);j++){
            if(j==0) X[i].push(ArrX.length)
            else X[i].push(sumX(ArrX,j))
        }
    }
        
    const Y = []
    for(let i=0;i<=deg;i++) Y.push(sumXY(ArrX,ArrY,i))
    
    console.log(X)

    const inv_matrix = inv(matrix(X))

    const a = multiply(inv_matrix,Y)

    let regression = ""
    for(let i=0;i<=deg;i++){
        let coeff = subset(a, index(i)).toFixed(5)
        let str
        if(i > 0){ 
            str = (coeff > 0)? "+":""
            str = str.concat(coeff,"*x",(i>1)? "^"+(i).toString():"" )
        }
        else str = coeff.toString()
        str = str.concat(" ")
        regression = regression.concat(str)
    }

    const mathregression = regression.slice(0, regression.length);

    data.Answer = (
        <div>
            <InlineMath math={mathregression.replace('*',' \\cdot ')}/>
            <p>คำตอบ = {funct(compile(regression),input_x)}</p>
        </div>
        
    )

    if(deg === 1){
        //liner
        data.plotData.push(
            {
                x: [ ArrX[0], ArrX[ArrX.length-1]],
                y: [ funct(compile(regression),ArrX[0]), funct(compile(regression),ArrX[ArrX.length-1])  ],
                mode: 'lines',
                line: { color: 'black', }
            }
        )
    }
    else{
        //polynomial
        let plotX = []
        let plotY = []
        const xStep =  (ArrX[ArrX.length-1] - ArrX[0])/30
        for(let i=ArrX[0];i<=ArrX[ArrX.length-1];i+=xStep){
            plotX.push(i)
            plotY.push(funct(compile(regression),i))
        }

        data.plotData.push(
            {
                x: [ ...plotX ],
                y: [ ...plotY ],
                mode: 'lines',
                line: { color: 'black', }
            }
        )

    }

    for(let i=0;i<ArrX.length;i++){
        //error
        data.plotData.push({
                x: [ ArrX[i], ArrX[i] ],
                y: [ ArrY[i] ,funct(compile(regression),ArrX[i])],
                mode: 'lines',
                line: { color: 'green', }
            }
        )
    }

    data.plotData.push(
        {
            //data point
            x: [ ...ArrX ],
            y: [ ...ArrY ],
            mode: 'markers',
            marker: {color: 'red', size: 15},
            type: 'scatter'
        },
        {
            //interpolation
            x: [ input_x ],
            y: [ funct(compile(regression),input_x) ],
            mode: 'markers',
            marker: {color: 'blue', size: 15},
            type: 'scatter'
        }
    )
    
    return data

}