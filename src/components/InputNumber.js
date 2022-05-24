import './InputStyle.css'
import { TextField } from "@mui/material"
import React from 'react';

const InputNumber = (props) =>{

    return(
            <TextField
                placeholder={props.text}
                onChange={(e) => { 
                        props.onChange(e.target.value)
                    }
                }
                variant='outlined'

            />
    )

}

export default InputNumber