import React from "react"
import PointsInput from "./PointsInput"

const lagrange = (interpol_x,arrX,arrY) =>{

    const size = arrX.length

    let result = 0 
    for(let i=0;i<size;i++){
        let divider = 1
        let divided = 1
        for(let j=0;j<size;j++){
            if(arrX[j] != arrX[i]){
                divider *= (arrX[j] - interpol_x)
                divided *= (arrX[j] - arrX[i] )
            }
        }
        result += (divider/divided) * arrY[i]
    }
    return {
        Answer : result
    }
}

const LagrangeInterpol = () =>{
    return(
        <div>
            <PointsInput function={(interpol_x,arrX,arrY) => lagrange(interpol_x,arrX,arrY)}/>
        </div>
    )
}

export default LagrangeInterpol
