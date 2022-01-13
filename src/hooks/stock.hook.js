import React, { useEffect, useState } from 'react'

const useStock = () => {
   const [stock, setStock] = useState('hello fdp')

   useEffect(() => {
      async function getStock() {
         const response = await fetch("http://localhost:3001/items")
         let json = await response.json()
         return json
      }

      //getStock().then(items => setStock(items))
   })

   return stock
}

export default useStock