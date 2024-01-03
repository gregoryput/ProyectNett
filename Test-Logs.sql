USE BD_PROYENETT_VF17
GO


-- Insertar datos en la tabla EstadosRegistros:
INSERT INTO EstadosRegistros
  (NombreEstado)
VALUES
  /*1*/
  ('Activo'),
  /*2*/
  ('Inactivo'),
  /*3*/
  ('Borrador');
-- Select * From EstadosRegistros


GO
-- Insertar datos en la tabla Roles
INSERT INTO Roles
  (NombreRol, IdEstadoRegistro, Valoracion)
VALUES
  /*1*/
  ('Administrador', 1, 4),
  /*2*/
  ('Administrador De Usuario', 1, 3),
  /*3*/
  ('Asistente Administrativo', 1, 2),
  /*4*/
  ('Asistente', 1, 1);
-- Select * FROM Roles


GO
-- Insertar datos en la tabla Usuarios
INSERT INTO Usuarios
  (NombreUsuario, Correo, IdRol, Contraseña, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/
  ('juan01andres', 'juan@gestnett.com', 1, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, GETDATE(), 1),
  /*2*/
  ('carlos01', 'carlos@gestnett.com', 2, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, GETDATE(), 1),
  /*3*/
  ('joselo01', 'joselo@gestnett.com', 1, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, GETDATE(), 1),
  /*4*/
  ('cristian01', 'cristiano@gestnett.com', 4, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, GETDATE(), 1),
  /*5*/
  ('pedro01', 'pedro@gestnett.com', 3, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, GETDATE(), 1),
  /*6*/
  ('gregory01', 'greg@gestnett.com', 1, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 1, GETDATE(), 1);
-- Select * FROM Usuarios


GO
-- CREACION DE LA TABLA USUARIOSROLES:
INSERT INTO UsuariosRoles
  (IdUsuario, IdRol, IdCreadoPor, FechaCreacion)
VALUES
  /*gregory01------*/(1, 1, 1, GETDATE()),
  /*carlos01-------*/(2, 1, 1, GETDATE()),
  /*joselo01-------*/(2, 1, 1, GETDATE()),
  /*cristian01-----*/(3, 1, 1, GETDATE()),
  /*pedro01--------*/(4, 1, 1, GETDATE()),
  /*juan01andres---*/(1, 1, 1, GETDATE());
                   -- Select * FROM UsuariosRoles


GO
-- Insertar datos en la tabla Sexos
INSERT INTO Sexos
  (SexoNombre, IdCreadoPor, FechaCreacion)
VALUES
  /*1*/
  ('Masculino', 1, GETDATE()),
  /*2*/
  ('Femenino', 1, GETDATE());
-- Select * FROM Sexos


GO
-- Insertar datos en la tabla Paises
INSERT INTO Paises
  (PaisNombre, IdCreadoPor, FechaCreacion)
VALUES
  ('República Dominicana', 1, GETDATE()),
  ('Estados Unidos', 1, GETDATE());
-- Select * FROM Paises


-- Insertar datos en la tabla Ciudades
/*PROVINCIAS DE REPUBLICA DOMINICANA*/
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Santo Domingo', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Santiago', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('San Pedro de Macorís', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('La Romana', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Puerto Plata', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Higuey', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Mao', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
------
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Monte Cristi', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Azua', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('San Francisco de Macorís', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('San Juan de la Maguana', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('La Vega', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Hato Mayor', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('San Cristóbal', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Barahona', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Bonao', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Neiba', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Moca', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Samana', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Elias piña', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('San José de Ocoa', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('El Seibo', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Dajabón', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Monte Plata', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Jimaní', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Pedernales', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
-----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Cotuí', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Jarabacoa', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Sánchez Ramírez', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Santiago Rodríguez', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Espaillat', 1, 1, GETDATE(), 1, GETDATE(), 1);
GO
/*PROVINCIAS DE ESTADOS UNIDOS*/
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('New York', 2, 1, GETDATE(), 1, GETDATE(), 1);
GO
----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Brooklin', 2, 1, GETDATE(), 1, GETDATE(), 1);
GO
----
INSERT INTO Ciudades
  (CiudadNombre, IdPais, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Miami', 2, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Ciudades


GO
-- Insertar datos en la tabla TiposPersonas:
INSERT INTO TiposPersonas
  (NombreTipoPersona, Descripcion, IdCreadoPor, FechaCreacion)
VALUES
  /*1*/
  ('Representante de cliente', 'Representante de empresas/sucursales de cliente', 1, GETDATE()),
  /*2*/
  ('Representante de proveedor', 'Representante de empresas/sucursales de proveedor', 1, GETDATE()),
  /*3*/
  ('Empleado', 'Persona que pertenece al personal de trabajo de GESTNETT', 1, GETDATE()),
  /*4*/
  ('Cliente persona física', 'Clientes cuyo tipo de entidad es una persona física', 1, GETDATE()),
  /*5*/
  ('Proveedor persona física', 'Proveedor cuyo tipo de entidad es una persona física', 1, GETDATE());


GO
-- Insertar datos en la tabla Personas:
INSERT INTO Personas
  (Nombres, Apellidos, Telefono1, Telefono2, Direccion, Correo, FechaDeNacimiento, Cedula, IdSexo, IdCiudad, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ----- Clientes ------
  /*1*/('Juan José', 'Pérez Melindo', '809-123-4567', '809-987-6543', 'Bo. Santa fé, Calle 1, #26', 'juan@gmail.com', '1993-05-15', '001-1234567-8', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('María Lola', 'González Ruíz', '809-111-2222', '809-333-4444', 'Bo. La luz, calle 2, #40', 'maria@gmail.com', '1998-08-10', '002-2345678-9', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Emenejildo', 'Santana Cruz', '809-098-1010', '809-222-5555', 'Bo. La estrellita, calle 3, #10', 'emels@outlook.com', '1998-08-10', '402-2040608-9', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('Ignacio Alex', 'Lopez Severino', '829-345-1345', '809-409-0197', 'Bo. Castañuela, calle 4 #20', 'alexig@hotmail.com', '1998-08-10', '402-1234568-0', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('Maribel Ana', 'De la Rosa', '809-232-9876', '809-209-1076', 'Bo. Concepción, calle 5, #9', 'anamaria@gmail.com', '1998-08-10', '402-1041111-9', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('María Eugenia', 'Gómez Fernández', '809-234-5678', '809-876-5432', 'Bo. Pueblo Nuevo, Calle 2, #15', 'mariaeugenia@gmail.com', '1995-11-22', '002-8765432-1', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('Luis Miguel', 'Hernández Rodríguez', '809-345-6789', '809-987-6543', 'Bo. El Paraíso, Calle 5, #10', 'luismiguel@gmail.com', '1986-09-10', '003-3456789-1', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('Ana Gabriela', 'González Soto', '809-456-7890', '809-321-6547', 'Bo. Las Flores, Calle 8, #20', 'anagabriela@gmail.com', '1996-07-12', '004-4567890-2', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/('Carlos Andrés', 'López Ramírez', '809-567-8901', '809-234-5678', 'Bo. Los Alamos, Calle 12, #30', 'carloslopez@gmail.com', '1989-03-25', '005-5678901-3', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/('María Fernanda', 'Guzmán Peña', '809-678-9012', '809-345-6789', 'Bo. El Carmen, Calle 20, #5', 'mariafernanda@gmail.com', '1994-12-08', '006-6789012-4', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),

  ----- Proveedores ------
  /*11*/('Luis Alberto', 'Hernández Rodríguez', '809-890-1234', '809-456-7890', 'Bo. Los Jardines, Calle 30, #15', 'luis.hernandez@gmail.com', '1988-09-20', '007-8901234-5', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*12*/('Laura', 'Gómez Martínez', '809-234-5678', '809-678-9012', 'Bo. Los Robles, Calle 5, #10', 'laura.gomez@gmail.com', '1995-11-12', '008-2345678-6', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*13*/('Carlos', 'Santana López', '809-345-6789', '809-890-1234', 'Bo. Los Alamos, Calle 15, #8', 'carlos.santana@gmail.com', '1989-07-20', '009-3456789-7', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*14*/('Crisencio', 'Sinmi Ruiz', '829-333-1010', '849-202-2620', 'Bo. Los Guilamos, Calle 13, #9', 'sinmi.ruiz@gmail.com', '1985-03-21', '113-2224444-8', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*15*/('Jolio', 'Carmuel Joanl', '849-103-1299', '829-112-1631', 'Bo. Los Casiz, Calle 11, #90', 'carmuel.joanl@gmail.com', '1995-03-21', '100-0224040-1', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),

  ----- Empleados ------
  /*16*/('Juan', 'Pérez', '849-555-1234', '809-505-5678', 'Calle Principal 123', 'juan.perez@example.com', '1992-05-10', '1234567890123', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*17*/('Maria', 'López', '849-555-4321', '809-505-5678', 'Avenida Central 456', 'maria.lopez@example.com', '1994-09-18', '9876543210987', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*18*/('Alvarez', 'Cruz Filip', '809-055-5078', '829-050-5021', 'Calle Secundaria 789', 'pedro.rodriguez@example.com', '1987-12-03', '4567890123456', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*19*/('Ana Lia', 'Gómez Lopez', '809-555-8765', '829-555-9071', 'Carrera Principal 321', 'ana.gomez@example.com', '1980-07-22', '7890123456789', 2, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*20*/('Sofia Sael', 'García Moreno', '849-535-1010', '829-515-9292', 'Avenida Norte 789', 'sofia.garcia@example.com', '1991-03-27', '3456789012345', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*21*/('Joeli', 'Sabino', '829-312-3303', '809-505-1292', 'Calle Oeste 567', 'carlos.martinez@example.com', '1993-08-14', '5678901234567', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*22*/('Juan Andrés', 'César Jiménez', '829-836-3523', '809-650-5069', 'Villa 1 Calle Anthurias', 'juancj@gmail.com', '2001-02-26', '1600000234567', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*23*/('Gregory Albert', 'Sanchez', '809-806-3003', '829-659-5869', 'Vlla 3 Calle C', 'greg@gmai.com', '2001-06-28', '1611110234567', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),

  ----- Clientes nuevamente (Personas fisicas): ------
  /*24*/('Malvin', 'Lorens', '829-809-3109', '809-059-0860', 'Lora 5 Calle C', 'mall@gmai.com', '2001-06-28', '0610130230560', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*25*/('Santini Tanmo', 'Veltran', '809-806-3003', '809-150-0061', 'Win C Calle 1', 'sant@gmai.com', '2001-06-28', '9603203234569', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*26*/('Cuinmi Livin', 'Chelv', '829-801-1220', '809-151-5432', 'Lenr 1 Calle 9', 'cui@gmai.com', '2001-06-28', '2010110234467', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*27*/('Onar Chelvin', 'Suent', '809-821-0220', '829-050-1030', 'Ruin 2 Calle 10', 'onar@gmai.com', '2001-06-28', '1015110034063', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),

  ----- Proveedores nuevamente (Personas fisicas): ------
  /*28*/('Felipe Chinun', 'Flimon', '809-829-1330', '829-252-9860', 'Mamban 1 Calle 2', 'fepcf@gmai.com', '2001-06-28', '1022209290509', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*29*/('Jaen Polarin', 'Artan', '829-816-1019', '849-252-1161', 'Lirian 2 Calle B', 'jaenpola@gmai.com', '2001-06-28', '1693209239560', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*30*/('Pimilo Muriel', 'Linm', '809-101-0291', '829-252-1402', 'B0. La Cruz, Calle 1', 'pimuli@gmai.com', '2001-06-28', '2345678900469', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*31*/('Janlo Rael', 'Joln', '849-890-1239', '849-151-1935', 'Polancos Calle 2', 'janraj@gmai.com', '2001-06-28', '9195130004060', 1, 3, 1, GETDATE(), 1, GETDATE(), 1);
  -- Select * FROM Personas


GO
-- INSERTANDO DATOS EN LA TABLA PersonasTiposPersonas:
INSERT INTO PersonasTiposPersonas
  (IdPersona, IdTipoPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  ------------------------------- INSERT Personas Representante de cliente
  /*1-------*/(1, 1, 1, GETDATE(), 1),
  /*2-------*/(2, 1, 1, GETDATE(), 1),
  /*3-------*/(3, 1, 1, GETDATE(), 1),
  /*4-------*/(4, 1, 1, GETDATE(), 1),
  /*5-------*/(5, 1, 1, GETDATE(), 1),
  /*6-------*/(6, 1, 1, GETDATE(), 1),
  /*7-------*/(7, 1, 1, GETDATE(), 1),
  /*8-------*/(8, 1, 1, GETDATE(), 1),
  /*8-------*/(9, 1, 1, GETDATE(), 1),
  /*10------*/(10, 1, 1, GETDATE(), 1),
  -----------------------------
  /*11------*/(24, 4, 1, GETDATE(), 1),
  /*12------*/(25, 4, 1, GETDATE(), 1),
  /*13------*/(26, 4, 1, GETDATE(), 1),
  /*14------*/(27, 4, 1, GETDATE(), 1),
  ------------------------------- INSERT Personas Proveedores
  /*15-------*/(11, 2, 1, GETDATE(), 1),
  /*16-------*/(12, 2, 1, GETDATE(), 1),
  /*17-------*/(13, 2, 1, GETDATE(), 1),
  /*18-------*/(14, 2, 1, GETDATE(), 1),
  /*19-------*/(15, 2, 1, GETDATE(), 1),
  -------------------------------
  /*20-------*/(28, 5, 1, GETDATE(), 1),
  /*21-------*/(29, 5, 1, GETDATE(), 1),
  /*22-------*/(30, 5, 1, GETDATE(), 1),
  /*23-------*/(31, 5, 1, GETDATE(), 1);
  -- SELECT * FROM PersonasTiposPersonas



GO
-- Insertar datos en la tabla Empresas -------- :
INSERT INTO Empresas
  (NombreEmpresa, RNC, Correo, Telefono1, Telefono2, SitioWeb, Direccion, IdCiudad, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  -- EMPRESAS PARA CLIENTES:
  /*1*/('José Inversiones', '123456789', 'joseinv@hotmail.com', '809-111-1111', '809-222-2222', 'https://www.joseinv.com', 'Bo. Villa Cruz, calle 1, #26', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('Ferreteria María', '187654321', 'ferrema@gmail.com', '809-333-3333', '809-444-4444', 'https://www.ferrema.com', 'Bo. Villa navarro, calle 2, #30', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Banco Veracruz', '023454321', 'bancoveracruz@outlook.com', '809-554-2424', '809-321-1212', 'https://www.bancoveracruz.com', 'Bo. Vista Hermosa, calle 4, #31', 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('Tienda Ignacio', '123333320', 'ignacioshop@outlook.com', '829-222-1113', '809-309-4343', 'https://www.shopignacio.com', 'Bo. Consuelito, calle 5, #30', 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('Gym Mari', '234568091', 'gymmariana@outlook.com', '829-333-5590', '809-901-1234', 'https://www.gymmaria.com', 'Bo. nuñez 1, calle 7, #60', 4, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('Construcciones Mar', '287654321', 'mariaconstruct@gmail.com', '809-555-1234', '809-888-9999', 'https://www.mariaconstruct.com', 'Bo. Los Pinos, Calle 3, #8', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('Luis Consultores', '387654123', 'luisconsult@gmail.com', '809-222-3333', '809-444-5555', 'https://www.luisconsult.com', 'Bo. Las Palmas, Calle 6, #12', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('Ana Servicios', '487654987', 'anaserv@gmail.com', '809-777-8888', '809-999-0000', 'https://www.anaserv.com', 'Bo. Los Jardines, Calle 10, #5', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/('López Construcciones', '987654789', 'lopezconstruc@gmail.com', '809-333-4444', '809-555-6666', 'https://www.lopezconstruc.com', 'Bo. Los Pinos, Calle 15, #40', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/('Guzmán Arquitectura', '947654321', 'guzmanarq@gmail.com', '809-777-8888', '809-999-0000', 'https://www.guzmanarq.com', 'Bo. Los Almendros, Calle 25, #10', 1, 1, GETDATE(), 1, GETDATE(), 1),

  -- EMPRESAS PARA PROVEEDORES:
  /*11*/('Hernández Ingeniería', '987654123', 'hernandezing@gmail.com', '809-111-2222', '809-333-4444', 'https://www.hernandezing.com', 'Bo. Los Pinos, Calle 10, #20', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*12*/('Gómez Arquitectos', '387654987', 'gomezarq@gmail.com', '809-111-3333', '809-444-5555', 'https://www.gomezarq.com', 'Bo. Los Pinos, Calle 8, #15', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*13*/('Santana Construcciones', '957654321', 'santanaconstruc@gmail.com', '809-222-3333', '809-444-5555', 'https://www.santanaconstruc.com', 'Bo. Los Jardines, Calle 10, #25', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*14*/('Crisencio Baterias', '001340009', 'bateriascris@gmail.com', '829-201-3103', '849-303-1503', 'https://www.bateriascris.com', 'Bo. Los Rulos, Calle 11, #23', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*15*/('Carmuel Prestamos', '566649912', 'prestamoscarmuel@gmail.com', '849-221-2191', '809-220-1117', 'https://www.prestamoscarmuel.com', 'Bo. Las Raiz, Calle 09, #11', 2, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Empresas



GO
INSERT INTO Sucursales
  (SucursalNombre, IdCiudad, Direccion, IdSede, Detalles, SucursalTelefono1, SucursalTelefono2, SucursalCorreo)
VALUES
  -- SUCURSALES DE EMPRESAS DE CLIENTES:

  /*1*/
  ('José Inversiones San Pedro', 2, 'Naime Calle A', 1,
    'Sucursal de San Pedro en Barrio Naime, cerca de Hotel las Matas, esta sucursal es para inversiones menores.',
    '829-834-0901', '809-340-1212', 'joseinvspm@gmail.com'
),
  /*2*/
  ('Ferreteria María la Romana', 2, 'Villa Hermosa, Calle C', 3,
    'Sucursal de Romana, cerca de ASOTR, esta sucursal es para construcciones mas grandes.',
    '809-134-1901', '829-342-0202', 'ferrmarromana@gmail.com'
),
  /*3*/
  ('Banco Veracruz Santiago', 3, 'Villa Tapia, Calle T', 1,
    'Sucursal de Santiago, cerca de ASOTR, para controlar el flujo de clientes de Santiago.',
    '849-104-1921', '809-302-1292', 'bancoversantiago@gmail.com'
),

  -- SUCURSALES DE EMPRESAS DE PROVEEDORES:
  /*4*/
  ('Hernández Ingeniería San Pedro', 3, 'Villa Lobos, Calle C', 1,
    'Sucursal de San Pedro, cerca de TAR, para realizar proyectos en más áreas del este.',
    '809-229-8424', '809-338-1931', 'heringsanp@gmail.com'
),
  /*5*/
  ('Gómez Arquitectos Romana', 3, 'Villa Riva, Calle C', 1,
    'Sucursal de Romana, cerca de ELM, para realizar proyectos de arquitectura en zonas urbanas.',
    '809-004-0901', '829-001-0101', 'goarqrom@gmail.com'
);
GO



GO
-- Insertar datos en la tabla SucursalesRepresentantes:
INSERT INTO 
SucursalesRepresentantes
  (IdSucursal, IdRepresentanteActual, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  (1, 1, 1, GETDATE(), 1),
  (2, 2, 1, GETDATE(), 1),
  (3, 3, 1, GETDATE(), 1),
  ---
  (4, 11, 1, GETDATE(), 1),
  (5, 2, 1, GETDATE(), 1);
GO
-- select * from SucursalesRepresentantes



GO
-- Insertar datos en la tabla TiposEntidades:
INSERT INTO TiposEntidades
  (NombreTipoEntidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Persona física', 1, GETDATE(), 1),
  /*2*/('Empresa', 1, GETDATE(), 1);
-- Select * FROM TiposEntidades



GO
-- Insertar datos en la tabla RolesEntidades:
INSERT INTO RolesEntidades
  (NombreRolEntidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Cliente', 1, GETDATE(), 1),
  /*2*/('Proveedor', 1, GETDATE(), 1);
-- Select * FROM RolesEntidades


GO
-- Insertar datos en la tabla Entidades:
INSERT INTO Entidades
  (NombreEntidad, IdTipoEntidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  ---------------------------------------------ENTIDADES CLIENTES EMPRESAS:
  /*1_*/('Inversiones José COPR', 2, 1, GETDATE(), 1),
  /*2_*/('Grupo Ferretero María', 2, 1, GETDATE(), 1),
  /*3_*/('Asociación Banco Veracruz COPR', 2, 1, GETDATE(), 1),
  /*4_*/('Tienda Ignacio Comerncial', 2, 1, GETDATE(), 1),
  /*5_*/('Grupo Fit Gym Mari', 2, 1, GETDATE(), 1),
  /*6_*/('Construtora Mar Construcciones', 2, 1, GETDATE(), 1),
  /*7_*/('Consultores Auditores Lulu', 2, 1, GETDATE(), 1),
  /*8_*/('Ana Servicios Multiples', 2, 1, GETDATE(), 1),
  /*9_*/('Constructora Loop Construcciones', 2, 1, GETDATE(), 1),
  /*10*/('Guz Servicios de Arquitectura', 2, 1, GETDATE(), 1),
  -----------------------------------------------ENTIDADES CLIENTES PERSONAS FISICAS:
  /*11*/('Malvin Lorens Prestamista', 1, 1, GETDATE(), 1),
  /*12*/('Santini Cartieles Relojes', 1, 1, GETDATE(), 1),
  /*13*/('Cuinmi Promtions Urbanos', 1, 1, GETDATE(), 1),
  /*14*/('Onar Chelvin Asesoria', 1, 1, GETDATE(), 1),
  -----------------------------------------------ENTIDADES PROVEEDORES EMPRESAS:
  /*15*/('Hernández Ingeniería', 2, 1, GETDATE(), 1),
  /*16*/('Gómez Arquitectos', 2, 1, GETDATE(), 1),
  /*17*/('Santana Construcciones', 2, 1, GETDATE(), 1),
  /*18*/('Crisencio Baterias', 2, 1, GETDATE(), 1),
  /*19*/('Carmuel Prestamos', 2, 1, GETDATE(), 1),
  -----------------------------------------------ENTIDADES PROVEEDORES PERSONAS FISICAS:
  /*20*/('Flimon el Colector', 1, 1, GETDATE(), 1),
  /*21*/('Jaen Polarin Minorista', 1, 1, GETDATE(), 1),
  /*22*/('Pimilo Muriel Inversiones', 1, 1, GETDATE(), 1),
  /*23*/('Janlo Rael Coleccionista vendedor', 1, 1, GETDATE(), 1);



GO 
-- Insertar datos en la tabla EntidadesRolesEntidades:
INSERT INTO EntidadesRolesEntidades(IdEntidad, IdRolEntidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro) VALUES
--- ROLES PARA ENTIDADES CLIENTES:
/*1_*/(1, 1, 1, GETDATE(), 1),
/*2_*/(2, 1, 1, GETDATE(), 1),
/*3_*/(3, 1, 1, GETDATE(), 1),
/*4_*/(4, 1, 1, GETDATE(), 1),
/*5_*/(5, 1, 1, GETDATE(), 1),
/*6_*/(6, 1, 1, GETDATE(), 1),
/*7_*/(7, 1, 1, GETDATE(), 1),
/*8_*/(8, 1, 1, GETDATE(), 1),
/*9_*/(9, 1, 1, GETDATE(), 1),
/*10*/(10, 1, 1, GETDATE(), 1),
---------------------------------
/*11*/(11, 1, 1, GETDATE(), 1),
/*12*/(12, 1, 1, GETDATE(), 1),
/*13*/(13, 1, 1, GETDATE(), 1),
/*14*/(14, 1, 1, GETDATE(), 1),
--- ROLES PARA ENTIDADES PROVEEDORES:
/*15*/(15, 2, 1, GETDATE(), 1),
/*16*/(16, 2, 1, GETDATE(), 1),
/*17*/(17, 2, 1, GETDATE(), 1),
/*18*/(18, 2, 1, GETDATE(), 1),
/*19*/(19, 2, 1, GETDATE(), 1),
---------------------------------
/*20*/(20, 2, 1, GETDATE(), 1),
/*21*/(21, 2, 1, GETDATE(), 1),
/*22*/(22, 2, 1, GETDATE(), 1),
/*23*/(23, 2, 1, GETDATE(), 1);


GO
-- Insertar datos en la tabla RepresentantesRoles:
INSERT INTO RepresentantesRoles
  (NombreRolRepresentante, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Representante de entidad en calidad de cliente', 1, GETDATE(), 1),
  /*2*/('Representante de entidad en calidad de proveedor', 1, GETDATE(), 1);
-- Select * FROM RepresentantesRoles


GO
-- Insertar datos en la tabla EntidadesPersonasFisicas:
INSERT INTO EntidadesPersonasFisicas
  (IdEntidad, IdPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  --- ROLES PARA LAS ENTIDADES CLIENTES PERSONAS FISICAS:
  /*1_*/(11, 24, 1, GETDATE(), 1),
  /*2_*/(12, 25, 1, GETDATE(), 1),
  /*3_*/(13, 26, 1, GETDATE(), 1),
  /*4_*/(14, 27, 1, GETDATE(), 1),
  --- ROLES PARA LAS ENTIDADES PROVEEDORES PERSONAS FISICAS:
  /*5_*/(20, 28, 1, GETDATE(), 1),
  /*6_*/(21, 29, 1, GETDATE(), 1),
  /*7_*/(22, 30, 1, GETDATE(), 1),
  /*8_*/(23, 31, 1, GETDATE(), 1);
-- SELECT * FROM RolesEntidades



-- OJO: Para estos registros de prueba, el representante sera la misma persona en EntidadesPersonasFisicas:
-- En la app debe haber una opcion para decir si el representante sera el misma persona o si tendra un representante.
GO
-- Insertar datos en la tabla EntidadesPersonasFisicasRepresentantes:
INSERT INTO EntidadesPersonasFisicasRepresentantes
  (IdEntidadPersonaFisica, IdRepresentanteActual, IdRolRepresentante, FechaInicioRepresentante, FechaFinRepresentante, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  --- ROLES PARA LOS REPRESENTANTES DE ENTIDADES CLIENTES PERSONAS FISICAS:
  (1, 24, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (2, 25, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (3, 26, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (4, 27, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  --- ROLES PARA LOS REPRESENTANTES DE ENTIDADES PROVEEDORES PERSONAS FISICAS:
  (5, 28, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (6, 29, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (7, 30, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (8, 31, 2, GETDATE(), NULL, 1, GETDATE(), 1);
-- SELECT * FROM EntidadesPersonasFisicasRepresentantes


GO
-- Insertar datos en la tabla EntidadesEmpresas:
INSERT INTO EntidadesEmpresas
  (IdEntidad, IdEmpresa, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  ---PARA LAS ENTIDADES CLIENTES EMPRESAS:
  /*1_*/(1, 1, 1, GETDATE(), 1),
  /*2_*/(2, 2, 1, GETDATE(), 1),
  /*3_*/(3, 3, 1, GETDATE(), 1),
  /*4_*/(4, 4, 1, GETDATE(), 1),
  /*5_*/(5, 5, 1, GETDATE(), 1),
  /*6_*/(6, 6, 1, GETDATE(), 1),
  /*7_*/(7, 7, 1, GETDATE(), 1),
  /*8_*/(8, 8, 1, GETDATE(), 1),
  /*9_*/(9, 8, 1, GETDATE(), 1),
  /*10*/(10, 10, 1, GETDATE(), 1),
  ---PARA LAS ENTIDADES PROVEEDORES EMPRESAS:
  /*11*/(15, 11, 1, GETDATE(), 1),
  /*12*/(16, 12, 1, GETDATE(), 1),
  /*13*/(17, 13, 1, GETDATE(), 1),
  /*14*/(18, 14, 1, GETDATE(), 1),
  /*15*/(19, 15, 1, GETDATE(), 1);
-- SELECT * FROM RolesEntidades


GO
-- Insertar datos en la tabla EntidadesEmpresasRepresentantes:
INSERT INTO EntidadesEmpresasRepresentantes
  (IdEntidadEmpresa, IdRepresentanteActual, IdRolRepresentante, FechaInicioRepresentante, FechaFinRepresentante, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  --- ROLES PARA LOS REPRESENTANTES DE ENTIDADES CLIENTES EMPRESAS:
  (1, 1, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (2, 2, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (3, 3, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (4, 4, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (5, 5, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (6, 6, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (7, 7, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (8, 8, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (9, 9, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  (10, 10, 1, GETDATE(), NULL, 1, GETDATE(), 1),
  --- ROLES PARA LOS REPRESENTANTES DE ENTIDADES PROVEEDORES EMPRESAS:
  (11, 11, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (12, 12, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (13, 13, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (14, 14, 2, GETDATE(), NULL, 1, GETDATE(), 1),
  (15, 15, 2, GETDATE(), NULL, 1, GETDATE(), 1);
-- SELECT * FROM EntidadesEmpresasRepresentantes



GO
-- Insertar datos en la tabla Clientes:
INSERT INTO Clientes
  (Codigo, IdEntidad, FechaInicioCliente, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  ------------------------------CLIENTES EMPRESAS:-------------------------------------------
  /*1_*/('JI1234512', 1, GETDATE(), 1, GETDATE(), 1),
  /*2_*/('ML1234512', 2, GETDATE(), 1, GETDATE(), 1),
  /*3_*/('ES1234512', 3, GETDATE(), 1, GETDATE(), 1),
  /*4_*/('IA1234512', 4, GETDATE(), 1, GETDATE(), 1),
  /*5_*/('GM1234512', 5, GETDATE(), 1, GETDATE(), 1),
  /*6_*/('MA1234512', 6, GETDATE(), 1, GETDATE(), 1),
  /*7_*/('MI1234512', 7, GETDATE(), 1, GETDATE(), 1),
  /*8_*/('LM1234512', 8, GETDATE(), 1, GETDATE(), 1),
  /*9_*/('AG1234512', 9, GETDATE(), 1, GETDATE(), 1),
  /*10*/('MF1234512', 10, GETDATE(), 1, GETDATE(), 1),
  ------------------------------CLIENTES PERSONAS FISICAS:-------------------------------------------
  /*11*/('ML0001111', 11, GETDATE(), 1, GETDATE(), 1),
  /*12*/('ST1234512', 12, GETDATE(), 1, GETDATE(), 1),
  /*13*/('C01234512', 13, GETDATE(), 1, GETDATE(), 1),
  /*14*/('OC1234512', 14, GETDATE(), 1, GETDATE(), 1);
GO



GO
-- Insertar datos en la tabla EstadosProveedores:
Insert Into EstadosProveedores
  (EstadoNombre, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Proveedor estandar', 1, GETDATE(), 1, GETDATE(), 1);
--
Insert Into EstadosProveedores
  (EstadoNombre, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Proveedor Principal', 1, GETDATE(), 1, GETDATE(), 1);




-- Insertar datos en la tabla Proveedores:
GO
--
INSERT INTO Proveedores
  (Codigo, IdEntidad, FechaInioProveedor, IdEstadoProveedor, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1_*/('HI0234512', 15, GETDATE(), 1, 1, GETDATE(), 1),
  /*2_*/('GA1234512', 16, GETDATE(), 1, 1, GETDATE(), 1),
  /*3_*/('SC1234512', 17, GETDATE(), 1, 1, GETDATE(), 1),
  /*4_*/('GB1234512', 18, GETDATE(), 1, 1, GETDATE(), 1),
  /*5_*/('CP1234512', 19, GETDATE(), 1, 1, GETDATE(), 1),
  -------------------------------------------------------------------------
  /*6_*/('FC1001111', 20, GETDATE(), 1, 1, GETDATE(), 1),
  /*7_*/('JP1234512', 21, GETDATE(), 1, 1, GETDATE(), 1),
  /*8_*/('PM1234512', 22, GETDATE(), 1, 1, GETDATE(), 1),
  /*9_*/('JR1234512', 23, GETDATE(), 1, 1, GETDATE(), 1);
  -- Select * FROM Proveedores


GO
------------------------------- INSERT PersonasTiposPeronas para EMPLEADOS
INSERT INTO PersonasTiposPersonas
  (IdPersona, IdTipoPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1-------*/(16, 3, 1, GETDATE(), 1),
  /*2-------*/(17, 3, 1, GETDATE(), 1),
  /*3-------*/(18, 3, 1, GETDATE(), 1),
  /*4-------*/(19, 3, 1, GETDATE(), 1),
  /*5-------*/(20, 3, 1, GETDATE(), 1),
  /*6-------*/(21, 3, 1, GETDATE(), 1),
  /*7-------*/(22, 3, 1, GETDATE(), 1),
  /*8-------*/(23, 3, 1, GETDATE(), 1);
  -- Select * FROM PersonasTiposPersonas


GO
-- INSERTAR DATOS EN LA TABLA Empleados:
INSERT INTO Empleados
  (FechaDeContratacion, IdPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  -- 16 a 23
  /*1*/(GETDATE(), 16, 1, GETDATE(), 1),
  /*2*/(GETDATE(), 17, 1, GETDATE(), 1),
  /*3*/(GETDATE(), 18, 1, GETDATE(), 1),
  /*4*/(GETDATE(), 19, 1, GETDATE(), 1),
  /*5*/(GETDATE(), 20, 1, GETDATE(), 1),
  /*6*/(GETDATE(), 21, 1, GETDATE(), 1),
  /*7*/(GETDATE(), 22, 1, GETDATE(), 1),
  /*8*/(GETDATE(), 23, 1, GETDATE(), 1);


GO
-- Asignar Usuarios a los Empleados:
Update Usuarios set IdEmpleado = 7 WHERE IdUsuario = 1
GO
Update Usuarios set IdEmpleado = 8 WHERE IdUsuario = 6


GO
--  Insertar datos en la tabla Cargos:
INSERT INTO Cargos
  (NombreCargo, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Coordinador de Recursos Humanos', 1, GETDATE(), 1),
  /*2*/('Jefe Coordinador', 1, GETDATE(), 1),
  /*3*/('Ingeniero de Redes', 1, GETDATE(), 1),
  /*4*/('Técnico en Telecomunicaciones', 1, GETDATE(), 1),
  /*5*/('Administrador de Redes', 1, GETDATE(), 1),
  /*6*/('Asistente administrativo', 1, GETDATE(), 1),
  /*7*/('Ingeniero de software', 1, GETDATE(), 1),
  /*8*/('Analista de sistemas', 1, GETDATE(), 1);
-- Select * FROM Cargos


GO
--  Insertar datos en la tabla EmpleadosCargos:
INSERT INTO EmpleadosCargos
  (IdEmpleado, IdCargo, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  (1, 1, 'Encargado de gestionar y desarrollar el talento de la organización.', 1, GETDATE(), 1, GETDATE(), 1),
  (2, 2, 'Encargado de coordinar los trabajos diarios en los proyectos.', 1, GETDATE(), 1, GETDATE(), 1),
  (3, 3, 'Responsable del diseño, implementación y mantenimiento de infraestructuras de red.', 1, GETDATE(), 1, GETDATE(), 1),
  (4, 4, 'Encargado de la instalación, configuración y mantenimiento de sistemas de telecomunicaciones.', 1, GETDATE(), 1, GETDATE(), 1),
  (5, 5, 'Responsable de la supervisión, gestión y mantenimiento de la infraestructura de red.', 1, GETDATE(), 1, GETDATE(), 1),
  (6, 6, 'Asistente en el ambito de coordinar los trabajos diarios en los proyectos.', 1, GETDATE(), 1, GETDATE(), 1),
  (7, 7, 'Encargado de desarrollar y da soporte al sistema de la empresa y desarrollar nuevas soluciones.', 1, GETDATE(), 1, GETDATE(), 1),
  (7, 8, 'Responsable de analizar el sistema de negocios y desarrollar flujos operativos en el sistema.', 1, GETDATE(), 1, GETDATE(), 1),
  (7, 3, 'Contribuir en el funcionamiento de las redes instaladas a los clientes mediente los proyectos.', 1, GETDATE(), 1, GETDATE(), 1),
  (8, 7, 'Programador de soluciones tecnologias en ReacJS - Asp.Net - Node-JS.', 1, GETDATE(), 1, GETDATE(), 1);
-- Select * from EmpleadosCargos


GO
-- Insertar datos en la tabla EstadosProductos:
INSERT INTO EstadosProductos
  (EstadoNombre, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Sin entradas', 1, GETDATE(), 1),
  /*2*/('Existente', 1, GETDATE(), 1),
  /*3*/('Agotado', 1, GETDATE(), 1);
-- Select * FROM EstadosProductos


GO
-- Insertar datos en la tabla Unidades de Medida:
INSERT INTO UnidadesDeMedida
  (UnidadNombre, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Unidades', 1, GETDATE(), 1),
  /*2*/('Piezas', 1, GETDATE(), 1),
  /*3*/('Metros', 1, GETDATE(), 1),
  /*4*/('Pie', 1, GETDATE(), 1),
  /*5*/('Pulgada', 1, GETDATE(), 1),
  /*6*/('Rollos', 1, GETDATE(), 1),
  /*7*/('Cajas', 1, GETDATE(), 1);
-- Select * FROM UnidadesDeMedida


GO
-- INSETAR EN LA TABLA PRODUCTOS
INSERT INTO Productos
  (Nombre, Codigo, Descripcion, Modelo, TieneVencimiento, IdEstado, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Router WiFi AC2000', 'RWAC-20', 'Router inalámbrico de alta velocidad AC2000', 'AC2000', 0, 1, 1, GETDATE(), 1),
  /*2*/('Switch Gigabit 24 puertos', 'SG-24P', 'Switch de red con 24 puertos Gigabit', 'SG24', 0, 1, 1, GETDATE(), 1),
  /*3*/('Access Point Dual Band', 'APDBA', 'Punto de acceso inalámbrico dual band', 'AP-DB', 0, 1, 1, GETDATE(), 1),
  /*4*/('Cable Ethernet Cat 6', 'CEC-6S', 'Cable de red Ethernet categoría 6', 'CAT6-1M', 1, 1, 1, GETDATE(), 1),
  /*5*/('Enrutador 4G LTE', 'E-4GLTE', 'Enrutador con soporte para redes móviles 4G LTE', 'E4GLTE', 0, 1, 1, GETDATE(), 1),
  /*6*/('Switch PoE 8 puertos', 'SP-8PSP', 'Switch con 8 puertos PoE para alimentar dispositivos', 'PoE-S8', 0, 1, 1, GETDATE(), 1),
  /*7*/('Antena Direccional 2.4GHz', 'AD-2AD', 'Antena direccional para redes inalámbricas 2.4GHz', 'ANT-24D', 0, 1, 1, GETDATE(), 1),
  /*8*/('Cámara IP HD', 'CIHDD', 'Cámara de seguridad IP con resolución HD', 'CAM-HD', 0, 1, 1, GETDATE(), 1),
  /*9*/('Repetidor WiFi', 'RWIFI', 'Repetidor inalámbrico para extender la señal WiFi', 'REP-WF', 0, 1, 1, GETDATE(), 1),
  /*10*/('Firewall Empresarial', 'FESEC', 'Firewall de seguridad para redes empresariales', 'FIRE-ENT', 0, 1, 1, GETDATE(), 1),
  /*11*/('Puertos CA', 'PCAAE', 'Puerts RJ45 con seguridad integrada', 'FIRE-ENT', 0, 1, 1, GETDATE(), 1),
  /*12*/('Cable Par trenzado CA', 'CPT-A1', 'Cable de red par trenzado grosor A', 'CPT-CA', 1, 1, 1, GETDATE(), 1);
-- Select * FROM Productos


GO
INSERT INTO ProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES 
-- 1 Router:
/*1*/ (1, 1, 1, GETDATE(), 1),
/*2*/ (1, 7, 1, GETDATE(), 1),

-- 2 Switch:
/*3*/(2, 1, 1, GETDATE(), 1),
/*4*/(2, 7, 1, GETDATE(), 1),

-- 3 Access
/*5*/(3, 1, 1, GETDATE(), 1),
/*6*/(3, 7, 1, GETDATE(), 1),

-- 4 Cable:
/*7*/(4, 3, 1, GETDATE(), 1),
/*8*/(4, 4, 1, GETDATE(), 1),
/*9*/(4, 5, 1, GETDATE(), 1),
/*10*/(4, 6, 1, GETDATE(), 1),

-- Para el producto con IdProducto = 5 (Repetidor WiFi)
/*11*/(5, 1, 1, GETDATE(), 1), -- Unidades

-- Para el producto con IdProducto = 6 (Firewall Empresarial)
/*12*/(6, 2, 1, GETDATE(), 1), -- Piezas
/*13*/(6, 7, 1, GETDATE(), 1), -- Cajas

-- Para el producto con IdProducto = 7 (Cámara IP HD)
/*14*/(7, 1, 1, GETDATE(), 1), -- Unidades
/*15*/(7, 2, 1, GETDATE(), 1), -- Piezas

-- Para el producto con IdProducto = 8 (Antena Direccional 2.4GHz)
/*16*/(8, 3, 1, GETDATE(), 1), -- Metros
/*17*/(8, 4, 1, GETDATE(), 1), -- Pie
/*18*/(8, 5, 1, GETDATE(), 1), -- Pulgada

-- Para el producto con IdProducto = 9 (Switch PoE 8 puertos)
/*19*/(9, 7, 1, GETDATE(), 1), -- Cajas

-- Para el producto con IdProducto = 10 (Enrutador 4G LTE)
/*20*/(10, 1, 1, GETDATE(), 1), -- Unidades

-- Para el producto con IdProducto = 11 (Puertos CA):
/*21*/(11, 2, 1, GETDATE(), 1), -- Piezas

-- Para el producto con IdProducto = 12 (Cable Par trenzado CA):
/*22*/(12, 3, 1, GETDATE(), 1), -- Metros
/*23*/(12, 4, 1, GETDATE(), 1), -- Pie
/*24*/(12, 5, 1, GETDATE(), 1); -- Pulgada


GO
-- Detalles para el producto con IdProducto = 1 (Router WiFi AC2000)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(1, 1, 80.00, 120.00, 18.00, 1), -- Unidades
(1, 6, 150.00, 200.00, 28.50, 2); -- Rollos

-- Detalles para el producto con IdProducto = 2 (Switch Gigabit 24 puertos)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(2, 1, 200.00, 300.00, 40.00, 3), -- Piezas
(2, 7, 400.00, 600.00, 80.00, 4); -- Cajas

-- Detalles para el producto con IdProducto = 3 (Access Point Dual Band)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(3, 1, 100.00, 150.00, 22.50, 5), -- Unidades
(3, 6, 300.00, 400.00, 60.00, 6); -- Rollos

-- Detalles para el producto con IdProducto = 4 (Cable Ethernet Cat 6)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(4, 3, 10.00, 15.00, 2.25, 7), -- Metros
(4, 4, 20.00, 30.00, 4.50, 8), -- Pie
(4, 5, 5.00, 8.00, 1.20, 9), -- Pulgada
(4, 6, 50.00, 70.00, 12.50, 10); -- Rollos

-- Detalles para el producto con IdProducto = 5 (Enrutador 4G LTE)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(5, 1, 90.00, 130.00, 19.50, 11); -- Unidades

-- Detalles para el producto con IdProducto = 6 (Switch PoE 8 puertos)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(6, 2, 130.00, 220.00, 35.20, 12), -- Piezas
(6, 7, 300.00, 480.00, 96.00, 13); -- Cajas

-- Detalles para el producto con IdProducto = 7 (Antena Direccional 2.4GHz)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(7, 1, 60.00, 90.00, 13.50, 14), -- Unidades
(7, 2, 120.00, 180.00, 27.00, 15); -- Piezas

-- Detalles para el producto con IdProducto = 8 (Cámara IP HD)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(8, 3, 150.00, 220.00, 33.00, 16), -- Metros
(8, 4, 200.00, 300.00, 45.00, 17), -- Pie
(8, 5, 90.00, 140.00, 25.20, 18); -- Pulgada

-- Detalles para el producto con IdProducto = 9 (Repetidor WiFi)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(9, 7, 80.00, 120.00, 18.00, 19); -- Cajas

-- Detalles para el producto con IdProducto = 10 (Firewall Empresarial)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(10, 1, 300.00, 450.00, 81.00, 20); -- Unidades

-- Detalles para el producto con IdProducto = 11 (Puertos CA)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(11, 2, 40.00, 60.00, 9.60, 21); -- Piezas

-- Detalles para el producto con IdProducto = 12 (Cable Par trenzado CA)
INSERT INTO DetallesProductosUnidadesDeMedida(IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida)
VALUES 
(12, 3, 15.00, 25.00, 3.75, 22), -- Metros
(12, 4, 25.00, 40.00, 6.00, 23), -- Pie
(12, 5, 8.00, 13.00, 2.08, 24); -- Pulgada



GO
--
--
--
--- ---- ---- ---- -----
insert into Responsabilidades (ResponsabilidadNombre, IdCreadoPor, FechaCreacion, IdEstadoRegistro) 
values 
('Supervisor', 1, getdate(),1),
('Colaborador', 1, getdate(), 1),
('Ayudante', 1, getdate(), 1)


GO
insert into Prioridades (NombrePrioridad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)  values 
('Alta', 1, getdate(),1),
('Media', 1, getdate(), 1),
('baja', 1, getdate(), 1)

GO
insert into EstadosProyectos (EstadoNombre, IdCreadoPor, FechaCreacion, IdEstadoRegistro) values 
('Cotizado', 1, getdate(),1),
('Facturado', 1, getdate(),1),
('Completado', 1, getdate(),1),
('Cancelado', 1, getdate(),1)

GO
-- Insertar servicios con los nombres proporcionados
INSERT INTO Servicios (NombreServicio, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES ('Asesoría de Personal en el Departamento TIC', 'Descripción de Asesoría de Personal en el Departamento TIC', 1, GETDATE(), 1, GETDATE(), 1);

INSERT INTO Servicios (NombreServicio, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES ('Soporte Técnico Remoto y en Sitio', 'Descripción de Soporte Técnico Remoto y en Sitio', 2, GETDATE(), 2, GETDATE(), 1);

INSERT INTO Servicios (NombreServicio, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES ('Optimización y Seguridad de Redes', 'Descripción de Optimización y Seguridad de Redes', 1, GETDATE(), 2, GETDATE(), 2);

INSERT INTO Servicios (NombreServicio, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES ('Documentación y Gestión de Infraestructura', 'Descripción de Documentación y Gestión de Infraestructura', 3, GETDATE(), 3, GETDATE(), 1);

INSERT INTO Servicios (NombreServicio, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES ('Virtualización, Cluster, NAS', 'Descripción de Virtualización, Cluster, NAS', 2, GETDATE(), 1, GETDATE(), 2);

INSERT INTO Servicios (NombreServicio, Descripcion, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES ('Garantía de Transferencia de conocimiento', 'Descripción de Garantía de Transferencia de conocimiento', 3, GETDATE(), 2, GETDATE(), 1);


GO
INSERT INTO ParametrosCostos (NombreParametro, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES ('Por metro de cable instalado', 1, GETDATE(), 1);
GO
INSERT INTO ParametrosCostos (NombreParametro, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES ('Por metro de concreto roto', 1, GETDATE(), 1);
GO
INSERT INTO ParametrosCostos (NombreParametro, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES ('Por router configurado', 1, GETDATE(), 1);
GO
INSERT INTO ParametrosCostos (NombreParametro, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES ('Por swich configurado', 1, GETDATE(), 1);


GO
-- ESTADOS DOCUMENTOS:
INSERT INTO EstadosDocumentos (
    NombreEstadoDocumeto,
    IdCreadoPor,
    FechaCreacion,
    IdEstadoRegistro
)
VALUES 
('Aprobado',  1, GETDATE(), 1),
('Pagado',  1, GETDATE(), 1);


GO
INSERT INTO EstadosTareas (NombreEstado, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
('Pendiente', 1, GETDATE(), 1, GETDATE(), 1), -- Reemplaza los valores 1 con IDs válidos de Usuarios y EstadosRegistros
('En progreso', 2, GETDATE(), 2, GETDATE(), 1), -- Reemplaza los valores 2 con IDs válidos de Usuarios y EstadosRegistros
('Completada', 3, GETDATE(), 1, GETDATE(), 2);


GO
-- Inserción de datos en la tabla TiposDatosConfiguraciones
INSERT INTO TiposDatosConfiguraciones (Nombre, Descripcion, IdCreadoPor, FechaCreacion,  IdEstadoRegistro)
VALUES 
('string', 'Para configuraciones con valor cadena de texto', 1, GETDATE(), 1),
('number', 'Para configuraciones con valor numerico', 3,   GETDATE(), 1);

-- Puedes agregar más filas según sea necesario utilizando la misma estructura de la sentencia INSERT INTO
-- SELECT * FROM TiposDatosConfiguraciones



GO
-- Inserción de datos en la tabla ConfiguracionesGenerales
INSERT INTO ConfiguracionesGenerales (Nombre, Clave, Valor, ValorPorDefecto, IdTipoDato, Descripcion, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES 
('Código para secuencia de las cotizaciones', 'CO', '0', '0', 2, 'Esto permite manejar y autoincrementar la secuencia de las cotizaciones', 1, GETDATE(), 1),
('Código para secuencia de las ordenes de compra', 'OC', '0', '0', 2, 'Esto permite manejar y autoincrementar la secuencia de las ordenes de compra', 1, GETDATE(), 1),
('Código para secuencia de ls pagos', 'P', '0', '0', 2, 'Esto permite manejar y autoincrementar la secuencia de los pagos', 1, GETDATE(), 1);


---
GO
--- INSERTAR DATOS EN LA TABLA NCF:
INSERT INTO TiposNCF (NombreCorto, NombreLargo, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES 
('Factura de Crédito Fiscal', 
'registran las transacciones comerciales de compra y venta de bienes y/o los que prestan algún servicio.', 
1,
GETDATE(),
1);


INSERT INTO TiposNCF (NombreCorto, NombreLargo, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES 
('Factura de Consumo', 
'acreditan la transferencia de bienes, la entrega en uso o la prestación de servicios a consumidores finales..', 
1, 
GETDATE(),
1)

GO
-- CREACION DE LA TABLA TiposNCF:
CREATE TABLE TiposNCF
(
    IdTipoNCF INT IDENTITY CONSTRAINT PK_TiposNCF PRIMARY KEY,
    NombreLargo varchar(MAX),
    NombreCorto varchar(70),
    --
    IdCreadoPor int constraint Fk_TiposNCF_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_TiposNCF_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_TiposNCF_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO