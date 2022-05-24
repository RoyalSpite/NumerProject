import React, { useState } from "react";
import CalculateButton from './CalculateButton'
import FormulaInput from './FormulaInput'
import { Divider,TextField } from '@mui/material'
import { compile } from "mathjs";

const DiffInput = (props) =>{

    const [ EQState, setEQState ] = useState(null)
    const [ answer, setAnswer ] = useState(null)

    const handleinput = (event) =>{
        event.preventDefault()

        let X_init = Number(document.getElementById("initial").value)
        let interval = Number(document.getElementById("interval").value)
        let Eq = document.getElementById('EQ').value

        try{
            let Eq_ = compile(Eq)
        }
        catch(err){
            setEQState(<p>{err.message}</p>)
            return
        }

        setEQState('OK')
        console.log(typeof Eq)
        setAnswer(props.function(Eq,X_init,interval))
    }

    const input = (label) => {
        const _label = (label=="interval")? "กำหนดขนาดช่วง":"กำหนดจุดเริ่มต้น" 
        const _id = (label=="interval")? "interval":"initial"
        return(
            <TextField
                id={_id}
                autoComplete='off'
                required
                variant="outlined"
                label={_label}
            />
        )
    }

    return(
        <div>
            <form onSubmit={handleinput}>
                <div className="inputblock addbottompadding">
                    <FormulaInput 
                        setHelperText={() => setEQState(null)}
                        state={EQState}
                    />
                </div>
                <Divider />
                    <div className="inputblock">
                        {input('initial')}
                        {input('interval')}
                    </div>
                <Divider />
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
                <div>
                    {answer}
                </div>
            </form>
        </div>
    )

}

export default DiffInput