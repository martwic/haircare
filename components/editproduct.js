import React, { useState } from 'react'
import Modal from 'react-modal'

const EditProduct = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [productName, setname] = useState('');
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
         <button className="button2"  onClick={() => setIsOpen(true)}>Edytuj</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h1>Wprowadź informacje o produkcie:</h1>
            <form>
            <label htmlFor="fname">Nazwa:</label><br />
                <input type="text" required value={productName} onChange={(e) => setname(e.target.value)} /><br /><br />
                <label htmlFor="lname">Firma:</label><br />
                <input type="text" required/><br /><br />
                <label htmlFor="lname">Typ włosa:</label><br />
                <input type="text" required/><br /><br />
                <label htmlFor="lname">Opis:</label><br />
                <input type="textarea" required/><br /><br />
                <label htmlFor="lname">Kategoria:</label><br />
                <input type="textarea" required/><br /><br />
                <label htmlFor="lname">Typ:</label><br />
                <input type="textarea" required/><br /><br />
                <label htmlFor="lname">Skład:</label><br />
                <input type="textarea" required/><br /><br />
                
                <input type="submit" class="button2" value="Zatwierdź" />
                <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
            </form>
            
         </Modal>
      </div>
   )
}
export default EditProduct