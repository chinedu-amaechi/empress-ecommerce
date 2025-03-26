import ProductCard from "@/components/product/product-card";
import Heading from "@/components/ui/heading";

function CollectionProduct({collection,}) {
    return (
      <section id="products-section" className="mb-32">
        <div className="text-center mb-16">
          <Heading
            level={3}
            className="text-2xl md:text-3xl text-gray-900 font-light tracking-tight mb-4"
          >
            Explore the{" "}
            <span className="font-semibold">
              {collection.name}
            </span>{" "}
            Collection
          </Heading>

          <div className="w-16 h-px bg-[#11296B]/30 mx-auto my-6"></div>

          <p className="max-w-2xl mx-auto text-gray-600">
            Each piece in this collection has been meticulously crafted to
            embody the essence of timeless elegance and contemporary
            sophistication.
          </p>
        </div>

        {/* Plain grid with no motion effects, just basic centering */}
        <div className="mx-auto flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center max-w-7xl">
            {collection.products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* <div className="text-center mt-12">
                <Link
                  href={`/collections/${activeCollection}`}
                  className="inline-block border border-[#11296B] text-[#11296B] hover:bg-[#11296B] hover:text-white px-8 py-3 rounded-full transition-colors duration-300"
                >
                  View All {collectionsData[activeCollection].name} Pieces
                </Link>
              </div> */}
      </section>
    );
}

export default CollectionProduct
