import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { updateProduct } from '../Services/Api';
import { enqueueSnackbar } from 'notistack';

const EditProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const {
    category = '',
    description = '',
    name = '',
    price = '',
    stock = ''
  } = location?.state || {};
  
  const [formData, setFormData] = useState({
    name: name,
    description: description,
    price: price ? Number(price) : 0,
    category: category,
    stock: stock ? Number(stock) : 0
  });
  

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError('Invalid product ID in URL');
    }
  }, [id]);  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const productId = Number(id);
    if (!productId || isNaN(productId)) {
      setError('Invalid product ID');
      return;
    }
  
    const updatedProduct = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    };
  

    try {
      setIsSubmitting(true);
      const res = await updateProduct(productId, updatedProduct);
      if (res.status === 200) {
      enqueueSnackbar({ 
          variant: 'success',
          message: res.message
        })
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f9fafb' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Edit Product</h1>

      <form style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '80%', padding: '16px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
        <div style={{ marginBottom: '16px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={labelCss}>Product Name</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} placeholder="Enter product name" />
        </div>

        <div style={{ marginBottom: '16px', width: '100%',display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={labelCss}>Description</label><br />
          <textarea name="description" rows={3} value={formData.description} onChange={handleChange} required style={{ ...inputStyle, resize: 'vertical' }} placeholder="Enter product description" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between',  marginBottom: '16px', width: '93%' }}>
          <div style={{width: '45%'}} >
            <label>Price ($)</label><br />
            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" style={inputSmallStyle} placeholder="0.00" />
          </div>
          <div style={{width: '45%'}}>
            <label>Stock</label><br />
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" style={inputSmallStyle} placeholder="Quantity" />
          </div>
        </div>

        <div style={{ marginBottom: '16px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={labelCss}>Category</label><br />
          <input type="text" name="category" value={formData.category} onChange={handleChange} required style={inputStyle} placeholder="Product category" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', width: '100%' }}>
          <button type="button" onClick={() => navigate('/')} style={cancelBtnStyle}>Cancel</button>
          <button onClick={(e) => handleSubmit(e)} disabled={isSubmitting} style={{ ...submitBtnStyle, opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
            {isSubmitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '90%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', marginTop: '4px', fontSize: '14px'
};

const inputSmallStyle = {
  width: '94%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', marginTop: '4px', fontSize: '14px'
};

const cancelBtnStyle = {
  padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer'
};

const submitBtnStyle = {
  padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px'
};

const labelCss = {
  display: 'flex', alignSelf: 'flex-start', paddingLeft: '4%'
};

export default EditProduct;
