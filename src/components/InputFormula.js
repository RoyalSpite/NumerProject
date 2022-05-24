import './InputStyle.css'
import React,{ useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill'
import { Table,TextField, Button, TableRow } from "@material-ui/core"

addStyles()

const InputFormula = (props) =>{

    return(
        <TextField
            id="EQ"
            label="กรอกสมการที่นี่"
            variant="outlined"
            style={{width: '300px'}}
            onChange={() => props.onChange(null)}
        
        />
    )


}

export default InputFormula