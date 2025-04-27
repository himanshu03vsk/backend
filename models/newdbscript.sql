CREATE TABLE part (
    part_id INT IDENTITY(1,1) PRIMARY KEY,     -- Auto incrementing part_id (Primary Key)
    part_name NVARCHAR(255) NOT NULL,           -- part_name with a max length of 255 characters (NOT NULL)
    part_description TEXT,                      -- part_description can hold long text
    price DECIMAL(10, 2) NOT NULL,              -- price as DECIMAL with 10 digits, 2 of which are after the decimal point (NOT NULL)
    dimensions NVARCHAR(30),                    -- dimensions with a max length of 30 characters
    part_weight DECIMAL(5, 2),                  -- part_weight as DECIMAL with 5 digits, 2 of which are after the decimal point
    part_type NVARCHAR(100) NOT NULL,           -- part_type with a max length of 100 characters (NOT NULL)
    part_category NVARCHAR(100) NOT NULL        -- part_category with a max length of 100 characters (NOT NULL)
);


CREATE TABLE car (
    make NVARCHAR(50) NOT NULL,           -- make of the car (NOT NULL)
    model NVARCHAR(50) NOT NULL,          -- model of the car (NOT NULL)
    car_year INT NOT NULL,                -- car_year (NOT NULL)
    PRIMARY KEY (make, model, car_year)   -- Composite primary key (make, model, car_year)
);

CREATE TABLE part_sold_by (
    part_id INT NOT NULL,                  -- ID of the part (NOT NULL)
    make NVARCHAR(50) NOT NULL,            -- Make of the car (NOT NULL)
    model NVARCHAR(50) NOT NULL,           -- Model of the car (NOT NULL)
    year INT NOT NULL,                     -- Year of the car (NOT NULL)
    PRIMARY KEY (part_id, make, model, year) -- Composite primary key (part_id, make, model, year)
);


CREATE TABLE person (
    email NVARCHAR(50) NOT NULL,            -- Email of the person (NOT NULL)
    p_password NVARCHAR(256) NOT NULL,      -- Password of the person (NOT NULL)
    fname NVARCHAR(50) NOT NULL,            -- First name (NOT NULL)
    lname NVARCHAR(50) NOT NULL,            -- Last name (NOT NULL)
    dob DATE NOT NULL,                      -- Date of birth (NOT NULL)
    phone NVARCHAR(15) NOT NULL,            -- Phone number (NOT NULL)
    PRIMARY KEY (email)                     -- Primary key on the email field
);


CREATE TABLE seller (
    seller_email NVARCHAR(50) NOT NULL,           -- Seller's email (foreign key from person table)
    seller_org_name NVARCHAR(255) NOT NULL,       -- Seller's organization name
    member_since DATE NOT NULL,                   -- Date when the seller became a member
    PRIMARY KEY (seller_email),                   -- Primary key on the seller_email field
    FOREIGN KEY (seller_email)                    -- Foreign key constraint referring to Person's email
        REFERENCES person (email)                 -- References email column in person table
);

CREATE TABLE buyer (
    buyer_email NVARCHAR(50) NOT NULL,            -- Buyer's email (foreign key from person table)
    PRIMARY KEY (buyer_email),                    -- Primary key on the buyer_email field
    FOREIGN KEY (buyer_email)                     -- Foreign key constraint referring to Person's email
        REFERENCES person (email)                -- References the email column in person table
);



CREATE TABLE shipment (
    shipment_id INT IDENTITY(1,1) PRIMARY KEY,               -- Auto-incrementing shipment ID
    shipment_date DATETIME NOT NULL,                          -- Shipment date
    shipment_address NVARCHAR(255) NOT NULL,                  -- Shipment address
    shipment_status NVARCHAR(50) NOT NULL,                    -- Shipment status
    shipment_cost DECIMAL(10, 2) NOT NULL,                    -- Shipment cost
    payment_method NVARCHAR(50) NOT NULL,                     -- Payment method
    quanity_purchased INT NOT NULL,                           -- Quantity purchased
    part_id INT NOT NULL,                                     -- Part ID (foreign key from Part)
    seller_email NVARCHAR(50) NOT NULL,                       -- Seller email (foreign key from Seller)
    buyer_email NVARCHAR(50) NOT NULL,                        -- Buyer email (foreign key from Buyer)
    
    FOREIGN KEY (part_id) REFERENCES part (part_id),          -- Foreign key referencing Part's part_id
    FOREIGN KEY (seller_email) REFERENCES seller (seller_email), -- Foreign key referencing Seller's seller_email
    FOREIGN KEY (buyer_email) REFERENCES buyer (buyer_email)  -- Foreign key referencing Buyer's buyer_email
);


CREATE TABLE part_sold_by (
    seller_email NVARCHAR(50) NOT NULL,    -- Seller email (part of primary key)
    part_id INT NOT NULL,                   -- Part ID (part of primary key)
    count INT NOT NULL,                     -- Count of the part sold
    PRIMARY KEY (seller_email, part_id)     -- Composite primary key (seller_email + part_id)
);


CREATE TABLE payment_info (
    method_no INT IDENTITY(1,1) PRIMARY KEY,         -- Payment method number, auto-incremented, primary key
    buyer_email NVARCHAR(50) NOT NULL,                -- Buyer email, foreign key reference
    card_no NVARCHAR(16) NOT NULL,                    -- Credit card number, 16 characters
    card_exp_date DATETIME NOT NULL,                  -- Card expiration date
    card_cvv INT NOT NULL,                             -- Card CVV code
    card_name NVARCHAR(50) NOT NULL,                  -- Name on the card
    card_address NVARCHAR(255) NOT NULL,              -- Card billing address
    FOREIGN KEY (buyer_email) REFERENCES buyer(buyer_email) -- Foreign key reference to Buyer
);



CREATE TABLE buyer_address (
    buyer_email NVARCHAR(50) NOT NULL,                -- Buyer email, foreign key reference
    line1 NVARCHAR(255) NOT NULL,                     -- Address line 1, part of the primary key
    line2 NVARCHAR(255),                              -- Address line 2, optional
    city NVARCHAR(50) NOT NULL,                       -- City
    state_in NVARCHAR(50) NOT NULL,                   -- State
    zip_code NVARCHAR(10) NOT NULL,                   -- Zip code
    PRIMARY KEY (buyer_email, line1),                 -- Primary key composed of buyer_email and line1
    FOREIGN KEY (buyer_email) REFERENCES buyer(buyer_email) -- Foreign key reference to Buyer
);


CREATE TABLE cart (
    part_id INT NOT NULL,                               -- Part ID, foreign key reference
    buyer_email NVARCHAR(50) NOT NULL,                  -- Buyer email, foreign key reference
    quantity INT NOT NULL,                              -- Quantity of parts in the cart
    PRIMARY KEY (part_id, buyer_email),                 -- Composite primary key (part_id + buyer_email)
    FOREIGN KEY (part_id) REFERENCES part(part_id),     -- Foreign key to Part table
    FOREIGN KEY (buyer_email) REFERENCES buyer(buyer_email) -- Foreign key to Buyer table
);


CREATE TABLE part_image (
    path NVARCHAR(255) NOT NULL,                        -- Path of the image, part of the composite primary key
    part_id INT NOT NULL,                               -- Part ID, foreign key reference to Part table
    image_name NVARCHAR(255) NOT NULL,                  -- Name of the image
    description NVARCHAR(255),                          -- Description of the image
    PRIMARY KEY (path, part_id),                        -- Composite primary key (path + part_id)
    FOREIGN KEY (part_id) REFERENCES part(part_id)     -- Foreign key to Part table
);






