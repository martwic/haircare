import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios';

const AddCompany = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [companyName, setname] = useState('');
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
   const handleAdd = async (e) => {
      e.preventDefault();
      const res = await axios.post('./api/db/insertCompany', { companyName })
      location.reload()
   }
   return (
      <div>
         <button onClick={() => setIsOpen(true)}>Dodaj firmę</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h1>Wprowadź nazwę firmy:</h1>
            <form onSubmit={handleAdd}>
               <label htmlFor="fname">Nazwa:</label><br />
               <input type="text" required value={companyName} onChange={(e) => setname(e.target.value)} /><br /><br />
               <input type="submit" class="button2" value="Zatwierdź" />
               <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
            </form>

         </Modal>
      </div>
   )
}
export default AddCompany