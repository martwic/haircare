import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios';

const EditAnswer = ({ data }) => {
   const { answerId, answer1 } = data

   const [isOpen, setIsOpen] = useState(false)
   const [answer, setAnswer] = useState(answer1);
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
      const res = await axios.post('./api/db/editAnswer', { answerId, answer })
      location.reload()
   }
   return (
      <div>
         <button onClick={() => setIsOpen(true)}>Edytuj odpowiedź</button>
         <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <form onSubmit={handleAdd}>
               <label htmlFor="fname">Odpowiedź:</label><br />
               <input type="textarea" required value={answer} onChange={(e) => setAnswer(e.target.value)} /><br /><br />
               <input type="submit" class="button2" value="Zatwierdź" />
               <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
            </form>

         </Modal>
      </div>
   )
}
export default EditAnswer