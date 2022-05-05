import React from 'react';
import { MdSend } from 'react-icons/md';


const Wallet = ({
    walletCharge,
    walletAmount,
    handleWalletCharge,
    handleWalletAmount,
    handleWalletSubmit,
    edit
}) => {
    return (
        <>
            <h2>wallet</h2>
            <form onSubmit={handleWalletSubmit} >
                <div className='form-center'>
                    <div className='form-group'>
                        <label htmlFor='erning'>profit</label>
                        <input type="text"
                            className='form-control'
                            id="erning"
                            name='erning'
                            placeholder='e.g salary'
                            value={walletCharge}
                            onChange={handleWalletCharge}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='amount'>amount</label>
                        <input type="number"
                            className='form-control'
                            id="amount"
                            name='amount'
                            placeholder='e.g 100'
                            value={walletAmount}
                            onChange={handleWalletAmount}
                        />
                    </div>
                </div>
                <button type='submit' className='btn'>
                    {edit ? 'edit' : 'submit'}
                    <MdSend className='btn-icon' />
                </button>
            </form>
        </>
    )
}

export default Wallet
