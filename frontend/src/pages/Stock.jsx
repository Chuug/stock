import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"
import EditArticle from "../components/page/Stock/EditArticle";
import ListArticles from "../components/page/Stock/ListArticles";
const Stock = () => {
   const input = useOutletContext();
   const [newArticle, setNewArticle] = useState(false);

   useEffect(() => {
      console.log(input);
   },[input])

   useEffect(() => {
      if(newArticle)
         setNewArticle(false)
   }, [newArticle])
   return (
      <>
         <div className="row">
            <EditArticle setNewArticle={ setNewArticle } />
            <ListArticles newArticle={ newArticle } />
         </div>

      </>
   )
}

export default Stock;