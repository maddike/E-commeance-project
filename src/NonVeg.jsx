import React, { useState } from "react";
import ProductCard from "./Productcard";
import "./Nonveg.css";

function NonVeg({ addToCart }) {
  const nonVegItems = [
    { id: 1, name: "Chicken Biryani", price: 180, img: "/Images/ChinkenBr.jpg", description: "Spicy and flavorful chicken biryani." },
    { id: 2, name: "Mutton Biryani", price: 250, img: "/Images/MuttonBr.jpg", description: "Rich and aromatic mutton biryani." },
    { id: 3, name: "Chicken Curry", price: 160, img: "/Images/Chickencuury.jpg", description: "Delicious curry made with tender chicken." },
    { id: 4, name: "Mutton Curry", price: 280, img: "/Images/Muttoncurry.jpg", description: "Thick and spicy mutton gravy." },
    { id: 5, name: "Prawns Fry", price: 220, img: "/Images/Prawn.jpg", description: "Crispy prawns fried with spices." },
    { id: 6, name: "Fish Fry", price: 180, img: "/Images/Fishfry.jpg", description: "Golden fried fish with masala coating." },
    { id: 7, name: "Chicken 65", price: 150, img: "/Images/65.jpg", description: "Crispy and spicy chicken appetizer." },
    { id: 8, name: "Chicken Kabab", price: 170, img: "/Images/Chinkenkabad.jpg", description: "Juicy grilled chicken kababs." },
    { id: 9, name: "Mutton Kheema", price: 260, img: "/Images/muttonkeema.jpg", description: "Flavorful minced mutton cooked with spices." },
    { id: 10, name: "Prawns Biryani", price: 240, img: "/Images/prwanBriyani.jpg", description: "Aromatic biryani made with fresh prawns." },
    { id: 11, name: "Fish Curry", price: 200, img: "/Images/fishcurry.jpg", description: "Traditional fish curry cooked in spices." },
    { id: 12, name: "Butter Chicken", price: 230, img: "/Images/butterChinken.jpg", description: "Creamy and buttery chicken gravy." },
    { id: 13, name: "Chicken Lollipop", price: 160, img: "/Images/Chinkenloili.jpg", description: "Crispy chicken lollipops with spices." },
    { id: 14, name: "Egg Curry", price: 100, img: "/Images/Eggcurry.jpg", description: "Boiled eggs cooked in spicy curry." },
    { id: 15, name: "Omelette", price: 60, img: "/Images/eggomellrte.jpg", description: "Fluffy omelette with onions and chillies." },
    { id: 16, name: "Grilled Chicken", price: 240, img: "/Images/Gchicken.jpg", description: "Healthy and tasty grilled chicken." },
    { id: 17, name: "Chicken Burger", price: 140, img: "/Images/ChickenBurger.jpg", description: "Juicy chicken patty with fresh veggies." },
    { id: 18, name: "Fish Fingers", price: 180, img: "/Images/fishfigers.jpg", description: "Crispy fish sticks served hot." },
    { id: 19, name: "Chicken Shawarma", price: 120, img: "/Images/chickenS.jpg", description: "Soft wrap filled with shredded chicken." },
    { id: 20, name: "Mutton Fry", price: 260, img: "/Images/Muttonfry.jpg", description: "Dry-fried mutton with rich spices." },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const pageItems = nonVegItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);

  return (
    <div className="veg-container">
      <h1 className="veg-title">Non-Veg Items</h1>

      <div className="veg-grid">
        {pageItems.map((item) => (
          <ProductCard key={item.id} product={item} addToCart={() => addToCart(item)} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
}

export default NonVeg;
