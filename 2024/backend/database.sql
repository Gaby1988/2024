DROP DATABASE IF EXISTS `inovin`;
CREATE DATABASE `inovin`;
USE `inovin`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `address` varchar(255),
  `zip_code` integer,
  `city` varchar(255),
  `job` varchar(255),
  `hashedPassword` varchar(255) NOT NULL,
  `is_admin` integer,
  `taste_profile_id` integer,
  `recipe_id` integer
);

DROP TABLE IF EXISTS `taste_profile`;
CREATE TABLE `taste_profile` (
  `taste_profile_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `description` TEXT,
  `taste_id` integer,
  `wine_id` integer
);

DROP TABLE IF EXISTS `wine`;
CREATE TABLE `wine` (
  `wine_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `origin` varchar(255),
  `img_wine` varchar(255),
  `description` TEXT
);

DROP TABLE IF EXISTS `taste`;
CREATE TABLE `taste` (
  `taste_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe` (
  `recipe_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `cepage_name` varchar(255),
  `cepage_level` integer,
  `user_id` integer,
  `session_date` integer
);

DROP TABLE IF EXISTS `cepage`;
CREATE TABLE `cepage` (
  `cepage_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255)
);

DROP TABLE IF EXISTS `review`;
CREATE TABLE `review` (
  `review_id` integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255),
  `lastName` varchar(255),
  `email` varchar(255),
  `message` TEXT,
  `rating` integer
);

ALTER TABLE `user` ADD FOREIGN KEY (`taste_profile_id`) REFERENCES `taste_profile` (`taste_profile_id`);

ALTER TABLE `taste_profile` ADD FOREIGN KEY (`taste_id`) REFERENCES `taste` (`taste_id`);

ALTER TABLE `taste_profile` ADD FOREIGN KEY (`wine_id`) REFERENCES `wine` (`wine_id`);

INSERT INTO taste (name) 
VALUES ('Barsac'), ('Château Margaux'), ('Beaujolais Nouveau'), ('Bergerac');

