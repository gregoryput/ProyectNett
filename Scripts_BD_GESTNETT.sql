Create Database BD_GESTNETT_Pruebav5
GO
USE BD_GESTNETT_Pruebav5
GO
-- CREACION DE LA TABLA ROLES
Create table Roles(
IdRol int identity constraint PK_IdRol primary key,
NombreRol varchar(40)
)
GO
-- CREACION DE LA TABLA USUARIOS
Create table Usuarios(
IdUsuario int identity constraint PK_IdUsuario primary key,
NombreRol varchar(40),
NombreUsuario varchar(30),
Correo varchar(60),
Contraseña varchar(30),
IdRol int constraint Fk_IdRol foreign Key references Roles(IdRol)
)
GO
--CREACION DE LA TABLA SEXOS
Create table Sexos(
IdSexo int identity constraint PK_IdSexo primary key,
SexoNombre varchar(40)
)
GO
--CREACION DE LA TABLA PAISES:
Create Table Paises(
IdPais int identity constraint PK_IdPais primary key,
PaisNombre varchar(40)
)
GO
--CREACION DE LA TABLA CIUDADES:
Create Table Ciudades(
IdCiudad int identity constraint PK_IdCiudad primary key,
CiudadNombre varchar(40),
IdPais int constraint Fk_IdPaisCiudad foreign Key references Paises(IdPais)
)
GO
-- CREACION DE LA TABLA PERSONAS
Create Table Personas(
IdPersona int identity constraint PK_IdPersona primary key,
Nombres varchar(40),
Apellidos varchar(40),
Telefono1 varchar(15),
Telefono2 varchar(15),
Direccion varchar(60),
Correo varchar(60),
Edad int,
FechaDeNacimiento date,
Cedula varchar(13) constraint Uk_Cedula Unique,
IdSexo int constraint Fk_IdSexo foreign Key references Sexos(IdSexo),
IdCiudad int constraint Fk_IdCiudad foreign Key references Ciudades(IdCiudad),
IdCreadoPor int constraint Fk_IdCreadoPor foreign Key references Usuarios(IdUsuario),
FechaCreacion date,
IdModificadoPor int constraint Fk_IdModificadoPor foreign Key references Usuarios(IdUsuario)
)
GO
-- CREACION DE LA TABLA EMPRESAS
Create Table Empresas(
IdEmpresa int identity constraint PK_IdEmpresa primary key,
NombreEmpresa varchar(60),
RNC varchar(9),
Correo varchar(60),
Teléfono1 varchar(15),
Teléfono2 varchar(15),
SitioWeb varchar(40),
Dirección varchar(40),
IdCiudad int constraint Fk_IdCiudadEmpresa foreign Key references Ciudades(IdCiudad),
IdCreadoPor int constraint Fk_EmpresaIdCreadoPor foreign Key references Usuarios(IdUsuario),
FechaCreacion date,
IdModificadoPor int constraint Fk_EmpresaIdModificadoPor foreign Key references Usuarios(IdUsuario)
)
GO
-- CREACION DE LA TABLA CLIENTES
Create Table Clientes(
IdCliente int identity constraint PK_IdCliente primary key,
IdEmpresa int null constraint Fk_IdEmpresa foreign Key references Empresas(IdEmpresa),
IdPersonaDeContacto int constraint Fk_Cliente_IdPersonaDeContacto foreign Key references Personas(IdPersona),
IdCreadoPor int constraint Fk_ClienteIdCreadoPor foreign Key references Usuarios(IdUsuario),
FechaCreacion date,
IdModificadoPor int constraint Fk_ClienteIdModificadoPor foreign Key references Usuarios(IdUsuario),
)
GO
-- CREACION DE LA TABLA ESTADOPROVEEDORES
Create Table EstadoProveedores(
IdEstadoProveedor int identity constraint PK_IdEstadoProveedor primary key,
EstadoNombre varchar(15),
)
GO
-- CREACION DE LA TABLA ESTADO PROVEEDORES
Create Table Proveedores(
IdProveedor int identity constraint PK_IdProveedor primary key,
IdEstadoProveedor int constraint Fk_IdEstadoProveedor foreign Key references EstadoProveedores(IdEstadoProveedor),
IdEmpresa int constraint Fk_ProveedorIdEmpresa foreign Key references Empresas(IdEmpresa),
IdPersonaDeContacto int constraint Fk_Proveedor_IdPersonaDeContacto foreign Key references Personas(IdPersona),
IdCreadoPor int constraint Fk_ProveedorIdCreadoPor foreign Key references Usuarios(IdUsuario),
FechaCreacion date,
IdModificadoPor int constraint Fk_ProveedorIdModificadoPor foreign Key references Usuarios(IdUsuario),
)
GO
-- CREACION DE LA TABLA EMPLEADOS:
CREATE TABLE Empleados (
  IDempleado INT identity constraint PK_IdEmpleado PRIMARY KEY,
  FechadDeContratación DATE NOT NULL,
  IdPersona INT NOT NULL,
  IdCredencialUsuario INT NOT NULL,
  IdCreadoPor INT NOT NULL,
  FechaCreación DATE,
  CONSTRAINT Fk_EmpleadoIdPersona FOREIGN KEY (IdPersona) REFERENCES Personas(IdPersona),
  CONSTRAINT Fk_EmpleadoIdUsuario FOREIGN KEY (IdCredencialUsuario) REFERENCES Usuarios(IdUsuario),
  CONSTRAINT Fk_EmpleadoIdCreadoPor FOREIGN KEY (IdCreadoPor) REFERENCES Empleados(IDempleado)
);
GO
-- CREACION DE LA TABLA CARGOS:
CREATE TABLE Cargos (
  IdCargo INT IDENTITY CONSTRAINT Pk_IdCargo PRIMARY KEY,
  NombreCargo VARCHAR(40)
);
GO
-- CREACION DE LA TABLA CARGOS:
CREATE TABLE EmpleadosCargos (
  IdEmpleado INT,
  IdCargo INT,
  Descripción VARCHAR(255),
  CONSTRAINT Fk_CargoIdEmpleado FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IDempleado),
  CONSTRAINT Fk_CargoIdCargo FOREIGN KEY (IdCargo) REFERENCES Cargos(IdCargo)
);
GO
-- CREACION DE LA TABLA UnidadesDeMedida:
CREATE TABLE UnidadesDeMedida (
    IdUnidad_DeMedida INT IDENTITY CONSTRAINT Pk_IdUnidad_DeMedida PRIMARY KEY,
    UnidadNombre VARCHAR(255)
);
GO
-- CREACION DE LA TABLA PRODUCTOS:
CREATE TABLE Productos (
  IdProducto INT PRIMARY KEY,
  Nombre VARCHAR(255),
  Descripción VARCHAR(255),
  Modelo VARCHAR(50),
  PrecioCosto DECIMAL(10, 2),
  PrecioVenta DECIMAL(10, 2),
  CantidadDisponible INT,
  ITBIS DECIMAL(5, 2),
  IdUnidadDeMedida INT,
  IdEstado INT,
  IdCreadoPor INT,
  IdTipoProducto INT,
  FechaCreación DATE,
  CONSTRAINT Fk_IdUnidadDeMedida FOREIGN KEY (IdUnidadDeMedida) REFERENCES UnidadesDeMedida(IdUnidad_DeMedida),
  CONSTRAINT Fk_IdEstado FOREIGN KEY (IdEstado) REFERENCES Estados(IdEstado),
  CONSTRAINT Fk_ProductoIdCreadoPor FOREIGN KEY (IdCreadoPor) REFERENCES Usuarios(IdUsuario),
  CONSTRAINT Fk_CargoIdCargo FOREIGN KEY (IdTipoProducto) REFERENCES TiposProductos(IdTipoProducto)
);
GO

