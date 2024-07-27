import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Blog from './pages/Blog';

const App: React.FC = () => {
    return (
        <Router>
            <div className='container'>
                <Routes>
                    <Route path="/blog" Component={Blog} />
                    <Route path="/" element={<Navigate replace to="/blog" />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
