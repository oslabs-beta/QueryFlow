# Sample Test Data

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
SELECT film.title, category.name AS category, actor.first_name || ' ' || actor.last_name AS actor_name, rental.rental_date
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
SELECT customer.customer_id, customer.first_name, customer.last_name, SUM(payment.amount) AS total_revenue
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
SELECT customer.customer_id, customer.first_name, customer.last_name
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
SELECT customer.customer_id, customer.first_name, customer.last_name, category.name AS category, film.title, COUNT(rental.rental_id) AS rental_count, SUM(payment.amount) AS total_revenue
FROM customer
JOIN rental ON customer.customer_id = rental.customer_id
JOIN inventory ON rental.inventory_id = inventory.inventory_id
JOIN film ON inventory.film_id = film.film_id
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
JOIN payment ON rental.rental_id = payment.rental_id
WHERE customer.last_name LIKE 'S%'
  AND film.release_year = 2006
  AND category.name IN ('Action', 'Drama', 'Comedy')
GROUP BY customer.customer_id, category.category_id, film.film_id
ORDER BY total_revenue DESC
LIMIT 10;
```

### 2. AdventureWorks

![adventureworks_schema](data/AdventureWorks-ER-Diagram.jpeg)

#### AdventureWorks Strings

1.

### 3. Chinook

![chinook_schema](data/Chinook-ER-Diagram.png)

#### Chinook Strings

1.

### 4. NorthWind

![northwind_schema](data/NorthWind-ER-Diagram.png)

#### NorthWind Strings

1.

### 5. !Northwind_Variation!

![northwind_variation](data/Northwind-v2-ER-Diagram.png)

#### !Northwind_Variation! Strings

1.
