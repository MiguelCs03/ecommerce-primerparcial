import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Circle, CircleDot } from 'lucide-react';

// Banners de ejemplo para ofertas
const offerBanners = [
  {
    id: 1,
    title: "Mega Ofertas de Primavera",
    description: "Hasta 50% de descuento en todos los productos",
    image: "/api/placeholder/1200/400",
    backgroundColor: "bg-blue-600",
    textColor: "text-white",
    buttonText: "Ver ofertas",
    buttonLink: "/ofertas"
  },
  {
    id: 2,
    title: "¡Productos Tecnológicos!",
    description: "Llévate un 30% en laptops y smartphones",
    image: "/api/placeholder/1200/400",
    backgroundColor: "bg-purple-600",
    textColor: "text-white",
    buttonText: "Comprar ahora",
    buttonLink: "/tecnologia"
  },
  {
    id: 3,
    title: "Ofertas Relámpago",
    description: "Solo por 24 horas - ¡No te lo pierdas!",
    image: "/api/placeholder/1200/400",
    backgroundColor: "bg-red-600",
    textColor: "text-white",
    buttonText: "Ver productos",
    buttonLink: "/flash-sales"
  }
];

const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [, setDirection] = useState('next');
  
  // Crear un array con el último banner al inicio y el primero al final para el efecto continuo
  const extendedBanners = [
    offerBanners[offerBanners.length - 1], 
    ...offerBanners, 
    offerBanners[0]
  ];

  const goToNext = () => {
    setDirection('next');
    setIsTransitioning(true);
    setCurrentBanner(current => current + 1);
  };

  const goToPrev = () => {
    setDirection('prev');
    setIsTransitioning(true);
    setCurrentBanner(current => current - 1);
  };

  // Manejar la transición circular
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        
        // Si llegamos al banner "clonado" del final, saltar al banner real al inicio
        if (currentBanner >= extendedBanners.length - 1) {
          setCurrentBanner(1);
        }
        
        // Si llegamos al banner "clonado" del inicio, saltar al banner real al final
        if (currentBanner <= 0) {
          setCurrentBanner(offerBanners.length);
        }
      }, 500); // Tiempo igual a la duración de la transición
      
      return () => clearTimeout(timer);
    }
  }, [currentBanner, extendedBanners.length, isTransitioning]);

  // Auto rotación del carrusel
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        goToNext();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [currentBanner, isTransitioning]);

  // Para los indicadores, necesitamos mapear el índice extendido al real
  const getRealIndex = () => {
    if (currentBanner === 0) return offerBanners.length - 1;
    if (currentBanner === extendedBanners.length - 1) return 0;
    return currentBanner - 1;
  };

  const goToBanner = (bannerIndex) => {
    // Convertir el índice real a índice extendido
    setCurrentBanner(bannerIndex + 1);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Carrusel principal */}
      <div className="relative">
        <div 
          className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {extendedBanners.map((banner, index) => (
            <div 
              key={`banner-${banner.id}-${index}`} 
              className={`w-full flex-shrink-0 h-96 relative ${banner.backgroundColor}`}
            >
              <div className="absolute inset-0">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-10">
                <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${banner.textColor}`}>
                  {banner.title}
                </h2>
                <p className={`text-lg md:text-xl mb-6 max-w-xl ${banner.textColor}`}>
                  {banner.description}
                </p>
                <a 
                  href={banner.buttonLink}
                  className="bg-white text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  {banner.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button 
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors z-10"
          aria-label="Banner siguiente"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2">
          {offerBanners.map((_, index) => (
            <button 
              key={index} 
              onClick={() => goToBanner(index)}
              className="focus:outline-none"
              aria-label={`Ir al banner ${index + 1}`}
            >
              {getRealIndex() === index ? 
                <CircleDot className="w-5 h-5 text-white" /> : 
                <Circle className="w-5 h-5 text-white/70" />
              }
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;