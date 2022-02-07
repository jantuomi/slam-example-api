CREATE TABLE examples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(40),
  content TEXT
);
