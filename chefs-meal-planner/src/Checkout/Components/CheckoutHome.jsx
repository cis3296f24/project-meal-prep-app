import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchShoppingList } from '../Functionality/FetchShoppingList';
import { jsPDF } from "jspdf";
import '../../Style/checkout.css';

/**
 * Component to generate and display a shopping list based on selected meal ingredients.
 *
 * @component
 * @module CheckoutHome
 * @memberof Checkout
 * @returns {JSX.Element} Shopping list for selected meals
 */

const CheckoutHome = () => {
    const location = useLocation();
    const ingredients = useMemo(() => location.state?.ingredients || [], [location.state]);
    const [shoppingList, setShoppingList] = useState(null);
    const [loading, setLoading] = useState(false); // Initially not loading
    const [numPeople, setNumPeople] = useState('2');

    const handleGetList = async () => {
        try {
            setLoading(true); // Start loading
            const scaledIngredients = ingredients.map(
                (ingredient) => `${ingredient} for ${numPeople} people`
            );

            const list = await fetchShoppingList(scaledIngredients, numPeople); // Call fetchShoppingList
            setShoppingList(list); // Update shopping list state
        } catch (error) {
            console.error("Error fetching shopping list:", error);
            setShoppingList("An error occurred while generating the shopping list.");
        } finally {
            setLoading(false); // End loading
        }
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();
    
        // Fill the background with a color resembling old paper
        doc.setFillColor(239, 224, 185); // RGB color for old paper-like shade
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Background fill
    
        // Page width and margins
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageMargin = 10; // Margin on each side
    
        // Title: Centered, Bold, and Underlined at the top
        const title = `Shopping List`;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
    
        // Center the title
        const titleWidth = doc.getTextWidth(title);
        const titleX = (pageWidth - titleWidth) / 2;
        doc.text(title, titleX, 20);
    
        // Underline the title
        const underlinePadding = 2; // Extra padding for underline width
        doc.setLineWidth(0.5);
        doc.line(titleX - underlinePadding, 22, titleX + titleWidth + underlinePadding, 22);
    
        // Shopping list content
        const shoppingListLines = shoppingList.split('\n');
        let yOffset = 40; // Start below the title, 20 units down
    
        shoppingListLines.forEach((line) => {
            // Split the line into smaller parts that fit within the page width minus margins
            const wrappedText = doc.splitTextToSize(line, pageWidth - pageMargin * 2);
    
            // Add each line of the wrapped text to the PDF
            wrappedText.forEach((wrappedLine) => {
                doc.text(wrappedLine, pageMargin, yOffset); // Left-aligned with margin
                yOffset += 10; // Increment the y position for the next line
    
                // Handle page overflow
                if (yOffset > doc.internal.pageSize.getHeight() - 10) { // Leave bottom margin
                    doc.addPage();
                    yOffset = 20; // Reset y position for new page
                }
            });
        });
    
        // Save the PDF
        doc.save(`shopping_list_${numPeople}_people.pdf`);
    };
    

    return (
        <div className='checkout'>
            
            <div className="form-group">
                <h1 id="checkout-title">Checkout</h1>
                <label htmlFor="num-people-select">Select Number of People:</label>
                <select
                    id="num-people-select"
                    value={numPeople}
                    onChange={(e) => setNumPeople(e.target.value)}
                >
                    {Array.from({ length: 20 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <button id="get-list-button" onClick={handleGetList}>
                Get List
            </button>
            </div>
            
            {loading && <p>Loading your custom shopping list...</p>}
            {shoppingList && !loading && (
                <>
                    <h2 id="checkout-title">Your Shopping List for {numPeople} People</h2>
                    <div className="shopping-list">
                        <pre>{shoppingList}</pre>
                        <button className = "saveAsPDF" onClick={saveAsPDF}>Save as PDF</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutHome;
