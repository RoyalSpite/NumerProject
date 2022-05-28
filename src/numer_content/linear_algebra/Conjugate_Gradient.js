import React from "react"
import { sqrt, subtract, multiply, matrix, transpose, divide, subset, index, add} from "mathjs"
import MatrixInput from "./MatrixInput"

const Conjugate_Gradient_Method = (_matrix,vector,EPSILON) =>{
    
    if(_matrix == null) return
    const eq = (vector.length > 3)? "w":"x"
    const data = {
        Answer: [],
        math: [],
    }

    let x = matrix(new Array(vector.length).fill([0]))

    const Residual = () => (subtract(multiply(_matrix,x),vector))

    const LAMBDA = () => {
        const upper = multiply(transpose(D),R)
        const lower = multiply(multiply(transpose(D),_matrix),D)
        return (multiply(-1,divide(upper,lower))).subset(index(0,0))
    }

    const ALPHA = () => {
        const upper = multiply(multiply(transpose(R),_matrix) ,D)
        const lower = multiply(multiply(transpose(D),_matrix) ,D)
        return (divide(upper,lower)).subset(index(0,0))
    }

    let R = Residual()
    let D = multiply(-1,R)
    let iteration = 1
    let error

    while(true){

        //console.log("iteration :",iteration)
        x = add(x,multiply(LAMBDA(),D))
        //console.log("x =",math.format(x))

        R = Residual()
        //console.log("Residual =",math.format(R))
        
        error = sqrt(multiply(transpose(R),R)).subset(index(0,0))
        //console.log("error =",error)
        if(error > EPSILON){
            
            D = add(multiply(-1,R) ,multiply(ALPHA(),D))
            //console.log("Distance =",math.format(D))
            iteration++
        }
        else break
    }

    let count = 0

    x.forEach((value, index, matrix) => {
        data.Answer.push(
            <div>
                <p><p>{(String.fromCharCode((eq.charCodeAt(0)+count))) + " = " + value}</p></p>
            </div>
        )
        count++
    }) 

    data.Answer.push(
        <div>
            <p>{"iterations = " + iteration}</p>
        </div>
    )

    return data
}

const ConjugateGradient = (props) =>(    
    <div>
        <MatrixInput function={(matrix,vector) => Conjugate_Gradient_Method(matrix,vector,props.error)} />
    </div>
)

export default ConjugateGradient