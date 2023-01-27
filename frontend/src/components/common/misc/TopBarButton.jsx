import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const TopBarButton = ({children, to, pageName, handleButton}) => {
   const [buttonStyle, setButtonStyle] = useState();

   useEffect(() => {
      if(pageName == children)
         setButtonStyle("btn-light")
      else
         setButtonStyle("btn-outline-light")
   },[pageName])

   return (
      <Link to={ to }className={`btn ${ buttonStyle } btn-sm mx-1`} onClick={ e => handleButton(e) }>{ children }</Link>
   )
}

export default TopBarButton;