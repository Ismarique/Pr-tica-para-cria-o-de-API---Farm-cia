CREATE TABLE cliente (
id_cliente INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
nome_cliente VARCHAR (50) NOT NULL,
cpf VARCHAR (12) UNIQUE NOT NULL,
data_nacimento DATE NOT NULL,
telefone VARCHAR (10) NOT NULL,
email VARCHAR (50) NOT NULL
);


CREATE TABLE medicamento(
id_medicamento INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
nome_medicamento VARCHAR(50) NOT NULL,
fabricante VARCHAR (50) NOT NULL,
principio_ativo VARCHAR (50) NOT NULL,
data_validade DATE,
preco DECIMAL (10,2)
);

