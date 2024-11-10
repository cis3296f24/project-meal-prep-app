# Meal Prep App
This is an app that generates new recipes.  Users can save recipes they want to try.  Then, they can select recipes to get instructions as well as a custom shopping list. 

![MealPrepLogo](https://github.com/user-attachments/assets/96a874b3-763e-42e8-b5d2-14f36909df07)


## Home
The home page containt a button get new recipe ideas. When pressed a new recipe is generated.
## About
The about page gives a description of the app as well as who the app is inteneded for and some testomonials.
## Meal Plan
The meal plan page display all the current recipes stored in users database.  The user can select the recipes they want for the week and then Checkout when they're ready to produce their shopping list.
## Checkout
This page generates a custome shopping list based on the users selection.

# How to run

To run on your local machine, go to the [How to Build](#how-to-build): 

# How to contribute
Follow this project board to know the latest status of the project: (https://github.com/orgs/cis3296f24/projects/114) 

### How to build
1. Clone this repository to your local machine
2. Download Node.js for your respective system, [Here](https://nodejs.org/en/download/current) 
3. Make sure npm and node are now on your local machine
    1. `npm -v`
    2. `node -v`
4. `cd chefs-meal-planner`(the lowercase one)
5. `npm install` will install the necessary packages 
6. `npm start` will open the app in a new tab with a localhost server
7. Open an additional terminal to run the server locally to connect to the database. 
8. `cd .vscode\Backend`
9. `npm start`(server is running on http://localhost:5000)