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
REFERENCES lmovie(movie_id);