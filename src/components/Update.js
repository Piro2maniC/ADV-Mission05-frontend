// src/components/Update.js
import React, { useState } from 'react';
import styles from './styles.module.css';

const Update = () => {
    const [id, setId] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_price: '',
        reserve_price: ''
    });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`http://localhost:5000/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Item updated successfully!' });
                // Clear form
                setId('');
                setFormData({
                    title: '',
                    description: '',
                    start_price: '',
                    reserve_price: ''
                });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to update item' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Update Auction Item</h2>
            
            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="id">Item ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        placeholder="Enter item ID"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Enter new title"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter new description"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="start_price">Starting Price:</label>
                    <input
                        type="number"
                        id="start_price"
                        name="start_price"
                        value={formData.start_price}
                        onChange={handleInputChange}
                        placeholder="Enter new starting price"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="reserve_price">Reserve Price:</label>
                    <input
                        type="number"
                        id="reserve_price"
                        name="reserve_price"
                        value={formData.reserve_price}
                        onChange={handleInputChange}
                        placeholder="Enter new reserve price"
                        min="0"
                        step="0.01"
                    />
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Item'}
                </button>
            </form>
        </div>
    );
};

export default Update;