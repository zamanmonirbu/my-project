import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners"; // Import react spinner
import { getOfferBanners } from "../actions/offerBannerActions";
import { getProductsWithHighOffer } from "../actions/productActions";
import StrikeLine from "../components/Utilities/StrikeLine";
import { getIpLocation } from "../actions/IpLocation"; // Import location action
import { MdLocationOn } from "react-icons/md"; // Import location icon

const HighOffersProduct = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferBanners());
    dispatch(getProductsWithHighOffer());
  }, [dispatch]);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getIpLocation();
      if (location) {
        const [lat, lng] = location.split(","); // Split the location string into latitude and longitude
        setUserLat(parseFloat(lat));
        setUserLng(parseFloat(lng));
      } else {
        console.log("Could not fetch user location.");
      }
    };
    fetchLocation();
  }, []);

  const {
    offerBanners,
    loading: bannerLoading,
    error: bannerError,
  } = useSelector((state) => state.offerBanner);
  const {
    highOfferProducts,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (offerBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentBanner(
          (prevBanner) => (prevBanner + 1) % offerBanners.length
        );
      }, 3000); // Change banner every 3 seconds

      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [offerBanners]);

  const handleNextProduct = () => {
    setCurrentProduct(
      (prevProduct) => (prevProduct + 1) % highOfferProducts.length
    );
  };

  const handlePrevProduct = () => {
    setCurrentProduct(
      (prevProduct) =>
        (prevProduct - 1 + highOfferProducts.length) % highOfferProducts.length
    );
  };

  // Helper function to calculate distance
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) return null; // Return null if any coordinates are missing

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1); // Return distance in km with 1 decimal
  };

  return (
    <div>
      <StrikeLine />
      <h3 className="font-bold mb-4 text-2xl text-center">
        <span className="text-yellow-400">High Offers </span>Product Details
      </h3>
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full p-4 space-x-0 md:space-x-4">
          <div className="w-full md:w-1/5 h-64 relative">
            {bannerLoading ? (
              <div className="flex justify-center items-center h-full">
                <PulseLoader color="#033B4C" size={15} />
              </div>
            ) : bannerError ? (
              <p>Error: {bannerError}</p>
            ) : (
              offerBanners.length > 0 && (
                <div className="relative">
                  <img
                    src={offerBanners[currentBanner]?.imageUrl}
                    alt={`Banner ${currentBanner + 1}`}
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              )
            )}
          </div>

          <div className="w-full md:w-4/5 relative">
            {productLoading ? (
              <div className="flex justify-center items-center h-full">
                <PulseLoader color="#033B4C" size={15} />
              </div>
            ) : productError ? (
              <p>Error: {productError}</p>
            ) : (
              <div className="relative overflow-hidden">
                <div
                  className="flex space-x-4"
                  style={{
                    transform: `translateX(-${currentProduct * 100}%)`,
                    transition: "transform 0.3s ease",
                  }}
                >
                  {highOfferProducts?.map((product) => {
                    const distance = calculateDistance(
                      userLat,
                      userLng,
                      product.sellerLocation?.lat,
                      product.sellerLocation?.lng
                    );

                    return (
                      <Link to={`/product/${product._id}`} key={product._id}>
                        <div className="bg-white border rounded-lg p-4 w-72 flex-shrink-0">
                          <img
                            src={product.imageURL}
                            alt={product.name.slice(10)}
                            className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                          />
                          <div className="text-lg font-semibold mb-2">
                            {product.name.substring(0, 25)}
                          </div>
                          <div className="flex items-center mb-2">
                            <div className="w-1/2">
                              <div className="text-lg font-bold line-through">
                                ${product.unitPrice}
                              </div>
                            </div>
                            <div className="text-yellow-500 ">
                              ★ {product.rating}
                            </div>
                            <div className="text-sm text-gray-500 ml-2">
                              ({product.reviews || 0})
                            </div>
                          </div>
                          <span className="text-sm text-green-600 mb-1">
                            $
                            {Math.round(
                              product.unitPrice -
                                product.unitPrice * (product.offer / 100)
                            )}{" "}
                            with {product.offer}% off
                          </span>

                          {distance && (
                            <div className="text-sm text-gray-500 flex items-center justify-center space-x-2 mt-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-teal-500 text-white rounded-full shadow-md">
                                <MdLocationOn className="text-lg" />
                              </div>
                              <span className="text-teal-600 font-medium">
                                {distance} km away
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <button
                  onClick={handlePrevProduct}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full mr-8"
                >
                  &#8249;
                </button>

                <button
                  onClick={handleNextProduct}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 hover:bg-opacity-100 p-2 rounded-full"
                >
                  &#8250;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighOffersProduct;
