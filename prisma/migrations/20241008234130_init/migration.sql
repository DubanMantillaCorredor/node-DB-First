-- CreateTable
CREATE TABLE "historical" (
    "historical" DECIMAL,
    "id_product" INTEGER,
    "id_order" INTEGER,
    "id" SERIAL NOT NULL,

    CONSTRAINT "historical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id_order" SERIAL NOT NULL,
    "date_order" DATE,
    "id_user" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id_order")
);

-- CreateTable
CREATE TABLE "products" (
    "id_product" SERIAL NOT NULL,
    "name_product" VARCHAR(30) NOT NULL,
    "price" DECIMAL NOT NULL,
    "description" VARCHAR(50),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id_product")
);

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "name_user" VARCHAR(25) NOT NULL,
    "last_name" VARCHAR(25) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "address" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- AddForeignKey
ALTER TABLE "historical" ADD CONSTRAINT "fk_id_order" FOREIGN KEY ("id_order") REFERENCES "orders"("id_order") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "historical" ADD CONSTRAINT "fk_id_product" FOREIGN KEY ("id_product") REFERENCES "products"("id_product") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "fk_id_user" FOREIGN KEY ("id_user") REFERENCES "users"("id_user") ON DELETE NO ACTION ON UPDATE NO ACTION;
