import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchShoppingList } from '../Functionality/FetchShoppingList';
import { jsPDF } from "jspdf";
import '../../Style/mealPlan.css';

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
    const [numPeople, setNumPeople] = useState('');
    const [showHeading, setShowHeading] = useState(false); // Track heading visibility
    const [displayedNumberOfPeople, setDisplayNumberOfPeople] = useState('')
    const handleChange = (event) => {
        setNumPeople(event.target.value);
    };

    const handleKeyPress = async (event) => {
        if (event.key === "Enter") {
            let inputValue = numPeople.trim(); // Get input value
            setDisplayNumberOfPeople(inputValue)
            if (!inputValue || isNaN(inputValue) || !Number.isInteger(Number(inputValue)) || parseInt(inputValue) <= 0) {
                alert("Please enter a valid number of people.");
                return;
            }

            try {
                setLoading(true); // Start loading
                const scaledIngredients = ingredients.map(
                    (ingredient) => `${ingredient} for ${inputValue} people`
                ); // Example: scale ingredients based on input value

                const list = await fetchShoppingList(scaledIngredients, inputValue); // Call fetchShoppingList
                setShoppingList(list); // Update shopping list state
                setShowHeading(true); // Only show heading once the shopping list has loaded successfully
            } catch (error) {
                console.error("Error fetching shopping list:", error);
                setShoppingList("An error occurred while generating the shopping list.");
                setShowHeading(false); // Hide heading if there's an error
            } finally {
                setLoading(false); // End loading
            }
        }
    };

    const saveAsPDF = () => {
        const doc = new jsPDF();

        // Fill the background with a color resembling old paper (light brownish/yellowish color)
        doc.setFillColor(239, 224, 185); // RGB color to create an old paper-like shade
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F'); // Draw a filled rectangle over the entire page

        // Get the page width to calculate the center point
        const pageWidth = doc.internal.pageSize.getWidth();

        // Title: Centered, Bold, and Underlined at the top of the page
        const title = `Shopping List`;
        const titleWidth = doc.getTextWidth(title);
        const titleX = (pageWidth - titleWidth) / 2; // Calculate X position for centering

        // Set font to bold and draw the title
        doc.setFont("helvetica", "bold");
        doc.text(title, titleX, 20);

        // Draw an underline with extra width to avoid hanging letters
        const underlinePadding = 2; // Add extra padding to the left and right for better coverage
        doc.setLineWidth(0.5);
        doc.line(titleX - underlinePadding, 22, titleX + titleWidth + underlinePadding, 22); // Draw underline with extra padding

        // Shopping list content: Centered text for each line
        const shoppingListLines = shoppingList.split('\n');
        let yOffset = 40; // Start below the title, 20 units down

        shoppingListLines.forEach((line) => {
            const lineWidth = doc.getTextWidth(line);
            const lineX = (pageWidth - lineWidth) / 2; // Calculate X position for centering
            doc.text(line, lineX, yOffset);
            yOffset += 10; // Increase y position for the next line
        });

        // Save the PDF
        doc.save(`shopping_list_${numPeople}_people.pdf`);
    };

    return (
        <div className='checkout'>
            <h1 className="checkout-title">Checkout</h1>
            <input
                type="text"
                className ="amount-per-person"
                name="entry-box"
                value={numPeople} // Make the input a controlled component
                onChange={handleChange} // Update state on change
                onKeyDown={handleKeyPress} // Attach keypress event
                placeholder="Enter number of people and press Enter"
            />
            {loading && <p>Loading your custom shopping list...</p>}
            {!loading && showHeading && (
                <>
                    <h2>Your Shopping List for {displayedNumberOfPeople} People</h2>
                    <button className = "saveAsPDF" onClick={saveAsPDF}>Save as PDF</button>
                </>
            )}
            {!loading && shoppingList && (
                <div className="shopping-list">
                    <pre>{shoppingList}</pre>
                </div>
            )}
        </div>
    );
};

export default CheckoutHome;
