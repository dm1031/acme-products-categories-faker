import React from 'react';

const List = ({ categories }) => {
    return (
        <ul>
            {
                categories.map( category => 
                    <li key={category.id}>
                        {category.name}
                    </li>
                )
            }
        </ul>
    )
}

export default List;
