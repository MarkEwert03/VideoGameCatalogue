CREATE TABLE User (
    user_id INTEGER PRIMARY KEY,
    user_name TEXT NOT NULL,
    age INTEGER,
    created_at TIMESTAMP
);

CREATE TABLE Catalogue (
    cat_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    cat_name TEXT NOT NULL,
    cat_description TEXT,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Game (
    game_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    console TEXT NOT NULL,
    genre TEXT NOT NULL,
    release_date DATE
);

CREATE TABLE CatalogueGame (
    cat_id INTEGER,
    game_id INTEGER,
    playtime INTEGER,
    notes TEXT,
    PRIMARY KEY (cat_id, game_id),
    FOREIGN KEY (cat_id) REFERENCES Catalogue(cat_id),
    FOREIGN KEY (game_id) REFERENCES Game(game_id)
);

INSERT INTO User(user_id, user_name, age, created_at) VALUES(00, "Mark", 21, "2024-06-28 20:30:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(01, "Alice", 8, "2023-11-25 10:45:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(02, "Bob", 12, "2023-10-19 14:22:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(03, "Cathy", 25, "2022-12-10 08:17:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(04, "David", 36, "2021-08-03 12:34:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(05, "Eva", 42, "2020-06-22 16:08:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(06, "Frank", 59, "2019-04-14 09:45:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(07, "Grace", 66, "2018-01-25 19:30:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(08, "Hank", 71, "2017-10-10 11:00:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(09, "Ivy", 89, "2016-08-08 14:55:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(10, "Jack", 97, "2015-04-21 13:20:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(11, "Karen", 101, "2023-09-15 10:00:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(12, "Leo", 20, "2022-11-18 17:40:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(13, "Mona", 35, "2021-05-06 08:30:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(14, "Nick", 40, "2020-03-07 15:50:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(15, "Olivia", 52, "2019-03-12 09:15:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(16, "Paul", 68, "2018-02-20 16:45:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(17, "Quincy", 75, "2017-11-28 13:30:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(18, "Rachel", 86, "2016-08-03 18:00:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(19, "Steve", 93, "2015-11-09 07:25:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(20, "Tina", 9, "2023-05-11 12:00:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(21, "Uma", 12, "2023-07-23 14:45:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(22, "Victor", 28, "2022-09-15 17:20:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(23, "Wendy", 32, "2021-06-27 10:30:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(24, "Xander", 48, "2020-04-18 09:05:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(25, "Yara", 55, "2019-10-02 11:55:00");
INSERT INTO User(user_id, user_name, age, created_at) VALUES(26, "Zack", 60, "2018-01-29 08:50:00");
