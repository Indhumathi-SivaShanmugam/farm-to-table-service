// src/ItemList.js
import React from 'react';

const ItemList = () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

    return (
        <div>
            <h2>My Item List</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
