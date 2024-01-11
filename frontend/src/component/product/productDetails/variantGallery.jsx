import React from "react";

const ColorVariant = ({ variant, onClick, selected }) => {
    const firstColor = variant.hex.split(',')[0]
    return (
      <div
        onClick={() => onClick(variant)}
        className={`color-variant x-center flex column wrap g5 ${selected ? 'selected' : ''}`}
      >
        <div style={{backgroundColor: "#"+firstColor}} className="color-box"></div>
        <img src={variant.thumbImage} alt={variant.name} />
      </div>
    );
  };

const ColorVariantsGallery = ({variants, onSelectVariant, selectedVariant})=>{
    return(
        <div className="color-variants-gallery flex column g10">
            <div className="flex g10 x-center">
                <h4>Color Family: </h4>
                <h3>{selectedVariant && selectedVariant.name ? selectedVariant.name : "Select One"}</h3>
            </div>
            <div className="flex wrap g10">
                {variants.map((variant, index) => (
                    <ColorVariant
                    key={index}
                    variant={variant}
                    onClick={onSelectVariant}
                    selected={selectedVariant && selectedVariant.id === variant.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default ColorVariantsGallery