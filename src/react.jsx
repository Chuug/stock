import React, { useState, useEffect, Fragment, useReducer } from 'react';
import { render } from 'react-dom';

const stock = {
   '27034019': {barcode: '27034019', name: 'Cappuccino Classico', price: 0.99},
   '4047247041768': {barcode: '4047247041768', name: 'Piles AAA', price: 2.99},
   '3253561306976': {barcode: '3253561306976', name: 'Mètre', price: 5.99},
   '6054325441': {barcode: '6054325441', name: 'Lecteur Belfius', price: 9.99},
   '5099206080270': {barcode: '5099206080270', name: 'Souris Logitech G502', price: 49.99},
   '2118LZM6UYB9': {barcode: '2118LZM6UYB9', name: 'Ta mère', price: 0.01},
   '5410228121169': {barcode: '5410228121169', name: 'Jupiler 50 cl', price: 1.50},
   '5410228269779': {barcode: '5410228269779', name: 'Jupiler 33 cl', price: 1.00}
}

render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('app'))

function App() {
   return (
      <Fragment>
         <Order />
      </Fragment>
   )
}

function Order() {

   const [order, setOrder] = useState([])
   const [total, setTotal] = useState(0)
   const [target, setTarget] = useState({})
   const input = useKeyboard()

   useEffect(() => {
      let newTotal = 0
      order.forEach((item) => {
         newTotal += item.price * item.quantity
      })
      setTotal(parseFloat(newTotal))
   },[order])

   // handle input
   useEffect(() => {
      if(input) {
         switch(input.type) {
            case 'Scan':
               handleScan(input.input)
               break
            case 'Delete':
               removeItem(null, target.barcode)
               break
            case 'ArrowUp':
               switchItem(input.type)
               break
            case 'ArrowDown':
               switchItem(input.type)
               break
         }
      }      
   },[input])

   useEffect(() => {
      console.log(target);
   },[target])

   const handleScan = (barcode) => {
      let item = order.filter(item => item.barcode == barcode)[0]
      if(item) { // increment item quantity
         updateItemQuantity(item, (item.quantity + 1))
         setTarget(item)
      } else { // new item
         item = stock[barcode]
         if(item) {
            item.quantity = 1;
            setOrder([...order, item])  
            setTarget(item)
         } else {
            console.log("Item not found");
         }
      }
   }

   const switchItem = (direction) => {
      let pos = getItemPosition(target.barcode)
      if(direction === 'ArrowDown' && pos < order.length - 1) {
         setTarget(order[pos + 1])
      }
      if(direction === 'ArrowUp' && pos > 0) {
         setTarget(order[pos - 1])         
      }
   }

   const getItemPosition = (barcode) => {
      order.forEach((item,index) => {
         if(item.barcode == barcode)
            pos = index
      })   
      return pos 
   }

   const updateItemQuantity = (item, quantity) => {
      item.quantity = quantity
      let newOrder = order.filter(i => { return (i.barcode == item.barcode) ? item : i})
      setOrder(newOrder)
   }

   const removeItem = (e,barcode) => {
      if(e)
         e.stopPropagation()
      const newOrder = order.filter(item => item.barcode !== barcode)
      setOrder(newOrder)
      setTarget((newOrder[0]) ? newOrder[0] : {})
   }

   const handleCalculator = (quantity) => {
      updateItemQuantity(target, quantity)
   }

   return (
         <div className="row">
            <div className="col-4">
               <div className="card">
                  <div className="card-body">
                     <Title />
                     { order.length > 0 && <ListOrder order={ order } total={ total } removeItem={ removeItem } target={ target } setTarget={ setTarget }/> }
                  </div>
               </div>
            </div>
            <div className="col-2">
               <Calculator target={ target } handleCalculator={ handleCalculator } input={ input } />
            </div>

         </div>
   )
}
      
function Title() {
   return (
         <h1 className='text-center'>Commande</h1>    
   )
}

function useKeyboard() {
   const [input, setInput] = useState(null)
   const [mem, setMem] = useState('')
   const [type, setType] = useState('Scan')

   useEffect(() => {
      window.onkeydown = (e) => {
         let newInput
         if(e.key == 'Shift' && !mem) {
            setType('Scan')
         } else if(e.location === 3) {
            setInput({
               input: e.key,
               type: 'numpad'
            })
         } else if(e.key === 'Backspace' || e.key === 'Delete' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            setInput({
               input: e.key,
               type: e.key
            })
         }

         // Setting scan string
         if(type === 'Scan') {
            if(e.key.match(/^[A-Z0-9]+$/) && e.location === 0) {   
               newInput = mem + '' + e.key  
               setMem(newInput)
            } else if(e.key == 'Enter') {
               setInput({
                  input: mem,
                  type: type
               })
               setMem('')
            }
         }
      } 
   })
   return input
}

function ListOrder({order, total, removeItem, target, setTarget}) {

   return (
      <Fragment>
         <div className="row mb-2">
            <div className="col-5 text-center fw-bold">Article</div>
            <div className="col-3 text-center fw-bold">Quantité</div>
            <div className="col-3 text-center fw-bold">Prix unité</div>
         </div>
         { order.map((item, key) => (
         <div className={'card mb-2 ' + ((target.barcode == item.barcode) ? 'bg-dark text-light' : '')} key={key} onClick={ () => setTarget(item) }>
            <div className="card-body">
               <div className="row">
                  <div className="col-5 my-auto">{ item.name }</div>
                  <div className="col-3 my-auto text-center">{ item.quantity }</div>
                  <div className="col-3 my-auto text-center font-monospace">{ niceFloat(item.price) }</div>
                  <div className="col-1 my-auto">
                     <i className="fas fa-trash text-danger pointer" onClick={ (e) => removeItem(e,item.barcode) }></i>
                  </div>
               </div>
            </div>
         </div>
         ))}
         <div className="card bg-light mt-3">
            <div className="card-body text-center fs-5">
               <span className="font-monospace">{ niceFloat(total) }</span> €
            </div>
         </div>
      </Fragment>
   )
}

function Calculator({target, handleCalculator, input}) {

   const [digits, setDigits] = useState(0)
   const [first, setFirst] = useState(true)

   useEffect(() => {
      setDigits(target.quantity)
   },[target.quantity])

   // handle numpad
   useEffect(() => {
      if(input && input.type == 'numpad') {
         handleDigits(input.input)
      } else if(input && input.type == 'Backspace') {
         handleDigits(null, 'Backspace')
      }
   },[input])

   // handle click button
   const handleButton = (e) => {
      handleDigits(e.target.innerHTML, e.target.id)
   }

   const handleDigits = (key = null, action = null) => {
      let newDigits
      if(action == 'calc-backspace' || action == 'Backspace') { // backspace
         let newN = Math.floor(digits / 10)
            if(newN < 10 && digits < 10) { // reset à 1
               newDigits = 1
               setFirst(true)
            } else { // retire le dernier chiffre
               newDigits = newN
            }
      } else if (action == 'calc-reset') { // reset à 1
         newDigits = 1
         setFirst(true)
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
   )
}

function setFloat(n) {
   return parseFloat((n).toFixed(2));
}

function niceFloat(n) {
   return (Math.round(n * 100) / 100).toFixed(2);
}