-- Conectado como SYS o SYSTEM:
ALTER SESSION SET CONTAINER = XEPDB1;

-- 1. Crear el usuario
CREATE USER bd IDENTIFIED BY bd;

-- 2. Darle privilegios básicos
GRANT CONNECT, RESOURCE TO bd;

-- 3. Otorgar cuota para que pueda usar espacio
ALTER USER bd QUOTA UNLIMITED ON USERS;

CONNECT bd/bd@XEPDB1

CREATE TABLE bd.CUSTOMERS (
                              CUSTOMER_ID NUMBER(20) PRIMARY KEY,
                              EMAIL_ADDRESS VARCHAR2(255) NOT NULL,
                              FULL_NAME VARCHAR2(255) NOT NULL
);
