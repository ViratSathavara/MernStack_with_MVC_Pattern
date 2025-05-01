import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProducts';
import EditProduct from './components/EditProduct';
import Navbar from './components/Navbar';

function App() {
  return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6' // gray-100 equivalent
      }}>
        <Navbar />
        <div style={{
          width: '100%',
          maxWidth: '1200px', // container equivalent
          margin: '0 auto',
          padding: '2rem 1rem' // px-4 py-8 equivalent
        }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;