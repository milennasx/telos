--Avisos: Feito com PostgreSQL

CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(80) NOT NULL,
    genre VARCHAR(40) NOT NULL,
    published_year INT
);

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL	
);

CREATE TABLE Loans (
    loan_id SERIAL PRIMARY KEY,
    book_id INT REFERENCES Books(book_id),
    user_id INT REFERENCES Users(user_id),
    loan_date DATE,-- Dúvida: seria uma informação obrigatória(ex:dados inputados no momento do empréstimo) ou não
    return_date DATE
);


INSERT INTO Books (title, author, genre, published_year) VALUES
-- Pedi pra I.A. me enviar os 20 livros mais vendidos. Inseri abaixo:
('Dom Casmurro', 'Machado de Assis', 'Classic', 1899),
('A Hora da Estrela', 'Clarice Lispector', 'Classic', 1977),
('O Alquimista', 'Paulo Coelho', 'Philosophy', 1988),
('Capitães da Areia', 'Jorge Amado', 'Modernism', 1937),
('Quarto de Despejo', 'Carolina Maria de Jesus', 'Biography', 1960),
('Torto Arado', 'Itamar Vieira Junior', 'Contemporary', 2019),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Children', 1943),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Fantasy', 1997),
('A Menina que Roubava Livros', 'Markus Zusak', 'Historical Fiction', 2005),
('O Diário de Anne Frank', 'Anne Frank', 'Biography', 1947),
('1984', 'George Orwell', 'Dystopian', 1949),
('Revolução dos Bichos', 'George Orwell', 'Satire', 1945),
('O Hobbit', 'J.R.R. Tolkien', 'Fantasy', 1937),
('A Sutil Arte de Ligar o Foda-se', 'Mark Manson', 'Self-help', 2016),
('Pai Rico, Pai Pobre', 'Robert Kiyosaki', 'Finance', 1997),
('Mulheres que Correm com os Lobos', 'Clarissa Pinkola Estés', 'Psychology', 1992),
('Sapiens: Uma Breve História da Humanidade', 'Yuval Noah Harari', 'History', 2011),
('O Poder do Hábito', 'Charles Duhigg', 'Self-help', 2012),
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Magic Realism', 1967),
('O Código Da Vinci', 'Dan Brown', 'Thriller', 2003);

-- Quero os gêneros em português, então fiz update
UPDATE Books SET genre = 'Clássico' WHERE genre = 'Classic';
UPDATE Books SET genre = 'Filosofia' WHERE genre = 'Philosophy';
UPDATE Books SET genre = 'Modernismo' WHERE genre = 'Modernism';
UPDATE Books SET genre = 'Biografia' WHERE genre = 'Biography';
UPDATE Books SET genre = 'Contemporâneo' WHERE genre = 'Contemporary';
UPDATE Books SET genre = 'Infantil' WHERE genre = 'Children';
UPDATE Books SET genre = 'Fantasia' WHERE genre = 'Fantasy';
UPDATE Books SET genre = 'Ficção Histórica' WHERE genre = 'Historical Fiction';
UPDATE Books SET genre = 'Distopia' WHERE genre = 'Dystopian';
UPDATE Books SET genre = 'Sátira' WHERE genre = 'Satire';
UPDATE Books SET genre = 'Autoajuda' WHERE genre = 'Self-help';
UPDATE Books SET genre = 'Finanças' WHERE genre = 'Finance';
UPDATE Books SET genre = 'Psicologia' WHERE genre = 'Psychology';
UPDATE Books SET genre = 'História' WHERE genre = 'History';
UPDATE Books SET genre = 'Realismo Mágico' WHERE genre = 'Magic Realism';
UPDATE Books SET genre = 'Suspense' WHERE genre = 'Thriller';

-- Excluindo um livro que eu nunca li
DELETE FROM Books
WHERE title = 'A Sutil Arte de Ligar o Foda-se';


-- Buscando livros
SELECT * FROM Books WHERE author = 'Machado de Assis';
SELECT * FROM Books WHERE genre = 'Fantasia';

-- Usando LIKE ILIKE
SELECT * FROM Books WHERE title LIKE '%principe%' -- Sem resultados
SELECT * FROM Books WHERE title ILIKE '%principe%' -- Sem resultados

-- Testando o TRANSLATE
SELECT * FROM Books 
WHERE TRANSLATE(title, 'áéíóúÁÉÍÓÚâêîôûÂÊÎÔÛãõÃÕàèìòùÀÈÌÒÙ', 'aeiouAEIOUaeiouAEIOUaoAOaeiouAEIOU') 
ILIKE '%principe%'; -- Retornou o pequeno príncipe
-------------------------------------------------------------------

-- Gerenciamento de Usuários
-- Inserido contas para meus colegas
INSERT INTO Users (name, email) VALUES 
('Jean Cavalcante', 'jean.cavalcante@gmail.com'),
('Jessicah Rhebeccah', 'jessicah.rhebeccah@gmail.com'),
('Laura Marinho', 'laura.marinho@gmail.com'),
('Milenna Xavier', 'milenna.xavier@gmail.com'),
('Ronald Oliveira', 'ronald.oliveira@gmail.com');

-- Alterando email
UPDATE Users 
SET email = 'jean.cavalcante10@gmail.com' 
WHERE name = 'Jean Cavalcante';

-- Deletando Milenna da biblioteca
DELETE FROM Users
WHERE name = 'Milenna Xavier'; -- O que aconteceria se Milenna tivesse um empréstimo em aberto?

-- Procurando usuários
SELECT * FROM Users WHERE name ILIKE '%jessi%';
SELECT * FROM Users WHERE email ILIKE '%marinho%';

-- Encontrando email do usuário
CREATE FUNCTION find_user_email(user_name VARCHAR)
RETURNS VARCHAR AS $$
BEGIN
    RETURN (SELECT email FROM Users WHERE name = user_name);
END;
$$ LANGUAGE plpgsql;

SELECT find_user_email('Jean Cavalcante');
-------------------------------------------------------------------

-- Empréstimos de livros

SELECT * FROM Books WHERE title ILIKE '%vinci%' -- Descobrir o id

-- Verificando disponibilidade 
SELECT title 
FROM Books 
WHERE book_id NOT IN (
    SELECT book_id FROM Loans WHERE return_date IS NULL
);

-- Empréstimo
INSERT INTO Loans (book_id, user_id, loan_date) 
VALUES (20, (SELECT user_id FROM Users WHERE name = 'Ronald Oliveira'), '2026-01-05');

-- Devolução
UPDATE Loans 
SET return_date = '2026-01-13' 
WHERE book_id = 20 AND return_date IS NULL;


-- Relatórios

-- Geral
SELECT 
    Books.title AS book_title, 
    Users.name AS user_name, 
    Loans.loan_date, 
    Loans.return_date
FROM Loans
JOIN Books ON Loans.book_id = Books.book_id
JOIN Users ON Loans.user_id = Users.user_id;

-- Disponibilidade
SELECT 
    Books.title AS book_title, 
    Users.name AS user_name, 
    Loans.loan_date
FROM Loans
JOIN Books ON Loans.book_id = Books.book_id
JOIN Users ON Loans.user_id = Users.user_id
WHERE Loans.return_date IS NULL;

-- Usuários com mais empréstimos
SELECT 
    Users.name AS user_name, 
    COUNT(Loans.loan_id) AS total_loans
FROM Loans
JOIN Users ON Loans.user_id = Users.user_id
GROUP BY Users.name
ORDER BY total_loans DESC;






