CREATE TABLE user
(
    id       INT PRIMARY KEY NOT NULL,
    email    VARCHAR(255)    NOT NULL,
    password VARCHAR(255)    NOT NULL,
    roles    TEXT            NOT NULL,
    active   BOOL            NOT NULL,
    username VARCHAR(255)    NOT NULL,
    avatar   VARCHAR(255)
)