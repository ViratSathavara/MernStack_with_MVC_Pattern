import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../Services/Api';
import { enqueueSnackbar } from "notistack";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
if (res.status === 201) {
  enqueueSnackbar({ 
    variant: 'success',
    message: res.message
  })
}
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Add New Product</h1>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            ❌
          </button>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fdecea', borderLeft: '4px solid #f44336', padding: '1rem', marginBottom: '1rem', borderRadius: '5px' }}>
            <p style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Product Name</label><br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Enter product name"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Description</label><br />
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Enter product description"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Price ($)</label><br />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                style={inputStyle}
                placeholder="0.00"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Stock</label><br />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                style={inputStyle}
                placeholder="Quantity"
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Category</label><br />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="Product category"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={cancelBtnStyle}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...submitBtnStyle,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  marginTop: '4px',
  fontSize: '14px'
};

const cancelBtnStyle = {
  padding: '8px 16px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '6px',
  cursor: 'pointer'
};

const submitBtnStyle = {
  padding: '8px 16px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px'
};

export default AddProduct;
