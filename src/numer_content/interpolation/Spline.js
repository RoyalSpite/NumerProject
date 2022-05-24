import React, { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import PointsInput from "./PointsInput"
import { Linear_Spline } from './Linear_Spline'
import { Quadratic_Spline } from "./Quadratic_Spline";
import { Cubic_Spline } from "./Cubic_Spline";

const modes = ["Linear","Quadratic","Cubic"]

const SplineInterpol = () =>{

    const [ SplineMode, setSplineMode ] = useState(modes[0])

    const conditional_function = (mode) =>{
        switch(mode){
            case "Linear" :
                return ((interpol_x,arrX,arrY) => Linear_Spline(interpol_x,arrX,arrY))

            case "Quadratic":
                return ((interpol_x,arrX,arrY) => Quadratic_Spline(interpol_x,arrX,arrY))
                
            case "Cubic":
                return ((interpol_x,arrX,arrY) => Cubic_Spline(interpol_x,arrX,arrY))
            default:
                return null
        }
    }

    const Spline_mode_select = () =>{
        return(
            <FormControl>
                <InputLabel>เลือกโหมด</InputLabel>
                <Select
                    defaultValue={modes[0]}
                    label="เลือกโหมด"
                    size='small'
                    onChange={
                        (e) => setSplineMode(e.target.value)
                    }
                >{
                    modes.map(
                        mode => <MenuItem value={mode}>{mode}</MenuItem>
                    )
                }       
                </Select>
            </FormControl>
            
        )
    }

    return(
        <div>
            <PointsInput 
                function={conditional_function(SplineMode)} 
                addon={Spline_mode_select()}
                child={'Graph'}
            />
        </div>
    )
}

export default SplineInterpol