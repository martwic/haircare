-- CreateTable
CREATE TABLE "ankiety" (
    "id_ankiety" SERIAL NOT NULL,
    "nazwa_ankiety" VARCHAR(128) NOT NULL,

    CONSTRAINT "ankiety_pkey" PRIMARY KEY ("id_ankiety")
);

-- CreateTable
CREATE TABLE "firma" (
    "id_firmy" SERIAL NOT NULL,
    "nazwa_firmy" VARCHAR(128) NOT NULL,

    CONSTRAINT "firma_pkey" PRIMARY KEY ("id_firmy")
);

-- CreateTable
CREATE TABLE "kategoria" (
    "id_kategorii" SERIAL NOT NULL,
    "nazwa_kategorii" VARCHAR(128) NOT NULL,

    CONSTRAINT "kategoria_pkey" PRIMARY KEY ("id_kategorii")
);

-- CreateTable
CREATE TABLE "konta" (
    "id_konta" SERIAL NOT NULL,
    "login" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64),
    "haslo" VARCHAR(128),
    "typ_konta_id" INTEGER NOT NULL,
    "data_rejestracji" DATE NOT NULL,

    CONSTRAINT "konta_pkey" PRIMARY KEY ("id_konta")
);

-- CreateTable
CREATE TABLE "oceny_produktow" (
    "id_oceny" SERIAL NOT NULL,
    "produkt_id" INTEGER NOT NULL,
    "uzytkownik_id" INTEGER NOT NULL,
    "ocena" INTEGER NOT NULL,
    "komentarz" TEXT DEFAULT 'NULL',

    CONSTRAINT "oceny_produktow_pkey" PRIMARY KEY ("id_oceny")
);

-- CreateTable
CREATE TABLE "odpowiedzi" (
    "id_odpowiedzi" SERIAL NOT NULL,
    "id_pytania" INTEGER NOT NULL,
    "odpowiedz" VARCHAR(128) NOT NULL,

    CONSTRAINT "odpowiedzi_pkey" PRIMARY KEY ("id_odpowiedzi")
);

-- CreateTable
CREATE TABLE "oferty" (
    "id_oferty" SERIAL NOT NULL,
    "produkt_id" INTEGER NOT NULL,
    "link" VARCHAR(256) NOT NULL,

    CONSTRAINT "oferty_pkey" PRIMARY KEY ("id_oferty")
);

-- CreateTable
CREATE TABLE "produkty" (
    "id_produktu" SERIAL NOT NULL,
    "nazwa" VARCHAR(128) NOT NULL,
    "kategoria_id" INTEGER NOT NULL,
    "firma_id" INTEGER NOT NULL,
    "typ_wlosa_id" INTEGER NOT NULL,
    "opis" TEXT,
    "sklad" TEXT,

    CONSTRAINT "produkty_pkey" PRIMARY KEY ("id_produktu")
);

-- CreateTable
CREATE TABLE "pytania" (
    "id_pytania" SERIAL NOT NULL,
    "pytanie" VARCHAR(128) NOT NULL,
    "id_ankiety" INTEGER NOT NULL,

    CONSTRAINT "pytania_pkey" PRIMARY KEY ("id_pytania")
);

-- CreateTable
CREATE TABLE "typ_konta" (
    "id_typu" SERIAL NOT NULL,
    "nazwa_typu" VARCHAR(128) NOT NULL,

    CONSTRAINT "typ_konta_pkey" PRIMARY KEY ("id_typu")
);

-- CreateTable
CREATE TABLE "typ_wlosa" (
    "id_typu" SERIAL NOT NULL,
    "nazwa_typu" VARCHAR(128) NOT NULL,

    CONSTRAINT "typ_wlosa_pkey" PRIMARY KEY ("id_typu")
);

-- CreateTable
CREATE TABLE "uzytkownicy" (
    "id_konta" SERIAL NOT NULL,
    "imie" VARCHAR(128) NOT NULL,
    "nazwisko" VARCHAR(128),
    "typ_wlosa_id" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "uzytkownicy_pkey" PRIMARY KEY ("id_konta")
);

-- CreateTable
CREATE TABLE "wypelnienie_ankiet" (
    "id_wypelnienia" SERIAL NOT NULL,
    "konto_id" INTEGER NOT NULL,
    "ankieta_id" INTEGER NOT NULL,
    "wypelniona" BOOLEAN NOT NULL DEFAULT false,
    "stopien_wypelnienia" INTEGER NOT NULL DEFAULT 0,
    "wynik" INTEGER NOT NULL,
    "uwagi" VARCHAR(128) NOT NULL,
    "data_wypelnienia" DATE NOT NULL,

    CONSTRAINT "wypelnienie_ankiet_pkey" PRIMARY KEY ("id_wypelnienia")
);

-- AddForeignKey
ALTER TABLE "konta" ADD CONSTRAINT "konta_fk0" FOREIGN KEY ("typ_konta_id") REFERENCES "typ_konta"("id_typu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oceny_produktow" ADD CONSTRAINT "oceny_produktow_fk1" FOREIGN KEY ("uzytkownik_id") REFERENCES "uzytkownicy"("id_konta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "odpowiedzi" ADD CONSTRAINT "odpowiedzi_fk0" FOREIGN KEY ("id_pytania") REFERENCES "pytania"("id_pytania") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produkty" ADD CONSTRAINT "produkty_fk0" FOREIGN KEY ("firma_id") REFERENCES "firma"("id_firmy") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produkty" ADD CONSTRAINT "produkty_fk1" FOREIGN KEY ("typ_wlosa_id") REFERENCES "typ_wlosa"("id_typu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produkty" ADD CONSTRAINT "produkty_fk2" FOREIGN KEY ("kategoria_id") REFERENCES "kategoria"("id_kategorii") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pytania" ADD CONSTRAINT "pytania_fk0" FOREIGN KEY ("id_ankiety") REFERENCES "ankiety"("id_ankiety") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "uzytkownicy" ADD CONSTRAINT "uzytkownicy_fk0" FOREIGN KEY ("id_konta") REFERENCES "konta"("id_konta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "uzytkownicy" ADD CONSTRAINT "uzytkownicy_fk1" FOREIGN KEY ("typ_wlosa_id") REFERENCES "typ_wlosa"("id_typu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wypelnienie_ankiet" ADD CONSTRAINT "wypelnienie_ankiet_fk0" FOREIGN KEY ("konto_id") REFERENCES "uzytkownicy"("id_konta") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wypelnienie_ankiet" ADD CONSTRAINT "wypelnienie_ankiet_fk1" FOREIGN KEY ("ankieta_id") REFERENCES "ankiety"("id_ankiety") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "wypelnienie_ankiet" ADD CONSTRAINT "wypelnienie_ankiet_fk2" FOREIGN KEY ("wynik") REFERENCES "typ_wlosa"("id_typu") ON DELETE NO ACTION ON UPDATE NO ACTION;

