import React, {useState} from 'react'
import {FormControl,InputLabel,MenuItem,Select,TextField,Table,TableRow,TableCell} from "@mui/material"
import VisualizeAnswer from '../../components/VisualizeAnswer'
import './MatrixStyle.css'
import CalculateButton from '../../components/CalculateButton'

const ElementInput = (Input_Name) =>
    <TextField
        id={ Input_Name }
        width='30px'
        label={ Input_Name }
        type="text"
        size='small'
        InputLabelProps={{ shrink: true,}}
        variant="filled"
        placeholder='0'
        autoComplete='off'
        name={ Input_Name }
    />  


const MatrixInput = (props) =>{

    let matrix, vector
    const Size = [2,3,4]
    const [ size, setSize] = useState(3)
    const [ Answer, setAnswer ] = useState(null)
    const [ MathData, setMath ] = useState(null)

    const render_matrix = (size) =>{

        matrix = Array(size).fill(Array(size).fill(0))

        const variable = (size === 4)? "w":"x"

        return(
            <table>
                {matrix.map((row, indexRow = 1) => {
                    return (
                    <tr key={indexRow} >
                        {row.map((item, indexColumn = 1) => {
                            const Input_Name = String.fromCharCode(variable.charCodeAt(0)+indexColumn).concat((indexRow+1).toString())
                            return  <td>{ElementInput(Input_Name)}</td>
                            
                        })}
                    </tr>
                    )
                })}
            </table>
            
        )
        
    }

    const render_vector = (size) =>{

        vector = Array(size).fill(0)
        
        return(           
            <table>
                {
                    vector.map((row, indexRow = 1) => {
                        const Input_Name = "B".concat((indexRow+1).toString())
                        return (
                            <tr>
                                <td>{ElementInput(Input_Name)}</td>   
                            </tr>
                            )
                        }
                    )
                }
            </table>
        )
    }

    const handleSubmit = event => {
        event.preventDefault();

        const variable = (size === 4)? "w":"x"

        matrix = []

        for(let i=0;i<size;i++){
            matrix.push([])
            for(let j=0;j<size;j++){
                const index = String.fromCharCode(variable.charCodeAt(0)+j).concat((i+1).toString())
                matrix[i].push(Number(document.getElementById(index).value))
            }
        }
        
        vector = []
        for(let i=0;i<size;i++){
            const index = "B".concat((i+1).toString())
            vector.push(Number(document.getElementById(index).value))
        }
        
        console.log(matrix)

        console.log(vector)
        const data = props.function(matrix,vector)
        
        setAnswer(data.Answer)

        setMath(data.math)
        
        //setAnswerMatrix(matrix);
    }
    

    return(
        <div>
            <Table>
                <TableRow>
                    <TableCell align='center' colSpan={2}>
                        <FormControl className='Matrix'>
                            <InputLabel>กำหนดขนาดเมทริกซ์</InputLabel>
                            <Select
                                size='small'
                                defaultValue={Size[1]}
                                label="กำหนดขนาดเมทริกซ์"
                                onChange={ e =>  setSize(e.target.value)}
                            >
                            {
                                Size.map(
                                    size => <MenuItem value={size}>{size}</MenuItem>
                                )
                            }
                            </Select>
                        </FormControl>
                    </TableCell>
                </TableRow>
            </Table>
                <form onSubmit={handleSubmit}>
                    <Table>
                        <TableRow>
                            <TableCell align='center'> {render_matrix(size)} </TableCell>
                            <TableCell>{ render_vector(size) } </TableCell> 
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' colSpan={2}>
                                <VisualizeAnswer Answer={Answer} plotData={MathData} child={null}/>
                                <CalculateButton />
                            </TableCell>
                        </TableRow>
                    </Table>
                </form>
            
        </div>
    )
}

export default MatrixInput