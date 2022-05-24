import React from "react"
import PointsInput from "./PointsInput"

const DP_Newton_interpol = (interpol_x,arrX,arrY) =>{

    const size = arrX.length

    const F = []
    let left,right,key
    for(let i=1;i<(size+1);i++){
        F.push({})
        for(let j=0;j<(size-i+1);j++){
            left = j
            right = j+i-1
            key = (right).toString().concat("_",left)
            //console.log(key)

            if(left === right){
                F[i-1][key] = arrY[left]
            }
            else{
                let rightkey = (right).toString().concat("_",(right+2-i))
                let leftkey = (left+(i-2)).toString().concat("_",left)
                //console.log(i,": ",key," -> ",rightkey," ",leftkey)
                F[i-1][key] = ( (F[i-2][rightkey] - F[i-2][leftkey]) / (arrX[right] - arrX[left]) )
            }
            //console.log(key," = ",F[key])
        }
        
    }

    /*
    F.forEach(
        e => console.log(e)
    )
    */

    let result = 0
    let mult

    for(let i=0;i<size;i++){
        key = (i).toString().concat("_",(0))
        mult = 1
        for(let j=0;j<i;j++){
            //console.log("(",x_new,"-",P[arr[j]][0],")")
            mult *= (interpol_x - arrX[j])
        }
        //console.log(i,":",mult," =>",F[i][key])
        result += F[i][key]*mult
        //console.log(result)
    }

    return {
        Answer : result
    }
}

const NewtonInterpol = () =>{ 
    return(
        <div>
            <PointsInput function={(interpol_x,arrX,arrY) => DP_Newton_interpol(interpol_x,arrX,arrY)}/>
        </div>
    )
}

export default NewtonInterpol