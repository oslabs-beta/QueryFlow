# Sample Test Data

## Setup Test Data

Input the following string in your terminal with your PostGresql URI/URL inside of it. Make sure the ending of the command string is the directory/filename of the sql database you are pushing into your database.

```
psql -d <add uri/url database string> -f code/pagila-data.sql
```

## URI/URL for the Sample Data

### ElephantSql - Postgresql

1. Pagila - postgres://yttdzhlk:HnLO6cyc9fLwqqNjttS-HhsEnie7-aT5@mahmud.db.elephantsql.com/yttdzhlk

2. AdventureWorks - postgres://vgqxlwix:Hn_zV3cg6Qj9DMwTg_Eieb0OZ2qfGXuY@mahmud.db.elephantsql.com/vgqxlwix

3. Chinook - postgres://dgkviowb:wVU25sYLdkFR4ciqz8fu8oNdgYZ-mgji@mahmud.db.elephantsql.com/dgkviowb

4. NorthWind - postgres://jxuiaufl:m5CK5SJBdrsrQFQr-54ZBQbLUsrb3Pbm@mahmud.db.elephantsql.com/jxuiaufl

5. !Northwind_Variation! - postgres://ycswaqkr:7DekUJLoJeapJ38p51usRL-Wqb3eKbCv@mahmud.db.elephantsql.com/ycswaqkr

## Test Databases

### 1. Pagila

![pagila_schema](data/Pagila-ER-Diagram.png)

#### Pagila Strings

1.  This query retrieves the title of films, their corresponding category names, the full names of actors, and the rental dates for films in the 'Action' category rented between May 5, 2005, and May 25, 2005. The results are ordered in descending order based on the rental date.

```
SELECT film.title, category.name AS category, actor.firstName || ' ' || actor.lastName AS actor_name, rental.rental_date
FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id
JOIN inventory ON film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
WHERE category.name = 'Action'
AND rental.rental_date >= '2005-05-24 21:54:33 +0000' AND rental.rental_date <= '2005-05-25 08:41:01 +0000'
ORDER BY rental.rental_date DESC;
```

2.  Query to retrieve the top 10 customers with the highest total rental revenue

```
SELECT customer.customer_id, customer.firstName, customer.lastName, SUM(payment.amount) AS total_revenue
FROM customer
JOIN payment ON customer.customer_id = payment.customer_id
GROUP BY customer.customer_id
ORDER BY total_revenue DESC
LIMIT 10;
```

3.  Query to retrieve the films that have been rented more than 100 times, along with the total number of rentals for each film:

```
SELECT film.title, COUNT(rental.rental_id) AS rental_count
FROM film
JOIN inventory ON film.film_id = inventory.film_id
JOIN rental ON inventory.inventory_id = rental.inventory_id
GROUP BY film.film_id
HAVING COUNT(rental.rental_id) < 80
ORDER BY rental_count DESC;
```

4.  Query to retrieve the customers who have rented films from at least three different categories:

```
SELECT customer.customer_id, customer.firstName, customer.lastName
FROM customer
JOIN rental ON customer.customer_id = rental.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film_category ON inventory.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
GROUP BY customer.customer_id
HAVING COUNT(DISTINCT category.category_id) >= 3;
```

5.  This query retrieves customer information, film details, and rental statistics for customers whose last name starts with 'S', films released in 2006 belonging to the 'Action', 'Drama', or 'Comedy' categories. It groups the results by customer, category, and film and applies conditions such as having at least three rentals. The results are then ordered by total revenue in descending order and limited to the top 10 records.

```
SELECT customer.customer_id, customer.firstName, customer.lastName, category.name AS category, film.title, COUNT(rental.rental_id) AS rental_count, SUM(payment.amount) AS total_revenue
FROM customer
JOIN rental ON customer.customer_id = rental.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
JOIN payment ON rental.rental_id = payment.rental_id
WHERE customer.lastName LIKE 'S%'
  AND film.release_year = 2006
  AND category.name IN ('Action', 'Drama', 'Comedy')
GROUP BY customer.customer_id, category.category_id, film.film_id
ORDER BY total_revenue DESC
LIMIT 10;
```

