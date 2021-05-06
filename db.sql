-- Describes the SB used, but is not directly called

CREATE TABLE articles(
    title text NOT NULL,
    link text PRIMARY KEY NOT NULL,
    summary text NOT NULL,
    publish date NOT NULL,
    sentiment int
);