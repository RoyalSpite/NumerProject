import React, { useState } from "react";
import { Button } from '@mui/material'
import { funct } from "../../components/CalculateFunctions";
import GraphVisualizer from "../../components/GraphVisualize";
import { AiOutlineDoubleLeft,AiOutlineDoubleRight } from "react-icons/ai";

const setPlotData = (index,data) =>{

    if(data === undefined) return 

    const plot = []
    
    plot.push(data.EquationLine)
    plot.push(
        {
            x: [ data.Leftplot[index],data.Leftplot[index] ],
            y: [ funct(data.EQ,data.Leftplot[index]),0 ],
            mode: 'lines+markers',
            marker: {
                color: 'red',
                size: 12,
            },
            line : { color: 'red' }
        },
        {
            x: [ data.Rightplot[index],data.Rightplot[index] ],
            y: [ funct(data.EQ,data.Rightplot[index]),0 ],
            mode: 'lines+markers',
            marker: {
                color: 'blue',
                size: 12,
            },
            line : { color: 'blue' }
        },
        {
            x: [ data.Midplot[index],data.Midplot[index] ],
            y: [ funct(data.EQ,data.Midplot[index]),0 ],
            mode: 'lines+markers',
            marker: {
                color: 'green',
                size: 12,
            },
            line : { color: 'green' }
        },
    )

    if(data.moveAt.left !== null){
        if(index >= data.moveAt.left){
            plot.push(
                {
                    x: [ data.Leftplot[0],data.Leftplot[0] ],
                    y: [ funct(data.EQ,data.Leftplot[0]),0 ],
                    mode: 'lines+markers',
                    marker: {
                        color: 'rgb(175,0,0)',
                        size: 10,
                    },
                    line : { 
                        color: 'rgb(175,0,0)',
                        dash: 'dashdot',
                        width: 6
                    }
                }
            )
        }
    }

    if(data.moveAt.right !== null){
        if(index >= data.moveAt.right){
            plot.push(
                {
                    x: [ data.Rightplot[0],data.Rightplot[0] ],
                    y: [ funct(data.EQ,data.Rightplot[0]),0 ],
                    mode: 'lines+markers',
                    marker: {
                        color: 'rgb(0,0,175)',
                        size: 10,
                    },
                    line : { 
                        color: 'rgb(0,0,175)',
                        dash: 'dashdot',
                        width: 6
                    }
                }
            )
        }
    }
    
    return plot
}

const changeButton = (sign,changefunction) =>(
    <Button
        style={{
            height:'100%',
            width:'fit-content'
        }}
        onClick={() =>  changefunction()}
    >
        {sign}
    </Button>
)

const GraphChanger = (props) =>{

    const { Data } = props
    const [ index, setIndex ] = useState(0)

    return(
        <div style={{
            display:"flex",
            width:'100%',
            height: '100%',
        }}>
            <Button squared onClick={() => {if(index !== 0) setIndex(index - 1)}}>   
                <AiOutlineDoubleLeft/>
            </Button>

            <GraphVisualizer plotData={setPlotData(index,Data.plotData)}/>
            
            <Button squared onClick={() =>{if(index !== (Data.iteration-1)) setIndex(index + 1)}}>
                <AiOutlineDoubleRight/>
            </Button>
        </div>
    )

}

export default GraphChanger