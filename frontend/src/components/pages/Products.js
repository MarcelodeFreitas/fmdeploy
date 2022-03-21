import '../../App.css'
import ResponsiveAppBar from '../AppBar'

export default function Products() {
    return(
    <>
        <ResponsiveAppBar />
        <h1 className="products" style={{backgroundImage: "url(/images/img-3.jpg)"}}>
            API
        </h1>
    </>
    
    )
}