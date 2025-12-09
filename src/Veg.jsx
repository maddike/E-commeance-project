import React, { useState } from "react";
import ProductCard from "./Productcard";
import "./Veg.css";

function Veg({ addToCart }) {
  const vegItems = [
    { id: 1, name: "Paneer Curry", price: 150, img: "/Images/pannercurry.jpg", description: "Rich and creamy paneer gravy." },
    { id: 2, name: "Veg Biryani", price: 120, img: "/Images/Vegbiryani.jpg", description: "Flavorful biryani with mixed veggies." },
    { id: 3, name: "Aloo Fry", price: 100, img: "/Images/Potato.jpg", description: "Crispy and spicy potato fry." },
    { id: 4, name: "Mushroom Curry", price: 160, img: "/Images/Mushroom.jpg", description: "Delicious mushroom cooked with spices." },
    { id: 5, name: "Dal Tadka", price: 90, img: "/Images/Daltadka.jpg", description: "Classic dal with aromatic tadka." },
    { id: 6, name: "Veg Momos", price: 140, img: "/Images/Veg momos.jpg", description: "Soft steamed dumplings with veggies." },
    { id: 7, name: "Gobi Manchurian", price: 130, img: "/Images/Gobi.jpg", description: "Crispy gobi tossed in spicy sauce." },
    { id: 8, name: "Sambar Rice", price: 110, img: "/Images/Sambar.jpg", description: "South Indian favorite meal combo." },
    { id: 9, name: "Palak Paneer", price: 170, img: "/Images/Panner.jpg", description: "Paneer cooked in spinach gravy." },
    { id: 10, name: "Veg Thali", price: 200, img: "/Images/vegthail.jpg", description: "Complete Indian meal with curries." },
    { id: 11, name: "Curd Rice", price: 80, img: "/Images/Curdrice.jpg", description: "Refreshing curd mixed with rice." },
    { id: 12, name: "Kaju Curry", price: 190, img: "/Images/Kaju.jpg", description: "Royal curry with cashew richness." },
    { id: 13, name: "Chana Masala", price: 120, img: "/Images/ChanaMasala.jpg", description: "Tangy and spicy chickpea curry." },
    { id: 14, name: "Veg Fried Rice", price: 130, img: "/Images/Vegfriedrice.jpg", description: "Fried rice with fresh vegetables." },
    { id: 15, name: "Tomato Curry", price: 90, img: "/Images/Tomotocurry.jpg", description: "Simple curry with tangy tomatoes." },
    { id: 16, name: "Onion Pakoda", price: 70, img: "/Images/Onion.jpg", description: "Crispy fried onion fritters." },
    { id: 17, name: "Masala Dosa", price: 100, img: "/Images/Mqasaladosa.jpg", description: "Crispy dosa filled with masala." },
    { id: 18, name: "Upma", price: 60, img: "/Images/upma.jpg", description: "Soft and fluffy semolina upma." },
    { id: 19, name: "Idly Sambar", price: 50, img: "/Images/Sambarldil.jpg", description: "Soft idlis served with hot sambar." },
    { id: 20, name: "Pesarattu", price: 90, img: "/Images/pesarattu.jpg", description: "Green moong dosa specialty." },
  ];

  const itemsPerPage = 10; // 5 up + 5 down
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const pageItems = vegItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  return (
    <div className="veg-container">

      <h1 className="veg-title">Veg Items</h1>

      {/* GRID — 5 up + 5 down */}
      <div className="veg-grid">
        {pageItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default Veg;
