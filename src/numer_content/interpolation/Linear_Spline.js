export const Linear_Spline = (interpolated_x,arrX,arrY) =>{

    if(arrX === undefined) return

    const data = {
        Answer: 0,
        plotData : [
            {
                //line
                x: arrX,
                y: arrY,
                mode: 'lines',
                line: { color: 'black', }
            },
            {
                //point
                x: arrX,
                y: arrY,
                mode: 'markers',
                marker: {color: 'red', size: 15},
                type: 'scatter'
            },
        ]
    }

    console.log("Linear function Activated")
    for(let i=0;i<(arrX.length-1);i++){
        if(arrX[i] <= interpolated_x && interpolated_x <= arrX[i+1]){
            const slope = ( (arrY[i+1] - arrY[i]) / (arrX[i+1] - arrX[i]) )
            data.plotData.push(
                {
                    x: [interpolated_x],
                    y: [arrY[i] + (slope * (interpolated_x - arrX[i]))],
                    mode: 'markers',
                    marker: {color: 'blue', size: 15},
                    type: 'scatter'
                }
            )
            data.Answer = arrY[i] + (slope * (interpolated_x - arrX[i]))
            return data
        }
        
    }

}
