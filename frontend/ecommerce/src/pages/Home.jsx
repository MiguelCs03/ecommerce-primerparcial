import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";

// import FeaturedProducts from "../components/FeaturedProducts";
import BannerCarousel from "../components/CarruselOfertas";
import { useCategoryStore  } from "../stores/useCategoryStore"; // 
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

import { useAuthStore } from '../stores/useAuthStore';







const Home = () => {
	const {    fetchproductosDestacados , destacados} = useProductStore();
	const { loadCategories, categories,} = useCategoryStore();
	const { currentUser } = useAuthStore(); // Obtén el usuario actual
	console.log("currentUser", currentUser);
	console.log("destacados", destacados);

	useEffect(() => {
		if (!currentUser) {
			loadCategories();
			return;
		}
		fetchproductosDestacados(currentUser.user_id);
		loadCategories();
	}, [loadCategories, fetchproductosDestacados, currentUser]);

	return (
		
			
		<>
			<div className="w-full h-[30vh]"> {/* Ajusta la altura aquí si es necesario */}
				<BannerCarousel />
			</div>

			<div className='relative min-h-screen text-black overflow-hidden mx-20 '>
					

					

					<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
						<h1 className='text-center text-5xl sm:text-6xl font-bold text-black mb-4'>
							Explora nuestras categorias
						</h1>
						<p className='text-center text-xl text-back mb-12'>
							Descubre productos especiales para ti
						</p>

						<div className='flex flex-row overflow-x-auto gap-8 py-6 px-4 justify-center'>
						{ categories.length > 0 ? (
							categories.map((category) => (
								// <h1 key={category.id}>{category.nombre}</h1> // <CategoryItem category={category} key={category.id} />
								<CategoryItem category={category} key={category.id} />
							))
						) : (
							<p>Cargando categorías...</p>
						)}


						
						</div>
						<motion.div
							className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							{destacados?.length === 0 && (
								<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
									No products found
								</h2>
							)}

							{destacados?.map((product) => (
								<ProductCard key={product.id} product={product} />
							))}
						</motion.div>


					</div>

					{/* <div className="px-3">
						{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
					</div> */}
				</div>
						
				
		</>
	);
};


export default Home;