import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AiOutlineRight } from 'react-icons/ai'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MenuList } from '@material-ui/core';
import { MenuItem } from '@mui/material';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AiOutlineRight color='white'/>}
    {...props}
  />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    width: '100%'
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '7px 0px',
    borderTop: '1px solid white',
    backgroundColor: 'black'
}));

const AppAccordion = (props) => {

  const [expanded, setExpanded] = React.useState(null);

  const { contents, openContent, closeDrawer } = props

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>{
      Object.keys(contents).map((topic) => {
          return(
            <Accordion 
              expanded={expanded === topic} 
              onChange={handleChange(topic)}
            >
              <AccordionSummary
                style={{backgroundColor: 'black', width:"100%"}}
                onClick={()=>{
                    if(contents[topic].length === 0){
                          openContent(topic)
                          closeDrawer()
                          setExpanded(null)
                    }
                  }}
              >
                <Typography 
                  style={{color: 'white'}}
                  
                >
                 {topic}
                </Typography>
                </AccordionSummary>
                  {
                    (contents[topic].length !== 0) && (<AccordionDetails>
                      <MenuList>
                        {
                          contents[topic].map(
                            content =>{
                              return(
                                <MenuItem
                                    style={{
                                      width: '100%',
                                      justifyContent: "flex-start",
                                      backgroundColor: 'black',
                                      color: 'cyan',
                                      padding: '5px 10px',
                                    }}
                                    onClick={() => {
                                      openContent(content)
                                      closeDrawer()
                                      setExpanded(null)
                                    }}
                                >
                                  {content}
                                </MenuItem>
                              )
                            })
                           
                        }
                      </MenuList>
                </AccordionDetails>)
              }
            </Accordion>
          )
      })
      //   topics.map(
      //       topic =>{
      //           return(
      //               <Accordion 
      //                 expanded={expanded === topic} 
      //                 onChange={handleChange(topic)}
      //               >
      //                   <AccordionSummary
      //                       style={{backgroundColor: 'black', width:"100%"}}
      //                   >
      //                       <Typography 
      //                         style={{color: 'white'}}
      //                         onClick={()=>{
      //                           if(contents[topic].length === 0){
      //                             openContent(topic)
      //                             closeDrawer()
      //                             setExpanded(null)
      //                           }
      //                         }}
      //                       >
      //                           {topic}
      //                       </Typography>
      //                   </AccordionSummary>
      //                   {
      //                     (contents[topic].length !== 0) && (<AccordionDetails>
      //                       <MenuList>
      //                       {
      //                           contents[topic].map(
      //                               content =>{
      //                                   return(
      //                                       <MenuItem
      //                                           style={{
      //                                               width: '100%',
      //                                               justifyContent: "flex-start",
      //                                               backgroundColor: 'black',
      //                                               color: 'cyan',
      //                                               padding: '5px 10px',
      //                                           }}
      //                                           onClick={() => {
      //                                             openContent(content)
      //                                             closeDrawer()
      //                                             setExpanded(null)
      //                                           }}
      //                                       >
      //                                           {content}
      //                                       </MenuItem>
      //                                   )
      //                               }
      //                           )
                                
      //                       }
      //                       </MenuList>
      //                   </AccordionDetails>)
      //                   }
      //               </Accordion>
      //           )
      //       }
      //   )
      // 
    }
    </div>
  );
}

export default AppAccordion;