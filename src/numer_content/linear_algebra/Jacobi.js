import React from "react"
import { abs } from 'mathjs'
import MatrixInput from "./MatrixInput"

const _Jacobi = (matrix,vector,error) =>{

    if(matrix==null) return

    let count = 1
    let x = new Array(vector.length).fill(0)
    let x_temp = new Array(vector.length).fill(0)
    let error_check = new Array(vector.length).fill(0)

    const data = {
        Answer: [],
        math: [],
    }

    const eq = (vector.length > 3)? "w":"x"
    
    const _funct = (n) =>{

        let res = vector[n]
        for(let i=0;i<vector.length;i++){
            if(i != n) res -= (matrix[n][i] * x[i])
        }
        return res/(A[n][n])
    }

    while(true){
        //console.log("iteration : ",count)
        for(let i=0;i<x.length;i++){
            x_temp[i] = _funct(i) //use x_temp to store new x
            error_check[i] = abs((x_temp[i] - x[i])/x_temp[i])
        }

        x = [...x_temp] // update x
        /*
        for(let i=1;i<=x.length;i++){
            console.log("x",i," = ",x[i-1])
        }
        */
        if(error_check.every((element,index,array) => {
            return element < error
        })) break
        count++
    }

    x.map(
        xx =>{
            data.Answer.push(
                <div>
                    <p>{(String.fromCharCode((eq.charCodeAt(0)+i))) + " = " + xx}</p>
                </div>
            )
        }
    )

    data.Answer.push(
        <div>
            <p>{"iteration = " + count}</p>
        </div>
    )

    return data

}


const Jacobi = (props) =>(
    <div>
        <MatrixInput function={(matrix,vector)=>_Jacobi(matrix,vector,props.error)} />
    </div> 
)

export default Jacobi