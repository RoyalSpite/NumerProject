import React, { useState } from "react";

const backward_substitution = (L,vector) =>{

    let size = vector.length
    let Y = Array(size).fill(0)
    
    for(let i=0;i<size;i++){
        let sum = 0
        for(let j=0;j<size;j++) sum += (L[i][j]*Y[j])
        Y[i] = ((vector[i] - sum) / L[i][i])
    }

    return Y
}

const LU_decomposition = (matrix,vector) =>{

    if(matrix == null) return

    const data = {
        Answer: [],
        math: [],
    }

    const size = matrix.length
    const L = Array(size).fill(0).map(
        x => Array(size).fill(0)
    )

    const U = Array(size).fill(0).map(
        x => Array(size).fill(0)
    )

    for(let i=0;i<size;i++) U[i][i] = 1

    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){

            let sum = 0

            if(i >= j){

                //fill L
                for(let k=0;k<size;k++)sum += L[i][k] * U[k][i]
                L[i][j] = (matrix[i][j] - sum)

            }
            else{
                //fill U
                for(let k=0;k<(i-1);k++)sum += L[i][k] * U[k][i]
                U[i][j] = (matrix[i][j] - sum)/L[i][i]

            }

        }
    }

    const Y = backward_substitution(L,vector)

    //forward substitution
    const X = Array(size).fill(0)
    for(let i=(size-1);i>=0;i--){

        let sum = 0
        for(let j=(size-1);j>(i);j--){

            sum += (U[i][j] * X[j])
        }
        X[i] = ((Y[i] - sum)/U[i][i])

    }

    for(let i=0;i<X.length;i++){
        data.Answer.push(
            <div>
                <p>{(String.fromCharCode((eq.charCodeAt(0)+i))) + " = " + X[i]}</p>
            </div>
        )
    }

    return data

}

const LU = () =>(
    <div>
        <MatrixInput function={(matrix,vector)=> LU_decomposition(matrix,vector)} />
    </div> 
)

export default LU