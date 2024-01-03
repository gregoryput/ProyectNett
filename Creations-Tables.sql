CREATE DATABASE BD_PROYENETT_VF17
GO
USE BD_PROYENETT_VF17
GO


-- CREACION DE LA TABLA ESTADOS_REGISTROS
Create table EstadosRegistros
(
    IdEstadoRegistro int identity constraint PK_IdEstadoRegistro primary key,
    NombreEstado varchar(15),
    IdEstadoRegistro_fk int constraint Fk_IdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro)
);
GO


-- CREACION DE LA TABLA ROLES:
Create table Roles
(
    IdRol int identity constraint PK_IdRol primary key,
    NombreRol varchar(40),
    Valoracion INT,
    -- Valoracion de 1 en adelante
    IdEstadoRegistro int constraint Fk_Roles_IdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro)
);


GO
-- CREACION DE LA TABLA USUARIOS:
Create table Usuarios
(
    IdUsuario int identity constraint PK_IdUsuario primary key,
    NombreUsuario varchar(30),
    Correo varchar(60),
    Contraseña varchar(MAX),
    IdRol int constraint Fk_UsuarioIdRol foreign Key references Roles(IdRol),
    --
    IdCreadoPor int constraint Fk_Usuario_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Usuario_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Usuario_IdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA USUARIOSROLES:
Create table UsuariosRoles
(
    IdUsuarioRol int identity constraint PK_IdUsuarioRol primary key,
    IdUsuario int constraint Fk_Roles_IdUsuario foreign Key references Usuarios(IdUsuario),
    IdRol int constraint Fk_Roles_IdRol foreign Key references Roles(IdRol),
    --
    IdCreadoPor int constraint Fk_UsuariosRoles_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_UsuariosRoles_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_UsuariosRoles_IdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


/* ---A--- ALTER TABLE NECESARIOS: ---A--- */

-- Alter table a la tabla EstadosRegistros:
ALTER TABLE EstadosRegistros
  ADD IdCreadorPor INT;
GO
--
ALTER TABLE EstadosRegistros
  ADD FechaCreacion DATETIME;
GO
--
ALTER TABLE EstadosRegistros
  ADD IdModificadoPor INT;
GO
--
ALTER TABLE EstadosRegistros
  ADD FechaModificacion DATETIME;
GO
--
ALTER TABLE EstadosRegistros ADD CONSTRAINT FK_EstadosRIdCreadorPor
  FOREIGN KEY (IdCreadorPor) REFERENCES Usuarios(IdUsuario);
GO
--
ALTER TABLE EstadosRegistros ADD CONSTRAINT FK_EstadosRIdModificadoPor
  FOREIGN KEY (IdModificadoPor) REFERENCES Usuarios(IdUsuario);
GO

-- Alter table a la tabla Roles:
ALTER TABLE Roles
  ADD IdCreadorPor INT;
GO

ALTER TABLE Roles
  ADD FechaCreacion DATETIME;
GO

ALTER TABLE Roles
  ADD IdModificadoPor INT;
GO

ALTER TABLE Roles
  ADD FechaModificacion DATETIME;
GO

ALTER TABLE Roles ADD CONSTRAINT FK_RolesIdCreadorPor
  FOREIGN KEY (IdCreadorPor) REFERENCES Usuarios(IdUsuario);
GO

ALTER TABLE Roles ADD CONSTRAINT FK_RolesIdModificadoPor
  FOREIGN KEY (IdModificadoPor) REFERENCES Usuarios(IdUsuario);
GO


--CREACION DE LA TABLA SEXOS
Create table Sexos
(
    IdSexo int identity constraint PK_IdSexo primary key,
    SexoNombre varchar(40),
    --
    IdCreadoPor int constraint Fk_SexosIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_SexosIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_SexosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


--CREACION DE LA TABLA PAISES:
Create Table Paises
(
    IdPais int identity constraint PK_IdPais primary key,
    PaisNombre varchar(40),
    --
    IdCreadoPor int constraint Fk_PaisesIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PaisesIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PaisesIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


--CREACION DE LA TABLA CIUDADES:
Create Table Ciudades
(
    IdCiudad int identity constraint PK_IdCiudad primary key,
    CiudadNombre varchar(40),
    IdPais int constraint Fk_IdPaisCiudad foreign Key references Paises(IdPais),
    --
    IdCreadoPor int constraint Fk_CiudadesIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_CiudadesIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_CiudadesIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PERSONAS TIPOS:
Create Table TiposPersonas
(
    IdTipoPersona int identity constraint PK_IdTipoPersona primary key,
    NombreTipoPersona VARCHAR(60),
	Descripcion VARCHAR(60),
    --
    IdCreadoPor int constraint Fk_TiposPersonas_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion datetime,
    IdModificadoPor int constraint Fk_TiposPersonas_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion datetime,
    IdEstadoRegistro int constraint Fk_TiposPersonas_IdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PERSONAS
Create Table Personas
(
    IdPersona int identity constraint PK_IdPersona primary key,
    --
    Nombres varchar(40),
    Apellidos varchar(40),
    Cedula varchar(13) constraint Uk_Cedula Unique,

    Telefono1 varchar(12),
    Telefono2 varchar(12),
    Correo varchar(60),
    --
    FechaDeNacimiento date,
    IdSexo int constraint Fk_IdSexo foreign Key references Sexos(IdSexo),
    IdCiudad int constraint Fk_IdCiudad foreign Key references Ciudades(IdCiudad),
    --
    Direccion varchar(60),
    --
    IdCreadoPor int constraint Fk_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion datetime,
    IdModificadoPor int constraint Fk_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion datetime,
    IdEstadoRegistro int constraint Fk_IdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO



-- Creacion de la tabla PersonasTiposPersonas:
CREATE TABLE PersonasTiposPersonas
(
    IdPersonaTipoPersona int identity constraint PK_IdPersonaTipoPersona primary key,
    IdPersona int constraint FK_PTP_IdPersona FOREIGN KEY REFERENCES Personas(IdPersona),
    IdTipoPersona int constraint FK_PTP_IdTipoPersona FOREIGN KEY REFERENCES TiposPersonas(IdTipoPersona),
    --
    IdCreadoPor int constraint Fk_PTP_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PTP_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PTP_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EMPRESAS
Create Table Empresas
(
    IdEmpresa int identity constraint PK_IdEmpresa primary key,
    NombreEmpresa varchar(60),
    RNC varchar(9) constraint UQ_RNC UNIQUE,
    Correo varchar(60),
    Telefono1 varchar(12),
    Telefono2 varchar(12),
    SitioWeb varchar(255),
    Direccion varchar(50),
    IdCiudad int constraint Fk_IdCiudadEmpresa foreign Key references Ciudades(IdCiudad),
    --
    IdCreadoPor int constraint Fk_EmpresasIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EmpresasIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EmpresasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA SUCURSALES:
CREATE TABLE Sucursales
(
    IdSucursal int identity constraint PK_IdSucursal primary key,
    SucursalNombre varchar(50),
    IdCiudad int constraint Fk_IdCiudadSurcursal foreign Key references Ciudades(IdCiudad),
    Direccion varchar(50),
    IdSede int constraint Fk_IdSede_Empresa foreign Key references Empresas(IdEmpresa),
    --
    Detalles VARCHAR(MAX),
    SucursalTelefono1 VARCHAR(13),
    SucursalTelefono2 VARCHAR(13),
    SucursalCorreo VARCHAR(80),
    --
    IdCreadoPor int constraint Fk_Sucursales_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Sucursales_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Sucursales_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA SucursalesRepresentantes:
CREATE TABLE SucursalesRepresentantes
(
    IdEmpresaSucursal int identity constraint PK_IdClienteEmpresa primary key,
    IdSucursal int constraint FK_EmpresaSucursal_IdSucursal foreign key references Sucursales(IdSucursal),
    IdRepresentanteActual int constraint FK_EmpresaSucursal_IdPersona foreign key references Personas(IdPersona),
    --
    IdCreadoPor int constraint Fk_EmpresaSucursal_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EmpresaSucursal_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EmpresaSucursal_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- Creacion de la tabla Estructuras (Lugares o estructuras donde se les hacen proyectos a las personas fisicas):
-- Por ejemplo (Casa en Punta Cana, Pequeña habitación en Hato Mayor, etc)...
CREATE TABLE Estructuras(
    IdEstructura int identity constraint PK_IdEstructura primary key,
    NombreEstructura VARCHAR (40),
    IdCiudad int constraint Fk_Estructuras_IdCiudad foreign Key references Ciudades(IdCiudad),
    Direccion varchar(50),
    --
    IdCreadoPor int constraint Fk_Estructuras_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Estructuras_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Estructuras_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- Creacion de la tabla EstructurasRepresentantes 
-- (La persona fisica puede tener un representante para cada una de sus estructuras):
CREATE TABLE EstructurasRepresentantes(
    IdEstructuraRepresentante int identity constraint PK_IdEstructuraRepresentante primary key,
    IdEstructura int constraint Fk_EstRep_IdEstructura foreign Key references Estructuras(IdEstructura),
    IdRepresentanteActual int constraint Fk_EstRep_IdRepresentante foreign Key references Personas(IdPersona),
    FechaInicioRepresentante Datetime,
    FechaFinRepresentante Datetime,
    --
    IdCreadoPor int constraint Fk_EstRep_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EstRep_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EstRep_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO


-- Creacion de la tabla TiposEntidades (Para proveedores y clientes. Estos pueden ser persona fisica o empresa):
CREATE TABLE TiposEntidades
(
    IdTipoEntidad int identity constraint PK_IdTipoCliente primary key,
    NombreTipoEntidad Varchar(60),
    --
    IdCreadoPor int constraint Fk_IdTE_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_IdTE_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_IdTE_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- Creacion de la tabla RolesEntidades:
CREATE TABLE RolesEntidades
(
    IdRolEntidad int identity constraint PK_IdRolEntidad primary key,
    NombreRolEntidad Varchar(60),
    --
    IdCreadoPor int constraint Fk_RolesEntidades_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_RolesEntidades_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_RolesEntidades_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA ENTIDADES
Create Table Entidades
(
    IdEntidad int identity constraint PK_IdEntidad primary key,
    -- Nombre para identificar a la entidad, ya sea un nombre comercial (si es empresa), apodo (si es persona fisica), etc...
    NombreEntidad VARCHAR(60),
    IdTipoEntidad int constraint FK_Entidades_IdTipoEntidad foreign key references TiposEntidades(IdTipoEntidad),
    --
    IdCreadoPor int constraint Fk_Entidades_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Entidades_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Entidades_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EntidadesRolesEntidades (Para saber si la entidad es proveedor o persona fisica):
Create Table EntidadesRolesEntidades
(
    IdEntidadRolEntidad int identity constraint PK_IdEntidadRolEntidad primary key,
    IdEntidad int constraint FK_ERE_IdEntidad foreign key references Entidades(IdEntidad),
    IdRolEntidad int constraint FK_ERE_IdRolEntidad foreign key references RolesEntidades(IdRolEntidad),
    --
    IdCreadoPor int constraint Fk_ERE_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_ERE_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_ERE_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


/*
-- CREACION DE LA TABLA RepresentantesRoles: 
   (Esta tabla permite identificar si el representante de una entidad, ahora bien, una entidad puede ser
   Cliente y a la vez tambien puede ser proveedor, entonces, esta tabla llamada RepresentantesRoles, 
   sirve para saber si el representante sera para representar a la entidad en su modo proveedor o si sera
   para representar a la entidad cuando esta figura en modo cliente.
*/
CREATE TABLE RepresentantesRoles
(
    IdRolRepresentante int identity constraint PK_IdRolRepresentante primary key,
    NombreRolRepresentante varchar(60),
    --
    IdCreadoPor int constraint Fk_RR_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_RR_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_RR_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA EntidadesPersonasFisicas:
CREATE Table EntidadesPersonasFisicas
(
    IdEntidadPersonaFisica int identity constraint PK_IdEntidadPersonaFisica primary key,
    IdEntidad int constraint FK_EPF_IdEntidad foreign key references Entidades(IdEntidad),
    IdPersona int constraint FK_EPF_IdPersona foreign key references Personas(IdPersona),
    --
    IdCreadoPor int constraint Fk_EPF_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EPF_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EPF_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EntidadesPersonasFisicasRepresentantes:
CREATE TABLE EntidadesPersonasFisicasRepresentantes
(
    IdEPFR INT identity constraint PK_IdEPFR primary key,
    IdEntidadPersonaFisica INT constraint FK_EPFR_IdEntidadPersonaFisica foreign key references EntidadesPersonasFisicas(IdEntidadPersonaFisica),
    IdRepresentanteActual INT constraint FK_EPFR_IdEntidad foreign key references Personas(IdPersona),
    IdRolRepresentante INT constraint FK_EPFR_IdRolRepresentante foreign key references RepresentantesRoles(IdRolRepresentante),
    FechaInicioRepresentante DATEtime,
    FechaFinRepresentante DATEtime,
    --
    IdCreadoPor INT constraint Fk_EPFR_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion DATETIME,
    IdModificadoPor INT constraint Fk_EPFR_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion DATETIME,
    IdEstadoRegistro INT constraint Fk_EPFF_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EntidadesEmpresas:
CREATE Table EntidadesEmpresas
(
    IdEntidadEmpresa int identity constraint PK_IdEntidadEmpresa primary key,
    IdEntidad int constraint FK_EE_IdEntidad foreign key references Entidades(IdEntidad),
    IdEmpresa int constraint FK_EE_IdEmpresa foreign key references Empresas(IdEmpresa),
    --
    IdCreadoPor int constraint Fk_EE_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EE_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EE_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EntidadesEmpresas:
CREATE Table EntidadesEmpresasRepresentantes
(
    IdEER int identity constraint PK_IdEER primary key,
    IdEntidadEmpresa int constraint FK_EER_IdEntidadEmpresa foreign key references EntidadesEmpresas(IdEntidadEmpresa),
    IdRepresentanteActual INT constraint FK_EER_IdRepresentanteActual foreign key references Personas(IdPersona),
    IdRolRepresentante int constraint FK_EER_IdRolRepresentante foreign key references RepresentantesRoles(IdRolRepresentante),
    FechaInicioRepresentante DATEtime,
    FechaFinRepresentante DATEtime,
    --
    IdCreadoPor int constraint Fk_EER_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EER_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EER_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA CLIENTES
Create Table Clientes
(
    IdCliente int identity constraint PK_IdCliente primary key,
    Codigo VARCHAR(9) constraint UQ_Codigo_Cliente UNIQUE,
    IdEntidad int constraint FK_Clientes_IdEntidad foreign key references Entidades(IdEntidad),
    FechaInicioCliente Datetime,
    --<<-- Fecha en la que comenzó a ser cliente de la empresa
    --
    IdCreadoPor int constraint Fk_Clientes_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Clientes_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Clientes_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA ESTADOSPROVEEDORES:
Create Table EstadosProveedores
(
    IdEstadoProveedor int identity constraint PK_IdEstadoProveedor primary key,
    EstadoNombre varchar(30),
    --
    IdCreadoPor int constraint Fk_EPId_CreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EPId_ModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EPId_EstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PROVEEDORES:
Create Table Proveedores
(
    IdProveedor int identity constraint PK_IdProveedor primary key,
    Codigo Varchar(9),
    IdEntidad int constraint FK_Proveedores_IdEntidad foreign key references Entidades(IdEntidad),
    FechaInioProveedor Datetime,
    IdEstadoProveedor int constraint Fk_IdEstadoProveedor foreign Key references EstadosProveedores(IdEstadoProveedor),
    --
    IdCreadoPor int constraint Fk_Proveedores_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Proveedores_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Proveedores_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO


-- CREACION DE LA TABLA EMPLEADOS:
CREATE TABLE Empleados
(
    IdEmpleado INT identity constraint PK_IdEmpleado PRIMARY KEY,
    FechaDeContratacion DATEtime NOT NULL,
    CodigoEmpleado VARCHAR(9),
    IdPersona INT NOT NULL constraint Fk_Empleado_IdPersona foreign Key references Personas(IdPersona),
    --
    IdCreadoPor int constraint Fk_EmpleadosIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EmpleadosIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EmpleadosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


/* ---A--- ALTER TABLE NECESARIOS: ---A--- */

-- Alter table a la tabla Usuarios:
ALTER TABLE Usuarios
  ADD IdEmpleado INT;
GO
--
ALTER TABLE Usuarios ADD CONSTRAINT FK_UsuariosIdEmpleado
  FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IdEmpleado);
GO


-- CREACION DE LA TABLA CARGOS:
CREATE TABLE Cargos
(
    IdCargo INT IDENTITY CONSTRAINT Pk_IdCargo PRIMARY KEY,
    NombreCargo VARCHAR(40),
    --
    IdCreadoPor int constraint Fk_CargosIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_CargosIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_CargosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA CARGOS:
CREATE TABLE EmpleadosCargos
(
    IdEmpleado INT,
    IdCargo INT,
    Descripcion VARCHAR(255),
    CONSTRAINT Fk_CargoIdEmpleado FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IdEmpleado),
    CONSTRAINT Fk_CargoIdCargo FOREIGN KEY (IdCargo) REFERENCES Cargos(IdCargo),
    --
    IdCreadoPor int constraint Fk_EC_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EC_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EC_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EstadosProductos:
CREATE TABLE EstadosProductos
(
    IdEstadoProducto INT IDENTITY CONSTRAINT Pk_IdEstadoProducto PRIMARY KEY,
    EstadoNombre VARCHAR(255),
    --
    IdCreadoPor int constraint Fk_EstadosProductos_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EstadosProductos_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EstadosProductos_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA UnidadesDeMedida:
CREATE TABLE UnidadesDeMedida
(
    IdUnidadDeMedida INT IDENTITY CONSTRAINT Pk_IdUnidadDeMedida PRIMARY KEY,
    UnidadNombre VARCHAR(255),
    --
    IdCreadoPor int constraint Fk_UM_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_UM_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_UM_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PRODUCTOS:
CREATE TABLE Productos
(
    IdProducto INT IDENTITY CONSTRAINT PK_IdProducto PRIMARY KEY,
    Nombre VARCHAR(255),
    Codigo VARCHAR(7) CONSTRAINT UQ_CodigoProducto UNIQUE,
    Descripcion VARCHAR(255),
    Modelo VARCHAR(50),
    TieneVencimiento BIT,
    IdEstado INT,
    CONSTRAINT Fk_ProductosIdEstado FOREIGN KEY (IdEstado) REFERENCES EstadosProductos(IdEstadoProducto),
    --
    IdCreadoPor int constraint Fk_Productos_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Productos_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Productos_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- Tabla para la relación entre Productos y UnidadesDeMedida
CREATE TABLE ProductosUnidadesDeMedida (
    IdProductoUnidadDeMedida INT IDENTITY CONSTRAINT PK_IdProductoUM PRIMARY KEY,
    IdUnidadDeMedida INT CONSTRAINT FK_IdUnidadDeMedida_UNDM FOREIGN KEY REFERENCES UnidadesDeMedida(IdUnidadDeMedida),
    IdProducto INT CONSTRAINT FK_IdProducto_UNDM FOREIGN KEY REFERENCES Productos(IdProducto),

    IdCreadoPor int constraint Fk_PUDM1 foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PUDM2 foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PUDM3 foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- Tabla para detalles de precios, etc.
CREATE TABLE DetallesProductosUnidadesDeMedida (
    IdDetalle INT IDENTITY CONSTRAINT FK_PK_DETAIL Primary Key,
    IdUnidadDeMedida INT,
    PrecioCosto DECIMAL(10, 2),
    PrecioVenta DECIMAL(10, 2),
    ITBIS DECIMAL(5, 2),
    -- Otras columnas de detalle si es necesario:
    IdProductoUnidadDeMedida INT CONSTRAINT FK_DPUDM_ foreign Key references ProductosUnidadesDeMedida(IdProductoUnidadDeMedida),
    IdProducto INT CONSTRAINT FK_ID_DPUDM foreign Key references Productos(IdProducto),
    -- 
    IdCreadoPor int constraint FK_DPUDM1 foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint FK_DPUDM2 foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint FK_DPUDM3 foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EXISTENCIAS:
-- POR CADA UNIDAD DE MEDIDA DE CADA PRODUCTO HABRÁ UNA EXISTENCIA:
CREATE TABLE Existencias
(
    IdExistencia INT IDENTITY CONSTRAINT PK_IdExistencia PRIMARY KEY,
    Descripcion VARCHAR(255),
    Codigo VARCHAR(6) CONSTRAINT UQ_Existencia UNIQUE,
    CantidadExistente INT,
    --
    IdProducto INT,
    CONSTRAINT Fk_Inventario_IdProducto FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
    IdUnidadMedida INT,
    CONSTRAINT Fk_Inventario_IdUnidadMedida FOREIGN KEY (IdUnidadMedida) REFERENCES UnidadesDeMedida(IdUnidadDeMedida),
    --
    IdCreadoPor int constraint Fk_Existencias_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Existencias_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Existencias_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA UBICACIONES DE INVENTARIO:
CREATE TABLE Ubicaciones
(
    IdUbicacion INT IDENTITY CONSTRAINT PK_IdUbicacion PRIMARY KEY,
    NombreUbicacion VARCHAR(65),
    DetallesUbicacion VARCHAR(110),
    --
    IdCreadoPor int constraint Fk_Ubicaciones_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Ubicaciones_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Ubicaciones_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA Ubicaciones-Existencias:
CREATE TABLE UbicacionesExistencias
(
    IdUbicacionExistencia INT IDENTITY CONSTRAINT PK_IdUbicacionExistencia PRIMARY KEY,
    IdExistencia INT constraint Fk_UE_IdExistencia foreign Key references Existencias(IdExistencia),
    IdUbicacion INT constraint Fk_UE_IdUbicacion foreign Key references Ubicaciones(IdUbicacion),
    CantidadTotal Decimal,
    CantidadRestante Decimal,
    --
    IdCreadoPor int constraint Fk_UE_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_UE_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_UE_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA Lotes
CREATE TABLE Lotes
(
    IdLote INT IDENTITY CONSTRAINT PK_IdLote PRIMARY KEY,
    IdExistencia int constraint Fk_Lotes_IdExistencia foreign Key references Existencias(IdExistencia),
    NumeroDeLote varchar(40),
    FechaVencimiento Datetime,
    CantidadTotalDisponible decimal,
    --
    IdCreadoPor int constraint Fk_Lotes_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Lotes_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Lotes_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EstadosDocumentos:
CREATE TABLE EstadosDocumentos
(
    IdEstadoDocumento INT IDENTITY CONSTRAINT PK_IdEstadoDocumento PRIMARY KEY,
    NombreEstadoDocumeto varchar(30),
    --
    IdCreadoPor int constraint Fk_EstadosDocumentosdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EstadosDocumentosdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EDIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


CREATE TABLE EstadosOrdenesCompras
(
    IdEstadoOrdenCompra INT IDENTITY CONSTRAINT PK_IdEstadoOrdenCompra PRIMARY KEY,
    NombreEstado VARCHAR(70)
);
GO


GO
-- CREACION DE LA TABLA OrdenCompras:
CREATE TABLE OrdenesCompras
(
    IdOrdenCompra INT IDENTITY CONSTRAINT PK_IdOrdenCompra PRIMARY KEY,
    IdProveedor INT CONSTRAINT Fk_IdProveedorOC FOREIGN KEY REFERENCES Proveedores(IdProveedor),
    MontoTotal DECIMAL,
    Secuencia Varchar(11),
    FechaEmision DATEtime,
    FechaEntrega DateTime,
    IdCiudadEntrega INT CONSTRAINT FK_IdCiudadEntrega FOREIGN KEY REFERENCES Ciudades(IdCiudad),
    DireccionEntrega VARCHAR(MAX),
    --
    IdEstadoOrdenCompra int constraint Fk_OC_IdEstadoOrdenCompra foreign Key references EstadosOrdenesCompras(IdEstadoOrdenCompra),
    --
    IdCreadoPor int constraint Fk_OrdenesComprasIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_OrdenesComprasdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_OrdenesComprasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro)
);
GO


-- CREACION DE LA TABLA Entradas OrdenesComprasDetalles:
CREATE TABLE OrdenesComprasDetalles
(
    IdDetalleOrdenCompra INT IDENTITY CONSTRAINT PK_OC_Detalle_IdOrdenCompra PRIMARY KEY,
    --
    IdProducto int constraint Fk_OC_Detalle_IdProducto foreign Key references Productos(IdProducto),
    IdUnidadDeMedida int constraint Fk_OC_Entradas_IdUnidadMedida foreign key references UnidadesDeMedida(IdUnidadDeMedida),
    IdOrdenCompra int constraint Fk_OC_Detalle_IdOrdenCompra foreign Key references OrdenesCompras(IdOrdenCompra),
    --
    Cantidad int,
    Precio decimal,
    ITBIS decimal,
    Subtotal decimal,
    --
    IdCreadoPor int constraint Fk_OC_DFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_OC_DFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_OC_DFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);


GO
-- CREACION DE LA TABLA FacturasCompras:
CREATE TABLE FacturasCompras
(
    IdFactura INT IDENTITY CONSTRAINT PK_IdFactura PRIMARY KEY,
    Fecha DATEtime,
    Descuento DECIMAL,
    MontoImpuestos DECIMAL,
    MontoSubtotal DECIMAL,
    MontoTotal DECIMAL,
    NCF VARCHAR(50),
    --
    IdEstadoFactura int constraint Fk_IdEstadoFactura foreign Key references EstadosDocumentos(IdEstadoDocumento),
    IdOrdenCompra int constraint FK_FC_IdOrdenCompra foreign key references OrdenesCompras(IdOrdenCompra),
    --
    IdProveedor INT,
    CONSTRAINT Fk_IdProveedor FOREIGN KEY (IdProveedor) REFERENCES Proveedores(IdProveedor),
    --
    IdCreadoPor int constraint Fk_FacturaProveedorIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_FacturaProveedordModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_FacturaProveedorIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro)
);
GO


GO
-- CREACION DE LA TABLA Entradas DetallesFacturasCompras:
CREATE TABLE DetallesFacturasCompras
(
    IdDetalleFactura INT IDENTITY CONSTRAINT PK_IdDetalleFactura PRIMARY KEY,
    --
    IdProducto int constraint Fk_Detalle_IdProducto foreign Key references Productos(IdProducto),
    IdUnidadDeMedida int constraint Fk_Entradas_IdUnidadMedida foreign key references UnidadesDeMedida(IdUnidadDeMedida),
    IdFactura int constraint Fk_Detalle_IdFactura foreign Key references FacturasCompras(IdFactura),
    --
    CodigoDeSeguimiento varchar(9),
    Cantidad int,
    Precio decimal,
    ITBIS decimal,
    Subtotal decimal,
    --
    IdCreadoPor int constraint Fk_DFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_DFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_DFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA Distribuciones. Existencia A -> 100.   Dist1 50.. = UbiA.  Dist2 50.. = UbiB.
CREATE TABLE DetallesFC_DistribucionesUbicaciones
(
    IdDistribucion INT IDENTITY CONSTRAINT PK_IdDistribucion PRIMARY KEY,
    IdDetalle INT,
    IdUbicacion INT constraint Fk_IdUbicacion foreign Key references Ubicaciones(IdUbicacion),
    CantidadDistribuida Decimal,
    --
    IdCreadoPor int constraint Fk_Distribuciones_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Distribuciones_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Distribuciones_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA DetallesFC_Lotes.
CREATE TABLE DetallesFC_Lotes
(
    IdDetalleLote INT IDENTITY CONSTRAINT PK_IdDetalleLote PRIMARY KEY,
    IdLote int constraint Fk_DetallesFC_IdLote foreign Key references Lotes(IdLote),
    Cantidad Decimal,
    --
    IdCreadoPor int constraint Fk_DetallesFC_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_DetallesFC_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_DetallesFC_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PagosProveedores:
CREATE TABLE PagosProveedores
(
    IdPago INT IDENTITY CONSTRAINT PK_IdPagoPP PRIMARY KEY,
    MontoPago DECIMAL(10, 2),
    FechaPago DATE,
    --
    IdCreadoPor int constraint Fk_PPPIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PPPIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PPPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PagosFacturasCompras:
CREATE TABLE PagosFacturasCompras
(
    IdPagoFacPro INT IDENTITY CONSTRAINT PK_IdPagoFacPro PRIMARY KEY,
    IdFactura int constraint Fk_PFPPagoIdFactura foreign Key references FacturasCompras(IdFactura),
    IdPago int constraint Fk_PagoIdFactura foreign Key references PagosProveedores(IdPago),
    --
    IdCreadoPor int constraint Fk_PFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA EstadoProyectos:
CREATE TABLE EstadosProyectos
(
    IdEstado INT IDENTITY CONSTRAINT PK_EP_IdEstado PRIMARY KEY,
    EstadoNombre varchar(30),
    --
    IdCreadoPor int constraint Fk_Estado_ProyectoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Estado_ProyectoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Estado_ProyectoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA Proyectos:
CREATE TABLE Proyectos
(
    IdProyecto INT IDENTITY CONSTRAINT PK_IdProyecto PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion VARCHAR(MAX),
    FechaDeInicio DATEtime,
    FechaDeFinalizacion DATEtime,
    TiempoDuracionEstimado VARCHAR(70),
    FechaRealDeFinalizacion DATEtime,
    TiempoDuracionReal VARCHAR,
    PresupuestoAcordado DECIMAL(18, 2),
    ClienteEsPersonaFisica BIT,
    IdEntidad INT,
    IdEstado INT,
    --
    CONSTRAINT FK_IdEstadoProyecto FOREIGN KEY (IdEstado) REFERENCES EstadosProyectos(IdEstado),
    CONSTRAINT FK_IdEntidadProyecto FOREIGN KEY (IdEntidad) REFERENCES Entidades(IdEntidad),
    --
    IdCreadoPor int constraint Fk_ProyectoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_ProyectoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_ProyectoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- -- CREACION DE LA TABLA TIPO DE ProyectosDetallesProductos:
CREATE TABLE ProyectosDetallesProductos
(
    IdProyectoDetalleProducto INT IDENTITY CONSTRAINT PK_IdPDP PRIMARY KEY,
    Cantidad DECIMAL,
    PrecioCompra DECIMAL,
    PrecioVenta DECIMAL,
    ITBIS DECIMAL,
    Codigo VARCHAR(10),
    Decuento DECIMAL,
    Subtotal DECIMAL,
    ---
    IdProducto INT,
    IdUnidadDeMedida INT,
    IdProyecto INT constraint Fk_Proyectos_IdProyecto FOREIGN KEY REFERENCES Proyectos(IdProyecto),
    FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
    FOREIGN KEY (IdUnidadDeMedida) REFERENCES UnidadesDeMedida(IdUnidadDeMedida),
    --
    IdCreadoPor int constraint Fk_DetalleDocumentoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_DetalleDocumentoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_DetalleDocumentoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA ProyectosEntidadesEmpresas (Permite saber cual es/era el representante actual al momento de hacer el proyecto):
Create table ProyectosEntidadesEmpresas(
    IdProyectoEntidadEmpresa INT IDENTITY CONSTRAINT PK_IdProyectoEntidadEmpresa PRIMARY KEY,
    IdProyecto INT CONSTRAINT FK_PEE_IdProyecto foreign Key references Proyectos(IdProyecto),
    IdEER INT CONSTRAINT FK_PEE_IdEER foreign Key references EntidadesEmpresasRepresentantes(IdEER),
);
GO


-- CREACION DE LA TABLA ProyectosEntidadesEmpresas_SI:
Create table ProyectosEE_SI(
    Id INT IDENTITY CONSTRAINT PK_PEES_Id PRIMARY KEY,
    IdProyectoEntidadEmpresa INT,
    IdSucursal INT CONSTRAINT FK_PEES_IdSucursal foreign Key references Sucursales(IdSucursal),
    -- Descripcion de lo que se hara en esta sucursal
    Desripcion VARCHAR(MAX),
    IdRepresentanteActual INT,
);
GO


-- CREACION DE LA TABLA ProyectosEntidadesPersonasFisicas 
-- (Permite saber cual es/era el representante actual de la persona fisica al momento de hacer el proyecto):
Create table ProyectosEntidadesPF(
    IdProyectoEntidadPersonaFisica INT IDENTITY CONSTRAINT PK_IdProyectoEntidadPF PRIMARY KEY,
    IdProyecto INT CONSTRAINT FK_PEPF_IdEntidadEmpresa foreign Key references Proyectos(IdProyecto),
    IdEPFR INT CONSTRAINT FK_PEPF_IdProyecto foreign Key references EntidadesPersonasFisicasRepresentantes(IdEPFR),
);
GO


-- CREACION DE LA TABLA ProyectosEntidadesPersonasFisicas_EstructurasInvolucradas:
Create table ProyectosEntidadesPF_Estructuras(
    Id INT IDENTITY CONSTRAINT PK_PEPFEI_Id PRIMARY KEY,
    IdProyectoEntidadPersonaFisica INT CONSTRAINT FK_PEPFEI_IdProyectoEntidadPersonaFisica foreign Key references ProyectosEntidadesPF(IdProyectoEntidadPersonaFisica),
    IdEstructura INT CONSTRAINT FK_PEPFEI_IdEstructura foreign Key references Estructuras(IdEstructura),
    -- Descripcion de lo que se hara en esta estructura
    Desripcion VARCHAR(MAX),
    IdRepresentanteActual INT,
);
GO


-- CREACION DE LA TABLA Responsabilidades:
CREATE TABLE Responsabilidades
(
    IdResponsabilidad INT IDENTITY CONSTRAINT PK_IdResponsabilidad PRIMARY KEY,
    ResponsabilidadNombre VARCHAR(40),
    --
    IdCreadoPor int constraint Fk_ResponsabilidadIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_ResponsabilidadIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_ResponsabilidadIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA ProyectosEmpleados:
CREATE TABLE ProyectosEmpleados
(
    IdPersonaProyecto INT IDENTITY CONSTRAINT PK_IdPersonaProyecto PRIMARY KEY,
    --
    IdProyecto int constraint Fk_PersonalIdProyecto foreign Key references Proyectos(IdProyecto),
    IdResponsabilidad int constraint Fk_PersonalProyecto_IdResponsabilidad foreign Key references Responsabilidades(IdResponsabilidad),
    IdEmpleado int constraint Fk_PersonalProyectoIdEmpleado foreign Key references Empleados(IdEmpleado),
    --
    IdCreadoPor int constraint Fk_PersonalProyectoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PersonalProyectoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PersonalProyectoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA GastosAdicionales:
CREATE TABLE GastosAdicionales
(
    IdGasto INT IDENTITY CONSTRAINT PK_IdGasto PRIMARY KEY,
    DescripcionGasto VARCHAR(60),
    MontoGasto decimal(10,2),
    --
    IdProyecto int constraint Fk_GastoAdicional_IdProyecto foreign Key references Proyectos(IdProyecto),
    --
    IdCreadoPor int constraint FkGastoAdicional_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_GastoAdicionalId_ModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_GastoAdicional_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA Estado_Proyecto:
CREATE TABLE Servicios
(
    IdServicio INT IDENTITY CONSTRAINT PK_IdServicio PRIMARY KEY,
    NombreServicio varchar(100),
    Descripcion varchar(MAX),
    --
    IdCreadoPor int constraint Fk_ServiciosIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_ServiciosIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_ServiciosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA ProyectosServicios:
CREATE TABLE ProyectosServicios
(
    IdProyectoServicio INT IDENTITY CONSTRAINT PK_ProyectoServicio PRIMARY KEY,
    Descripcion Varchar(70),
    --
    IdProyecto int constraint Fk_ProyectoServicioIdProyecto foreign Key references Proyectos(IdProyecto),
    IdServicio int constraint Fk_ProyectoServicioIdServicio foreign Key references Servicios(IdServicio),
    --
    IdCreadoPor int constraint Fk_ProyectoServicioIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_ProyectoServicioIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_ProyectoServicioIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA ParametrosCostos:
CREATE TABLE ParametrosCostos
(
    IdParametroCosto INT IDENTITY CONSTRAINT Pk_IdParametroCosto PRIMARY KEY,
    NombreParametro VARCHAR(255),
    --
    IdCreadoPor int constraint Fk_ParametrosCostoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_ParametrosCostoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_ParametrosCostoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- Creacion de la tabla Prioridades:
CREATE TABLE Prioridades
(
    IdPrioridad INT IDENTITY CONSTRAINT Pk_IdPrioridad PRIMARY KEY,
    NombrePrioridad VARCHAR(255),
    ValoracionPrioridad INT,
    -- (Del 1 al 10 o del 1 al 5)
    --
    IdCreadoPor int constraint Fk_PrioridadesIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PrioridadesIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PrioridadesIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- Creacion de la tabla EstadosTareas:
CREATE TABLE EstadosTareas
(
    IdEstadoTarea INT IDENTITY CONSTRAINT Pk_IdEstadoTarea PRIMARY KEY,
    NombreEstado VARCHAR(255),
    --
    IdCreadoPor int constraint Fk_EstadosTareasIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EstadosTareasIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EstadosTareasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA Tareas:
CREATE TABLE Tareas
(
    IdTarea INT IDENTITY CONSTRAINT PK_IdTarea PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion VARCHAR(255),
    FechaInicio DATEtime,
    FechaFinalizacion DATEtime,
    TiempDuracionEstimado VARCHAR(40),
    FechaRealDeFinalizacion DATEtime,
    TiempoDuracionReal VARCHAR(40),

    IdParametroCosto INT,
    CostoPorParametro DECIMAL(10, 2),
    Cantidad Decimal,
    CostoTotal DECIMAL(10, 2),
    IdPrioridad INT,
    IdProyecto INT,
    IdEstado INT,
    IdServicioRelacionado INT,
    --
    constraint FK_TareasIdParametroCosto FOREIGN KEY (IdParametroCosto) REFERENCES ParametrosCostos(IdParametroCosto),
    constraint FK_TareasIdPrioridad FOREIGN KEY (IdPrioridad) REFERENCES Prioridades(IdPrioridad),
    constraint FK_TareasIdProyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(IdProyecto),
    constraint FK_TareasIdEstado FOREIGN KEY (IdEstado) REFERENCES EstadosTareas(IdEstadoTarea),
    constraint FK_TareasIdServicioRelacionado FOREIGN KEY (IdServicioRelacionado) REFERENCES Servicios(IdServicio),
    --
    IdCreadoPor int constraint Fk_TareasIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_TareasModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_TareasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA TipoDocumento:
CREATE TABLE TipoDocumento
(
    IdTipoDocumento INT IDENTITY CONSTRAINT PK_IdTipoDocumento PRIMARY KEY,
    NombreDocumento varchar(30),
    --
    IdCreadoPor int constraint Fk_TipoDocumentoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_TipoDocumentoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_TipoDocumentoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


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
-- CREACION DE LA TABLA TipoDocumento:
CREATE TABLE NCF
(
    IdNCF INT IDENTITY CONSTRAINT PK_IdTipoNCF PRIMARY KEY,
    IdTipoNCF varchar(30),
    Codigo varchar(30),
    Actual INT,
    Limite INT,
    FechaVencimiento DATETIME,
    TipoNCFId INT CONSTRAINT Fk_TipoNCFId FOREIGN KEY REFERENCES TiposNCF(IdTipoNCF),
    --
    IdCreadoPor int constraint Fk_TipoNCF_CreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_TipoNCFModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_NCF_IdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro),
);



GO
-- CREACION DE LA TABLA FacturaVentaProyecto:
CREATE TABLE FacturasVentasProyectos
(
    IdFactura INT IDENTITY CONSTRAINT PK_IdDocumento PRIMARY KEY,
    FechaDeEmision DATEtime,
    MontoInicial DECIMAL(18, 2),
    FechaDeVencimiento DATEtime,
    DiasMora INT,
    MontoMora DECIMAL(18, 2),
    MontoTotal DECIMAL(18, 2),
    TipoNCFId INT CONSTRAINT Fk_FV_TipoNCFId FOREIGN KEY REFERENCES TiposNCF(IdTipoNCF),
    Secuencia varchar(20),
    IdCliente INT,
    IdEstado INT,
    IdProyecto INT,
    --
    CONSTRAINT FK_FacturasVentaProyectos_IdCliente FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    --
    IdEstadoFactura int constraint Fk_IdEstadoDocumento foreign Key references EstadosDocumentos(IdEstadoDocumento),

    CONSTRAINT FK_DocumentoIdProyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(IdProyecto),
    --
    IdCreadoPor int constraint Fk_FacturasVentaProyectos_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_FacturasVentaProyectos_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_FacturasVentaProyectos_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
CREATE TABLE CotizacionesProyectos
(
    IdCotizacion INT IDENTITY CONSTRAINT PK_IdCotizacion PRIMARY KEY,
    FechaDeEmision DATETIME,
    MontoInicial DECIMAL(18, 2),
    MontoTotal DECIMAL(18, 2),
    Secuencia varchar(20),
    IdCliente INT,
    IdEstado INT,
    IdProyecto INT,
    TipoNCFId INT CONSTRAINT Fk_cp_TipoNCFId FOREIGN KEY REFERENCES TiposNCF(IdTipoNCF),
    --
    CONSTRAINT FK_CotizacionIdCliente FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    --
    IdEstadoCotizacion int constraint Fk_CotizacionIdEstadoFactura foreign Key references EstadosDocumentos(IdEstadoDocumento),

    CONSTRAINT FK_CotizacionIdProyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(IdProyecto),
    --
    IdCreadoPor int constraint Fk_CotizacionIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_CotizacionIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_CotizacionIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA TIPO DE PAGOS:
CREATE TABLE TiposPagos
(
    IdTipoPago INT IDENTITY CONSTRAINT PK_IdTipo PRIMARY KEY,
    TipoPago varchar(30),
    --
    IdCreadoPor int constraint Fk_TipoPagoIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_TipoPagoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PTipoPagooIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA PAGOS:
CREATE TABLE Pagos
(
    IdPago INT IDENTITY CONSTRAINT PK_IdPagoReg PRIMARY KEY,
    Fecha DATEtime,
    MontoPago DECIMAL(18, 2),
    MontoRestante DECIMAL(18, 2),
    FechaPago DATEtime,
    --
    IdTipoPago int constraint Fk_IdTipoPago foreign Key references TiposPagos(IdTipoPago),
    --
    IdCreadoPor int constraint Fk_PagosDocIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PagosDoIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PagosDoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PagosFacturasVentasProyectos:
CREATE TABLE PagosFacturasVentasProyectos
(
    IdPagDocumento INT IDENTITY CONSTRAINT PK_IdPagoDocumento PRIMARY KEY,
    MontoPagado DECIMAL(18, 2),
    --
    IdPago int constraint Fk_PagosIdPago foreign Key references Pagos(IdPago),
    IdFactura int constraint Fk_PagosIdFactura foreign Key references FacturasVentasProyectos(IdFactura),
    -- 
    IdCreadoPor int constraint Fk_PDocIdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PDocIdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PDocIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA Imagenes:
CREATE TABLE Imagenes
(
    IdImagen INT IDENTITY CONSTRAINT PK_IdImagen PRIMARY KEY,
    FileName VARCHAR(MAX),
    ContentType VARCHAR(60),
    FileSize INT,
    DATA VARCHAR(MAX),
    --
    IdCreadoPor int constraint Fk_Imagenes_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_Imagenes_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_Imagenes_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA ProductosImagenes:
CREATE TABLE ProductosImagenes
(
    IdProductoImagen INT IDENTITY CONSTRAINT PK_IdProductoImagen PRIMARY KEY,
    IdImagen int constraint Fk_PImg_IdImagen foreign Key references Imagenes(IdImagen),
    IdProducto int constraint Fk_PImg_IdProducto foreign Key references Productos(IdProducto),
    EsLaPrincipal bit,
    --
    IdCreadoPor int constraint Fk_PImg_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PImg_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PImg_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA IdPersona:
CREATE TABLE EntidadesImagenes
(
    IdEntdadImagen INT IDENTITY CONSTRAINT PK_IdEntidadImagen PRIMARY KEY,
    IdImagen int constraint Fk_EImg_IdImagen foreign Key references Imagenes(IdImagen),
    IdEntidad int constraint Fk_EImg_IdProducto foreign Key references Entidades(IdEntidad),
    --
    IdCreadoPor int constraint Fk_EImg_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_EImg_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_EImg_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA PersonasImagenes:
CREATE TABLE PersonasImagenes
(
    IdPersonaImagen INT IDENTITY CONSTRAINT PK_IdPersonaImagen PRIMARY KEY,
    IdImagen int constraint Fk_CImg_IdImagen foreign Key references Imagenes(IdImagen),
    IdPersona int constraint Fk_CImg_IdProducto foreign Key references Personas(IdPersona),
    --
    IdCreadoPor int constraint Fk_CImg_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_CImg_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_CImg_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA ProyectosImagenes:
CREATE TABLE ProyectosImagenes
(
    IdProyectoImagen INT IDENTITY CONSTRAINT PK_IdProyectoImagen PRIMARY KEY,
    IdImagen int constraint Fk_PYImg_IdImagen foreign Key references Imagenes(IdImagen),
    IdProyecto int constraint Fk_PYImg_IdProducto foreign Key references Proyectos(IdProyecto),
    --
    IdCreadoPor int constraint Fk_PYImg_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint Fk_PYImg_IdModificadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint Fk_PYImg_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO



GO
-- CREACION DE LA TABLA Proyectos ProyectosDistribucionesPagos
CREATE TABLE ProyectosDistribucionesPagos
(
    IdDistribucionPago INT IDENTITY CONSTRAINT PK_IdDistribucionPago PRIMARY KEY,
    MontoPago DECIMAL,
    FechaPago DATETIME,
    -- MontoMora,
    --
    IdCreadoPor int constraint PDP_Fk1_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint PDP_Fk2_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint PDP_Fk3_IdCreadoPor foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA Proyectos TiposDatosConfiguraciones
CREATE TABLE TiposDatosConfiguraciones
(
    IdTipoDato INT IDENTITY CONSTRAINT PK_IdTipoDato PRIMARY KEY,
    Nombre VARCHAR(60),
    Descripcion Varchar (60),
    --
    IdCreadoPor int constraint TipD_Fk1_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint TipD_Fk2_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint TipD_Fk3_IdCreadoPor foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA Proyectos ConfiguracionesGenerales
CREATE TABLE ConfiguracionesGenerales
(
    IdConfiguracion INT IDENTITY CONSTRAINT PK_IdConfiguraciono PRIMARY KEY,
    Nombre VARCHAR(60),
    Clave VARCHAR(60), -- 'CO'
    Valor VARCHAR(60), -- ''
    ValorPorDefecto VARCHAR(60),
    Descripcion VARCHAR(100),
    IdTipoDato INT CONSTRAINT IdTipoDato FOREIGN KEY REFERENCES TiposDatosConfiguraciones(IdTipoDato),
    --
    IdCreadoPor int constraint ConfigGen_Fk1_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaCreacion Datetime,
    IdModificadoPor int constraint ConfigGen_Fk2_IdCreadoPor foreign Key references Usuarios(IdUsuario),
    FechaModificacion Datetime,
    IdEstadoRegistro int constraint ConfigGen_Fk3_IdCreadoPor foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO



-- Inserción de datos ficticios en la tabla NCF
INSERT INTO NCF (IdTipoNCF, Codigo, Actual, Limite, FechaVencimiento, TipoNCFId, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES 
('FA', '001', 100, 500, '2023-12-31 23:59:59', 1, 1, '2023-01-01 08:00:00', 2, '2023-01-02 10:30:00', 3),
('FB', '002', 50, 200, '2023-12-31 23:59:59', 2, 2, '2023-02-15 11:20:00', 3, '2023-02-18 09:45:00', 1),
('ND', '003', 80, 300, '2023-12-31 23:59:59', 3, 3, '2023-03-20 14:45:00', 1, '2023-03-22 16:10:00', 2),
('NC', '004', 30, 150, '2023-12-31 23:59:59', 4, 1, '2023-04-10 09:30:00', 2, '2023-04-12 12:15:00', 3),
('RA', '005', 120, 600, '2023-12-31 23:59:59', 5, 2, '2023-05-05 13:00:00', 3, '2023-05-08 15:20:00', 1);

-- Puedes ajustar estos datos ficticios según tus necesidades o reglas específicas