INSERT INTO user (firstname, lastname, email, address, zip_code, city, job, hashedPassword, is_admin)
VALUES 
  ('Valere', 'Apert', 'valerie.apert@example.com', '4 rue react', '33300', 'bordeaux', "dev", "$argon2id$v=19$m=16,t=2,p=1$emVmZXpmemZlemVmZWR6ZXplZg$rqZkhxu5YbqCGHPNrjJZpQ", "0"),
  ('Alice', 'Johnsie', 'alice.johnsie@example.com', '10 rue du Paradis', '75001', 'Paris', 'Ingénieur', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZQ$eSetR6KPUNAGW+q+wDadcw', '0'),
  ('Robert', 'Brown', 'robert.brown@example.com', '15 rue vue', '10001', 'New York', 'Architecte', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlemZ6ZnpmZXphZGF6ZGQ$a0bg5DZB6H6v3jjQC81DXg', '0'),
  ('Sophie', 'Garcia', 'sophie.garcia@example.com', '22 Avenue de la Liberté', '69002', 'Lyon', 'Avocate', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZnpmemZlemFkYXpkZA$V1qAnJDyMuuWG7g9yoGYXA', '0'),
  ('Maxime', 'Dubois', 'maxime.dubois@example.com', '5 Calle Principal', '28001', 'Madrid', 'Consultant', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$VCzq45PL9t8khtc44Kk5iw', '0'),
  ('Julia', 'Lee', 'julia.lee@example.com', '7 Elm Street', '90001', 'Los Angeles', 'Designer', '$argon2id$v=19$m=16,t=2,p=1$emVmemVmemVmemZlenplZHpkZGZ6ZnpmZXphZGF6ZGQ$UKaGZ9hGFn/S5SBQDMe/Uw','0'),
  ('Alexandre', 'Moreau', 'alexandre.moreau@example.com', '27 Rue de la Paix', '75008', 'Paris', 'Comptable', '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ','0'),
  ('Laura', 'Sanchez', 'laura.sanchez@example.com', '14 Calle del Sol', '28002', 'Madrid', 'Infirmière', '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ','0'),
  ('Thomas', 'Rousseau', 'thomas.rousseau@example.com', '3 Avenue des Champs-Élysées', '75009', 'Paris', 'Journaliste', '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ', '0'),
  ('john', 'doe', 'j.do@example.com', '3 Avenue angular', '75009', 'Paris', 'Journaliste', '$argon2id$v=19$m=65536,t=5,p=1$6F4WFjpSx9bSq9k4lp2fiQ$cjVgCHF/voka5bZI9YAainiaT+LkaQxfNN638b/h4fQ','0'),
  ('test', 'test', 'test@gmail.com', 'test', '90000', 'test', 'test', '$argon2id$v=19$m=65536,t=5,p=1$7y5DipbF2biofOLgY38Eyg$WZ8mz2svq5bYZOjVsoYgFXkapyifGXdR7tplz+tOlnw', '1');

INSERT INTO recipe (cepage_name, cepage_level, user_id, session_date) 
VALUES 
('Chenin', 25, 1, 10072023),
('Merlot', 26, 1, 10072023),
('Verdot', 23, 1, 10072023),
('Macabeo', 29, 1, 10072023),
('Chenin', 25, 1, 11072023),
('Merlot', 26, 1, 11072023),
('Macabeo', 23, 1, 11072023),
('Sauvignon', 29, 1, 11072023),
('Verdot', 25, 1, 12072023),
('Chenin', 26, 1, 12072023),
('Macabeo', 23, 1, 12072023),
('Ugni', 29, 1, 12072023),
('Verdot', 25, 11, 12072023),
('Macabeo', 26, 11, 12072023),
('Ugni', 23, 11, 12072023),
('Sauvignon', 29, 11, 12072023),
('Verdot', 25, 11, 19072023),
('Macabeo', 26, 11, 19072023),
('Chenin', 23, 11, 19072023),
('Sauvignon', 29, 11, 19072023);

INSERT INTO taste_profile (name, description) 
VALUES 
("Riches et corsés", "Vous apprécierez certainement les vins rouges riches et corsés, avec des tanins prononcés et une belle longueur en bouche. Ces vins offrent des arômes intenses de fruits mûrs, d'épices et parfois une subtile touche de boisé. Ils sont parfaits pour accompagner des plats savoureux tels que des viandes grillées, des plats mijotés ou des fromages affinés."),
("Puissants et complexes", "Vous êtes un amateur de vins rouges puissants et complexes, vous serez captivé par ceux qui présentent une structure imposante, des arômes profonds de fruits noirs, d'épices exotiques et une élégante touche de vanille. Ces vins sont souvent issus de cépages robustes tels que le Syrah ou le Cabernet Sauvignon et se distinguent par leur longueur en bouche et leurs tanins fermes. Ils sont parfaits pour accompagner des plats audacieux tels que des viandes braisées, des ragoûts ou des plats épicés."),
("Légers et fruités", "Vous recherchez des vins rouges plus légers et fruités, vous serez attiré par ceux qui offrent des arômes croquants de fruits rouges, des notes florales et une fraîcheur agréable. Ils sont parfaits pour une dégustation conviviale entre amis ou pour accompagner des plats légers et savoureux."),
("Élégants et raffinés", "Vous appréciez les vins rouges élégants et raffinés, vous serez conquis par ceux qui offrent une subtile complexité, des arômes délicats de fruits rouges, de fleurs et une fine note de sous-bois. Ces vins, souvent issus de cépages délicats tels que le Pinot Noir, se distinguent par leur finesse, leur équilibre et leur délicatesse en bouche. Ils sont parfaits pour accompagner des plats délicats tels que des volailles rôties, des plats à base de champignons ou des fromages à pâte molle.");

INSERT INTO cepage (name)
VALUES
    ('Grenache'),
    ('Sultanine'),
    ('Syrah'),
    ('Malbec');

INSERT INTO wine (name, origin, img_wine, description)
VALUES
('Château Margaux','Bordeaux', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842748/chateau-margaux-2009-1er-cru-classe_e1a5pf.png', "Dominant sans grand mal toute l’appellation Margaux et d'une remarquable constance, Château Margaux produit des vins devenus mythiques tant le mariage rare de la finesse dans la densité et de la fraîcheur dans l’opulence est réussi. Ce millésime 2009 fait partie des très grands millésimes du cru, un monument de la nature où le terroir exceptionnel de Margaux se révèle à merveille.. Sublime, d'une noblesse inégalable et d'une longueur mémorable, ce Château Margaux 2009 est d'une élégance sans pareil!"),
('Barolo Cannubi', 'Piémont', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842748/barolo-2018-mario-giribaldi-removebg-d%C3%A9tour%C3%A9e_m4d3sp.png', "Exprimant dès sa jeunesse une merveilleuse gourmandise de fruits et des tanins déjà patinés, ce Barolo 2018 incarne parfaitement ce beau millésime : Un vin italien mûr et généreux, doté d’une belle structure complexe. Long et équilibré, il rendra parfaitement compte de son terroir après quelques années de garde. Il sera alors délicieux en accompagnement d’un gibier ou d’une viande rouge. Un véritable régal..."),
('Cornas', 'Rhône','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842748/cornas-2021-domaine-du-tunnel_rwaflx.png',"Ce Cornas aux senteurs de fruits noirs compotés, d'épices et de nuances florales est un vrai délice ! Sa bouche d'une longueur impressionnante, se révèle puissante, chaleureuse, veloutée et suave, soulignée en finale par une belle fraîcheur. Il promet de très belles années devant lui tout en étant très accessible sur sa jeunesse. Un cornas typé, viril et chaleureux, une valeur sûre qui fera le plaisir de vos papilles."),
('Julienas', 'Beaujolais', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842748/julienas-beaujolais-les-clochers-2021-vignerons-de-bel-air_cuyoi7.png',"Merci aux Vignerons de Bel Air de nous proposer un accès facile aux crus du Beaujolais ! Par le prix comme par le goût, voilà un Juliénas axé sur le plaisir et le fruit. Nous retrouvon en bouche une belle complexité aromatique, portée sur des arômes de fruits noirs mais également cet aspect épicé qui apporte de l'énergie à la dégustation. C'est en somme une cuvée bien équilibrée dévoilant une bouche et un nez en parfaite harmonie."),
('Pinot Noir','Bourgogne', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842748/pinot-noir-bourgognecouvent-des-jacobins-2021-louis-jadot_plqcyp.png',"La version blanc faisait déjà l'unanimité auprès des clients Vinatis, la gamme Couvent des Jacobins s'élargit avec ce Bourgogne Pinot Noir, et ce pour notre plus grand plaisir ! Le meilleur du Pinot Noir dans ce bijou signé de l'une des plus grandes Maisons de Bourgogne. Une dégustation sur une base de fruits rouges à son début, qui se développe au fil du temps vers des arômes plus complexes d’épices... Une valeur sûre !"),
('Bourgueil','Loire','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842765/bourgueil-loire-cuvee-vieilles-vignes-2020-domaine-olivier_b6mcdu.png',"La diversité des terroirs est une valeur importante du Domaine. C’est pourquoi ce dernier possède quelques parcelles de vignes sur l’appellation Bourgueil. Issu du même cépage qu’à Saint Nicolas de Bourgueil, le Cabernet Franc s’exprime de manière différente à Bourgueil. Avec des sols très calcaires, la cuvée “Vieilles Vignes” est structurée, riche et toujours accompagnée d’une grande vivacité typique des vins de cette appellation. En effet, c’est la roche calcaire qui donne aux grands Vins de Bourgueil cette amplitude et cette finale pleine de vivacité appelant à reprendre un verre !"),
('Santenay', 'Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842765/santenay-bourgogne_yyea89.png',"Les 7,92 hectares du Grand Clos Rousseau représentent la moitié de la surface du Clos Rousseau. Ce millésime 2017 présente un nez bien mur des beaux Climats récoltés à maturité plein de fruits noirs et d’épices. La bouche profonde et pleine laisse présager d’un très joli potentiel de garde. Un fois encore, le domaine Roux Père & Fils est à la hauteur de nos espérances, et ravit nos papilles en dégustation !"),
('Barbaresco', 'Piémont', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842765/barbaresco-2020-fontanabianca_bmdezk.png',"Ici le Nebbiolo s’épanouit sur les terroirs argilo-calcaires de Neive plein sud. L’élevage s’effectue en cuves inox, fûts de chêne et foudres anciens durant plus de deux ans pour ne pas trop marquer les vins. Le juteux de la cerise bien mûre se souligne d’une superbe minéralité dans un bouquet aux délicates nuances de pétales de rose, de safran et d’épices. La bouche affirme son caractère par la puissance de ses tanins, mûrs et sophistiqués. On retrouve un cœur de bouche rond et sensuel pour une finale profonde et complexe qui s’éternise. Voilà une cuvée qui va séduire les amateurs du monde entier !"),
('Priorat', 'Mas Doix','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842765/priorat-2021-alvaro-palacios_ddtwb2.png',"Camins del Priorat affiche une énergie et un caractère de feu. Cet assemblage de 6 cépages interatioaux et autochtones profile des saveurs mûres, intenses, savamment habillées d’une trame juteuse. On touche là au savoir-faire exercé de la Bodega, une bouteille exquise qui ravira les amateurs de rouges puissants et frais. Un grand moment de dégustation s’annonce sans attendre. Vous pourrez aussi el conserver 5 à 8 ans en cave."),
('Châteauneuf-Du-Pape', 'Rhône', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842765/chateauneuf-du-pape-2021-domaine-durieu_w3n42o.png',"Un Châteauneuf-du-Pape moderne et atypique pour son l’appellation, qui offre un vin gourmand, à la fois généreux et délicat. Un nectar du Rhône méridional ample et puissant, qui se dévoile sur une belle structure aux jolis tanins qui apportent gourmandise et fraîcheur. On raffole se ses nobles notes d’épices et de fruits rouges, suivies d’une élégante fraicheur !"),
('Amarone della Valpolicella','Vénétie', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842780/amarone-della-valpolicella-2019-vivaldi_twa8wy.png',"Juteux, plein et fruité, cet cuvée avance tous les arguments d’un Amarone de grande plénitude. S’octroyant tous les codes des grands, ce vin à majorité de Corvina (le célèbre cépage autochtone de Vénétie) est une réussite que l’on apprécie. Chair juteuse, expression fine, c’est un bel exemple de l’expression de ces vins connus dans le monde entier. A ne pas laisser passer !"),
('Rioja Reserva Vina Ardanza','Rioja Alta', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842780/rioja-vina-ardanza-reserva-2016-la-rioja-alta_n42tbj.png',"Le long élevage en fûts de chêne de plusieurs vins fait la signature de ce grand vin : 36 mois pour le Tempranillo, 30 mois pour le Garnacha. Les vins sont ensuite assemblés en barrique puis mis en bouteille. Vinatis vous propose un vin déjà patiné par quelques années de garde en bouteille. Une opportunité rare dans la vie d'un amateur puisque les vins ne sont jamais sortis de la Bodega depuis leur embouteillage. Le bouquet dévoile une superbe intensité de fruits rouges et noirs très frais d’une grande complexité. La densité de la bouche séduit par sa puissance de velours et son parfait équilibre entre fruité et boisé délicat. La finale réussie, le pari de la fraîcheur sur des longueurs incroyables ou l'on perçoit quelques notes de truffes, de sous-bois, résultat du vieillissement en bouteille."),
('Nuits-Saint-Georges','Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842780/nuits-saint-georges-vieilles-vignes-2020-domaine-fleurot_jrasrp.png',"Basée à Nuits Saint Georges depuis trois générations, la maison familiale Louis Fleurot pratiquait à l'époque la tonnellerie comme activité principale. La viticulture n'était alors qu'une activité annexe, une passion, et la production se faisait à des fins personnelles. Aujourd'hui, le domaine Fleurot use de son expérience et de son savoir-faire pour produire des cuvées subtiles au caractère unique. Corpulent et robuste, ce Nuits Saint Georges Vielles Vignes a tout d'un grand vin de garde par excellence, avec déjà toutefois un fruité et une harmonie remarquables dans sa jeunesse... Superbe !"),
("Crozes-Hermitage","Rhône","https://res.cloudinary.com/draz4ccrc/image/upload/v1686842780/crozes-hermitage-le-clos-2019-delas_aivfpz.png","Assurément encore un grand vin de la Maison Delas. La grande classe signée d'une main de maitre! Sa longueur et ses tanins veloutés ne pourront que vous enchanter aussi ! En quelques mots: un bijou à boire de suite ou à garder précieusement pour les plus patients !"),
('Barolo Monfortino', 'Piémont', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842800/rasteau-rhone-2019-patrick-lesec_bjvrm3.png', "Le Barolo est un délicieux vin rouge de la région du Piémont au nord de l'Italie, à la palette aromatique riche et aux tannins caractéristiques. Ces vins sont traditionnellement appréciés par la noblesse et poussent sur les plus belles parcelles de la région. Barolo Biolo 2018 dévoile dès son entrée dans le verre de savoureuses notes florales. À la dégustation, c'est une longueur et une explosion aromatique qui nous emportent vers des tannins de très belle facture à la fois fermes et mûrs. Un vin rouge à grand potentiel, profond et séduisant dès la première dégustation !"),
('Saint-Emilion','Bordeaux','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842800/saint-emilion-2019-inspire-par-haut-brion_eir7qo.png',"Découvrez Clarendelle Saint-Emilion qui puise aussi toute son inspiration dans la qualité, l’élégance et l’harmonie de la famille des vins de Domaine Clarence Dillon, propriétaire du prestigieux Château Haut-Brion. D'une belle couleur sombre, le vin présente une structure raffinée au grain fin. L'équilibre est harmonieux et élégant pour finir sur une finale fraîche et fruitée. Une superbe réussite pour ce Clarendelle Saint-Emilion !"),
('Faugères','Languedoc-Roussillon','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842800/faugeres-schistes-dores-2020-chateau-de-grezan_fifjjw.png',"Niché aux pieds des Cévennes, le Château de Grezan, magnifique par son architecture, produit des vins alliant à merveille finesse et puissance, traits caractéristiques de l’appellation Faugères. Avec ses notes de cassis, de réglisse et de tapenade, les Schistes Dorés accordera à la perfection son caractère sudiste et sa personnalité complexe et généreuse à toutes sortes de viandes grillées et de repas conviviaux. Une très belle cuvée à découvrir sans plus attendre et à oublier quelques années en cave pour en apprécier tout le potentiel."),
('Mendoza','Vallée de Uco','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842800/mendoza_malbec_argentins_hszdh5.png',"La Bodega Diamandes, appartenant au prestigieux Clos de los Siete est situé entre 1000 et 1200 m d'altitude et bénéficie donc d'une position idéale pour produire des vins au caractère unique. Un vin d'assemblage qui fera succomber les amateurs de viandes rouges. Subtile mariage entre richesse du fruit et fraîcheur..."),
('Rasteau','Rhône','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842800/rasteau-rhone-2019-patrick-lesec_bjvrm3.png',"Ce Rasteau 2019 est fidèle à l'expression de fruits cuits de son cru. C'est une cuvée très généreuse que nous offre comme à son habitude Patrick Lesec, portée sur les fruits rouges et les épices notamment. On adore son opulence, sa vivacité et tous les petits arômes qui se dévoilent délicatement tout au long de la dégustation. Ce Rasteau accompagnera formidablement bien tous vos apéritifs et grillades entre amis !"),
('Chablis','Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842621/chablis-2022-closerie-des-alisiers_jlwne3.png',"Une fois en bouche, c’est une explosion de fraîcheur ! Ses arômes complexes et délicats, alliant pomme verte et citron, révèlent la finesse et la subtilité de ce vin. La finale minérale rafraîchissante ajoute une touche d'élégance à chaque gorgée, témoignage de la qualité de ce Petit Chablis produit sur les meilleurs terroirs de la région. C’est rond avec des saveurs parfaitement équilibrées : à découvrir sans plus attendre !"),
('Meursault','Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842621/meursault-bourgogne2019-louis-latour_kfacpx.png',"Un vin qui exprime le terroir de Meursault dans toute sa splendeur ! Difficile de ne pas être séduit par ses arômes de petits fruits blanc aux notes miellées et briochées. La vivacité et la pointe d'acidité en bouche accompagneront à merveille une cuisine de le Mer simple ou sophistiquée ! Une belle Bouteille de la Géantissime Maison Louis Latour !"),
('Sancerre','Sauvignon','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842621/sancerre-sauvignon2022-domaine-la-perriere-removebg-d%C3%A9tour%C3%A9e_eeqhea.png',"Joyaux de la maison Saget La Perrière, le domaine produit exclusivement l'appellation de Sancerre. Il a acquis sa réputation non seulement par la qualité de ses vins, mais aussi grâce à un lieu magique et intemporel où 40 000 personnes se laissent envoûter chaque année. Un très bel équilibre entre des saveurs acides et suaves qui valorisera votre repas et surprendra vos convives..."),
('Condrieu','Viognier','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842621/condrieu-magnificat-2019-romain-duvernay_gqo37n.png',"Voilà un superbe exemple de l'appellation, les arômes typiques du cépage, ses notes florales, de pêches et d'abricots que l'on retrouvera dans une bouche fraîche, harmonieuse, étagée mais équilibrée. Viennent ensuite s'ajouter quelques notes grillées et minérales précédant une magnifique finale, encore une fois, sur la fraîcheur..."),
('Riesling', 'Alsace', 'https://res.cloudinary.com/draz4ccrc/image/upload/v1686842621/riesling-alsace_ga5uq0.png',"La Maison Cattin est une histoire de famille qui a commencé à la fin du 17e siècle. Aujourd'hui, l'histoire se poursuit avec Jacques et Anaïs Cattin avec une volonté de faire découvrir la Maison à l'international. Dans leur gamme Réserve on retrouve ce Riesling sec, au bouquet d'une grande finesse et aux multiples arômes. Il se marie admirablement bien avec les poissons, crustacés, fruits de mer, viandes blanches et bien sûr la traditionnelle choucroute."),
('Pouilly-Fumé','Sauvignon','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842637/pouilly-fume-2022-domaine-des-fines-caillottes-jean-pabiot_ole9kt.png',"Le Domaine des Fines Caillottes, gérer par Jean Pabiot et fils mettent en avant un vin blanc plus que digne de l'appellation Pouilly-Fumé! Il est délicieusement frais, avec des forts arômes d'agrumes et de fruits blancs. Les vignes sont conduites en développement durable, ce qui ajoute a la structure du vin. En bouche, ce Pouilly Fumé est ample, rond, charnu, tout en étant finement texturée. La vinification se passe en cuve inox et en élevage sur lies. Ce millésime 2022 est unique, car il est tout à fait prêt à boire, mais aussi, un vin à garder pendant les prochains 5 ans."),
('Marsannay','Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842637/marsannay-blanc-bourgogne2017-louis-latour_zmmac8.png',"Ce Chardonnay Ardéchois fait honneur à l'origine régionale de la Maison Latour qui le vinifie à l'image de certains Grands Vins de Bourgogne. Louis Latour nous offre ici un nectar rond, aux superbes notes de pêche jaune, et une incroyable fraicheur en finale. Encore une réussite signé par ce grand nom, à découvrir absolument pour une dégustation pleine de fraîcheur et de plaisir !"),
('Crozes-Hermitage','Rhône','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842637/crozes-hermitage-blanc-rhone2019-e-guigal_cpplxz.png',"On ne présente plus la Maison Guigal et ses nombreux engagements envers la terre illustre à laquelle elle doit ses vins prestigieux ! Ce Crozes-Hermitage blanc se dévoile tout en finesse et en élégance, nectar d'une remarquable fraîcheur doté de beaucoup de gras, et alliant toute la finesse et la richesse de son appellation. Rondeur, fraîcheur et richesse sont donc les maîtres-mots de cette cuvée qui se présente comme une valeur sûre au prix délicat !"),
('Chassagne-Montrachet','Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842637/chassagne-montrachet-blanc-bourgogne2021-domaine-des-petits-champs-lins_hw0m8x.png',"Plusieurs générations se sont succédées à la tête du domaine des Petits Champs Lins, toutes portant une grande attention à chaque détail du processus de production, afin d'offrir aux amateurs des cuvées d'exception et de grande qualité. Le Chassagne-Montrachet Blanc 2021 se dévoile élégant et généreux. Elevé en fût durant 12 mois, il offre de jolis arômes de fleurs blanches, de citrons confits et des notes briochées. En bouche, le vin est frais et équilibré, avec des notes de noisettes grillées et d'épices. Il s'accorde parfaitement avec les poissons et crustacés, la viande blanche et la volaille. Un véritable trésor à déguster avec vos proches lors d'une occasion spéciale ou pour sublimer un repas raffiné !"),
('Quincy','Loire','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842638/quincy-loire2022-domaine-jm-sorbe_agjpol.png',"Une belle surprise, avec un prix défiant tout concurrence ! Outre le Sancerre, l'appellation phare de la région, la vallée de la Loire révèle des AOC toutes aussi typées et à moindre prix. Quincy en fait partie. Typé fruits blanc et agrumes, aux notes subtiles de fleurs blanches, il se montre au palais, ample et léger. Il sera parfait à l'apéritif et jouera l'accord parfait sur les poissons et fruits de mer. Un rapport qualité/prix imbattable sur le Sauvignon."),
('Châteauneuf-du-Pape','Rhône','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842672/chateauneuf-du-pape-blanc-rhone2020-romain-duvernay-removebg-d%C3%A9tour%C3%A9e_wne4dg.png',"Ce Châteauneuf-du-Pape bio est la cuvée idéale à ouvrir en apéritif ! Elle regorge d'atouts plus séduisants les uns que les autres pour vous faire succomber de plaisir à la dégustation. C'est sur ces jolis arômes floraux et citronnés que nos experts ont succombés à nouveau à cette cuvée fraîche et onctueuse, offerte par celui que ses pairs considèrent comme l'un des plus fins palais de la région du Rhône, Romain Duvernay !"),
('Muscadet-sevre-et-maine','Bourgogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842672/muscadet-sevre-et-maine-sur-lie-bourgogne2021-domaine-de-l-esperance_nyercm.png',"Le Domaine de l’Espérance a été une belle surprise en dégustation. Ce Muscadet encensé par le Guide Hachette tient effectivement toutes ses promesses grâce à son fruit généreux, son intensité aromatique et son élégance en bouche. Un superbe rapport qualité-prix qui devrait en ravir plus d’un !"),
('Rioja','Rioja doca','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842672/rioja_blanco-fermentado-en-barrica-2020-vina-real_z8rv6w.png',"Ce vin blanc de Viña Real fermenté en barrique est issu de moût de raisins fermentés dans des barriques hongroises de différentes tailles et âges, où le vin a été élevé sur lies avec batonnage pendant 5 mois. Il a un boisé très intégré, et nous offre une belle fraicheur soutenue par notes d'agrumes intenses et de fruits blancs, de pommes, de banane et d'épices légères. Il est légèrement balsamique, léger et soigné. C'est le genre de vin simple et bien travaillé qui s’apprécie aussi bien dans la jeunesse qu'avec quelques années. C'est l'allié idéal des viandes blanches, des poissons ou encore de plats à base de pâtes fraiches et de fruits de mer."),
('Gros Manseng','Côtes-de-Gascogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842672/gros-et-petit-manseng-doux-n4-2022-domaine-uby-cotesdegascogne-removebg-d%C3%A9tour%C3%A9e_nodzp1.png',"Élégance et fraîcheur sont au rendez-vous dans ce concentré de fruits exotiques (passion, ananas, mangue...) à la bouche veloutée et onctueuse, exprimant des notes de coing et de citron confit. Un compagnon plein de douceur et de fraîcheur, qui fera le bonheur de vos repas et apéritifs !"),
('Silice','Savoie','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842672/silice-savoie-bugey2022-domaine-des-ardoisieres_t53n7j.png',"Issu d'achat de raisins bio selectionnés par l'équipe du célebrissime Domaine des Ardoisieres, Silice 2022 présente une couleur jaune vif dans le verre, avec des reflets verts. Au nez, ce vin blanc est vif et brillant, offrant des notes d'agrumes et de pomme verte. En bouche, le vin continue d'être rafraîchissant et doux, exprimant des notes subtiles de fleurs blanches et une étonnante pureté cristalline, avec une amande amère perceptible vers la finale. Le Silice 2022 fait écho à ses vignobles en terrasses par son caractère audacieux, caillouteux et minéral."),
('Prunus','Dao','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842688/prunus-blanc_dao_portugal2021-gota-wines_hv3st2.png',"Ce vin est originaire de la vallée du Dão. Les sols sont ici pauvres et caillouteux. Prunus en est une expression délicate. Le travail est entièrement manuel et les techniques de vinifications sont douces et ancestrales. A la dégustation, il est rond, harmonieux avec des fruits concentrés comme la pêche et les prunes jaunes, l’abricot ainsi que quelques notes florales. En bouche, c'est tout en minéralité, avec une finale longue et saline. Servir frais sur des fruits de mer ou un poisson frais."),
('Pessac-Leognan','Sauvignon','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842688/pessac-leognan-blanc-2020-chateau-coucheroy-sauvignon_i4nii5.png',"Couchiroy ou Couche Roi en Gascon. La légende raconte qu'un soir d'orage, le futur Roi Henri IV, revenant de la bataille de Coutras, fit en ces lieux une halte pour prendre quelque repos. Il aurait très certainement apprécié ce vin coulant, frais et se serait étonné de ses parfums de fruits exotiques. Un véritable vin de roi ! Sa robe brillante est d'un joli jaune pâle. Le nez demande à être aéré avant de s'exprimer pleinement et laisse alors s'échapper des notes de fruits blancs, de pamplemousse, mêlées à un léger beurré. En bouche, on retrouve un ensemble équilibré, de la fraicheur et une jolie structure. Avec de savoureuses notes de fruits à noyau, mais aussi de brioche, c'est un Pessac très réussi qui pourra être servi sur de nombreux plats."),
('Colombard-Sauvignon','Côtes-de-Gascogne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842688/colombard-sauvignon-blanc-n3-2022-uby-gascogne_mlypeq.png',"Léger et fruité ! Tout en arômes d'agrumes (pamplemousse, citron...), ce vin blanc est expressif, fin, facile à boire et toujours d'une belle fraîcheur. Le palais est gourmand avec des notes citronnées allant sur une belle longueur.. A savourer bien frais à l'apéritif ! Avis aux gourmands : une bouteille ne suffira pas..."),
('Grenache','Languedoc-Roussillon','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842688/grenache-gris-2018-mas-gabinele-languedoc_db8gwd.png',"Issus de vignes âgées de plus de 50 ans et situées en altitude, cette cuvée fait partie des vins confidentiels du Languedoc-Roussillon, catégorie un peu à part, qu’on se partage comme un secret entre épicuriens passionnés. Sous la trame minérale de ce blanc expressif, s’ouvrent des notes délicates de poire, de figue, de cédrat et de poivre blanc. A réserver pour sublimer vos plats de poissons."),
('Chianti Classico','Toscagne','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842780/chianti-classico-gran-selezione-badia-a-passignano-2015-tenuta-tignanello_ujrtlx.png',"Badia a Passignano Gran Selezione est produit exclusivement à partir des meilleurs raisins Sangiovese récoltés dans son vignoble éponyme situé au cœur de la région du Chianti Classico. Les vignes poussent à une altitude d'environ 300 mètres au-dessus du niveau de la mer sur des sols riches en calcaire avec une bonne quantité d'argile. Le vin est élevé dans les caves historiques sous la Badia (abbaye) de Passignano qui remonte au 10ème siècle. Le Chianti Classico Gran Selezione Badia a Passignano 2015 est un excellent exemple de ce qu'est capable d'accomplir le Sangiovese sur ce type de terroir. Ici, les saveurs sont plus sombres et plus riches, tandis que dans le même temps le vin possède un niveau de résonance texturale et d'ampleur qui le distingue des vins plus linéaires qu'Antinori produit au vignoble de Tignanello. La cerise noire, la prune, la lavande, les épices et les notes mentholées se mêlent merveilleusement pour donner à ce vin une intensité, une ampleur et une complexité incroyable. Impressionnant !"),
('Jardin des Charmes','Sauvignon','https://res.cloudinary.com/draz4ccrc/image/upload/v1686842688/jardin-des-charmes-sauvignon-2022-alma-cersius_qp7vhc.png',"Mmhhh quel régal ce Sauvignon ! Grâce à des vendanges élaborées entre 4 et 10h du matin, ce cépage conserve ici toute sa fraîcheur, offrant ainsi une palette aromatique intacte de fruits juteux et d’agrumes sous une agréable trame minérale. Encore une fois, la cave d’Alma Cersius enthousiasme notre palais avec ce vin blanc impeccable en toutes occasions et au prix tout aussi bluffant. Une pure gourmandise offerte sur un plateau !!!");