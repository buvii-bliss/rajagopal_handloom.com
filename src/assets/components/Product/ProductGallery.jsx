import React, { useEffect, useState } from "react";

function ProductGallery({
    product,
    selectedVariant,
    setSelectedVariant,
}) {
    const variants =
        product.variants?.length > 0
            ? product.variants
            : [
                  {
                      id: "default",
                      name: "Default",
                      images: [product.image],
                  },
              ];

    const initialVariant = selectedVariant || variants[0];

    const [activeVariant, setActiveVariant] =
        useState(initialVariant);

    const [activeImage, setActiveImage] = useState(
        initialVariant.images[0]
    );

    useEffect(() => {
        const variant = selectedVariant || variants[0];

        setActiveVariant(variant);
        setActiveImage(variant.images[0]);
    }, [selectedVariant]);

    const handleVariantChange = (variant) => {
        setActiveVariant(variant);
        setActiveImage(variant.images[0]);
        setSelectedVariant(variant);
    };

    return (
        <div className="w-full">
            {/* PRODUCT IMAGE + THUMBNAILS */}
            <div className="flex gap-3">
                {/* THUMBNAILS */}
                <div className="flex w-[64px] flex-shrink-0 flex-col gap-3">
                    {activeVariant.images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveImage(image)}
                            className={`h-[64px] w-[64px] overflow-hidden rounded-md border-2 bg-white transition ${
                                activeImage === image
                                    ? "border-[#650b13]"
                                    : "border-[#eadfce] hover:border-[#b58a50]"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${product.name} view ${
                                    index + 1
                                }`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>

                {/* MAIN IMAGE */}
                <div className="flex-1 overflow-hidden rounded-md border border-[#eadfce] bg-[#f7efe3]">
                    <div className="aspect-[4/5] w-full">
                        <img
                            src={activeImage}
                            alt={product.name}
                            className="h-full w-full object-cover transition-all duration-300"
                        />
                    </div>
                </div>
            </div>

            {/* SAME PRODUCT - DIFFERENT COLOURS */}
            {variants.length > 1 && (
                <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-[#3d2020]">
                                Available Colours
                            </h3>

                            <p className="mt-0.5 text-xs text-gray-500">
                                Colour:{" "}
                                <span className="font-semibold text-[#650b13]">
                                    {activeVariant.name}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {variants.map((variant) => {
                            const isActive =
                                activeVariant.id === variant.id;

                            return (
                                <button
                                    key={variant.id}
                                    type="button"
                                    onClick={() =>
                                        handleVariantChange(
                                            variant
                                        )
                                    }
                                    className="group flex-shrink-0 text-center"
                                >
                                    <div
                                        className={`h-[82px] w-[72px] overflow-hidden rounded-md border-2 bg-white transition-all ${
                                            isActive
                                                ? "border-[#650b13] shadow-md"
                                                : "border-[#e4d5c1] group-hover:border-[#b58a50]"
                                        }`}
                                    >
                                        <img
                                            src={
                                                variant.images[0]
                                            }
                                            alt={variant.name}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <p
                                        className={`mt-1.5 text-[11px] ${
                                            isActive
                                                ? "font-bold text-[#650b13]"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {variant.name}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductGallery;