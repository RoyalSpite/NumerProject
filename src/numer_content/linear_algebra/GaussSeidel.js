import React from "react"
import { abs } from "mathjs"
import MatrixInput from "./MatrixInput"

const _GaussSeidel = (matrix,vector,epsilon) =>{
    
    if(matrix == null) return

    const data = {
        Answer: [],
        math: [],
    }

    let x = new Array(vector.length).fill(0)
    let x_temp = new Array(vector.length).fill(0)
    let error_check = new Array(vector.length).fill(0)
    const eq = (vector.length > 3)? "w":"x"

    const _funct = (n) =>{

        let res = vector[n]
        for(let i=0;i<x.length;i++){
            if(i != n) res -= (matrix[n][i] * x[i])
        }
        return res/(matrix[n][n])
    }

    let count = 1

    while(true){
        //console.log("iteration : ",count)
        x_temp = [...x] //use x_temp to store previous x for calculate error

        for(let i=0;i<x.length;i++){
            x[i] = _funct(i) //use x up to date 
            error_check[i] = abs((x[i] - x_temp[i])/x[i])
        }
        /*
        for(let i=1;i<=x.length;i++){
            console.log("x",i," = ",x[i-1])
        }
        */
        if(error_check.every((element,index,array) => {
            return element < epsilon
        })) break
        count++
    }

    for(let i=0;i<x.length;i++){
        data.Answer.push(
            <div>
                <p>{(String.fromCharCode((eq.charCodeAt(0)+i))) + " = " + x[i]}</p>
            </div>
        )
    }

    data.Answer.push(
        <div>
            <p>{"iterations = " + count}</p>
        </div>
    )

    return data
}

const GaussSeidel = (props) =>(
    <div>
        <MatrixInput function={(matrix,vector) => _GaussSeidel(matrix,vector,props.error)} />
    </div>
)
    

export default GaussSeidel