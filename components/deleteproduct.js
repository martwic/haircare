import React, { useState } from 'react'
import Modal from 'react-modal'

const DeleteProduct = () => {
   const [isOpen, setIsOpen] = useState(false)
   const customStyles = {
      overlay: {
         backgroundColor: 'rgba(0, 0, 0, 0.6)'
      },
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)'
      }
   }
   return (
      <div>
         <button className="button2"  onClick={() => setIsOpen(true)}>Usuń</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h1>Potwierdź usunięcie produktu:</h1>
            <form>
                <input type="submit" class="button2" value="Usuń" />
                <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
            </form>
            
         </Modal>
      </div>
   )
}
export default DeleteProduct