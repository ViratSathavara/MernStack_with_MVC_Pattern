import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link 
            to="/" 
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              textDecoration: 'none'
            }}
          >
            MERN STACK CRUD
          </Link>
          <div style={{
            display: 'flex',
            gap: '1rem'
          }}>
            <Link
              to="/"
              style={{
                color: '#4b5563',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                ':hover': {
                  color: '#1f2937'
                }
              }}
            >
              Products
            </Link>
            <Link
              to="/add"
              style={{
                color: '#4b5563',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                ':hover': {
                  color: '#1f2937'
                }
              }}
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;