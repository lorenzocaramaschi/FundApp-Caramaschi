import './itemListContainer.css'
import 'animate.css'
import { useEffect, useState } from 'react'
import ItemList from '../itemList/itemList'
import { NavLink, useParams } from 'react-router-dom'
import { getFirestore, getDocs, collection } from "firebase/firestore"



const ItemListContainer = () => {

    const [listaProductos, setListaProductos] = useState([])
    const [loading, setLoading] = useState(false)
    const categoryName = useParams();

    const obtenerProductos = async () => {
        setLoading(true)


        const db = getFirestore()
        const querySnapshot = await collection(db, 'items')

        getDocs(querySnapshot).then(res => {
            if (Object.keys(categoryName).length === 0) {
                const data = res.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
                setListaProductos(data)
                console.log(listaProductos)
            }
            else {     
                const data = res.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })                                          
                setListaProductos(data.filter((datos)=>datos.categoryId === categoryName.category))                                
            }

            setLoading(false)
        })
        
        
    }

useEffect(() => {
    obtenerProductos()
}, [categoryName])




return (
    <NavLink to={'/'} style={{ textDecoration: 'none', color: '#42506b' }}>
        {loading ? (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>) : <ItemList lista={listaProductos} />}
    </NavLink>

)
}

export default ItemListContainer;