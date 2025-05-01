import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../Services/Api";
import EditIcon from "@mui/icons-material/Edit";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import history from "../history";
import { enqueueSnackbar } from "notistack";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback( async () => {
      try {
        const response = await getProducts();
        setProducts(response.products || []);
      } catch (err) {
        enqueueSnackbar({ 
          variant: 'error',
          message: "Failed to fetch products. Please try again."
        })
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    try {
      const productId = Number(id);
    if (!productId || isNaN(productId)) {
      enqueueSnackbar({ 
        variant: 'error',
        message: 'Invalid product ID'
      })
      return;
    }
      const res =  await deleteProduct(productId);
      
      if (res.status !== 200) {
      enqueueSnackbar({ 
        variant: 'success',
        message: res.message 
      });
      }
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = async (id, product) => {
    try {
      history.push(`/edit/${id}`, product);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Products
        </h1>
        <Link
          to="/add"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            textDecoration: "none",
            transition: "background-color 0.2s",
            ":hover": {
              backgroundColor: "#1d4ed8",
            },
          }}
        >
          Add Product
        </Link>
      </div>
      <div
        style={{
          backgroundColor: "white",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          borderRadius: "0.5rem",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "#f9fafb" }}>
            <tr>
              {[
                "Id",
                "Name",
                "Description",
                "Price",
                "Category",
                "Stock",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "0.75rem 1.5rem",
                    textAlign: "left",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.productId}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  ":last-child": {
                    borderBottom: "none",
                  },
                }}
              >
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  {product.productId}
                </td>
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  {product.name}
                </td>
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  {product.description}
                </td>
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  ${product.price}
                </td>
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  {product.category}
                </td>
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  {product.stock}
                </td>
                <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <EditIcon onClick={() => handleEdit(product.productId, product)}>
                      <PencilIcon
                        style={{ height: "1.25rem", width: "1.25rem" }}
                      />
                    </EditIcon>
                    <button
                      onClick={() => handleDelete(product.productId)}
                      style={{
                        color: "#dc2626",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "color 0.2s",
                        ":hover": {
                          color: "#b91c1c",
                        },
                      }}
                    >
                      <TrashIcon
                        style={{ height: "1.25rem", width: "1.25rem" }}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
