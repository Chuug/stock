import { useState, useEffect } from 'react'

const useKeyboard = () => {
   const [input, setInput] = useState(null)
   const [mem, setMem] = useState('')
   const [type, setType] = useState('Scan')

   useEffect(() => {
      window.onkeydown = (e) => {
         let newInput
         if(e.key === 'Shift' && !mem) {
            setType('Scan')
         } else if(e.location === 3) {
            setInput({
               input: e.key,
               type: 'numpad'
            })
         } else if(e.key === 'Delete' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            setInput({
               input: e.key,
               type: e.key
            })
         } else if (e.key === 'Backspace') {
            if(e.target.tagName !== 'INPUT') {
               setInput({
                  input: e.key,
                  type: e.key
               })               
            }
         }

         // Setting scan string
         if(type === 'Scan') {
            if(e.key.match(/^[A-Z0-9]+$/) && e.location === 0) {   
               newInput = mem + '' + e.key  
               setMem(newInput)
            } else if(e.key === 'Enter') {
               if(mem) {
                  setInput({
                     input: mem,
                     type: type
                  })
                  setMem('')
               } else {
                  setInput({
                     input: e.key,
                     type: e.key
                  })                   
               }

            }
         }
      } 
   })
   return input
}

export default useKeyboard