import React from "react"
import { funct, errorCalculate, drawEquationLine } from "../../components/CalculateFunctions"
import TypeZero from "../../components/TypeZeroInput"

const FalsePosition_Method = (equation,xL,xR,error) => {

    if(equation === null) return

    const data = {
        iteration : 0,
        Answer : 0,
        plotData: {
            EQ : equation,
            moveAt:{
                left: null,
                right: null
            },
            Leftplot : [],
            Midplot : [],
            Rightplot : []
        }
    }
    
    let xLeft = xL
    let xRight = xR
    let xOne_old = undefined
    let xOne
    let fxOne

    data.plotData.EquationLine = drawEquationLine(equation,xLeft,xRight)

    let mplot = []
    let xplot = []
    let yplot = []

    while(true){

        let fxL = funct(equation,xLeft)
        let fxR = funct(equation,xRight)

        xOne = ((xLeft * fxR)-(xRight * fxL))/(fxR - fxL)
        fxOne = funct(equation,xOne)

        xplot.push(xLeft)
        mplot.push(xOne)
        yplot.push(xRight)

        if(fxOne * fxR < 0){
            //console.log("change value1")
            if(data.plotData.moveAt.left === null){ 
                data.plotData.moveAt.left = data.iteration
            }
            xLeft = xOne
        }
        else if(fxOne * fxR > 0){ 
            //console.log("change value2")
            if(data.plotData.moveAt.right === null){ 
                data.plotData.moveAt.right = data.iteration
            }
            xRight = xOne
        }

        if(xOne_old !== undefined){
            if(errorCalculate(xOne,xOne_old) < error){
                data.Answer = xOne
                data.plotData.Leftplot = [...xplot]
                data.plotData.Midplot = [...mplot]
                data.plotData.Rightplot = [...yplot]
                return data
            }
            
        }
        
        xOne_old = xOne
        data.iteration++
    }

}

const FalsePosition = (props) => {

    return(
        <div>
           <TypeZero 
                function={(equation,xL,xR,error)=>FalsePosition_Method(equation,xL,xR,error)} 
                error={props.error}
                allowZero={true} 
                child={'GraphChanger'}                    
            />
        </div>
    )

}

export default FalsePosition;
