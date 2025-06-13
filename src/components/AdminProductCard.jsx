
import "../styles/adminProductCard.css"

const AdminProductCard = ({name,description,price,image}) => {
  return (
    <div className="admin-product-card">
        <h2>{name}</h2>
        <img src={image} alt={image} />
        <span>₹{price}</span>
        <p>{description.slice(0,15)}.....</p>
    </div>
  )
}

export default AdminProductCard