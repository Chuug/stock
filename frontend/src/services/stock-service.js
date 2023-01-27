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
      return fetch(`http://localhost:3001/items/${ item.id }`, {
         method: 'PUT',
         body: JSON.stringify({
            id: item.id,
            barcode: item.barcode,
            name: item.name,
            price: item.price,
            stock: item.stock
         }),
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

   static getSales(sort, order) {
      return fetch(`http://localhost:3001/sales?_sort=${ sort }&_order=${ order }&_limit=5`)
               .then(rep => rep.json())
               .catch(err => this.handleError(err))
   }

   static addSale(sale) {
      return fetch(`http://localhost:3001/sales`, {
         method: 'POST',
         body: JSON.stringify(sale),
         headers: { 'Content-Type' : 'application/json' }
      })
      .then(rep => rep.json())
      .catch(err => this.handleError(err))
   }



   static handleError(err) {
      console.log(err);
   }
}