/* --------------------------------- non utilisé --------------------------------- */

import { useEffect, useState } from "react"

const useScreen = (order) => {
   const [lastSalesStyle, setLastSalesStyle] = useState({})
   const [clientHeight, setClientHeight] = useState(document.documentElement.clientHeight)

   useEffect(() => {
      if(order) {
         setLastSalesStyle({
            maxHeight: getMaxHeight('lastSalesStyle'),
            overflow: "auto"
         }) 
      }  

   }, [order])

   const getMaxHeight = (id) => {
      let el = document.getElementById(id)
      let bounding = el.getBoundingClientRect()
      let space = clientHeight - bounding.bottom 
      let maxh = (space < 0) ? (bounding.height + space) - 15 : null
      return maxh
   }

   return lastSalesStyle
}

export default useScreen