import { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";


const EditArticle = ({ setNewArticle }) => {

   const [name, setName] = useState();
   const [price, setPrice] = useState();


   const [form, setForm] = useState({
      barcode: '',
      name: '',
      price: '',
      stock: ''
   })

   const handleChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      ApiService.insertArticle(form).then(setNewArticle(true));
      console.log(form);
   }




   return (
      <>
         <div className="col-6">
            <form onSubmit={ e => handleSubmit(e) }>
               <input type="text" className="form-control" value={ form.barcode } name="barcode" placeholder="Code barre" onChange={ e => handleChange(e) } />
               <input type="text" className="form-control" value={ form.name } name="name" placeholder="Nom" onChange={ e => handleChange(e) }/>
               <input type="number" className="form-control" value={ form.price } name="price" placeholder="Prix" onChange={ e => handleChange(e) } />
               <input type="number" className="form-control" value={ form.stock } name="stock" placeholder="Stock" onChange={ e => handleChange(e) } />
               <input type="submit" value="Ajouter" className="btn btn-primary" />
            </form>

         </div>
      </>
   )
}

export default EditArticle;