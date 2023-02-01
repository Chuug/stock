import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";

const ListArticles = ({ newArticle }) => {
   const [articles, setArticles] = useState();

   useEffect(() => {

      console.log(newArticle);
      if(newArticle || !articles) {
         console.log("update");
         console.log(articles);
         ApiService.getAllArticles().then(articles => setArticles(articles));
      }
      
   },[newArticle])


   if(!articles)
      return false;

   return (
      <>
         <div className="col-6">
            <table>
               <thead>
                  <tr>
                     <th>Nom</th>
                     <th>Prix</th>
                  </tr>
               </thead>
               <tbody>
               { articles.map((article, key) => (
                  <tr key={ key }>
                     <td>{ article.name }</td>
                     <td>{ article.price }</td>
                  </tr>
               ))}
               </tbody>
            </table>

         </div>
      </>
   )  
}

export default ListArticles;