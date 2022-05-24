import React,{ useState } from "react"
import { matrix, det } from "mathjs";
import { BlockMath } from 'react-katex';
import { RenderKatexMatrix } from "./RenderKatexMatrix";
import MatrixInput from './MatrixInput'

const Cramers_Rule = (Matrix,Vector) =>{

    if(Matrix === null) return
    const data = {
        Answer: [],
        math: [],
    }

    let D = Matrix.map((m) => m)
    let M = Matrix.map((m) => m)
    let V = Vector.map((v) => v)
    let dividant = det(matrix(D))
    const eq = (D.length > 3)? "w":"x"

    if(dividant == 0){

        data.Answer.push(
            <p style={{color:"red",padding:"10px"}}>
                ไม่สามารถหาคำตอบได้ด้วยกฏของคราเมอร์
            </p>
        )

        data.math.push(
            <p style={{color:"red",padding:"10px"}}>
                determinant ของ A เป็น 0 ทำให้ไม่สามารถหาคำตอบได้ด้วยกฏของคราเมอร์
            </p>
        )

    }
    else{
        for(let i=0;i<D.length;i++){
            M = []
            D.map( (d) => M.push([...d]))

            for(let j=0;j<D.length;j++) M[j][i] = V[j]

            //console.log(M)

            const arrow = "\\xrightarrow{replace column "+(i+1)+ "with B}";
            const OverallMatrix = (
                    "A_"+(i+1)+" : " + RenderKatexMatrix(D,"bmatrix") + arrow 
                    + RenderKatexMatrix(V,"Bmatrix") + " = " + RenderKatexMatrix(M,"bmatrix") 
            )
            const text = (String.fromCharCode((eq.charCodeAt(0)+i)))+" = " + (det(matrix(M))/dividant)
            console.log(text)
            data.math.push(
                <div>
                    <BlockMath math={OverallMatrix} />
                    <p>{text}</p>
                </div>
            )
            data.Answer.push(
                <div>
                    <p>{text}</p>
                </div>
            )            
        }
    }
    return data
}

const Cramers = () => (
    <div>
        <MatrixInput function={(matrix,vector)=>Cramers_Rule(matrix,vector)} />
    </div>   
)

export default Cramers;