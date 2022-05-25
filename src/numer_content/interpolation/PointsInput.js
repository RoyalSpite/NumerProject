import React, { useState } from "react";
import { Divider,TextField } from "@mui/material"
import '../../components/InputStyle.css'
import CalculateButton from "../../components/CalculateButton";
import VisualizeAnswer from "../../components/VisualizeAnswer";

const PointsInput = (props) =>{

    const [ xsState, setXsState ] = useState(null)
    const [ fxsState, setFxsState ] = useState(null)
    const [ interpol_xState, setInterpol_xState ] = useState(null)
    const [ answer, setAnswer ] = useState(null)
    const [ plotData, setPlotData ] = useState(null)

    const pointinput = (label,setHelperText,state) => {
        const _label = label.toString()
        return(
            <TextField
                id={_label}
                autoComplete='off'
                required
                multiline
                size='small'
                minRows={1}
                error={(state !== 'OK' && state != null)? true:false}
                variant="outlined"
                label={_label}
                onChange={() => setHelperText(null)}
                focused={(state === 'OK')}
                color={(state === 'OK')? 'success':null}
                helperText={(state == null)? ('ระบุตำแหน่งของ '.concat(_label,' กด Enter เพื่อแบ่งข้อมูล')):(state)}
            />
        )
    } 
    
    const handleinput = (event) =>{
        event.preventDefault()

        let checkX = false
        let checkY = false 
        let checkInputX = false

        let x = document.getElementById("x").value
        let y = document.getElementById("y").value
        
        x = x.split(`\n`).map(xx => Number(xx))
        y = y.split(`\n`).map(yy => Number(yy))
    
        if(x.length === 1 || y.length === 1) {
            setXsState('กรุณากรอกข้อมูลไม่ต่ำกว่า 2 ค่า')
            setXsState('กรุณากรอกข้อมูลไม่ต่ำกว่า 2 ค่า')
        }
        else if(x.length !== y.length){
            setXsState('กรุณากรอกข้อมูลให้ x และ y เท่ากัน')
            setFxsState('กรุณากรอกข้อมูลให้ x และ y เท่ากัน')
        }
        else{
            if(x.every(xx => typeof xx === 'number') == false){
                setXsState('กรุณากรอกข้อมูลตัวเลข')
            }
            else{ 
                setXsState('OK')
                checkX = true
            }

            if(y.every(yy => typeof yy === 'number') == false){
                setFxsState('กรุณากรอกข้อมูลตัวเลข')
            }
            else{ 
                setFxsState('OK')
                checkY = true
            }
        }

        if(!checkX || !checkY) return

        const interpolated_x = Number(document.getElementById("interpolated_x").value)
        if( isNaN(interpolated_x) ) setInterpol_xState('กรุณากรอกข้อมูลตัวเลข')
        else if(!(interpolated_x >= x[0] && interpolated_x <= x[x.length-1]) && (props.child == null)){
            setInterpol_xState('กรุณากรอกข้อมูลให้อยู่ในขอบเขตของ x')
        }
        else{ 
            setInterpol_xState('OK')
            checkInputX = true
        }

        if(!checkInputX) return

        const Ans = props.function(interpolated_x,x,y)
        setAnswer(Ans.Answer)
        setPlotData(Ans.plotData)
    }

    return(
        <form onSubmit={handleinput}>
            <div className="inputblock addbottompadding">
                {pointinput('x',(text) => setXsState(text), xsState)}
                {pointinput('y',(text) => setFxsState(text), fxsState)}
            </div>
            <div className="inputblock">
                <p>** อย่างน้อย 2 จุด **</p>
            </div>
            <Divider />
            <div className="inputblock">
                <TextField
                    required
                    error={interpol_xState !== null && interpol_xState != 'OK'}
                    id='interpolated_x'
                    style={{width:'300px',}} 
                    label="กำหนดจุด x ที่จะใช้ประมาณค่า" 
                    size='small'
                    autoComplete="off"
                    variant="outlined"
                    onChange={() => setInterpol_xState(null)}
                    color={(interpol_xState === 'OK')? 'success':null}
                    helperText={interpol_xState}
                />
            </div>
            {
                (props.addon != null) &&(
                    <div className="addbottompadding">
                        {props.addon}
                    </div>
                )
            }
            <Divider />
            <VisualizeAnswer Answer={answer} plotData={plotData} child={props.child}/>
            <div className="inputblock">
                <CalculateButton />
            </div>
        </form>
    )
}

export default PointsInput