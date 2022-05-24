const { multiply, inv, matrix, zeros, pow, subset, index, squeeze} = require('mathjs');

export const Quadratic_Spline = (interpolated_x,arrX,arrY)  =>{

    if(arrX === undefined) return

    console.log("Quadratic function Activated")

    const data = {
        Answer: 0,
        plotData : []
    }

    //set matrix size
    const size = (arrX.length*2 - 1) + (arrX.length - 2) 
    const arrSize = arrX.length
    
    //matrix formation
    let A = zeros([size,size])
    let B = []

    //equation formation
    let i = 0
    let j = 0
    let k = 0

    //interval
    while(k<(arrSize - 1)){
        A[i][j] = pow(arrX[k],2)
        A[i][j+1] = arrX[k]
        A[i][j+2] = 1
        B.push(arrY[k])

        if(k < arrSize - 2){
            A[i+1][j] = pow(arrX[k+1],2)
            A[i+1][j+1] = arrX[k+1]
            A[i+1][j+2] = 1
            B.push(arrY[k+1])
        }
        i += 2
        j += 3
        k++
    }
    //begin 
    A[i-1][0] = pow(arrX[0],2)
    A[i-1][1] = arrX[0]
    A[i-1][2] = 1
    B.push(arrY[0])

    //end    
    A[i][size-3] = pow(arrX[arrSize-1],2)
    A[i][size-2] = arrX[arrSize-1]
    A[i][size-1] = 1  
    B.push(arrY[k])

    //slope
    j = 0
    k = 1
    while(i < (size-1)){
        i++
        
        B.push(0)

        A[i][j] = 2 * arrX[k]
        A[i][j+1] = 1

        j += 3
        A[i][j] = -(2 * arrX[k])
        A[i][j+1] = -1

        k++
    }

    A = A.slice(1,size).map(row => row.slice(1,size))
    B = B.slice(1,size)

    /*
    A.map(
        row => console.log(row)
    )
    */

    //find inverse of A
    let inv_A = inv(A)

    /*
    inv_A.map(
        row => console.log(row)
    )
    */

    let Answer = squeeze(multiply(inv_A, matrix(B).resize([size-1,1])))

    //check
    for(let i=0,j=-1;i<(arrSize-1);i++,j+=3){

        if(arrX[0] <= interpolated_x && interpolated_x <= arrX[1]) data.Answer = subset(Answer, index(0))*interpolated_x + subset(Answer, index(1))
        else if(arrX[i] <= interpolated_x && interpolated_x <= arrX[i+1]){   
            data.Answer = (subset(Answer, index(j))*pow(interpolated_x,2)) + (subset(Answer, index(j+1))*interpolated_x) + subset(Answer, index(j+2))
        }

        const plotX = [], plotY = []
        const interval = (arrX[i+1] - arrX[i])/10
        let Xstep = arrX[i]
        for(let k=0;k<=10;k++){
            plotX.push(Xstep)
            if(i == 0){
                plotY.push(subset(Answer, index(0))*Xstep + subset(Answer, index(1)))
            }
            else{
               plotY.push((subset(Answer, index(j))*pow(Xstep,2)) + (subset(Answer, index(j+1))*Xstep) + subset(Answer, index(j+2)))
            }
            Xstep += interval
        }

        data.plotData.push(
            {
                //line for each interval
                x: [...plotX],
                y: [...plotY],
                mode: 'lines',
                line: { color: 'black', }
            }
        )

    }

    data.plotData.push(
        {
            //point
            x: arrX,
            y: arrY,
            mode: 'markers',
            marker: {color: 'red', size: 15},
            type: 'scatter'
        },
        {
            //interpolated point
            x: [interpolated_x],
            y: [data.Answer],
            mode: 'markers',
            marker: {color: 'blue', size: 15},
            type: 'scatter'
        },
    )

    return data

}
