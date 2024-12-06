/**

 * @module AboutComponent
 * @memberof About
 * @returns {JSX.Element} The rendered AboutComponent component.
 */

import '../../Style/about.css';
import priyaImg from '../Assets/priya.jpg'; // Replace with actual images for reviews
import marcusImg from '../Assets/marcus.jpg';
import sofiaImg from '../Assets/sofia.jpg';
import lauraImg from '../Assets/laura.jpg';
import AlanImg from '../Assets/Alan.png';
import JoshImg from '../Assets/Josh.jpg';

function AboutComponent() {
    return (
        <div className="about-content">
            <h1>My Secret Recipes</h1>
            <p>
                Discover the ultimate solution to stress-free, healthy eating! Our Secret Recipes App is designed to simplify your life by offering personalized meal plans, 
                easy-to-follow recipes, and efficient grocery lists—all tailored to your lifestyle and goals. Whether you’re a fitness enthusiast, a 
                busy student, or just looking to explore new cuisines, our app empowers you to create delicious, balanced meals without the hassle. 
                Join the growing community of users transforming the way they eat and live! 
            </p>
            
            <div className="highlight-text">
                Check out what our users have to say below and get inspired by their stories and experiences!
            </div>

            {/* Peer Review Section */}
            <div className="peer-reviews-container">
                {/* Priya's Review */}
                <div className="peer-review">
                    <img src={priyaImg} alt="Priya" className="peer-review-image" />
                    <div className="peer-review-text">
                        <h3>Priya</h3>
                        <div className="rating">
                            ★★★★★
                        </div>
                        <p>
                            I tried this low-carb, gluten-free recipe on the Secret Recipes App, and it was amazing! As a busy software developer, this app has been a lifesaver for planning meals that align with my dietary goals. It saves me time, reduces food waste, and helps me stay on track. Plus, having meals ready for the week makes my life so much easier! 
                        </p>
                    </div>
                </div>

                {/* Marcus's Review */}
                <div className="peer-review">
                    <img src={marcusImg} alt="Marcus" className="peer-review-image" />
                    <div className="peer-review-text">
                        <h3>Marcus</h3>
                        <div className="rating">
                            ★★★★★
                        </div>
                        <p>
                            As an executive chef, my time is extremely limited, but this Secret Recipes App has been a game-changer. It helps me plan out healthy meals that fit into my busy schedule, saving me time and ensuring I'm eating the right food to fuel my long hours. Whether it's preparing meals for the week or getting fresh meal ideas, this app gives me the flexibility to eat healthy without the hassle. I highly recommend it to anyone juggling a busy career and health goals.
                        </p>
                    </div>
                </div>

                {/* Sofia's Review */}
                <div className="peer-review">
                    <img src={sofiaImg} alt="Sofia" className="peer-review-image" />
                    <div className="peer-review-text">
                        <h3>Sofia</h3>
                        <div className="rating">
                            ★★★★☆
                        </div>
                        <p>
                            As a busy college student passionate about sustainability, this Secret Recipes App has been a game-changer for me! It simplifies planning nutritious, plant-based meals while keeping my grocery shopping efficient and eco-friendly. The app helps me stick to a routine without feeling overwhelmed, and I love how the recipes are straightforward and easy to customize. This app has significantly improved my meal prep experience!                        
                            </p>
                    </div>
                </div>

                {/* Laura's Review */}
                <div className="peer-review">
                    <img src={lauraImg} alt="Laura" className="peer-review-image" />
                    <div className="peer-review-text">
                        <h3>Laura</h3>
                        <div className="rating">
                            ★★★★★
                        </div>
                        <p>
                            As a busy mom of three, this Secret Recipes App has been a game-changer for me! It makes meal planning so much easier, helping me save time and avoid the stress of figuring out what to cook every day. The ability to save favorite meals and plan around my kids' preferences has added so much variety to our dinners.
                        </p>
                    </div>
                </div>

                {/* Alan's Review */}
                <div className="peer-review">
                    <img src={AlanImg} alt="Alan" className="peer-review-image" />
                    <div className="peer-review-text">
                        <h3>Alan</h3>
                        <div className="rating">
                            ★★★★☆
                        </div>
                        <p>
                            As a personal trainer, I'm always on the go, and finding time to cook meals that fit my high-protein, low-carb diet is a challenge. I tried a simple meal from the Secret Recipes App, which contained egg, spinach, tomato, and avocado, and it was perfect! The app made it so easy to portion and track macros, and the meal was delicious and aligned with my fitness goals. It saved me time and kept me focused on my workouts. I highly recommend this app for anyone looking to streamline their meal prep while staying on track with their nutrition.
                        </p>
                    </div>
                </div>

                {/* Josh's Review */}
                <div className="peer-review">
                    <img src={JoshImg} alt="Josh" className="peer-review-image" />
                    <div className="peer-review-text">
                        <h3>Josh</h3>
                        <div className="rating">
                            ★★★★★
                        </div>
                        <p>
                            I tried this Mediterranean-inspired grilled chicken with roasted vegetables, and it was amazing! The Secret Recipes App made it so easy to plan and prepare this meal with the ingredients I had on hand. I love how the app introduces me to new cuisines while helping me stay organized and reduce food waste. As someone who enjoys exploring recipes, this app has been a fantastic addition to my kitchen!                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AboutComponent;