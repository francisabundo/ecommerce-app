import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Products() {

	const [products, setProducts] = useState([]);

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_URL}/products`)
			.then(res => res.json())
			.then(data => {

				setProducts(data.map(product => {
					return (
						<ProductCard key={ product._id } product={product} />
					)
				}))
			})
	}, []);
	

	return (
		<>
			{/* <h2 className='my-5'>Products</h2> */}

		
			<h1 className='text-center my-5'>Products</h1>

            <div className="products">
                { products }
            </div>
		</>
	)
}

      