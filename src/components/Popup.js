import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function Popup(props) {
  
    const { open, onClose, child } = props

    return(
        <Dialog 
            fullWidth
            maxWidth={false}
            style={{
                padding: '15px'
            }}
            onClose={()=>onClose()} 
            open={open}
        >
            <DialogTitle textAlign="center">Graph</DialogTitle>
                <DialogContent 
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                        margin: '0 auto'
                    }} 
                    dividers={true} 
                >
                    {child}
                </DialogContent>
        </Dialog>
    )
}


export default Popup