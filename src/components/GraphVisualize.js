import React from "react";
import { Plot } from "react-plotly.js"

const GraphVisualizer = (props) =>{

    console.log(props.plotData)

    return(
        <Plot
            style={{
                width:"100%", 
                height:"100%",
            }}
            data={props.plotData}
            layout={ 
                    {
                        width: 800, 
                        height: 400,
                        yaxis: {
                            title:{ text: 'f(x)' },
                            fixedrange: true
                        }, 
                        xaxis: 
                        {
                            title:{ text: 'x' },
                            fixedrange: true
                        },
                        showlegend: false,
                    }
                }
                config={{displayModeBar: false}}
            />
    )

}

export default GraphVisualizer
