const { multiply, inv, matrix, zeros, pow, subset, index, squeeze} = require('mathjs');

export const Cubic_Spline = (interpolated_x,arrX,arrY)  =>{

    if(arrX === undefined ) return

    console.log("Cubic function Activated")

    const data = {
        Answer: 0,
        plotData : []
    }

    //set matrix size
    const arrSize = arrX.length
    const size = 4*(arrSize - 1)
    
    //matrix formation
    let A = zeros([size+1,size])
    let B = []

    const fillpw3 = (i,j,x) =>{
        A[i][j] = pow(x,3)
        A[i][j+1] = pow(x,2)
        A[i][j+2] = x
        A[i][j+3] = 1
    }

    const fillslope1 = (i,j,x,s) =>{
        A[i][j] = s * (3 * pow(x,2))
        A[i][j+1] = s * (2 * x)
        A[i][j+2] = s
    }

    const fillslope2 = (i,j,x,s) =>{
        A[i][j] = s * (6 * x)
        A[i][j+1] = s * 2
    }

    //equation formation
    let i = 0
    let j = 0
    let k = 0

    while(k<(arrSize - 1)){
        fillpw3(i,j,arrX[k])
        B.push(arrY[k])

        if(k < arrSize - 2){
            fillpw3(i+1,j,arrX[k+1])
            B.push(arrY[k+1])
        }
        i += 2
        j += 4
        k++
    }

    //begin
    fillpw3(i-1,0,arrX[0])
    B.push(arrY[0])

    //end
    fillpw3(i,size-4,arrX[arrSize-1])
    B.push(arrY[k])
    
    //diff 1
    j = 0
    k = 1
    while(k < (arrSize-1)){
        i++
        B.push(0)
        fillslope1(i,j,arrX[k],1)

        j += 4
        fillslope1(i,j,arrX[k],-1)

        k++
    }

    //diff 2
    j = 0
    k = 1
    while(k < (arrSize-1)){
        i++
        
        B.push(0)
        fillslope2(i,j,arrX[k],1)

        j += 4
        fillslope2(i,j,arrX[k],-1)

        k++
    }


    fillslope2(i+1,0,arrX[0],1)
    fillslope2(i+2,size-4,arrX[arrSize-1],1)
    B.push(0)
    B.push(0)
    
    A = A.slice(1,size+1)
    B = B.slice(1,size+1)


    //find inverse of A
    let inv_A = inv(A)

    let Answer = squeeze(multiply(inv_A, matrix(B).resize([size,1])))

    //check
    for(let i=0,j=0;i<(arrSize-1);i++,j+=4){
        
        if(arrX[i] <= interpolated_x && interpolated_x <= arrX[i+1]){
            data.Answer = (
                (subset(Answer, index(j))*pow(interpolated_x,3)) + 
                (subset(Answer, index(j+1))*pow(interpolated_x,2)) + 
                (subset(Answer, index(j+2))*interpolated_x) + 
                subset(Answer, index(j+3))
            )
        }

        const plotX = [], plotY = []
        const interval = (arrX[i+1] - arrX[i])/10
        let Xstep = arrX[i]
        for(let k=0;k<=10;k++){
            plotX.push(Xstep)
            plotY.push(
                (subset(Answer, index(j))*pow(Xstep,3)) + 
                (subset(Answer, index(j+1))*pow(Xstep,2)) + 
                (subset(Answer, index(j+2))*Xstep) + 
                subset(Answer, index(j+3))
            )
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
