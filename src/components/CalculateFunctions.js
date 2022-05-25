import { abs } from "mathjs";

export const funct = (eq,xv) => eq.evaluate({ x:xv })

export const print = () => console.log("Hello world")

export const errorCalculate = (x1,x2) => abs( (x1-x2)/x1  )

export const true_error = (x1,x2) => errorCalculate(x1,x2)*100

export const drawEquationLine = (equation,LeftBound,RightBound) =>{

    const EquationLineInfo = {
        x: [],
        y: [],
        mode: 'lines',
        hoverinfo: 'skip',
        line: { color: 'black', }
    }

    const xStep = (RightBound-LeftBound)/50
    let xLine = LeftBound - (xStep*2)

    for(let i=-2;i<=52;i++){
        EquationLineInfo.x.push(xLine)
        EquationLineInfo.y.push(funct(equation,xLine))
        xLine += xStep
    }

    return EquationLineInfo
}
/*

    const getAPI = x => fetch('http://api.mathjs.org/v4/?expr='+equation.replaceAll('x',x.toString()))
        .then((response) => response.json())
        .then((data) => { 
        return data
    })

    const CalFromAPI = (x) =>{
        getAPI(x).then(
            (a) => {
                setAnsFromAPI(a)
            }
        )
    }

*/