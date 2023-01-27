import { useState, useEffect } from "react"

const Calculator = ({target, handleCalculator, input}) => {

   const [digits, setDigits] = useState(0)
   const [first, setFirst] = useState(true)

   useEffect(() => {
      setDigits(target.quantity)
   },[target.quantity])

   // handle numpad
   useEffect(() => {
      if(input && input.type === 'numpad') {
         handleDigits(input.input)
      } else if(input && input.type === 'Backspace') {
         handleDigits(null, 'Backspace')
      }
   },[input])

   // handle click button
   const handleButton = (e) => {
      handleDigits(e.target.innerHTML, e.target.id)
   }

   const handleDigits = (key = null, action = null) => {
      let newDigits
      if(action === 'calc-backspace' || action === 'Backspace') { // backspace
         let newN = Math.floor(digits / 10)
            if(newN < 10 && digits < 10) { // reset à 1
               newDigits = 1
               setFirst(true)
            } else { // retire le dernier chiffre
               newDigits = newN
            }
      } else { // Ajoute un chiffre
         if(first && key > 0) { // remplace le premier chiffre
            newDigits = key
            setFirst(false)
         } else { // Ajoute le chiffre à la fin
            newDigits = digits + key
         }
      }
      handleCalculator(parseInt(newDigits.toString()))
   }

   if(target.barcode == null)
      return null

   return (
      <div className="col-12 mb-2">
         <div className="card">
            <div className="card-body py-2">
               <div className="row">
                  <div className="col bg-light mx-1 p-3 mb-2 rounded border border-3">
                     <div className="float-start fs-5 fw-bold font-monospace">{ digits }</div>
                     <div className="float-end">
                        <i className="fas fa-backspace fa-lg bg-dark text-white p-2 rounded shadow-sm pointer" id='calc-backspace' onClick={ (e) => handleButton(e) }></i>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>1</span>
                  </div>
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>2</span>
                  </div>
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>3</span>
                  </div>
               </div>
               <div className="row">
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>4</span>
                  </div>
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>5</span>
                  </div>
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>6</span>
                  </div>
               </div>
               <div className="row">
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>7</span>
                  </div>
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>8</span>
                  </div>
                  <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>9</span>
                  </div>
               </div>
               <div className="row">
                  {/* <div className="col-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" id='calc-reset' onClick={ (e) => handleButton(e) }>Reset</span>
                  </div> */}
                  <div className="col-4 offset-4 px-1">
                     <span className="bg-dark d-block text-center text-light p-2 h4 rounded shadow-sm pointer" onClick={ (e) => handleButton(e) }>0</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Calculator