# E-commerce API

API for an ecommerce platform 

# Tech Stack: Node.js & MySQL-workbench

# To run this project on your local machine

1. Clone this repository or download the project visiting :https://github.com/Sachinsb18/Ecommerce_API
2. Install all necessary dependencies using 'npm i' command on yopur terminal.
3. To run this project use command 'node index.js' or 'npm start' on your terminal.
4. Have MySQL workbench on your local machine
5. Once the server and database is connected, open the POSTMAN to use the following API endpoints after http://localhost:<port>/<endpoints> 

# API Endpoints

# User Routes

**API to create an user** 

URL [POST]: api/user/signup

-pass username, email, password in request body as json object

**API to login user** 

URL [POST]: api/user/signin

-pass email, password in request body as json object and on successfull login usser receives jwt token which should be passed in request headers for authorization.

# Product Routes

**API to add an product to the table**

URL [POST]: api/products

-pass title,description,price,quantity and category_id as json object in request body along with jwt token in authorization header

**API to update an existing product**

URL [PUT]: api/products/:id

-pass id of the products in url path and quantity as json object in request body along with jwt token in authorization header

**API to get all products** 

URL [GET]: api/products

**API to get a product by its id***

URL [GET]: api/products/:id

-pass id of the product in url path

**API to delete a product**

URL [DELETE]: api/products/:id

-pass id of the product in url path

# Cart Routes

**API to add an item to cart**

URL [POST]: api/cart/:id

-pass id of the product in url path and quantity in request body as json object along with jwt token in authorization header

**API to upddate an cart item quantity by its id**

URL [PUT]: api/cart/:id

-pass id of the product in url path and quantity as json object along with jwt token in authorization header

**API to delete an item fro cart by its id**

URL [DELETE]: api/cart/:id

-pass id of the product in url path along with jwt token in authorization header

#Order Routes

**API to place an order by cart id**
URL [post]: api/order/:id


-pass id of the cart item in url path along with jwt token in authorization header