-- A CONTINUACIÓN LAS INSERCIONES DE DATOS:

--" "
GO
--" "

-- INSERTANDO EN LA TABLA ROLES
INSERT INTO Roles (NombreRol) VALUES ('Administrador');
INSERT INTO Roles (NombreRol) VALUES ('Administrador de usuario');
INSERT INTO Roles (NombreRol) VALUES ('Asistente');
INSERT INTO Roles (NombreRol) VALUES ('Asistente administrativo');

--" "
GO
--" "

-- INSERTANDO EN LA TABLA USUARIOS
INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, IdRol) 
VALUES ('edwin123ceo', 'edwin123@gmail.com', 'edwin123pass', 1);
--
INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, IdRol) 
VALUES ('maria123rrhh', 'maria123@gmail.com', 'maria123pass', 2);
--
INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, IdRol) 
VALUES ('carlos123emp', 'carlos123@gmail.com', 'carlos123pass', 3);
--
INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, IdRol) 
VALUES ('felipe123emp', 'felipe123@gmail.com', 'felipe123emp', 3);
--
INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, IdRol) 
VALUES ('cristian123ad', 'cristian123@gmail.com', 'cristian123ad', 4);

--" "
GO
--" "

INSERT INTO Sexos (SexoNombre) VALUES ('Masculino');
INSERT INTO Sexos (SexoNombre) VALUES ('Femenino');

INSERT INTO Paises (PaisNombre) VALUES ('República Dominicana');
INSERT INTO Paises (PaisNombre) VALUES ('Estados Unidos');
INSERT INTO Paises (PaisNombre) VALUES ('México');
INSERT INTO Paises (PaisNombre) VALUES ('España');

INSERT INTO Ciudades (CiudadNombre, IdPais) VALUES ('Santo Domingo', 1);
INSERT INTO Ciudades (CiudadNombre, IdPais) VALUES ('New York', 2);
INSERT INTO Ciudades (CiudadNombre, IdPais) VALUES ('Ciudad de México', 3);
INSERT INTO Ciudades (CiudadNombre, IdPais) VALUES ('Madrid', 4);

INSERT INTO Personas (Nombres, Apellidos, Telefono1, Telefono2, Direccion, Correo, Edad, FechaDeNacimiento, Cedula, IdSexo, IdCiudad, IdCreadoPor, FechaCreacion, IdModificadoPor) VALUES ('Juan', 'Pérez', '8095555555', '8296666666', 'Calle 1 #10', 'juanperez@gmail.com', 25, '1998-01-01', '001-0000000-0', 1, 1, 1, '2023-05-14', 1);

INSERT INTO Empresas (NombreEmpresa, RNC, Correo, Teléfono1, Teléfono2, SitioWeb, Dirección, IdCiudad, IdCreadoPor, FechaCreacion, IdModificadoPor) VALUES ('Mi Empresa', '101010101', 'miempresa@gmail.com', '8095555555', '8296666666', 'www.miempresa.com', 'Calle 2 #15', 1, 1, '2023-05-14', 1);

INSERT INTO Clientes (IdEmpresa, IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdModificadoPor) VALUES (1, 1, 1, '2023-05-14', 1);

INSERT INTO EstadoProveedores (EstadoNombre) VALUES ('Activo');
INSERT INTO EstadoProveedores (EstadoNombre) VALUES ('Inactivo');

INSERT INTO Proveedores (IdEstadoProveedor, IdEmpresa, IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdModificadoPor) VALUES (1, 1, 1, 1, '2023-05-14', 1);