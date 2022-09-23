import Comprar from '../botonComprar/botonComprar';
import './item.css'

const Item = ({titulo, precio, imagen}) => {
    return (        
        <div className="item">
            <img width={"70%"} height={"70%"} src={imagen} alt={titulo} />
            <h3>{titulo}</h3>
            <div>
            <span>${precio}</span>            
            </div>
            <Comprar/>
        </div>
    )
}

export default Item;