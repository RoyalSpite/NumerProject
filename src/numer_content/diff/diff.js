import React, { useState } from 'react'
import { true_error,funct } from '../../components/CalculateFunctions'
import { Select, MenuItem, FormControl,InputLabel,Checkbox,FormControlLabel } from '@mui/material'
import DiffInput from '../../components/DiffInput'
const { compile,derivative, pow, abs } = require('mathjs')

const normal_coeff = [
    [1,1],
    [1,2,1],
    [1,3,3,1],
    [1,4,6,4,1]
]

const extreme_coeff = [
    [-1,4,-3],
    [-1,4,-5,2],
    [-3,14,-24,18,-5],
    [-2,11,-24,26,-14,3]
]

const Diff = {
    normal:[
        (equation,x,h,order) =>{
            //forward diff
            let res = 0
            let min = -1
            for(let i=order;i>=0;i--){
                min *= -1
                res += min * (normal_coeff[order-1][i]) * funct(equation,(x+(i*h))) 
            }
            return res/pow(h,order)
        },
        (equation,x,h,order) =>{
            //backward diff
            let res = 0
            let min = -1
            for(let i=0;i>=(-order);i--){
                min *= -1
                res += min * (normal_coeff[order-1][abs(i)]) * funct(equation,(x+(i*h)))
            }
            return res/pow(h,order)
        },
        (equation,x,h,order) =>{
            //central diff
            let res = 0
            let min = -1
        
            const step = [[1,-1],[1,0,-1],[2,1,-1,-2],[2,1,0,-1,-2]]
        
            for(let i=0;i<=order;i++){
                min *= -1
                res += (min * normal_coeff[order-1][i] * funct(equation,(x+(step[order-1][i]*h))))
            }
        
            return res/(pow(2,(order%2))  *pow(h,order))
        }
    ],
    extreme:[
        (equation,x,h,order) =>{
            //forward diff
            let res = 0
            for(let i=order+1,j=0;i>=0;i--,j++){
                res += (extreme_coeff[order-1][j]) * funct(equation,(x+(i*h)))
            }
            return res/(pow(2,(order%2)) * pow(h,order))
        },
        (equation,x,h,order) =>{
            //barkward diff
            let res = 0
            for(let i=0,j=(order+1);i<=(order+1);i++,j--){
                res += (extreme_coeff[order-1][j]) * funct(equation,(x-(i*h)))
            }
            return res/(pow(2,(order%2)) * pow(h,order))
        },
        (equation,x,h,order) =>{
            //central diff
            let res = 0
            let min = 1
            const divideCoeff = [12,12,8,6]
        
            const coeff = [
                [1,8,8,1],
                [1,16,30,16,1],
                [1,8,13,13,8,1],
                [1,12,39,56,39,12,1]
            ]
        
            const step = [
                [2,1,-1,-2],
                [2,1,0,-1,-2],
                [3,2,1,-1,-2,-3],
                [3,2,1,0,-1,-2,-3]
            ]
        
            for(let i=0;i<=order+2;i++){
                min *= -1
                res += min * coeff[order-1][i] * funct(equation,(x+(step[order-1][i]*h)))
            }
        
            return res/(divideCoeff[order-1] * pow(h,order))
        }
    ]

}

const NumericalDiff = () =>{

    const [ order, setOrder ] = useState(1)
    const [ method, setMethod ] = useState(0)
    const [ mode, setMode ] = useState(false)
    
    const feature_select = () =>(
        <div>
            <div className='inputblock margin-item'>
                    <FormControl>
                        <InputLabel>เลือกวิธีการหาอนุพันธ์</InputLabel>
                        <Select
                            label="เลือกวิธีการหาอนุพันธ์"
                            defaultValue={0}
                            onChange={(e) => setMethod(e.target.value)}
                            size='small'
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value={0}>Forward</MenuItem>
                            <MenuItem value={1}>Backward</MenuItem>
                            <MenuItem value={2}>Central</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel>เลือกลำดับอนุพันธ์</InputLabel>
                        <Select
                            label="เลือกลำดับอนุพันธ์"
                            defaultValue={1}
                            onChange={(e) => setOrder(Number(e.target.value))}
                            size='small'
                            sx={{ minWidth: 160 }}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                        </Select>
                    </FormControl>
            </div>
            <div>
                <FormControlLabel
                    label="ความแม่นยำสูง"
                    control={
                        <Checkbox
                            onChange={(e) =>{ setMode(e.target.checked)}}
                        />
                    }
                />
            </div>
            
        </div>
    )
    
    const conditional_diff = (equation,x_init,interval) =>{
        const extreme_check = (mode===true)? 'extreme':'normal'
        return Diff[extreme_check][method](equation,x_init,interval,order)
    }

    return(
        <>
            <DiffInput 
                addon={feature_select()}
                function={(equation,x_init,interval) =>{ 
                    const eq = compile(equation)
                    const answer = conditional_diff(eq,x_init,interval)
                    const derivative_ = derivative(equation,'x').evaluate({x:x_init}) 
                    const error = true_error(derivative_,answer)
                    return(
                        <div>
                            <b>ผลลัพธ์ที่ได้ = {answer}</b>
                            <p>ความความเคลื่อน = {error} %</p>
                        </div>
                    )
                }}    
            />
        </>
        
    )

}

export default NumericalDiff