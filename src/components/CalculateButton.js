import React from 'react'
import './InputStyle.css'
import { Button } from '@mui/material'

function CalculateButton(){
    return(
        <Button 
        style={{
            fontSize: '15px',
            padding: '6px',
            backgroundColor: 'cyan',
            color: 'black',
            border: '1px solid black',
        }}
        variant="contained"
        type='submit'
    >
        calculate
    </Button>
    )

}
export default CalculateButton