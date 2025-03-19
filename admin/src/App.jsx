import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import ProductList from './components/ProductList'
import AddProductForm from './components/AddProductForm'

export default function App() {
  return (
    <Router future={{ 
      v7_startTransition: true,
      v7_relativeSplatPath: true 
    }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-xl sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between px-4">
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Starshift Admin
            </Link>
            <div className="flex space-x-4">
              <Link to="/add-product" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/30">
                Add Product
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto py-8 px-4 max-w-7xl">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add-product" element={<AddProductForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}