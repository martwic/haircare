import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import AddCompany from './addcompany';

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [productName, setProductName] = useState('');
  const [company, setCompany] = useState('');
  const [hairType, setHairType] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [ingredients, setIngredients] = useState('');

  const [companyData, setCompanyData] = useState([]);
  const [hairData, setHairData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.post('/api/db/productData');
        setCompanyData(response.data.company);
        setHairData(response.data.hair);
        setCategoryData(response.data.category);
        setTypeData(response.data.type);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchCompanyData();
  }, []);
  const handleAdd= async (e) => {
   e.preventDefault();
   const res = await axios.post('./api/db/insertProduct', {productName, company, hairType, description, category, type, ingredients} )
   location.reload()
  }
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <div>
      <button className="button2" onClick={() => setIsOpen(true)}>
        Dodaj produkt
      </button>
      <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <h1>Wprowadź informacje o produkcie:</h1>
        <form onSubmit={handleAdd}>
  <table>
    <tbody>
      <tr>
        <td><label htmlFor="fname">Nazwa:</label></td>
        <td><input type="text" required value={productName} onChange={(e) => setProductName(e.target.value)} /></td>
      </tr>
      <tr>
        <td><label htmlFor="lname">Firma:</label></td>
        <td>
          <select required onChange={(e) => setCompany(e.target.value)}>
          <option disabled selected value> -- wybierz opcję -- </option>
            {companyData.map((firma) => (
              <option key={firma.id_firmy} value={firma.id_firmy}>{firma.nazwa_firmy}</option>
            ))}
          </select><br/>
          <AddCompany/>
        </td>
      </tr>
      <tr>
        <td><label htmlFor="lname">Typ włosa:</label></td>
        <td>
          <select required onChange={(e) => setHairType(e.target.value)}> 
          <option disabled selected value> -- wybierz opcję -- </option>
            {hairData.map((typ_wlosa) => (
              <option key={typ_wlosa.id_typu} value={typ_wlosa.id_typu}>{typ_wlosa.nazwa_typu}</option>
            ))}
          </select>
        </td>
      </tr>
      <tr>
        <td><label htmlFor="lname">Opis:</label></td>
        <td><input type="textarea" onChange={(e) => setDescription(e.target.value)}/></td>
      </tr>
      <tr>
        <td><label htmlFor="lname">Kategoria:</label></td>
        <td>
          <select required onChange={(e) => setCategory(e.target.value)}>
          <option disabled selected value> -- wybierz opcję -- </option>
            {categoryData.map((kategoria) => (
              <option key={kategoria.id_kategorii} value={kategoria.id_kategorii}>{kategoria.nazwa_kategorii}</option>
            ))}
          </select>
        </td>
      </tr>
      <tr>
        <td><label htmlFor="lname" onChange={(e) => setType(e.target.value)}>Typ produktu:</label></td>
        <td>
          <select>
            <option disabled selected value> -- wybierz opcję -- </option>
            {typeData.map((typ) => (
              <option key={typ.id_typu} value={typ.id_typu}>{typ.nazwa_typu}</option>
            ))}
          </select>
        </td>
      </tr>
      <tr>
        <td><label htmlFor="lname">Skład:</label></td>
        <td><input type="textarea" onChange={(e) => setIngredients(e.target.value)} /></td>
      </tr>
    </tbody>
  </table>
  <br />
  <input type="submit" className="button2" value="Dodaj" />
  <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
</form>

      </Modal>
    </div>
  );
};

export default AddProduct;