### 2. AdventureWorks

![adventureworks_schema](data/AdventureWorks-ER-Diagram.jpeg)

#### AdventureWorks Strings

1.  Retrieve a list of products along with their categories and subcategories:

```
SELECT
    P.ProductID, P.Name AS ProductName,
    C.Name AS CategoryName, SC.Name AS SubcategoryName
FROM
    Production.Product AS P
    INNER JOIN Production.ProductSubcategory AS SC ON P.ProductSubcategoryID = SC.ProductSubcategoryID
    INNER JOIN Production.ProductCategory AS C ON SC.ProductCategoryID = C.ProductCategoryID;
```

2.  Find all employees with their job titles and the department they belong to:

```
SELECT
    E.BusinessEntityID, E.JobTitle, D.Name AS DepartmentName
FROM
    HumanResources.Employee AS E
    INNER JOIN HumanResources.EmployeeDepartmentHistory AS EDH ON E.BusinessEntityID = EDH.BusinessEntityID
    INNER JOIN HumanResources.Department AS D ON EDH.DepartmentID = D.DepartmentID;
```

3.  Find the average order quantity for each product in the 'Mountain Bikes' subcategory:

```
SELECT
    P.Name AS ProductName, AVG(SOD.OrderQty) AS AvgOrderQuantity
FROM
    Production.Product AS P
    INNER JOIN Sales.SalesOrderDetail AS SOD ON P.ProductID = SOD.ProductID
    INNER JOIN Production.ProductSubcategory AS SC ON P.ProductSubcategoryID = SC.ProductSubcategoryID
WHERE
    SC.Name = 'Mountain Bikes'
GROUP BY
    P.Name;
```

4.  In this query, we retrieve sales order details along with customer information and product details. Additionally, we calculate the line total for each sales order detail, and assign a rank to each line total within each sales order using the RANK() window function. The results are filtered to include only orders placed between June 7th 2011 and June 22nd 2011, and are ordered by the sales order ID and rank.

```
SELECT
    S.SalesOrderID, S.OrderDate,
    P.Name AS ProductName, SOD.OrderQty, SOD.UnitPrice,
    (SOD.OrderQty * SOD.UnitPrice) AS LineTotal,
    RANK() OVER (PARTITION BY S.SalesOrderID ORDER BY (SOD.OrderQty * SOD.UnitPrice) DESC) AS Rank
FROM
    Sales.SalesOrderHeader AS S
    INNER JOIN Sales.Customer AS C ON S.CustomerID = C.CustomerID
    INNER JOIN Sales.SalesOrderDetail AS SOD ON S.SalesOrderID = SOD.SalesOrderID
    INNER JOIN Production.Product AS P ON SOD.ProductID = P.ProductID
WHERE
    S.OrderDate >= '2011-06-07' AND S.OrderDate < '2011-06-22'
ORDER BY
    S.SalesOrderID, Rank;
```

5.  This query retrieves various columns from the database, including customer information, personal details, address information, state/province details. The LEFT JOINs are used to connect the tables and retrieve the relevant information.

```
SELECT
    C.CustomerID, C.ModifiedDate, C.rowguid,
    P.Title, P.FirstName, P.MiddleName, P.LastName, P.Suffix, P.EmailPromotion,
    A.AddressLine1, A.AddressLine2, A.City, A.StateProvinceID, A.PostalCode, A.ModifiedDate, A.rowguid,
    S.Name AS StateProvinceName, S.CountryRegionCode, S.ModifiedDate, S.rowguid
FROM
    Sales.Customer AS C
    LEFT JOIN Person.Person AS P ON C.PersonID = P.BusinessEntityID
    LEFT JOIN Person.BusinessEntityAddress AS BEA ON C.PersonID = BEA.BusinessEntityID
    LEFT JOIN Person.Address AS A ON BEA.AddressID = A.AddressID
    LEFT JOIN Person.StateProvince AS S ON A.StateProvinceID = S.StateProvinceID

```

### 3. Chinook

![chinook_schema](data/Chinook-ER-Diagram.png)

#### Chinook Strings

