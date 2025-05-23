drop table IF EXISTS randonneurs;
drop TYPE IF EXISTS fonctions_ca;
CREATE TYPE fonctions_ca AS ENUM (
    'Président',
    'Vice-Président',
    'Trésorier',
    'Vice-Trésorier',
    'Secrétaire-Général',
    'Administrateur'
);
CREATE TABLE randonneurs(  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    create_time DATE,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    is_actif BOOLEAN,
    is_animateur BOOLEAN,
    is_CA BOOLEAN,
    fonction_ca fonctions_ca,
    url_photo TEXT,
    no_tel TEXT
);
-- COMMENT ON TABLE randonneurs IS '';
-- COMMENT ON COLUMN randonneurs.nom IS '';

insert into randonneurs
    (nom, prenom, is_actif, is_animateur, is_CA, fonction_ca, url_photo, no_tel)
VALUES
('CALVARIN','Gilbert', true, true, true,'Administrateur', '/randonneurs/image002.jpg', NULL),
('HERICHER','Colette', true, true, true,'Vice-Trésorier', '/randonneurs/image004.gif', NULL),
('HOFFSCHIR','Françoise', true, true, true,'Secrétaire-Général', '/randonneurs/image005.jpg', NULL),
('LABBE','Evelyne', true, true, true,'Vice-Président', '/randonneurs/image007.gif', NULL),
('PETIT','Guylaine', true, true, true,'Administrateur', '/randonneurs/image009.gif', NULL),
('RAYNEAU','Michel', true, true, true,'Trésorier', '/randonneurs/image011.jpg', '07 7851 1042'),
('REIGNIER','Jean-Michel', true, true, true,'Président', '/randonneurs/image013.jpg', '06 5147 2773')
('VANACKER','Patrice', true, true, false,null, null, '06 32 65 06 58')
('VANACKER','Josyane', true, false, false,null, null, NULL),
('BOUCHARD','Erick', true, true, false,null, null, '06 8594 2675'),
('CLAVEAU','Pierre', true, true, false,null, null, '06 7762 6155'),
('HERICHER','Jean-Louis', true, true, false,null, null, '06 1667 6999'),
('JAOUEN','Michèle', true, true, false,null, null, '06 5260 5470'),
('JOVY','Jean-Michel', true, true, false,null, null, '06 2880 8897'),
('LEVELEUX','Fabrice', true, true, false,null, null, '06 5882 5963'),
('MONTIE','Christophe', true, true, false,null, null, '06 1085 6292'),
('QUESSELAIRE','Martine', true, true, false,null, null, '06 1522 1209'),
('SABOT','Alain', true, true, false,null, null, '06 5133 5794'),
('SABOT','Maryse', true, true, false,null, null, '06 5142 8374'),
('SANTOIRE','Jean-Paul', true, true, false,null, null, '06 8516 0954'),
('TURRE NAYRAT','Nicole', true, true, false,null, null, '06 7430 6915')

drop table IF EXISTS randonnees;
drop type IF EXISTS statuts_rando;
CREATE TYPE statuts_rando AS ENUM (
    'A concevoir',
    'A reconnaître',
    'Programmée',
    'Terminée'
);


CREATE TABLE randonnees(  
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
INSERT INTO randonnees(description, create_time, statut, reconnaissance_time, programmation_time, is_programmation_speciale, lieu_depart, is_lieu_depart_special, cout_euros, distance_km, denivele_m, type_rando, id_openrunner, localisation, note_speciale)
    VALUES
('Rando de la Vallée de la Loire1', '2023-01-01 10:00:00', 'Programmée', '2023-01-02 10:00:00', '2023-01-03 10:00:00', true, 'Chalonnes-sur-Loire', true, 5.0, 10, 200, 'Pédestre', 20656589, 'Limours', 'Note speciale'),
('Rando de la Vallée de la Loire1', '2023-01-01 10:00:00', 'Programmée', '2023-01-02 10:00:00', '2023-01-03 10:00:00', false, 'Chalonnes-sur-Loire', false, 5.0, 10, 200, 'Pédestre', 20656589, 'Limours', null)
