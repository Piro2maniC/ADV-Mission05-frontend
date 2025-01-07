import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    start_price: "",
    reserve_price: "",
  });
  const [message, setMessage] = useState(null);

  const fetchItems = async (search = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5001/find${search ? `?search=${search}` : ""}`
      );
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setError(null);
      } else {
        setError("Failed to fetch items");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchItems(searchTerm);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Item added successfully!" });
        setShowAddForm(false);
        setEditForm({
          title: "",
          description: "",
          start_price: "",
          reserve_price: "",
        });
        fetchItems();
      } else {
        setMessage({ type: "error", text: "Failed to add item" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error: " + error.message });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/update/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        setMessage({ type: "success", text: "Item updated successfully!" });
        setSelectedItem(null);
        setEditForm({
          title: "",
          description: "",
          start_price: "",
          reserve_price: "",
        });
        fetchItems();
      } else {
        setMessage({ type: "error", text: "Failed to update item" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error: " + error.message });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await fetch(`http://localhost:5001/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setMessage({ type: "success", text: "Item deleted successfully!" });
          fetchItems();
        } else {
          setMessage({ type: "error", text: "Failed to delete item" });
        }
      } catch (error) {
        setMessage({ type: "error", text: "Error: " + error.message });
      }
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      start_price: item.start_price,
      reserve_price: item.reserve_price,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.itemsPageContainer}>
      <h1>Auction Items</h1>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.actionsContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </div>
        </form>
        <button
          onClick={() => setShowAddForm(true)}
          className={styles.addButton}
        >
          + Add New Item
        </button>
      </div>

      {(showAddForm || selectedItem) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{selectedItem ? "Edit Item" : "Add New Item"}</h2>
            <form
              onSubmit={selectedItem ? handleUpdateSubmit : handleAddSubmit}
            >
              <div className={styles.formGroup}>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={editForm.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="start_price">Starting Price:</label>
                <input
                  type="number"
                  id="start_price"
                  name="start_price"
                  value={editForm.start_price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="reserve_price">Reserve Price:</label>
                <input
                  type="number"
                  id="reserve_price"
                  name="reserve_price"
                  value={editForm.reserve_price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedItem(null);
                    setEditForm({
                      title: "",
                      description: "",
                      start_price: "",
                      reserve_price: "",
                    });
                  }}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton}>
                  {selectedItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>Loading items...</div>
      ) : (
        <div className={styles.itemsGrid}>
          {items.map((item) => (
            <div key={item._id} className={styles.itemCard}>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.priceInfo}>
                <p>Starting Price: ${item.start_price}</p>
                <p>Reserve Price: ${item.reserve_price}</p>
              </div>
              <div className={styles.cardActions}>
                <button
                  onClick={() => handleEdit(item)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Items;
