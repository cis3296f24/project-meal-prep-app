const { Link } = ReactRouterDOM;

function Home() {
    return (
        <div className="home">
            <div id="content_div">
                <h2>Plan Your Meals, Save Time, Eat Healthier.</h2>
            </div>

            <div className="row">
                <div className="column column33">
                    <p>
                        <img src="docs/MealPrepLogo.jpeg" alt="Meal Prep App Logo"/> 
                    </p>
                </div>
                <div className="column column66">
                    <p>
                        <strong>Meal Prep App</strong> is designed to simplify and organize your weekly meal planning. This app provides a convenient way to find recipes, plan meals, and create a grocery list to save time and eat healthier. With easy access to a variety of recipes and a structured weekly plan, the Meal Prep App is your personal assistant in the kitchen, helping you make meal prep an effortless and enjoyable part of your lifestyle.
                    </p>
                </div>
            </div>

            <div className="button-container">
                {/* Link to Blog page */}
                <Link to="/blog">
                    <button className="recipe-button">Get Recipes</button>
                </Link>
                <button className="plan-button">Weekly Plan</button>
            </div>
        </div>
    );
}

