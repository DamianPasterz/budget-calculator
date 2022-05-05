import React from 'react';
import ErningItem from './ErningItem';
import { MdDelete } from 'react-icons/md'

const ErningList = ({ ernings, handleEdit, handleDelete, clearItems }) => {
    return (
        <>
            <ul className='list'>
                {ernings.map(erning => {
                    return <ErningItem
                        key={erning.id}
                        erning={erning}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />;
                })}
            </ul>
            {ernings.length > 0 && <button className='btn' onClick={clearItems} >
                clear erning
                <MdDelete className='btn-icon' />
            </button>}
        </>
    );
};

export default ErningList;
