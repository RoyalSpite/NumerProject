import React,{ useState } from "react"
import { funct,errorCalculate } from "../../components/CalculateFunctions"

const Rearrange = (Equation) =>{
    
    let fx = Equation.replace(' ','')
    let gx = ''
    
    //split expression
    fx = fx.replace('-',',-')
    fx = fx.replace('+',',+')

    //remove comma from powers
    fx = fx.replace('^(,-','^(-')
    fx = fx.replace('^,-','^-')
    fx = fx.replace('^(,+','^(+')

    //remove commas from fractions
    fx = fx.replace('/(,-','/(-')
    fx = fx.replace('/,-','/-')

    
    
}

const OnePoint_iteration = (props) => {

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
        OnePoint_iteration()
    }

    const OnePoint_iteration = () => {
        
        let iteration = 0
        let x
        let x_old = undefined

        while(true){

            x = funct(data.EQUATION,x)

            data.X.push(
                {
                    x : x,
                    ERROR : errorCalculate(x,x_old)

                }
            )
            //console.log("error = ",error,"\n")

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

const OnePoint = (props) => {

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

export default OnePoint;
