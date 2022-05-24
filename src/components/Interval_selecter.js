import React from 'react'
import { TextField } from '@mui/material'

const Interval_setter = (props) =>{
    
    const { isSimpson, setInterval } = props

    return(
        <TextField 
            label='กำหนดจำนวนช่วง'
            defaultValue={1}
            InputProps={{
                inputProps: { 
                    min: 1,
                    step: (isSimpson)? '2':'1'
                }
            }}
            onChange={(e) => {
                    if(Number(e.target.value) < 1) setInterval(1)
                    else setInterval(Number(e.target.value))
                }
            }
            variant='outlined'
            size='small'
            type='number'
        />
    )
}

export default Interval_setter