import React from 'react'

export const Product = (props) => {
    // console.log('[product]', props)
    const { id, image, name, price } = props.product
    return (
        <div className="Product">
        <div className="product_pic">
            <img src={image} alt={name} />
        </div>
        <div className="product_d">
            <p className="product_d_name">{name}</p>
            <p className="product_d_price">${price}</p>
            <div className="product_d_buttons">
            <button onClick={() => props.deleter(id) }>Delete</button>
            <button onClick={()=> props.edit(id)}>Edit</button>
            </div>
        </div>
        </div>
    );
}