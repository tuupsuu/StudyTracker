CREATE TABLE Users(
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserPassWord  VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Rights INT
);

INSERT INTO Users (FirstName, LastName, UserPassWord, Email, Rights)
VALUES 
('Maija1', 'Mehiläinen1', 'salasana1', 'maik1@jyu.fi', 1),
('Maija2', 'Mehiläinen2', 'salasana2', 'maik2@jyu.fi', 1),
('Maija3', 'Mehiläinen3', 'salasana3', 'maik3@jyu.fi', 2),
('Maija4', 'Mehiläinen4', 'salasana4', 'maik4@jyu.fi', 3),
('Maija5', 'Mehiläinen5', 'salasana5', 'maik5@jyu.fi', 4);
