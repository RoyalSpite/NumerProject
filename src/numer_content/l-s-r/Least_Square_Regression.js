import React, { useState } from "react";
import PointsInput from "../interpolation/PointsInput";
import { TextField, FormControlLabel, Checkbox } from "@mui/material";
import { Regression } from "./Regression";

const LSR = () =>{

    const [ degree, setDegree ] = useState(1)
    const [ multiple, setMultipleOn ] = useState(false)

    const degree_selector = () =>{
        return(
            <TextField 
                label='กำหนดดีกรี'
                defaultValue={1}
                disabled={multiple}
                InputProps={{
                    inputProps: { 
                        min: 1 
                    }
                }}
                onChange={(e) => setDegree(Number(e.target.value))}
                variant='outlined'
                size='small'
                type='number'
            />
        )
    }

    return(
        <div>
            <PointsInput
                function={(interpolated_x,x,y) => Regression(x,y,degree,interpolated_x) } 
                addon={
                    (
                        <div>
                            <div>{degree_selector()}</div>
                            <div>
                                <FormControlLabel
                                    label="ถดถอยเชิงเส้นหลายตัวแปร"
                                    control={
                                        <Checkbox
                                            onChange={(e) =>{ setMultipleOn(e.target.checked)}}
                                        />
                                    }
                                />  
                            </div>
                        </div>
                    )
                }
                child={'Graph'}
                regrssion={true}
            />
        </div>
    )

}

export default LSR