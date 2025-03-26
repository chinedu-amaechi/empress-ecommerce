import Image from "next/image";

function CollectionFeaturedProduct({product, collection}) {
  return (
    <div className="relative mb-32 border-1 border-[#d4d4d4] rounded-3xl overflow-hidden">
      <div className="absolute -inset-4 bg-[#11296B]/5 rounded-3xl -z-10 transform -rotate-1"></div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Added h-full here */}
          {/* Image Side */}
          <div className="relative h-80 lg:h-auto lg:min-h-[600px] overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full">
              <span className="text-sm text-[#11296B] font-medium">
                Featured Piece
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-10 lg:p-16">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              {product.name}
            </h3>

            <div className="w-12 h-px bg-[#11296B]/30 my-6"></div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
              {/* Extended description */}
              <span className="block mt-4">
                Crafted with{" "}
                {product.material} and
                designed to embody the essence of the{" "}
                {collection.name} collection, this piece
                stands as a testament to our commitment to exceptional
                craftsmanship.
              </span>
            </p>

            {/* Product Insights with responsive mobile-first design */}
            <div className="mb-8">
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-3">
                Product Insights
              </div>
              <div className="grid grid-cols-1 gap-3">
                {/* First row - 3 columns on tablet and up, stacked on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  {/* Materials */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Materials
                    </div>
                    <div className="text-sm font-medium">
                      {product.material ||
                        "Premium Materials"}
                    </div>
                  </div>

                  {/* Creation Time */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Crafting Time
                    </div>
                    <div className="text-sm font-medium">48 Hours</div>
                  </div>

                  {/* Sustainability */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Sustainability
                    </div>
                    <div className="text-sm font-medium">Eco-Friendly</div>
                  </div>
                </div>

                {/* Second row - Full width Rating */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase mb-1">
                    Rating
                  </div>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          fill={
                            i <
                            Math.round(
                              product
                                .rating || 4.5
                            )
                              ? "currentColor"
                              : "none"
                          }
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {product.rating ||
                        "4.8"}{" "}
                      / 5
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      (
                      {product.reviews ||
                        "124"}{" "}
                      reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionFeaturedProduct;
