CREATE TABLE IF NOT EXISTS "Vehicle" (
  "id" SERIAL PRIMARY KEY,
  "location_id" INTEGER NOT NULL,
  "plate" VARCHAR(255) NOT NULL,
  "description" TEXT
);
