import React, { useState } from 'react';
import styles from './styles.module.css';

/**
 * The Insert component is used to add a new auction item to the database.
 * It provides a form for the user to enter the item title, description, starting price, and reserve price.
 * It will then make a POST request to the server to add the item, and display a success or error message to the user.
 */
const Insert = () => {
    // State variables for the form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [start_price, setStartPrice] = useState('');
    const [reserve_price, setReservePrice] = useState('');
    const [message, setMessage] = useState('');

    /**
     * Handles the form submission and makes the POST request to the server.
     * @param {Event} event The form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newAuctionItem = { title, description, start_price, reserve_price };

        try {
            // Make a POST request to the server to add the item
            const response = await fetch('http://localhost:5000/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAuctionItem),
            });

            // Display a success or error message to the user
            const messageText = response.ok ? 'Item successfully added!' : 'Error adding item. Please try again.';
            setMessage(messageText);

            if (response.ok) {
                // Clear form
                setTitle('');
                setDescription('');
                setStartPrice('');
                setReservePrice('');
            }
        } catch (error) {
            // Display an error message if the request fails
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Add New Auction Item</h2>
            {message && (
                <div className={`${styles.message} ${message.includes('successfully') ? styles.success : styles.error}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="start_price">Starting Price:</label>
                    <input
                        type="number"
                        id="start_price"
                        value={start_price}
                        onChange={(e) => setStartPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="reserve_price">Reserve Price:</label>
                    <input
                        type="number"
                        id="reserve_price"
                        value={reserve_price}
                        onChange={(e) => setReservePrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <button type="submit" className={styles.submitButton}>
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default Insert;