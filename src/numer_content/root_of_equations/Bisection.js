import React from "react"
import TypeZero from "../../components/TypeZeroInput"
import { funct, errorCalculate, drawEquationLine } from "../../components/CalculateFunctions"

const Bisection_Method = (equation,xL,xR,error) => {

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
    let old_m = undefined
    let m

    data.plotData.EquationLine = drawEquationLine(equation,xLeft,xRight)

    let mplot = []
    let xplot = []
    let yplot = []
   
    while(true){

        m = (xLeft + xRight)/2
            
        let fxM = funct(equation,m)
        let fxR = funct(equation,xRight)

        xplot.push(xLeft)
        mplot.push(m)
        yplot.push(xRight)

        if(fxM * fxR < 0){
            //console.log("change value1")
            if(data.plotData.moveAt.left === null){ 
                data.plotData.moveAt.left = data.iteration
            }
            xLeft = m
        }
        else if(fxM * fxR > 0){ 
            //console.log("change value2")
            if(data.plotData.moveAt.right === null){ 
                data.plotData.moveAt.right = data.iteration
            }
            xRight = m
        }

        if(old_m !== undefined){
            if(errorCalculate(m,old_m) < error){
                data.Answer = m
                data.plotData.Leftplot = [...xplot]
                data.plotData.Midplot = [...mplot]
                data.plotData.Rightplot = [...yplot]
                return data
            }
                
        }
            
        old_m = m        
        data.iteration++
    }
        
}

const Bisection = (props) => {

    return(
        <div>
            <TypeZero 
                function={(equation,xL,xR,error)=>Bisection_Method(equation,xL,xR,error)} 
                error={props.error} 
                allowZero={true} 
                child={'GraphChanger'}           
            />
        </div>
    )

}

export default Bisection;
