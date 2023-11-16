/*
A continuación se encuentran los scripts para crear la base de datos usada en esta aplicación.
En este orden se deben correr cada uno de los scripts
*/

--Script para crear la tabla Usuarios

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    password VARCHAR(100) NOT NULL, 
    birthdate DATE, 
    nickname VARCHAR(100) NOT NULL,
    active BOOLEAN NOT NULL 
);

--script para crear la tabla para peliculas
CREATE TABLE movie
(
    movie_id SERIAL PRIMARY KEY, 
    name VARCHAR(200) NOT NULL, 
    release_date DATE, 
    url_image VARCHAR(250)
); 

-- Script para crear la tabla de la lista de peliculas por usuario
CREATE TABLE aux_list_movie
(
    id SERIAL PRIMARY KEY, 
    list_movie_id INTEGER NOT NULL, 
    movie_id INTEGER NOT NULL
);


-- Script para crear la tabla de lista de peliculas 
CREATE TABLE list_movie
(
    list_movie_id SERIAL PRIMARY KEY, 
    name VARCHAR(200) NOT NULL, 
    created_date DATE, 
    qualification INTEGER NOT NULL, 
    quantity_users_evaluates INTEGER NOT NULL, 
    active BOOLEAN NOT NULL, 
    user_id INTEGER NOT NULL
);

--Script para adiconar la llave foranea a la tabla . Esta llave apunta a el user_id
--de la tabla users
ALTER TABLE list_movie 
ADD CONSTRAINT fk_user_id 
FOREIGN KEY (user_id) 
REFERENCES users(user_id);

--Script para adiconar la llave foranea a la tabla aux_list_movie. Esta tabla contiene dos columnas
--Cada una es una llave foranea. list_movie_id apunta a la tabla list_movie.

ALTER TABLE aux_list_movie 
ADD CONSTRAINT fk_list_movie_id 
FOREIGN KEY (list_movie_id) 
REFERENCES list_movie(list_movie_id);

--movie_id apunta a la tabla movie
ALTER TABLE aux_list_movie 
ADD CONSTRAINT fk_movie_id 
FOREIGN KEY (movie_id) 
REFERENCES movie(movie_id);


--Script para ingresar usuarios nuevos
INSERT INTO users (name, email, password, nickname, birthdate, active)
VALUES('Miguel Escobar', 'miguel@email.com', '1234567', 'migue0212', '1980-01-01', TRUE);

INSERT INTO users (name, email, password, nickname, birthdate, active)
VALUES('Paola Quiceno', 'paola21@email.com', '1234569', 'paola312', '1980-02-01', TRUE);

INSERT INTO users (name, email, password, nickname, birthdate, active)
VALUES('Yeison Vazques', 'yeiva@email.com', '1238569', 'yei2521', '1980-02-28', TRUE);

INSERT INTO users (name, email, password, nickname, birthdate, active)
VALUES('Pablo Quimbaya', 'pablito123@email.com', '1rt38569', 'polito65', '1990-02-28', TRUE);

--Script para ingresar peliculas
INSERT INTO movie (name, release_date, url_image)
VALUES('The Boy', '2021-02-25', 'https://img.freepik.com/vector-gratis/poster-pelicula-suspenso-profesional_742173-3470.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Alien', '1995-02-25', 'https://i.pinimg.com/474x/fd/82/c1/fd82c1116eb734b625552241e00e2a20.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Titanic', '1995-05-25', 'https://c8.alamy.com/compes/ejwp0h/poster-de-pelicula-titanic-1997-ejwp0h.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Mario Bros', '2023-05-25', 'https://www.latercera.com/resizer/2L3QLdfmg_HT0QkonNIgKsejGKI=/900x600/filters:focal(383x266:393x256)/cloudfront-us-east-1.images.arcpublishing.com/copesa/TXQTG6HRUFCU3LZ6327V5WCYUI.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Drácula', '2001-09-25', 'https://image.tmdb.org/t/p/original/mwXB7uQPke29pXIrGVz7BwEZVRR.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Barbie', '2023-05-25', 'https://ca-times.brightspotcdn.com/dims4/default/de0ec86/2147483647/strip/false/crop/1800x1013+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F8e%2F9a%2F65beaba5433aad42256fad099a31%2Fipiccy-image.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Bact To The Future III', '1989-11-25', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3J6E4NNZ2mJKU7Vp5JXwD_UdskPrvo7uS5Q&usqp=CAU');

INSERT INTO movie (name, release_date, url_image)
VALUES('Scream', '2004-05-25', 'https://www.themoviedb.org/t/p/original/1L5u2cdXfyMOFhiLYT0UBsjqZmC.jpg');

INSERT INTO movie (name, release_date, url_image)
VALUES('Terminator', '1989-11-25', 'https://www.originalfilmart.com/cdn/shop/products/terminator_1984_original_film_art_5000x.jpg?v=1640047518');

--Script para ingresar lista de peliculas
INSERT INTO list_movie (name, created_date, qualification, quantity_users_evaluates, active, user_id)
VALUES('lista Miguel', '2023-01-25', 6.6, 3, TRUE, 1 );

INSERT INTO list_movie (name, created_date, qualification, quantity_users_evaluates, active, user_id)
VALUES('lista Paola', '2023-02-15', 7.3, 3, TRUE, 2 );

INSERT INTO list_movie (name, created_date, qualification, quantity_users_evaluates, active, user_id)
VALUES('lista Yeison', '2023-03-15', 5.0, 3, TRUE, 3 );

INSERT INTO list_movie (name, created_date, qualification, quantity_users_evaluates, active, user_id)
VALUES('lista Pablo', '2023-04-15', 8.3, 3, TRUE, 4 );

--Script para ingresar identificadores que alistabn id de peliculas con id de lista de peliculas
--Miguel 1, Paola 2, Yeison 3, Pablo 4
INSERT INTO aux_list_movie (list_movie_id, movie_id)
VALUES( 1, 1),( 1, 4),( 1, 7),( 2, 2),( 2, 5),( 2, 8),( 3, 3),( 3, 6),( 3, 9);


--script para traer lista de peliculas por id de usuario
SELECT C.name AS PELICULA, C.release_date AS LANZAMIENTO,
C.url_imAge AS URL_IMAGEN FROM list_movie A 
INNER JOIN 
(
	SELECT * FROM aux_list_movie
) B ON A.list_movie_id = B.list_movie_id
INNER JOIN 
(
	SELECT * FROM movie
) C ON B.movie_id = C.movie_id 
INNER JOIN 
(
	SELECT * FROM users	
)D
ON D.user_id = a.user_id
WHERE A.user_id = <user_id>;