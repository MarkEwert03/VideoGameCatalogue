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

INSERT INTO User(user_id, user_name, age, created_at) VALUES(01, "Mark", 21, "2024-06-28 20:30:00");