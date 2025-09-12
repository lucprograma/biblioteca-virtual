CREATE DATABASE IF NOT EXISTS MovieCatalog;
USE MovieCatalog;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    director VARCHAR(100),
    release_year INT,
    genre ENUM('Animation', 'Action', 'Adventure', 'Biography', 'Comedy', 'Crime', 'Drama', 'Science Fiction', 'Horror', 'Romance', 'Documentary'),
    synopsis TEXT,
    main_actors VARCHAR(255),
    rating DECIMAL(3,1),
    user_id_update INT NOT NULL,
    enabled BIT DEFAULT 1,
    FOREIGN KEY (user_id_update) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO users (user_name, email, password) VALUES
('John Doe', 'john@example.com', 'password123'),
('Alice Smith', 'alice@example.com', 'pass456'),
('Bob Johnson', 'bob@example.com', 'secure789'),
('Emma Brown', 'emma@example.com', '1234word'),
('Michael Davis', 'michael@example.com', 'passphrase'),
('Jennifer Wilson', 'jennifer@example.com', 'password567'),
('David Miller', 'david@example.com', 'p@ssw0rd'),
('Laura Taylor', 'laura@example.com', 'securepass'),
('Matthew Anderson', 'matthew@example.com', 'my_password'),
('Jessica Martinez', 'jessica@example.com', 'password890');

INSERT INTO movies (title, director, release_year, genre, synopsis, main_actors, rating, user_id_update) VALUES
('The Shawshank Redemption', 'Frank Darabont', 1994, 'Drama', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Tim Robbins, Morgan Freeman, Bob Gunton', 9.3, 1),
('The Godfather', 'Francis Ford Coppola', 1972, 'Crime', 'An organized crime dynasty\'s aging patriarch transfers control of his clandestine empire to his reluctant son.', 'Marlon Brando, Al Pacino, James Caan', 9.2, 2),
('The Dark Knight', 'Christopher Nolan', 2008, 'Action', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'Christian Bale, Heath Ledger, Aaron Eckhart', 9.0, 3),
('Pulp Fiction', 'Quentin Tarantino', 1994, 'Crime', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'John Travolta, Uma Thurman, Samuel L. Jackson', 8.9, 4),
('The Lord of the Rings: The Return of the King', 'Peter Jackson', 2003, 'Adventure', 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'Elijah Wood, Viggo Mortensen, Ian McKellen', 8.9, 5),
('Schindler\'s List', 'Steven Spielberg', 1993, 'Biography', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'Liam Neeson, Ben Kingsley, Ralph Fiennes', 8.9, 6),
('Fight Club', 'David Fincher', 1999, 'Drama', 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.', 'Brad Pitt, Edward Norton, Helena Bonham Carter', 8.8, 7),
('Forrest Gump', 'Robert Zemeckis', 1994, 'Drama', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', 'Tom Hanks, Robin Wright, Gary Sinise', 8.8, 8),
('Inception', 'Christopher Nolan', 2010, 'Science Fiction', 'A thief who enters the dreams of others to steal secrets must now plant an idea into a CEO\'s mind.', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', 8.8, 9),
('Goodfellas', 'Martin Scorsese', 1990, 'Crime', 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.', 'Robert De Niro, Ray Liotta, Joe Pesci', 8.7, 10),
('The Matrix', 'Lana Wachowski, Lilly Wachowski', 1999, 'Science Fiction', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 8.7, 1),
('Star Wars: Episode V - The Empire Strikes Back', 'Irvin Kershner', 1980, 'Action', 'After the rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.', 'Mark Hamill, Harrison Ford, Carrie Fisher', 8.7, 2),
('The Lord of the Rings: The Fellowship of the Ring', 'Peter Jackson', 2001, 'Adventure', 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', 'Elijah Wood, Ian McKellen, Orlando Bloom', 8.8, 3),
('The Silence of the Lambs', 'Jonathan Demme', 1991, 'Crime', 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.', 'Jodie Foster, Anthony Hopkins, Lawrence A. Bonney', 8.6, 4),
('Saving Private Ryan', 'Steven Spielberg', 1998, 'Drama', 'Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.', 'Tom Hanks, Matt Damon, Tom Sizemore', 8.6, 5),
('The Green Mile', 'Frank Darabont', 1999, 'Crime', 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.', 'Tom Hanks, Michael Clarke Duncan, David Morse', 8.6, 6),
('The Usual Suspects', 'Bryan Singer', 1995, 'Crime', 'A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup.', 'Kevin Spacey, Gabriel Byrne, Chazz Palminteri', 8.5, 7),
('Léon: The Professional', 'Luc Besson', 1994, 'Crime', 'Mathilda, a 12-year-old girl, is reluctantly taken in by Léon, a professional assassin, after her family is murdered. Léon and Mathilda form an unusual relationship, as she becomes his protégée and learns the assassin\'s trade.', 'Jean Reno, Gary Oldman, Natalie Portman', 8.5, 8),
('The Lion King', 'Roger Allers, Rob Minkoff', 1994, 'Animation', 'Lion cub and future king Simba searches for his identity. His eagerness to please others and penchant for testing his boundaries sometimes get him into trouble.', 'Matthew Broderick, Jeremy Irons, James Earl Jones', 8.5, 9),
('Back to the Future', 'Robert Zemeckis', 1985, 'Adventure', 'Marty McFly, a 17-year-old high school student, is accidentally sent 30 years into the past in a time-traveling DeLorean invented by his close friend, eccentric scientist Doc Brown.', 'Michael J. Fox, Christopher Lloyd, Lea Thompson', 8.5, 10),
('Gladiator', 'Ridley Scott', 2000, 'Action', 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.', 'Russell Crowe, Joaquin Phoenix, Connie Nielsen', 8.5, 1),
('American History X', 'Tony Kaye', 1998, 'Drama', 'A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.', 'Edward Norton, Edward Furlong, Beverly D\'Angelo', 8.5, 2),
('The Pianist', 'Roman Polanski', 2002, 'Biography', 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.', 'Adrien Brody, Thomas Kretschmann, Frank Finlay', 8.5, 3),
('Terminator 2: Judgment Day', 'James Cameron', 1991, 'Action', 'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son, John Connor, from a more advanced and powerful cyborg.', 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong', 8.5, 4),
('The Intouchables', 'Olivier Nakache, Éric Toledano', 2011, 'Biography', 'After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver.', 'François Cluzet, Omar Sy, Anne Le Ny', 8.5, 5),
('Whiplash', 'Damien Chazelle', 2014, 'Drama', 'A promising young drummer enrolls at a cutthroat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.', 'Miles Teller, J.K. Simmons, Melissa Benoist', 8.5, 6),
('The Departed', 'Martin Scorsese', 2006, 'Crime', 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.', 'Leonardo DiCaprio, Matt Damon, Jack Nicholson', 8.5, 7),
('The Prestige', 'Christopher Nolan', 2006, 'Drama', 'After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.', 'Christian Bale, Hugh Jackman, Scarlett Johansson', 8.5, 8);