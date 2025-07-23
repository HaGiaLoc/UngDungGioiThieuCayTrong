import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import PlantCard from '../../components/PlantCard.jsx';

const API_URL = import.meta.env.VITE_API_URL;

function SearchPage() {
  const [searchParams] = useSearchParams();
  
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `${API_URL}/api/plants`;
    const params = [];
    if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
        return res.json();
      })
      .then(data => setResults(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [keyword, category]);

  useEffect(() => {
    fetch(API_URL + '/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.filter(c => c.status === 'Hiển thị')))
      .catch(() => setCategories([]));
  }, []);

  let title = 'Tất cả sản phẩm';
  if (keyword) {
    title = `Hiển thị kết quả cho: "${keyword}"`;
  } else if (category) {
    title = `Kết quả cho danh mục: "${category}"`;
  }

  const hasResults = results.length > 0;
  const visibleResults = results.filter(plant => plant.status === 'Hiển thị');

  return (
    <main className="search-page-main">
      <div className="container">
        <h1>Kết quả tìm kiếm</h1>
        <div className="search-layout">
          <aside className="search-sidebar">
            <h3>Danh Mục Cây</h3>
            <nav className="category-list">
              <ul>
                <li><Link to="/tim-kiem">Tất cả cây</Link></li>
                {categories.map(cat => (
                  <li key={cat.id}><Link to={`/tim-kiem?category=${encodeURIComponent(cat.name)}`}>{cat.name}</Link></li>
                ))}
              </ul>
            </nav>
          </aside>

          <section className="search-results">
            <h2>{title}</h2>

            {hasResults ? (
              <div className="plant-grid" style={{gridTemplateColumns: 'repeat(5, 1fr)'}}>
                {visibleResults.slice(0, 50).map(plant => (
                  <PlantCard
                    key={plant.id}
                    id={plant.id}
                    image={plant.image}
                    name={plant.name}
                    description={plant.description}
                  />
                ))}
              </div>
            ) : loading ? (
              <p>Đang tải dữ liệu...</p>
            ) : error ? (
              <p className="no-results">Lỗi: {error}</p>
            ) : (
              <p className="no-results">
                Rất tiếc, không tìm thấy cây nào phù hợp với tìm kiếm của bạn.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default SearchPage;