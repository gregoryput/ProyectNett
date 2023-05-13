Create Database BD_GESTNETT
GO
USE BD_GESTNETT
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
IdEstadoProveedor int identity constraint PK_IdCliente primary key,
EstadoNombre varchar(15),
)
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