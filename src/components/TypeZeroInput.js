import React, {useState} from 'react'
import CalculateButton from './CalculateButton'
import FormulaInput from './FormulaInput'
import { compile } from 'mathjs'
import { funct } from './CalculateFunctions'
import { Divider,TextField } from '@mui/material'
import VisualizeAnswer from './VisualizeAnswer'

const TypeZero = (props) =>{

    const [ EQState, setEQState ] = useState(null)
    const [ value1State, setValue1State ] = useState(null)
    const [ value2State, setValue2State ] = useState(null)
    const [ answer, setAnswer ] = useState(null)
    const [ plotData, setPlotData ] = useState(null)

    const boundaryinput = (label,setHelperText,state) => {
        const _label = label.toString()
        return(
            <TextField
                id={_label}
                autoComplete='off'
                required
                error={(state !== 'OK' && state != null)? true:false}
                variant="outlined"
                label={"ระบุตำแหน่งขอบ".concat(_label==='value1'? "ซ้าย":"ขวา")}
                onChange={() => setHelperText(null)}
                focused={(state === 'OK')}
                color={(state === 'OK')? 'success':null}
                helperText={state}
            />
        )
    } 

    const handleinput = (event) =>{
        event.preventDefault()

        let checkXl = false
        let checkXr = false 

        let Xl = Number(document.getElementById("value1").value)
        let Xr = Number(document.getElementById("value2").value)
        let Eq = document.getElementById('EQ').value

        try{
            Eq = compile(Eq)
        }
        catch(err){
            setEQState(<p>{err.message}</p>)
            return
        }

        setEQState('OK')

        //check input type
        if(typeof Xl != 'number') setValue1State('กรุณากรอกข้อมูลตัวเลข')
        if(typeof Xr != 'number') setValue2State('กรุณากรอกข้อมูลตัวเลข')

        if(typeof Xl != 'number' || typeof Xr != 'number') return

        //check if input can solve
        //sign must oppose
        let checkborderXl
        let checkborderXr

        try{
            checkborderXl = funct(Eq,Xl)
            checkborderXr = funct(Eq,Xr)
        }
        catch(err){
            setEQState(<p>{err.message}</p>)
            return
        }

        if(checkXl === (Infinity) || checkXl === (-Infinity)) setValue1State('ขอบเขตไม่ถูกต้อง')
        else if(checkXr === (Infinity) || checkXr === (-Infinity)) setValue2State('ขอบเขตไม่ถูกต้อง')
        else if(props.AllowZero){

            if((checkborderXl >= 0 && checkborderXr >= 0) || (checkborderXl < 0 && checkborderXr < 0) ){
                    setValue1State('ขอบเขตไม่ถูกต้อง')
                    setValue2State('ขอบเขตไม่ถูกต้อง')
            }
            else{
                checkXl = true
                checkXr = true
                setValue1State('OK')
                setValue2State('OK')
            }

        }
        else{

            checkXl = true
            checkXr = true
            setValue1State('OK')
            setValue2State('OK')

        }
        
        if(!checkXl || !checkXr) return

        let Ans

        if(props.error !== undefined){
            //for Root finding
            Ans = props.function(Eq,Xl,Xr,props.error)
        }
        else{
            // for Diff and Integration
            Ans = props.function(Eq,Xl,Xr)

        }
        
        setAnswer(Ans.Answer)
        setPlotData(Ans.plotData)
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
                    {boundaryinput('value1',(text)=>setValue1State(text),value1State)}
                    {boundaryinput('value2',(text)=>setValue2State(text),value2State)}
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

export default TypeZero