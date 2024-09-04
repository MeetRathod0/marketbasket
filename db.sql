CREATE TABLE user_types
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128),
    created_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP,
    updated_by INT
);

INSERT INTO user_types VALUES 
(DEFAULT,'admin',DEFAULT,NULL,NULL),
(DEFAULT,'Manager',DEFAULT,NULL,1),
(DEFAULT,'Sales Person',DEFAULT,NULL,1);

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    phone VARCHAR(128) NOT NULL,
    user_type_id int NOT NULL,
    is_active SMALLINT DEFAULT 1,
    created_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP,
    updated_by INT,
    FOREIGN KEY (user_type_id) REFERENCES user_types(id)
);

INSERT INTO users VALUES 
(DEFAULT,'Meet Kumar','admin@rmeet.in','1234567890',1,1,DEFAULT,NULL,NULL),
(DEFAULT,'Satish Shah','rathodmeet201@gmail.com','9624409050',3,1,DEFAULT,NULL,NULL),
(DEFAULT,'Darbar Ritesh','darbarmeet.26@gmail.com','7698953658',3,1,DEFAULT,NULL,NULL),
(DEFAULT,'Rima Patel','darbarmee.26@gmail.com','7698953651',3,1,DEFAULT,NULL,NULL);


CREATE TABLE user_password
(
    id SERIAL PRIMARY KEY,
    user_id INT,
    password VARCHAR(128) NOT NULL,
    created_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_datetime TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sales 
(
    id bigserial PRIMARY KEY,
    date date,
    category varchar(256),
    size varchar(256),
    qty int,
    amount float,
    sales_person_id int
    FOREIGN KEY (sales_person_id) REFERENCES users(id)
);


CREATE TABLE otp_session
(
    id bigserial PRIMARY KEY,
    otp CHAR(6),
    user_id INT,
    created_datetime timestamp,
    expire_datetime timestamp,
    is_active SMALLINT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);