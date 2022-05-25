import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Bisection from './numer_content/root_of_equations/Bisection';
import FalsePosition from './numer_content/root_of_equations/FalsePosition';
import Cramers from './numer_content/linear_algebra/Cramers_Rule';
import GaussianElimination from './numer_content/linear_algebra/Gaussian';
import GaussJordan from './numer_content/linear_algebra/GaussJordan';
import LU from './numer_content/linear_algebra/LU_Decomposition';
import Cholesky from './numer_content/linear_algebra/Cholesky_Decomposition';
import Jacobi from './numer_content/linear_algebra/Jacobi';
import GaussSeidel from './numer_content/linear_algebra/GaussSeidel';
import ConjugateGradient from './numer_content/linear_algebra/Conjugate_Gradient';
import Newtoninterpol from './numer_content/interpolation/Newton_Interpolation';
import { Drawer } from '@mui/material'
import { AiOutlineMenu } from 'react-icons/ai'
import AppAccordion from './components/AppAccordion'
import LagrangeInterpol from './numer_content/interpolation/Lagrange_Interpolation';
import SplineInterpol from './numer_content/interpolation/Spline';
import LSR from './numer_content/l-s-r/Least_Square_Regression';
import SimpsonsIntegrate from './numer_content/integration/Simpson_OneThird_Integration';
import TrapezoidalIntegrate from './numer_content/integration/Trapezoidal_Integration';
import NumericalDiff from './numer_content/diff/diff';

function App(){

  const contents = {
    "Root of Equation" : [
      "Bisection","False Position",
      "One-Point Iteration","Newton-Raphson","Secant"
    ]
    ,
    "Linear Algebra" : [
      "Cramer's Rule","Gauss Elimination","Guass-Jordan","LU Decomposition","Cholesky Decomposition"
      ,"Jacobi","Guass-Seidel","Conjugate Gradient"
    ],
    "Interpolation" : [
      "Newton Interpolation","Lagrange Interpolation","Spline Interpolation"
    ],
    "Least Square Regression" : [],
    "Differentation" : [],
    "Numerical Integration" : [
      "Trapezoidal Rule","Simpson Rule"
    ]
  }

  const EPSILON = 0.0001
  const [title,setTitle] = useState(null)
  const [ drawer, toggleDrawer ] = useState(false)

  const conditional_render = (title) =>{
    switch (title){
        case "Bisection":
            return <Bisection error={EPSILON}/>
        case "False Position":
            return <FalsePosition error={EPSILON}/>
     /*   case "One-Point Iteration":
            //return <OnePoint error={EPSILON}/>
        case "Newton-Raphson":
            //return <NewtonRaphson error={EPSILON}/>
        case "Secant":
            //return <Secant error={EPSILON}/>
     */ case "Cramer's Rule":
            return <Cramers />
        case "Gauss Elimination":
            return <GaussianElimination />
        case "Guass-Jordan":
            return <GaussJordan />
        case "LU Decomposition":
            return <LU />
        case "Cholesky Decomposition":
            return <Cholesky />
        case "Jacobi":
            return <Jacobi error={EPSILON} />
        case "Guass-Seidel":
            return <GaussSeidel error={EPSILON} />
        case "Conjugate Gradient":
            return <ConjugateGradient error={EPSILON} />
        case "Newton Interpolation":
            return <Newtoninterpol />
        case "Lagrange Interpolation":
            return <LagrangeInterpol />
        case "Spline Interpolation":
            return <SplineInterpol />
        case "Least Square Regression":
            return <LSR />
        case "Differentation":
            return <NumericalDiff />
        case "Trapezoidal Rule":
            return <TrapezoidalIntegrate />
        case "Simpson Rule":
            return <SimpsonsIntegrate />
        default:
          return null

    }
  }

  return (
    
    <div className="App">
      <Drawer
          anchor='left'
          open={drawer}
          onClose={() => toggleDrawer(false)}
      >
        <div className='AccordionPanel'>
          <AiOutlineMenu color='cyan' size={35} onClick={() => toggleDrawer(false)}/>
          <AppAccordion
            contents={contents} 
            openContent={(open)=>setTitle(open)}
            closeDrawer={() => toggleDrawer(false)}
          />
        </div>
      </Drawer>

      <div className="contentPanel">
          <div className='Header'>
            <div className='openDrawerButton'>
              <AiOutlineMenu 
                color='white' 
                size={30} 
                onClick={() => toggleDrawer(true)}/>
            </div>
            <h1>{title}</h1>
          </div>
          <div className='content'>
            {
              (title != null)? (  
                <div className='contentBox'>
                  {
                    conditional_render(title)
                  }
                </div>
              ):
              (  
                <div>
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1>Welcome to my Numerical Method calculator</h1>
                </div>
              )

            }
          </div>
        </div>
    </div>
  );
}

export default App;
