-- CreateTable
CREATE TABLE "User" (
    "ProfilePhoto" TEXT NOT NULL DEFAULT '',
    "Id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "IsDoctor" BOOLEAN NOT NULL DEFAULT false,
    "IsAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "doctor" (
    "numberOfRatings" INTEGER NOT NULL DEFAULT 0,
    "Id" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "CategoryId" TEXT NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "UserId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Clinic" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "DoctorId" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "Location" TEXT NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Category" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "UserRating" (
    "UserId" TEXT NOT NULL,
    "DoctorId" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserRating_pkey" PRIMARY KEY ("UserId","DoctorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_UserId_key" ON "Admin"("UserId");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_Name_key" ON "Clinic"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_Name_key" ON "Category"("Name");

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_Id_fkey" FOREIGN KEY ("Id") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor" ADD CONSTRAINT "doctor_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clinic" ADD CONSTRAINT "Clinic_DoctorId_fkey" FOREIGN KEY ("DoctorId") REFERENCES "doctor"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_DoctorId_fkey" FOREIGN KEY ("DoctorId") REFERENCES "doctor"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