1.  Retrieve the playlist information along with the corresponding tracks and album details:

```
SELECT
    PT."PlaylistId", PL."Name" AS "PlaylistName",
    T."TrackId", T."Name" AS "TrackName", T."Composer", T."Milliseconds", T."Bytes", T."UnitPrice",
    A."AlbumId", A."Title" AS "AlbumTitle"
FROM
    "PlaylistTrack" AS PT
    LEFT JOIN "Playlist" AS PL ON PT."PlaylistId" = PL."PlaylistId"
    LEFT JOIN "Track" AS T ON PT."TrackId" = T."TrackId"
    LEFT JOIN "Album" AS A ON T."AlbumId" = A."AlbumId";
```

2.  Retrieve the customer information along with the corresponding invoice details and track information:

```
SELECT
    C."CustomerId", C."FirstName", C."LastName", C."Company", C."Address", C."City", C."State", C."Country", C."PostalCode", C."Phone", C."Email",
    I."InvoiceId", I."InvoiceDate", I."Total",
    T."TrackId", T."Name" AS "TrackName", T."Composer", T."Milliseconds", T."Bytes", T."UnitPrice"
FROM
    "Customer" AS C
    LEFT JOIN "Invoice" AS I ON C."CustomerId" = I."CustomerId"
    LEFT JOIN "InvoiceLine" AS IL ON I."InvoiceId" = IL."InvoiceId"
    LEFT JOIN "Track" AS T ON IL."TrackId" = T."TrackId";

```

3.  Retrieve the employee information along with the corresponding customers, invoices, and track details

```
SELECT
    E."EmployeeId", E."FirstName", E."LastName",
    C."CustomerId", C."FirstName", C."LastName", C."Company", C."Address", C."City", C."State", C."Country", C."PostalCode", C."Phone", C."Email",
    I."InvoiceId", I."InvoiceDate", I."Total",
    T."TrackId", T."Name" AS "TrackName", T."Composer", T."Milliseconds", T."Bytes", T."UnitPrice"
FROM
    "Employee" AS E
    LEFT JOIN "Customer" AS C ON E."EmployeeId" = C."SupportRepId"
    LEFT JOIN "Invoice" AS I ON C."CustomerId" = I."CustomerId"
    LEFT JOIN "InvoiceLine" AS IL ON I."InvoiceId" = IL."InvoiceId"
    LEFT JOIN "Track" AS T ON IL."TrackId" = T."TrackId";
```

4.  This query retrieves data from multiple tables in the Chinook database, including "Employee," "Customer," "Invoice," "InvoiceLine," "Track," and "PlaylistTrack."

```
SELECT
    E."EmployeeId", E."LastName", E."FirstName",
    A."CustomerId", A."FirstName", A."LastName", A."Company", A."Address", A."City", A."State", A."Country", A."PostalCode", A."Phone", A."Email",
    I."InvoiceId", I."InvoiceDate", I."Total",
    T."TrackId", T."Name" AS "TrackName", T."Composer", T."Milliseconds", T."Bytes", T."UnitPrice",
    AL."PlaylistId", AL."TrackId" AS "PlaylistTrackId"
FROM
    "Employee" AS E
    LEFT JOIN "Customer" AS A ON E."EmployeeId" = A."SupportRepId"
    LEFT JOIN "Invoice" AS I ON A."CustomerId" = I."CustomerId"
    LEFT JOIN "InvoiceLine" AS IL ON I."InvoiceId" = IL."InvoiceId"
    LEFT JOIN "Track" AS T ON IL."TrackId" = T."TrackId"
    LEFT JOIN "PlaylistTrack" AS AL ON T."TrackId" = AL."TrackId";
```

### 4. NorthWind

![northwind_schema](data/NorthWind-ER-Diagram.png)

#### NorthWind Strings

1.

```
SELECT
    e.employee_id, e.lastName, e.firstName, t.territory_id, t.territory_description, r.region_id, r.region_description
FROM
    employees e
LEFT JOIN
    employee_territories et ON e.employee_id = et.employee_id
LEFT JOIN
    territories t ON et.territory_id = t.territory_id
LEFT JOIN
    region r ON t.region_id = r.region_id;
```

