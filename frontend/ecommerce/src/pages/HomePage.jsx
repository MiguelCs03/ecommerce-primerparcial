import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen text-black overflow-hidden mx-20 '>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pl-6 '>
				<div className="h-[500px] ">
					<img src="bags.jpg" alt="home hero" className='w-full h-full object-cover' />
				</div>
				<div className="h-[500px] bg-grey ml-3 mr-3" >
					<div className="text-7xl uppercase font-custom font-extrabold space-y-2 ">
						<h2 className="ml-3">heleva</h2>
						<div className=" bg-orange-600 pl-3 pr-2 pb-1 inline-block">
							<h1 className="text-white">tu manera  </h1>
						</div>
						
						<h1 className="ml-3">de vestir.</h1>
					</div>
					

					
				   	<p className="font-normal  normal-case text-xl ml-3 mt-8">
					   Revisa nuestra mejor seleccion de estilos<br/>
					   moda,tendencia y estilo solo en nuestra tienda.<br/>
					   Nuevos conjustons todos los meses.
					</p>
		
					<button className="mt-6 ml-6 pl-5 pr-5 pt-3 pb-3 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-700">
						Empieza a comprar 
					</button>
				</div>
				<div className="h-[500px] ">
					<img src="bags.jpg" alt="home hero" className='w-full h-full object-cover' />
				</div>
			</div>

			<div className="px-3">
			{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1 className='text-center text-5xl sm:text-6xl font-bold text-black mb-4'>
					Explore Our Categories
				</h1>
				<p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				
			</div>
		</div>
	);
};
export default HomePage;
