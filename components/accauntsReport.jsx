import React, { useState } from 'react';
import Modal from 'react-modal'
import axios from 'axios';

const ReportGenerator = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(Date.now());
    const [result, setResult] = useState('');
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

    const handleGenerateReport = async (e) => {
        e.preventDefault();
        const res = await axios.post('./api/db/generateAccountsReport', { startDate, endDate })
        setResult('Ilość kont powstałych w podanym zakresie czasu: '+res.data)
        //location.reload()
    }

    return (
        <div>
            <button className='button-logout' onClick={() => setIsOpen(true)}>Pokaż zestawienie dot. kont</button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>Zestawienie dot. ilości nowych kont</h1>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="start-date">Data początkowa:</label>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        id="start-date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="end-date">Data końcowa:</label>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        id="end-date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button className="button2" onClick={handleGenerateReport}>Generuj</button>
                                    <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <h3>{result}</h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </Modal>
        </div>
    );
};

export default ReportGenerator;
