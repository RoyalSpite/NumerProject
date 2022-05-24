import React,{ useState } from "react"
import { derivative } from "mathjs"
import { funct,errorCalculate } from "../../components/CalculateFunctions"

const NewtonRaphson = (props) => {

    const data = {
        EQUATION: null,
        X : []
    }
    const [ answer, setAnswer ] = useState(null)
    const [ openVisualize, setVisualize ] = useState(false)
    const [ VisualizedData, setData ] = useState(null)

    
    const initData = (EQUATION,X) =>{

        data.X = []

        data.EQUATION = EQUATION
        data.X.push(X)
        NewtonRaphson_iteration()
    }

    const NewtonRaphson_iteration = () => {
        
        let iteration = 0
        let x = data.X[data.X.length-1].x
        let x_old = undefined

        while(true){

            x = x - (funct(data.EQUATION,x)/funct(derivative(data.EQUATION,"x"),x))

            data.X.push(
                {
                    x : x,
                    ERROR : errorCalculate(x,x_old)

                }
            )

            if(x_old !== undefined){
                if(errorCalculate(x,x_old) < props.error){
                    
                    console.log(data)
                    setData(data)
                    setAnswer(
                        <div>
                            <h2>x = {x}</h2>
                            <h2>total iterations = {iteration}</h2>
                        </div>
                    )
                    return
                        
                }
                
            }
            
            x_old = x
            iteration++;
        }
        
    }

    return(
        <div>
            
            
        </div>
    )

}

export default NewtonRaphson;