2.  Get customers with their orders, order details, and associated products

```
SELECT
    c.customer_id, c.company_name, o.order_id, o.order_date, od.product_id, od.unit_price, od.quantity, p.product_name
FROM
    customers c
LEFT JOIN
    orders o ON c.customer_id = o.customer_id
LEFT JOIN
    order_details od ON o.order_id = od.order_id
LEFT JOIN
    products p ON od.product_id = p.product_id;
```

3.  Retrieve employees with their orders, order details, associated products, and customers

```
SELECT
    e.employee_id, e.lastName, e.firstName, o.order_id, o.order_date, od.product_id, od.unit_price, od.quantity, p.product_name, c.customer_id, c.company_name
FROM
    employees e
LEFT JOIN
    orders o ON e.employee_id = o.employee_id
LEFT JOIN
    order_details od ON o.order_id = od.order_id
LEFT JOIN
    products p ON od.product_id = p.product_id
LEFT JOIN
    customers c ON o.customer_id = c.customer_id;
```

4.  This query fetches a wide range of data related to customers, orders, products, suppliers, employees, regions, shippers, categories, and territories.

```
SELECT
    c.customer_id, c.company_name, o.order_id, o.order_date, od.product_id, od.unit_price, od.quantity,
    p.product_name, s.supplier_id,
    e.employee_id, e.firstName, e.lastName, sh.shipper_id
FROM
    customers c
LEFT JOIN
    orders o ON c.customer_id = o.customer_id
LEFT JOIN
    order_details od ON o.order_id = od.order_id
LEFT JOIN
    products p ON od.product_id = p.product_id
LEFT JOIN
    suppliers s ON p.supplier_id = s.supplier_id
LEFT JOIN
    employees e ON o.employee_id = e.employee_id
LEFT JOIN
    shippers sh ON o.ship_via = sh.shipper_id
LEFT JOIN
    categories cat ON p.category_id = cat.category_id
```

### 5. !Northwind_Variation!

![northwind_variation](data/Northwind-v2-ER-Diagram.png)

#### !Northwind_Variation! Strings

1.  Retrieve products with their suppliers and categories

```
SELECT
    p.productid, p.productname, s.supplierid, c.categoryid, c.categoryname
FROM
    products p
LEFT JOIN
    suppliers s ON p.supplierid = s.supplierid
LEFT JOIN
    categories c ON p.categoryid = c.categoryid;
```

2.  Query to retrieve products along with their sales data and the associated employees

```
SELECT
    p.productid, p.productname, s.quantity, s.orderid, e.employeeid, e.lastname, e.firstname
FROM
    products p
LEFT JOIN
    orderdetails s ON p.productid = s.productid
LEFT JOIN
    orders o ON s.orderid = o.orderid
LEFT JOIN
    employees e ON o.employeeid = e.employeeid;
```

3.  Query to retrieve customers along with their associated orders and order details

```
SELECT
    c.customerid, c.companyname, o.orderid, o.orderdate, od.productid, od.unitprice, od.quantity
FROM
    customers c
LEFT JOIN
    orders o ON c.customerid = o.customerid
LEFT JOIN
    orderdetails od ON o.orderid = od.orderid;
```

4.  This query retrieves information about customers, orders, order details, products, employees, and shippers from the Northwind database. It uses inner joins to connect the Customers, Orders, OrderDetails, and Products tables, ensuring that only matching records are included. It also uses left joins to include information from the Employees and Shippers tables, even if there is no corresponding record in the Orders table.

```
SELECT
    c.customerid, o.orderid, o.orderdate, od.productid, od.quantity, p.productname, e.employeeid, e.firstname, e.lastname, sh.shipperid, sh.shippername
FROM
    customers AS c
INNER JOIN
    orders AS o ON c.customerid = o.customerid
INNER JOIN
    orderdetails AS od ON o.orderid = od.orderid
INNER JOIN
    products AS p ON od.productid = p.productid
LEFT JOIN
    employees AS e ON o.employeeid = e.employeeid
LEFT JOIN
    shippers AS sh ON o.shipperid = sh.shipperid;
```
