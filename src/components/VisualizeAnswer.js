import  React,{ useState } from "react"
import GraphVisualizer from "./GraphVisualize"
import Popup from "./Popup"
import { Button } from "@mui/material"
import '../components/InputStyle.css'
import Changer from "./Changer"
import GraphChanger from "../numer_content/root_of_equations/GraphChanger"

const VisualizeAnswer = (props) =>{

    const [ openVisualize, setOpenVisualize] = useState(false)
    const { Answer, plotData, child } = props

    const checkcomponent = (childselect) =>{
        switch(childselect){
            case 'GraphChanger':
                return <GraphChanger Data={plotData}/>
            case 'Graph':
                return <GraphVisualizer plotData={plotData}/>
            default:
                return null
        }
    }

    return(
        <div>
            {
                (Answer != null) && (
                    <div>
                        <div className="inputblock">
                            {Answer}
                        </div>
                    {
                        (plotData != null) && (
                            <div>
                                <Button 
                                    style={{
                                            fontSize: '15px',
                                            padding: '6px',
                                            backgroundColor: 'black',
                                            color: 'Lime',
                                            border: '1px solid white',
                                        }}
                                        variant="contained"
                                        onClick={() =>setOpenVisualize(true)}>
                                        visualize
                                </Button>
                                <Popup
                                    open={openVisualize} 
                                    onClose={()=>setOpenVisualize(false)}                             
                                    child={checkcomponent(child)}
                                />
                            </div>
                        )
                    }
                    
                    </div>
                )

            }
        </div>
    )

}

export default VisualizeAnswer