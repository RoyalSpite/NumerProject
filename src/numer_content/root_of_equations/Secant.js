import React,{ useState } from "react"
import { funct,errorCalculate } from "../../components/CalculateFunctions"

const Secant = (props) => {

    const data = {
        EQUATION: null,
        X : []
    }

    const [ openVisualize, setVisualize ] = useState(false)
    const [ VisualizedData, setData ] = useState(null)
    const [ answer, setAnswer ] = useState(null)
    const [ equation, setEquation ] = useState(null) 
    const [ value1, setValue1 ] = useState(null)
    const [ value2, setValue2 ] = useState(null)

    const input_checking = () => {
        if(equation === null
            || value1 === null 
            || value2 === null
            || isNaN(value1)
            || isNaN(value2)){
                setAnswer(<h2 style={{color: "red"}}>กรุณากรอกข้อมูลใหม่</h2>)
                return false
        }
    
        if(value2 <= value1){
            setAnswer(<h2 style={{color: "red"}}>กรุณากรอกค่าขอบเขตใหม่</h2>)
            return false
        } 

        return true
    }

    const initData = () =>{

        data.X = []

        data.EQUATION = equation
        data.X.push(value1)
        data.X.push(value2)

        Secant_iteration()
    }

    const Secant_iteration = () => {
        
        let iteration = 0
        let x0 = data.X[0]
        let x1 = data.X[data.X.length-1]

        while(true){

            let x = x1 - ((funct(data.EQUATION,x1)*(x0-x1)) / (funct(data.EQUATION,x0) - funct(data.EQUATION,x1)))

            data.X.push(x)

            if(errorCalculate(x,x1) < props.error){
        
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
                
            x0 = x1
            x1 = x
            iteration++;
        }
        
    }

    return(
        <div>
            
        </div>
    )

}

export default Secant;
