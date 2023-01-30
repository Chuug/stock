import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import EditArticle from "../components/page/Stock/EditArticle";
const Stock = () => {
   const input = useOutletContext();

   useEffect(() => {
      console.log(input);
   },[input])
   return (
      <>
         <EditArticle />
      </>
   )
}

export default Stock;