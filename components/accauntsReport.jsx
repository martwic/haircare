import React, { useState } from 'react';
import Modal from 'react-modal'
import axios from 'axios';

const ReportGenerator = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedInterval, setSelectedInterval] = useState('');
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
        const res = await axios.post('./api/db/generateAccountsReport', { startDate, endDate, selectedInterval })
        location.reload()
    }

    return (
        <div>
            <button className='button-logout' onClick={() => setIsOpen(true)}>Generuj raport dot. kont</button>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h1>Generator Raportów</h1>
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
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor="interval">Podział raportu:</label>
                                </td>
                                <td>
                                    <select
                                        id="interval"
                                        value={selectedInterval}
                                        onChange={(e) => setSelectedInterval(e.target.value)}
                                    >
                                        <option value="">-- Wybierz --</option>
                                        <option value="days">Dni</option>
                                        <option value="weeks">Tygodnie</option>
                                        <option value="months">Miesiące</option>
                                        <option value="years">Lata</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" align="center">
                                    <button className="button2" onClick={handleGenerateReport}>Generuj raport</button>
                                    <button className="button2" onClick={() => setIsOpen(false)}>Anuluj</button>
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
