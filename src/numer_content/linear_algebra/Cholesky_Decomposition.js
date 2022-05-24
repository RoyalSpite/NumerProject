import React, { useState } from "react";
import { pow,sqrt } from "mathjs";

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

const Cholesky_decomposition = (matrix,vector) =>{

    if(matrix == null) return

    const size = matrix.length
    const L = Array(size).fill(0).map(
        x => Array(size).fill(0)
    )

    const Lt = Array(size).fill(0).map(
        x => Array(size).fill(0)
    )

    for (let i=0;i<n;i++) {
        for (let j=0;j<=i;j++) {
            let sum = 0

            if (j == i) {

                for(let k=0;k<j;k++) sum += (pow(L[j][k],2))

                L[j][j] = sqrt(matrix[j][j] - sum)
            }
            else {

                for(let k=0;k<j;k++) sum += (L[i][k] * L[j][k])

                L[i][j] = (matrix[i][j] - sum) / L[j][j]
            }
        }
    }

    for(let i=0;i<size;i++){
        for(let j=0;j<size;j++){
            Lt[i][j] = L[j][i]
        }
    }

    // console.log('L')
    // L.map(
    //     l => console.log(l)
    // )

    // console.log('Ltranspose')
    // Lt.map(
    //     l => console.log(l)
    // )

    const Y = backward_substitution(L,vector)

    //forward substitution
    const X = Array(size).fill(0)
    for(let i=(size-1);i>=0;i--){

        let sum = 0
        for(let j=(size-1);j>(i);j--){

            sum += (Lt[i][j] * X[j])
        }
        X[i] = ((Y[i] - sum)/ Lt[i][i])

    }

    console.log('X = ',X)

}

const Cholesky = () =>(
    <div>
        <MatrixInput function={(matrix,vector)=> Cholesky_decomposition(matrix,vector)} />
    </div> 
)

export default Cholesky