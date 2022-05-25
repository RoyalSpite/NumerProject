import React from 'react'
import { TextField } from '@mui/material'

const FormulaInput = (props) => (
    <TextField
        id="EQ"
        autoComplete='off'
        required
        error={(props.state !== 'OK' && props.state != null)? true:false}
        variant="outlined"
        label={'กรุณากรอกสมการ'}
        onChange={() => props.setHelperText(null)}
        focused={(props.state === 'OK')}
        color={(props.state === 'OK')? 'success':null}
        helperText={(props.state == null)? null:(props.state)}
    />
)

export default FormulaInput