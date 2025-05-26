drop TYPE IF EXISTS "fonctions_ca";
CREATE TYPE "fonctions_ca" AS ENUM (
    'Président',
    'Vice-Président',
    'Trésorier',
    'Vice-Trésorier',
    'Secrétaire-Général',
    'Administrateur'
);

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
  "id" TEXT NOT NULL PRIMARY KEY,
    "create_time" DATE,
  "name" TEXT,
  "email" TEXT UNIQUE,
  "password" TEXT,
  "emailVerified" INTEGER,
  "image" TEXT,
    "is_actif" BOOLEAN,
    "is_animateur" BOOLEAN,
    "is_CA" BOOLEAN,
    "fonction_ca" fonctions_ca,
    "url_photo" TEXT,
    "no_tel" TEXT

);

-- COMMENT ON TABLE randonneurs IS '';
-- COMMENT ON COLUMN randonneurs.nom IS '';

insert into "user"
    (id,name, is_actif, is_animateur, "is_CA", fonction_ca, url_photo, no_tel, email)
VALUES
(1, 'Gilbert CALVARIN', true, true, true,'Administrateur', '/randonneurs/image002.jpg', NULL, NULL),
(2,  'Colette HERICHER', true, true, true,'Vice-Trésorier', '/randonneurs/image004.gif', NULL, NULL),
(3,  'Françoise HOFFSCHIR', true, true, true,'Secrétaire-Général', '/randonneurs/image005.jpg', NULL, NULL),
(4,  'Evelyne LABBE', true, true, true,'Vice-Président', '/randonneurs/image007.gif', NULL, NULL),
(5,  'Guylaine PETIT', true, true, true,'Administrateur', '/randonneurs/image009.gif', NULL, NULL),
(6,  'Michel RAYNEAU', true, true, true,'Trésorier', '/randonneurs/image011.jpg', '07 7851 1042', NULL),
(7,  'Jean-Michel REIGNIER', true, true, true,'Président', '/randonneurs/image013.jpg', '06 5147 2773', NULL),
(8,  'Patrice VANACKER', true, true, false,null, null, '06 32 65 06 58', 'patrice.vanacker@gmail.com'),
(9,  'Josyane VANACKER', true, false, false,null, null, NULL, NULL),
(10, 'Erick BOUCHARD', true, true, false,null, null, '06 8594 2675', NULL),
(11, 'Pierre CLAVEAU', true, true, false,null, null, '06 7762 6155', NULL),
(12, 'Jean-Louis HERICHER', true, true, false,null, null, '06 1667 6999', NULL),
(13, 'Michèle JAOUEN', true, true, false,null, null, '06 5260 5470', NULL),
(14, 'Jean-Michel JOVY', true, true, false,null, null, '06 2880 8897', NULL),
(15, 'Fabrice LEVELEUX', true, true, false,null, null, '06 5882 5963', NULL),
(16, 'Christophe MONTIE', true, true, false,null, null, '06 1085 6292', NULL),
(17, 'Martine QUESSELAIRE', true, true, false,null, null, '06 1522 1209', NULL),
(18, 'Alain SABOT', true, true, false,null, null, '06 5133 5794', NULL),
(19, 'Maryse SABOT', true, true, false,null, null, '06 5142 8374', NULL),
(20, 'Jean-Paul SANTOIRE', true, true, false,null, null, '06 8516 0954', NULL),
(21, 'Nicole TURRE NAYRAT', true, true, false,null, null, '06 7430 6915', NULL)

DROP TABLE IF EXISTS "account";
CREATE TABLE "account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    PRIMARY KEY ("provider", "providerAccountId"));

DROP TABLE IF EXISTS "session";
CREATE TABLE "session" (
  "sessionToken" TEXT PRIMARY KEY NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL);

DROP TABLE IF EXISTS "verificationToken";
CREATE TABLE "verificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP NOT NULL,
  PRIMARY KEY ("identifier", "token"));

DROP TABLE IF EXISTS "authenticator";
CREATE TABLE "authenticator" (
    "credentialID" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,
    PRIMARY KEY("userId", "credentialID")
);


drop table IF EXISTS "randonnees";
drop type IF EXISTS "statuts_rando";
CREATE TYPE "statuts_rando" AS ENUM (
    'A concevoir',
    'A reconnaître',
    'Programmée',
    'Terminée'
);


CREATE TABLE "randonnees"(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    description TEXT NOT NULL,
    create_time TIMESTAMP,
    statut statuts_rando,
    reconnaissance_time TIMESTAMP,
    programmation_time TIMESTAMP,
    is_programmation_speciale BOOLEAN,
    lieu_depart TEXT NOT NULL,
    is_lieu_depart_special BOOLEAN,
    cout_euros NUMERIC(5,2),
    distance_km INT,
    denivele_m INT,
    type_rando TEXT,
    id_openrunner INT,
    parcours_openrunner TEXT,
    localisation TEXT,
    note_speciale TEXT);
-- COMMENT ON TABLE randonnees IS '';
INSERT INTO "randonnees"(description, create_time, statut, reconnaissance_time, programmation_time, is_programmation_speciale, lieu_depart, is_lieu_depart_special, cout_euros, distance_km, denivele_m, type_rando, id_openrunner, localisation, note_speciale)
    VALUES
('Rando de la Vallée de la Loire1', '2023-01-01 10:00:00', 'Programmée', '2023-01-02 10:00:00', '2023-01-03 10:00:00', true, 'Chalonnes-sur-Loire', true, 5.0, 10, 200, 'Pédestre', 20656589, 'Limours', 'Note speciale'),
('Rando de la Vallée de la Loire1', '2023-01-01 10:00:00', 'Programmée', '2023-01-02 10:00:00', '2023-01-03 10:00:00', false, 'Chalonnes-sur-Loire', false, 5.0, 10, 200, 'Pédestre', 20656589, 'Limours', null)
