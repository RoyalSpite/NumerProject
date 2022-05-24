import React from "react"
import { abs } from "mathjs"
import MatrixInput from "./MatrixInput"

const forwardEliminate = (matrix) =>{

    const N = (matrix[0].length) - 1
    let i_max,v_max

    for(let i=0;i<N;i++){

        i_max = i
        v_max = matrix[i_max][i]

        for(let k=i+1;k<N;k++){
            if(abs(matrix[k][i]) > v_max){
                v_max = matrix[k][i]
                i_max = k
            }
        }

        if(!matrix[i][i_max]) return i

        if(i_max !== i) swap_row(matrix,i,i_max)


        for(let j=i+1;j<N;j++){
            
            let f = matrix[j][i]/matrix[i][i]
            

            for(let k=i+1;k<=N;k++){

                matrix[j][k] -= matrix[i][k]*f

            }

            matrix[j][i] = 0

        }

    }

    return -1

}

const backSubstitute = (matrix) =>{

    let res = []

    const N = (matrix[0].length) - 1

    // console.log('matrix')
    // matrix.map(
    //     m => console.log(m)
    // )

    for(let i=(N-1);i>=0;i--){

        res[i] = matrix[i][N]
        console.log(" --> ",res)
        for(let j=(i+1);j<N;j++){
            res[i] -= (matrix[i][j] * res[j])
        }

        res[i] /= matrix[i][i]

    }

    return res

}

const swap_row = (matrix,i,j) =>{

    const M_temp = [...matrix[i]]
    matrix[i] = [...matrix[j]]
    matrix[j] = [...M_temp]

}

const Gaussian = (matrix,vector) =>{

    if(matrix==null) return
    const M = matrix

    const data = {
        Answer: [],
        math: [],
    }

    vector.map(
        (v,i) => M[i][M[i].length] = v
    )

    const eq = (vector.length > 3)? "w":"x"
    let size = matrix[0].length
    let singular_flag = forwardEliminate(M)

    if(singular_flag !== -1){
        console.log('singular matrix')
        
        if(M[singular_flag][size-1]){
            console.log("Inconsistent System.")
        }
        else console.log("May have infinitely many solutions.")

        return

    }

    let ans = backSubstitute(M)

    for(let i=0;i<ans;i++){
        data.Answer.push(
            <div>
                <p>{(String.fromCharCode((eq.charCodeAt(0)+i))) + " = " + ans[i]}</p>
            </div>
        ) 
    }
    
    return data

}

const GaussianElimination = () => (
    <div>
        <MatrixInput function={(matrix,vector)=>Gaussian(matrix,vector)} />
    </div> 
)
export default GaussianElimination