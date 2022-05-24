import React, {useState} from 'react'
import CalculateButton from './CalculateButton'
import FormulaInput from './FormulaInput'
import { compile } from 'mathjs'
import { funct } from './CalculateFunctions'
import { Divider,TextField } from '@mui/material'
import VisualizeAnswer from './VisualizeAnswer'

const TypeOne = (props) =>{

    const [ EQState, setEQState ] = useState(null)
    const [ valueState, setValueState ] = useState(null)
    const [ answer, setAnswer ] = useState(null)
    const [ plotData, setPlotData ] = useState(null)

    const initialinput = (setHelperText,state) => {
        return(
            <TextField
                id="initvalue"
                autoComplete='off'
                required
                error={(state != 'OK' && state != null)? true:false}
                variant="outlined"
                label={"ระบุตำแหน่ง x เริ่มต้น"}
                onChange={() => setHelperText(null)}
                focused={(state === 'OK')}
                color={(state === 'OK')? 'success':null}
                helperText={state}
            />
        )
    } 

    const handleinput = (event) =>{
        event.preventDefault()

        let checkInitValue = false

        let val = Number(document.getElementById("initvalue").value)
        let Eq = document.getElementById('EQ').value

        try{
            Eq = compile(Eq)
        }
        catch(err){
            setEQState(err.message)
            return
        }

        setEQState('OK')

        //check input type
        if(typeof val != 'number'){ 
            setValueState('กรุณากรอกข้อมูลตัวเลข')
            return
        }
        else{
            try{
                funct(Eq,val)
            }
            catch(err){
                setEQState(err.message)
                return
            }
        }

        if(funct(Eq,val) === Infinity || funct(Eq,val) === (-Infinity)){
            setEQState('กรุณาระบุฟังก์ชั่นให้ถูกต้อง')
            return
        }

        setValueState('OK')
        
        if(!checkInitValue) return

        let Ans

        // if(props.error != undefined){
        //     //for Root finding
        //     Ans = props.function(Eq,Xl,Xr,props.error)
        // }
        // else{
        //     // for Diff and Integration
        //     Ans = props.function(Eq,Xl,Xr)

        // }
        
        // setAnswer(Ans.Answer)
        // setPlotData(Ans.plotData)
    }

    return(
        <form onSubmit={handleinput}>
            <div className="inputblock addbottompadding">
                <FormulaInput 
                    setHelperText={() => setEQState(null)}
                    state={EQState}
                />
            </div>
            <Divider />
                <div className="inputblock">
                    {initialinput((text)=>setValueState(text),valueState)}
                </div>
            {
                (props.addon != null) &&(
                    <div className="inputblock">
                        {props.addon}
                    </div>
                )
            }
            <Divider />
            <div className="inputblock">
                <CalculateButton />
            </div>
            <VisualizeAnswer Answer={answer} plotData={plotData} child={props.child} />
        </form>
    )

}

export default TypeOne