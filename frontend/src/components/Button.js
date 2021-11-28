import './Button.css'
import {Link} from 'react-router-dom'

const STYLES = ['btn--primary', 'btn--outline']
const SIZES = ['btn--medium', 'button--large']

export const Button = ({children, type, onClick, buttonStyle, buttonSize, path, target}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
     ? buttonStyle : STYLES[0]

     const checkButtonSize = SIZES.includes(buttonSize) 
     ? buttonSize : SIZES[0]

     return(
         <>
         {target === "new" ? 
         <Link to={path} target="_blank" rel="noopener noreferrer" className='btn-mobile'>
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}>
                {children}
            </button>
        </Link>
        :
        <Link to={path} className='btn-mobile'>
             <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
             onClick={onClick}
             type={type}>
                 {children}
             </button>
         </Link>
        }
         
         </>
     )
 }