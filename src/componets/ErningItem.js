import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'

const ErningItem = ({ erning, handleEdit, handleDelete }) => {
    const { id, walletCharge, walletAmount } = erning
    return (
        <li className='item'>
            <div className='info'>
                <span className='charge' >{walletCharge}</span>
                <span className='amount'>${walletAmount}</span>
            </div>
            <div>
                <button className='edit-btn' aria-label="edit button" onClick={() => handleEdit(id)} >
                    <MdEdit />
                </button>
                <button className='clear-btn' aria-label="delete button" onClick={() => handleDelete(id)} >
                    <MdDelete />
                </button>
            </div>
        </li>
    )
}

export default ErningItem
