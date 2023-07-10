import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const EditProduct = ({ data }) => {
  const { productId1, name1, companyId1, hairType1, description1, categoryId1, ingredients1 } = data


  const [isOpen, setIsOpen] = useState(false);

  const [productName, setProductName] = useState(name1);
  const [company, setCompany] = useState(companyId1);
  const [hairType, setHairType] = useState(hairType1);
  const [description, setDescription] = useState(description1);
  const [category, setCategory] = useState(categoryId1);
  const [ingredients, setIngredients] = useState(ingredients1);

  const [companyData, setCompanyData] = useState([]);
  const [hairData, setHairData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);


  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.post('/api/db/productData');
        setCompanyData(response.data.company);
        setHairData(response.data.hair);
        setCategoryData(response.data.category);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchCompanyData();
  }, []);
  const handleEdit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/db/editProduct', { productId1, productName, company, hairType, description, category, ingredients })
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
        Edytuj
      </button>
      <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
        <h1>Wprowadź informacje o produkcie:</h1>

        <form onSubmit={handleEdit}>
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
                    {companyData.map((firma) => (
                      <option key={firma.id_firmy} value={firma.id_firmy} selected={firma.id_firmy == company}>{firma.nazwa_firmy}</option>
                    ))}
                  </select><br />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="lname">Typ włosa:</label></td>
                <td>
                  <select required onChange={(e) => setHairType(e.target.value)}>
                    {hairData.map((typ_wlosa) => (
                      <option key={typ_wlosa.id_typu} value={typ_wlosa.id_typu} selected={typ_wlosa.id_typu == hairType}>{typ_wlosa.nazwa_typu}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="lname">Opis:</label></td>
                <td><input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} /></td>
              </tr>
              <tr>
                <td><label htmlFor="lname">Kategoria:</label></td>
                <td>
                  <select required onChange={(e) => setCategory(e.target.value)}>
                    {categoryData.map((kategoria) => (
                      <option key={kategoria.id_kategorii} value={kategoria.id_kategorii} selected={kategoria.id_kategorii == category}>{kategoria.nazwa_kategorii}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="lname">Skład:</label></td>
                <td><input type="textarea" value={ingredients} onChange={(e) => setIngredients(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
          <br />
          <input type="submit" className="button2" value="Zatwierdź" />
          <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
        </form>

      </Modal>
    </div>
  );
};

export default EditProduct;
