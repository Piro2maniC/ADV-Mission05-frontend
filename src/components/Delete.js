// src/components/Delete.js
import React, { useState } from 'react';
import styles from './styles.module.css';

const Delete = () => {
    const [id, setId] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`http://localhost:5000/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Item deleted successfully!' });
                setId(''); // Clear the input
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to delete item' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Delete Auction Item</h2>
            
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
                        placeholder="Enter item ID to delete"
                    />
                </div>

                <button 
                    type="submit" 
                    className={`${styles.submitButton} ${styles.deleteButton}`}
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Delete Item'}
                </button>
            </form>
        </div>
    );
};

export default Delete;