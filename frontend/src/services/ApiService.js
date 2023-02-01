export default class ApiService {
   static getAllArticles() {
      return fetch(`/api/get-all-articles`)
               .then(res => res.json())
               .catch(err => this.handleError(err))
   }

   static insertArticle(article) {
      return fetch('/api/insert-article', {
         method: 'POST',
         body: JSON.stringify(article),
         headers: { 'Content-Type' : 'application/json' }
      })
      .then(rep => rep.json())
      .catch(err => this.handleError(err))
   }

   static handleError(err) {
      console.error(err)
   }
}