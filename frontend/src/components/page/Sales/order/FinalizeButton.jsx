
const FinalizeButton = ({cashout, handleCashout}) => {
   return (
      <div className="btn btn-dark btn-lg mt-4 d-block" onClick={ () => handleCashout() }>
         { !cashout && <span>Passer au paiment ↵</span> }
         { cashout && <span>Finaliser ↵</span> }
      </div>            
   )
}

export default FinalizeButton