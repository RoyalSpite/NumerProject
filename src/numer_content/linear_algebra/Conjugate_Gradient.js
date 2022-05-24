import React, { useState } from "react"
import { sqrt, subtract, multiply, matrix, transpose, divide, subset, index} from "mathjs"
import MatrixInput from "./MatrixInput"

const Conjugate_Gradient_Method = (matrix,vector,EPSILON) =>{
    
    if(matrix == null) return

    let x = math.matrix([
        [0],[0],[0],[0]
    ,])

    const Residual = () => (subtract(multiply(matrix,x),vector))

    const LAMBDA = () => {
        const upper = multiply(math.transpose(D),R)
        const lower = multiply(multiply(transpose(D),matrix),D)
        return (multiply(-1,divide(upper,lower))).subset(index(0,0))
    }

    const ALPHA = () => {
        const upper = multiply(multiply(transpose(R),matrix) ,D)
        const lower = multiply(multiply(transpose(D),matrix) ,D)
        return (divide(upper,lower)).subset(index(0,0))
    }

    let R = Residual()
    let D = multiply(-1,R)
    let iteration = 1

    while(true){

        //console.log("iteration :",iteration)
        x = math.add(x,multiply(LAMBDA(),D))
        //console.log("x =",math.format(x))

        R = Residual()
        //console.log("Residual =",math.format(R))
        
        error = math.sqrt(multiply(transpose(R),R)).subset(index(0,0))
        //console.log("error =",error)
        if(error > EPSILON){
            
            D = math.add(multiply(-1,R) ,multiply(ALPHA(),D))
            //console.log("Distance =",math.format(D))
            iteration++
        }
        else break

    }
}

const Conjugate_Gradient = (props) =>(    
    <div>
        <MatrixInput function={(matrix,vector) => Conjugate_Gradient_Method(matrix,vector,props.error)} />
    </div>
)

export default Conjugate_Gradient