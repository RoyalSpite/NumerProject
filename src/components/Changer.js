import React, { useState } from "react";
import { Button } from '@mui/material'
import { AiOutlineDoubleLeft,AiOutlineDoubleRight } from "react-icons/ai";

const Changer = (props) =>{

    const { child } = props
    const [ index, setIndex ] = useState(0)

    const changeButton = (sign,changefunction) =>{
        return(
            <Button
                style={{
                    height:'100%',
                    width:'fit-content'
                }}
                onClick={() =>  changefunction()}
            >
                {sign}
            </Button>
        )
    }

    return(
        <div style={{
            display:"flex",
            width:'100%',
            height: '100%',
        }}>
            <changeButton sign={<AiOutlineDoubleLeft/>} />
            {child}
            <changeButton sign={<AiOutlineDoubleRight/>} />
        </div>
    )

}

export default Changer