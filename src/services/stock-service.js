export default class StockService {
   static getStock() {
      return fetch(`http://localhost:3001/items`)
               .then(rep => rep.json())
               .catch(err => this.handleError(err))
   }

   static getItemById(id) {
      return fetch(`http://localhost:3001/items/${id}`)
               .then(rep => rep.json())
               .catch(err => this.handleError(err))
   }

   static getItem(barcode) {
      return fetch(`http://localhost:3001/items?barcode=${ barcode }`)
               .then(rep => rep.json())
               .catch(err => this.handleError(err))
   }

   static updateItemStock(item) {
      return fetch(`http://localhost:3001/items/${item.id}`, {
         method: 'PUT',
         body: JSON.stringify(item),
         headers: { 'Content-Type' : 'application/json' }
      })
      .then(rep => rep.json())
      .catch(err => this.handleError(err))
   }

   static searchItems(string) {
      return fetch(`http://localhost:3001/items?q=${ string }`)
               .then(rep => rep.json())
               .catch(err => this.handleError(err))
   }



   static handleError(err) {
      console.log(err);
   }
}