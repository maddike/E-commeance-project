import React, { useState } from "react";
import ProductCard from "./Productcard";
import "./Milkshakes.css";

function Milkshakes() {
  const milkshakeItems = [
    { id: 1, name: "Chocolate Milkshake", price: 120, img: "/Images/cm1.jpg", description: "Rich chocolatey goodness." },
    { id: 2, name: "Strawberry Milkshake", price: 110, img: "/Images/sm.jpg", description: "Fresh and fruity strawberry taste." },
    { id: 3, name: "Vanilla Milkshake", price: 100, img: "/Images/vm3.jpg", description: "Classic creamy vanilla flavor." },
    { id: 4, name: "Mango Milkshake", price: 130, img: "/Images/Mm4.jpg", description: "Sweet and tropical mango delight." },
    { id: 5, name: "Banana Milkshake", price: 90, img: "/Images/Bm5.jpg", description: "Smooth banana blend." },
    { id: 6, name: "Oreo Milkshake", price: 150, img: "/Images/Om6.jpg", description: "Cookies and cream indulgence." },
    { id: 7, name: "KitKat Milkshake", price: 160, img: "/Images/KKM.7.jpg", description: "Chocolate & crunch in one sip." },
    { id: 8, name: "Blueberry Milkshake", price: 140, img: "/Images/BB8.jpg", description: "Tangy and sweet blueberry flavor." },
    { id: 9, name: "Butterscotch Milkshake", price: 130, img: "/Images/BS9.jpg", description: "Sweet and nutty butterscotch." },
    { id: 10, name: "Coffee Milkshake", price: 140, img: "/Images/CMM10.jpg", description: "Rich coffee blended with milk." },
    { id: 11, name: "Badam Milkshake", price: 150, img: "/Images/BM11.jpg", description: "Nutty almond delight." },
    { id: 12, name: "Rose Milkshake", price: 100, img: "/Images/RM12.jpg", description: "Fragrant rose flavored milkshake." },
    { id: 13, name: "Caramel Milkshake", price: 160, img: "/Images/CM13,jpg.jpg", description: "Smooth caramel taste." },
    { id: 14, name: "Pista Milkshake", price: 170, img: "/Images/PM14.jpg", description: "Nutty pistachio flavor." },
    { id: 15, name: "Kesar Milkshake", price: 180, img: "/Images/KM15.jpg", description: "Rich saffron taste." },
    { id: 16, name: "Papaya Milkshake", price: 90, img: "/Images/pm16.jpg", description: "Fresh papaya flavor." },
    { id: 17, name: "Apple Milkshake", price: 110, img: "/Images/AM17.jpg", description: "Sweet and fruity apple taste." },
    { id: 18, name: "Grapes Milkshake", price: 120, img: "/Images/GM18.jpg", description: "Refreshing grape flavor." },
    { id: 19, name: "Dry Fruit Milkshake", price: 200, img: "/Images/DFM19.jpg", description: "Loaded with mixed dry fruits." },
    { id: 20, name: "Dates Milkshake", price: 160, img: "/Images/DM20.jpg", description: "Sweet dates blended perfectly." },
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const pageItems = milkshakeItems.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(milkshakeItems.length / itemsPerPage);

  return (
    <div className="milk-container">
      <h1 className="milk-title">Milkshakes</h1>

      <div className="milk-grid">
        {pageItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {/* Pagination */}
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

export default Milkshakes;
