CREATE DATABASE BD_PROYENETT_PROVISIONAL_VERSION
GO
USE BD_PROYENETT_PROVISIONAL_VERSION
GO
-- CREACION DE LA TABLA ESTADOS_REGISTROS
Create table EstadosRegistros
(
  IdEstadoRegistro int identity constraint PK_IdEstadoRegistro primary key,
  NombreEstado varchar(15),
  IdEstadoRegistro_fk int constraint Fk_IdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro)
)
GO
-- CREACION DE LA TABLA ROLES:
Create table Roles
(
  IdRol int identity constraint PK_IdRol primary key,
  NombreRol varchar(40),
  IdEstadoRegistro int constraint Fk_RolesIdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro)
)
GO
-- CREACION DE LA TABLA USUARIOS:
Create table Usuarios
(
  IdUsuario int identity constraint PK_IdUsuario primary key,
  NombreUsuario varchar(30),
  Correo varchar(60),
  Contraseña varchar(30),
  IdRol int constraint Fk_IdRol foreign Key references Roles(IdRol),
  --
  IdCreadoPor int constraint Fk_UsuarioIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_UsuarioIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_UsuarioIdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
)
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

-- Alter table a la tabla EstadosRegistros:
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
)
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
)
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
)
GO

-- CREACION DE LA TABLA PERSONAS
Create Table Personas
(
  IdPersona int identity constraint PK_IdPersona primary key,
  Nombres varchar(40),
  Apellidos varchar(40),
  Telefono1 varchar(12),
  Telefono2 varchar(12),
  Direccion varchar(60),
  Correo varchar(60),
  Edad int,
  FechaDeNacimiento date,
  Cedula varchar(13) constraint Uk_Cedula Unique,
  --
  IdSexo int constraint Fk_IdSexo foreign Key references Sexos(IdSexo),
  IdCiudad int constraint Fk_IdCiudad foreign Key references Ciudades(IdCiudad),
  --
  IdCreadoPor int constraint Fk_IdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion datetime,
  IdModificadoPor int constraint Fk_IdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion datetime,
  IdEstadoRegistro int constraint Fk_IdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA EMPRESAS
Create Table Empresas
(
  IdEmpresa int identity constraint PK_IdEmpresa primary key,
  NombreEmpresa varchar(60),
  RNC varchar(9),
  Correo varchar(60),
  Teléfono1 varchar(12),
  Teléfono2 varchar(12),
  SitioWeb varchar(255),
  Dirección varchar(50),
  IdCiudad int constraint Fk_IdCiudadEmpresa foreign Key references Ciudades(IdCiudad),
  --
  IdCreadoPor int constraint Fk_EmpresasIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_EmpresasIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_EmpresasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO


-- CREACION DE LA TABLA CLIENTES ((((((((((CORRECCION: Poner Campos: EsPersonaFisica, FechaInicioDeRepresentante))))))))))
Create Table Clientes
(
  IdCliente int identity constraint PK_IdCliente primary key,
  IdPersonaDeContacto int constraint Fk_Cliente_IdPersonaDeContacto foreign Key references Personas(IdPersona),
  --
  IdCreadoPor int constraint Fk_ClientesIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ClientesIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ClientesIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
) 
GO

-- CREACION DE LA TABLA ESTADOPROVEEDORES
Create Table EstadoProveedores
(
  IdEstadoProveedor int identity constraint PK_IdEstadoProveedor primary key,
  EstadoNombre varchar(30),
  --
  IdCreadoPor int constraint Fk_EPIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_EPIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_EPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA ESTADO PROVEEDORES:
Create Table Proveedores
(
  IdProveedor int identity constraint PK_IdProveedor primary key,
  IdEstadoProveedor int constraint Fk_IdEstadoProveedor foreign Key references EstadoProveedores(IdEstadoProveedor),
  IdPersonaDeContacto int constraint Fk_Proveedor_IdPersonaDeContacto foreign Key references Personas(IdPersona),
  --
  IdCreadoPor int constraint Fk_ProveedoresIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ProveedoresIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ProveedoresIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA CLIENTES_EMPRESAS:
Create Table Clientes_Empresas
(
  IdClienteEmpresa int identity constraint PK_IdClienteEmpresa primary key,
  IdCliente int constraint Fk_CE_IdCliente foreign Key references Clientes(IdCliente),
  IdEmpresa int constraint UK_CE_IdEmpresa Unique
    constraint Fk_CE_IdEmpresa foreign Key references Empresas(IdEmpresa),
  --
  IdCreadoPor int constraint Fk_CE_IdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_CE_IdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_CE_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA PROVEEDORES_EMPRESAS:
Create Table Proveedores_Empresas
(
  IdProveedorEmpresa int identity constraint PK_IdProveedorEmpresa primary key,
  IdProveedor int constraint Fk_PE_IdProveedor foreign Key references Proveedores(IdProveedor),
  IdEmpresa int Constraint UK_PE_IdEmpresa Unique
    constraint Fk_PE_IdEmpresa foreign Key references Empresas(IdEmpresa),
  --
  IdCreadoPor int constraint Fk_PE_IdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_PE_IdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_PE_IdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA EMPLEADOS:
CREATE TABLE Empleados
(
  IdEmpleado INT identity constraint PK_IdEmpleado PRIMARY KEY,
  FechadDeContratación DATE NOT NULL,
  IdPersona INT NOT NULL,
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
  Descripción VARCHAR(255),
  CONSTRAINT Fk_CargoIdEmpleado FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IdEmpleado),
  CONSTRAINT Fk_CargoIdCargo FOREIGN KEY (IdCargo) REFERENCES Cargos(IdCargo),
  --
  IdCreadoPor int constraint Fk_ECIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ECIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ECIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA UnidadesDeMedida:
CREATE TABLE UnidadesDeMedida
(
  IdUnidad_DeMedida INT IDENTITY CONSTRAINT Pk_IdUnidad_DeMedida PRIMARY KEY,
  UnidadNombre VARCHAR(255),
  --
  IdCreadoPor int constraint Fk_UMIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_UMIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_UMIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


GO
-- CREACION DE LA TABLA Estados:
CREATE TABLE Estados
(
  IdEstado INT IDENTITY CONSTRAINT Pk_IdEstado PRIMARY KEY,
  EstadoNombre VARCHAR(255),
  --
  IdCreadoPor int constraint Fk_EstadosIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_EstadosIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_EstadosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA PRODUCTOS:
CREATE TABLE Productos
(
  IdProducto INT IDENTITY CONSTRAINT PK_IdProducto PRIMARY KEY,
  Nombre VARCHAR(255),
  Codigo VARCHAR(7) CONSTRAINT UQ_CodigoProducto UNIQUE,
  Descripción VARCHAR(255),
  Modelo VARCHAR(50),
  PrecioCosto DECIMAL(10, 2),
  PrecioVenta DECIMAL(10, 2),
  ITBIS DECIMAL(5, 2),
  IdUnidad_DeMedida INT,
  IdEstado INT,
  CONSTRAINT Fk_IdUnidadDeMedida FOREIGN KEY (IdUnidad_DeMedida) REFERENCES UnidadesDeMedida(IdUnidad_DeMedida),
  CONSTRAINT Fk_ProductosIdEstado FOREIGN KEY (IdEstado) REFERENCES Estados(IdEstado),
  --
  IdCreadoPor int constraint Fk_ProductosIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ProductosIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ProductosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA PRODUCTOS-FOTOS:
CREATE TABLE ProductosFotos
(
  IdFoto INT IDENTITY CONSTRAINT PK_IdProducto_Foto PRIMARY KEY,
  FileName VARCHAR(MAX),
  ContentType VARCHAR(60),
  FileSize INT,
  DATA VARBINARY(MAX),
  CheckSum VARCHAR(100),
  IdProducto INT,
  CONSTRAINT FK_IdProducto_Foto FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
  --
  IdCreadoPor int constraint Fk_FotosIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_FotosIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_FotosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);


GO
-- CREACION DE LA TABLA UBICACIONES DE INVENTARIO:
CREATE TABLE AreasInventarios
(
  IdArea INT IDENTITY CONSTRAINT PK_IdUbicacion PRIMARY KEY,
  AreaNombre VARCHAR(65),
  DetallesUbicacion VARCHAR(110),
);



GO
-- CREACION DE LA TABLA InventariosAreasInventarios
CREATE TABLE InventariosAreasInventarios
(
  IdInventarioAreaInventario INT IDENTITY CONSTRAINT PK_IdUbicacionIAI PRIMARY KEY,
  IdInventario INT,
  IdArea INT,
  Cantidad Decimal,
  AreaNombre VARCHAR(65),
  DetallesUbicacion VARCHAR(110),
);


GO
-- CREACION DE LA TABLA INVENTARIOS:
CREATE TABLE Inventarios
(
  IdInventario INT IDENTITY CONSTRAINT PK_IdInventario PRIMARY KEY,
  Descripcion VARCHAR(255),
  Codigo VARCHAR(6) CONSTRAINT UQ_CodigoInventario UNIQUE,
  CantidadDisponible INT,
  --
  IdProducto INT,
  CONSTRAINT Fk_InventarioIdProducto FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
  --
  IdCreadoPor int constraint Fk_InventarioIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_InventarioIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_InventarioIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);


GO
-- CREACION DE LA TABLA EstadosFacturas:
CREATE TABLE EstadosFacturas
(
  IdEstadoFactura INT IDENTITY CONSTRAINT PK_IdEstadoFactura PRIMARY KEY,
  NombreEstadoFactura varchar(30),
  --
  IdCreadoPor int constraint Fk_EstadosFacturasdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_EstadosFacturasdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_EFIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA FacturasProveedores:
CREATE TABLE FacturasProveedores
(
  IdFactura INT IDENTITY CONSTRAINT PK_IdFactura PRIMARY KEY,
  Fecha DATE,
  MontoTotal DECIMAL(10, 2),
  MontoRestante DECIMAL(10, 2),
  NCF VARCHAR(50),
  --
  IdEstadoFactura int constraint Fk_IdEstadoFactura foreign Key references EstadosFacturas(IdEstadoFactura),
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

-- CREACION DE LA TABLA DetalleFacturaProveedor:
CREATE TABLE Entradas
(
  IdEntrada INT IDENTITY CONSTRAINT PK_IdEntrada PRIMARY KEY,
  --
  IdProducto int constraint Fk_DetalleIdProducto foreign Key references Productos(IdProducto),
  IdFactura int constraint Fk_IdFactura foreign Key references FacturasProveedores(IdFactura),
  IdInventario int constraint Fk_IdInventario_Entradas foreign key references Inventarios(IdInventario),
  --
  CodigoDeSeguimiento varchar(9),
  Fecha Date,
  Cantidad int,
  ITBIS decimal (10,2),
  --
  IdCreadoPor int constraint Fk_DFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_DFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_DFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
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

-- CREACION DE LA TABLA PagosFacturaProveedor:
CREATE TABLE PagosFacturasProveedores
(
  IdPagoFacPro INT IDENTITY CONSTRAINT PK_IdPagoFacPro PRIMARY KEY,
  IdFactura int constraint Fk_PFPPagoIdFactura foreign Key references FacturasProveedores(IdFactura),
  IdPago int constraint Fk_PagoIdFactura foreign Key references PagosProveedores(IdPago),
  --
  IdCreadoPor int constraint Fk_PFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_PFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_PFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA Estado_Proyecto:
CREATE TABLE Estado_Proyecto
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


-- CREACION DE LA TABLA Estado_Proyecto:
CREATE TABLE Proyectos
(
  IdProyecto INT IDENTITY CONSTRAINT PK_IdProyecto PRIMARY KEY,
  Nombre VARCHAR(255),
  Descripcion VARCHAR(MAX),
  FechaDeInicio DATE,
  FechaDeFinalizacion DATE,
  PresupuestoAcordado DECIMAL(18, 2),
  IdEstado INT,
  IdCliente INT,
  --
  CONSTRAINT FK_IdEstadoProyecto FOREIGN KEY (IdEstado) REFERENCES Estados(IdEstado),
  CONSTRAINT FK_IdClienteProyecto FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
  --
  IdCreadoPor int constraint Fk_ProyectoIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ProyectoIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ProyectoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);
GO


-- CREACION DE LA TABLA GESTIONA:
CREATE TABLE Gestiona
(
  IdGestiona INT IDENTITY CONSTRAINT PK_IdGestiona PRIMARY KEY,
  IdUsuario INT,
  IdProyecto INT,
  --
  constraint FK_GestionaIdUsuario FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario),
  constraint FK_GestionaIdProyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(IdProyecto),
  --
  IdCreadoPor int constraint Fk_GestionaIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_GestionaIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_GestionaIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
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

-- CREACION DE LA TABLA PERSONAL_PROYECTO:
CREATE TABLE PersonalProyecto
(
  IdPersonaProyecto INT IDENTITY CONSTRAINT PK_IdPersonaProyecto PRIMARY KEY,
  ResponsabilidadNombre VARCHAR(40),
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

-- CREACION DE LA TABLA GASTO_ADICIONAL:
CREATE TABLE GastoAdicional
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
  NombreServicio varchar(30),
  Descripcion varchar(70),
  --
  IdCreadoPor int constraint Fk_ServiciosIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ServiciosIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ServiciosIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA PROYECTO_SERVICIO:
CREATE TABLE ProyectoServicio
(
  IdProyectoServicio INT IDENTITY CONSTRAINT PK_ProyectoServicio PRIMARY KEY,
  MontoTotalPorServicio decimal(10,2),
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

-- CREACION DE LA TABLA DOCUMENTO:
CREATE TABLE Documentos
(
  IdDocumento INT IDENTITY CONSTRAINT PK_IdDocumento PRIMARY KEY,
  FechaDeEmision DATE,
  MontoInicial DECIMAL(18, 2),
  FechaDeVencimiento DATE,
  DiasMora INT,
  MontoMora DECIMAL(18, 2),
  MontoTotal DECIMAL(18, 2),
  NCF varchar(20),
  IdTipoDocumento INT,
  IdCliente INT,
  IdEstado INT,
  IdProyecto INT,
  --
  CONSTRAINT FK_DocumentoIdTipoDocumento FOREIGN KEY (IdTipoDocumento) REFERENCES TipoDocumento(IdTipoDocumento),
  CONSTRAINT FK_DocumentoIdCliente FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
  --
  IdEstadoFactura int constraint Fk_DocumentoIdEstadoFactura foreign Key references EstadosFacturas(IdEstadoFactura),

  CONSTRAINT FK_DocumentoIdProyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(IdProyecto),
  --
  IdCreadoPor int constraint Fk_DocumentoIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_DocumentoIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_DocumentoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- -- CREACION DE LA TABLA TIPO DE DetalleDocumento:
CREATE TABLE DetalleDocumento
(
  IdDetalleDocumento INT IDENTITY PRIMARY KEY (IdDetalleDocumento),
  Cantidad DECIMAL(10, 2),
  Precio DECIMAL(10, 2),
  ITBIS DECIMAL(10, 2),
  Descripcion VARCHAR(255),
  IdProductoServicio INT,
  IdDocumento INT,
  FOREIGN KEY (IdProductoServicio) REFERENCES Productos(IdProducto),
  FOREIGN KEY (IdDocumento) REFERENCES Documentos(IdDocumento),
  --
  IdCreadoPor int constraint Fk_DetalleDocumentoIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_DetalleDocumentoIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_DetalleDocumentoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

-- CREACION DE LA TABLA TIPO DE PAGOS:
CREATE TABLE TipoPago
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

-- CREACION DE LA TABLA PAGOS:
CREATE TABLE Pagos
(
  IdPago INT IDENTITY CONSTRAINT PK_IdPagoReg PRIMARY KEY,
  Fecha DATE,
  MontoPago DECIMAL(18, 2),
  MontoRestante DECIMAL(18, 2),
  FechaPago DATE,
  --
  IdTipoPago int constraint Fk_IdTipoPago foreign Key references TipoPago(IdTipoPago),
  --
  IdCreadoPor int constraint Fk_PagosDocIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_PagosDoIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_PagosDoIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA PagoDocumentos:
CREATE TABLE PagoDocumentos
(
  IdPagDocumento INT IDENTITY CONSTRAINT PK_IdPagoDocumento PRIMARY KEY,
  MontoPagado DECIMAL(18, 2),
  --
  IdPago int constraint Fk_PagosIdPago foreign Key references Pagos(IdPago),
  IdDocumento int constraint Fk_PagosIdFactura foreign Key references Documentos(IdDocumento),
  -- 
  IdCreadoPor int constraint Fk_PDocIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_PDocIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_PDocIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA ParametrosCosto:
CREATE TABLE ParametrosCosto
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

-- Creacion de la tabla Prioridades:
CREATE TABLE Prioridades
(
  IdPrioridad INT IDENTITY CONSTRAINT Pk_IdPrioridad PRIMARY KEY,
  NombrePrioridad VARCHAR(255),
  --
  IdCreadoPor int constraint Fk_PrioridadesIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_PrioridadesIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_PrioridadesIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA Tareas:
CREATE TABLE Tareas
(
  IdTarea INT IDENTITY CONSTRAINT PK_IdTarea PRIMARY KEY,
  Nombre VARCHAR(255),
  Descripcion VARCHAR(255),
  FechaInicio DATE,
  FechaFin DATE,
  Cantidad INT,
  CostoPorParam DECIMAL(10, 2),
  CostoTotal DECIMAL(10, 2),
  IdParametroCosto INT,
  IdPrioridad INT,
  IdProyecto INT,
  IdEstado INT,
  IdServicioRelacionado INT,
  --
  constraint FK_TareasIdParametroCosto FOREIGN KEY (IdParametroCosto) REFERENCES ParametrosCosto(IdParametroCosto),
  constraint FK_TareasIdPrioridad FOREIGN KEY (IdPrioridad) REFERENCES Prioridades(IdPrioridad),
  constraint FK_TareasIdProyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(IdProyecto),
  constraint FK_TareasIdEstado FOREIGN KEY (IdEstado) REFERENCES Estados(IdEstado),
  constraint FK_TareasIdServicioRelacionado FOREIGN KEY (IdServicioRelacionado) REFERENCES Servicios(IdServicio),
  --
  IdCreadoPor int constraint Fk_TareasIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_TareasModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_TareasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);


GO
-- CREACION DE LA TABLA Equipos-Tareas:
CREATE TABLE EquiposTareas
(
  IdEquipoTarea INT IDENTITY CONSTRAINT PK_IdEquipoTarea PRIMARY KEY,
  Descripcion Varchar(50),
  IdProducto INT CONSTRAINT FK_IdProductoTarea FOREIGN KEY REFERENCES Productos(IdProducto),
  Cantidad DECIMAL,
  IdTarea INT CONSTRAINT FK_IdPTareaEquipoTarea FOREIGN KEY REFERENCES Tareas(IdTarea),
  IdInventario INT CONSTRAINT FK_IdInventarioEquiposTareas FOREIGN KEY REFERENCES Inventarios(IdInventario)
)

GO

-- A CONTINUACIÓN ALGUNOS PROCEDIMIENTOS ALMACENADOS (SECCION --.P.R.O.C.E.D.U.R.E....... P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P):
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para devolver la lista de Clientes: --
CREATE OR ALTER PROCEDURE dbo.ListadoClientes
AS
BEGIN
  SET NOCOUNT ON
  SELECT C.IdCliente, P.IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, P.Correo, Edad, FechaDeNacimiento,
    Cedula, P.IdSexo, SexoNombre, P.IdCiudad, CiudadNombre, PA.IdPais, PaisNombre, ER.IdEstadoRegistro, ER.NombreEstado
  FROM Clientes C
    INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona
    INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
    INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
    INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
    INNER JOIN EstadosRegistros ER ON C.IdEstadoRegistro = ER.IdEstadoRegistro
END
/*EJECUCION DE PROCEDIMIENTO:
-- Execute dbo.ListadoClientes 
*/


GO
CREATE OR ALTER PROCEDURE dbo.GetPersonaInfoByIdCliente
  (@clienteId int)
AS
BEGIN
  SET NOCOUNT ON
  SELECT C.IdCliente, P.IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, P.Correo, Edad, FechaDeNacimiento,
    Cedula, P.IdSexo, SexoNombre, P.IdCiudad, CiudadNombre, PA.IdPais, PaisNombre, ER.IdEstadoRegistro, ER.NombreEstado
  FROM Clientes C
    INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona
    INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
    INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
    INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
    INNER JOIN EstadosRegistros ER ON C.IdEstadoRegistro = ER.IdEstadoRegistro
  WHERE C.IdCliente = @clienteId
END
-- EXEC dbo.GetPersonaInfoByIdCliente @clienteId = 1



GO
CREATE OR ALTER PROCEDURE dbo.ListadoClientesV2
  @PageNumber INT,
  @PageSize INT
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

  SELECT C.IdCliente, IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, Correo, Edad, FechaDeNacimiento, Cedula, IdSexo, SexoNombre, IdCiudad, CiudadNombre, IdPais, PaisNombre
  FROM (
        SELECT C.IdCliente, P.IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, P.Correo, Edad, FechaDeNacimiento, Cedula, P.IdSexo, SexoNombre, P.IdCiudad, CiudadNombre, PA.IdPais, PaisNombre,
      ROW_NUMBER() OVER (ORDER BY C.IdCliente) AS RowNumber
    FROM Clientes C
      INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona
      INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
      INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
      INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
    WHERE C.IdEstadoRegistro = 1
    ) AS C
  WHERE C.RowNumber > @Offset
    AND C.RowNumber <= (@Offset + @PageSize);
END
-- Execute dbo.ListadoClientesV2 @PageNumber = 2, @PageSize = 5



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para devolver la lista de Proveedores: -------------------------------------
CREATE OR ALTER PROCEDURE dbo.ListadoProveedores
AS
BEGIN
  SET NOCOUNT ON
  SELECT pr.IdProveedor, p.Nombres, p.Apellidos, p.Telefono1, p.Telefono2, p.Direccion, p.Correo, p.Edad, p.FechaDeNacimiento,
    p.Cedula, s.SexoNombre, pa.PaisNombre, cu.CiudadNombre
  FROM Proveedores PR INNER JOIN Personas P ON pr.IdPersonaDeContacto = p.IdPersona
    INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
    INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
    INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
  WHERE PR.IdEstadoRegistro = 1
END
/*EJECUCION DE PROCEDIMIENTO:
-- Execute dbo.ListadoProveedores 
*/



GO
-- A CONTINUACIÓN ALGUNOS PROCEDIMIENTOS ALMACENADOS (SECCION --.P.R.O.C.E.D.U.R.E....... P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P):
--
--

GO
-- TiPO DE DATO TABLA PARA ALMACENAR UNA LISTA DE EmpresaId Y PODERLO USAR EN UN PROCEDIMIENTO ALMACENADO:
CREATE TYPE EmpresaIdsTableType AS TABLE
(
  IdEmpresa INT
);


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para devolver la lista de Emplesas: --
CREATE OR ALTER PROCEDURE dbo.EmpresasBy_ListaIdEmpresas
  @EmpresaIds EmpresaIdsTableType READONLY,
  @IdCliente INT
AS
BEGIN
  SET NOCOUNT ON
  SELECT E.IdEmpresa, NombreEmpresa, RNC, Correo, Teléfono1, Teléfono2, SitioWeb, Dirección, IdCiudad,
    E.IdCreadoPor, E.FechaCreacion, E.IdModificadoPor, E.FechaModificacion, E.IdEstadoRegistro
  FROM Empresas E INNER JOIN Clientes_Empresas CE ON E.IdEmpresa = CE.IdEmpresa
  WHERE CE.IdCliente = @IdCliente AND E.IdEmpresa not in (Select IdEmpresa
    from @EmpresaIds) AND E.IdEstadoRegistro != 2
END
/*EJECUCION DE PROCEDIMIENTO:
-- Execute dbo.EmpresasBy_ListaIdEmpresas 
*/

GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para devolver la lista de Empresas de un cliente: --
CREATE OR ALTER PROCEDURE dbo.GetIdEmpresaByIdCliente
  @IdCliente int
AS
BEGIN
  SET NOCOUNT ON
  SELECT E.IdEmpresa
  From Empresas E INNER JOIN Clientes_Empresas CE ON E.IdEmpresa = CE.IdEmpresa
  WHERE IdCliente = @IdCliente
END
/*EJECUCION DE PROCEDIMIENTO:
-- Execute dbo.GetIdEmpresaByIdCliente @IdCliente = 5
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Personas: --
Create or Alter procedure dbo.InsertarPersona
  @IdPersona int,
  @Nombres varchar(40),
  @Apellidos varchar(40),
  @Telefono1 varchar(12),
  @Telefono2 varchar(12),
  @Direccion varchar(60),
  @Correo varchar(60),
  @Edad int,
  @FechaDeNacimiento date,
  @Cedula varchar(13),
  --
  @IdSexo int,
  @IdCiudad int,
  --
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Personas
    (Nombres, Apellidos, Telefono1, Telefono2, Direccion, Correo, Edad, FechaDeNacimiento, Cedula, IdSexo,
    IdCiudad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)

  Values(@Nombres, @Apellidos, @Telefono1, @Telefono2, @Direccion, @Correo, @Edad, @FechaDeNacimiento, @Cedula,
      @IdSexo, @IdCiudad, @IdCreadoPor, GETDATE(), 1)

  Select SCOPE_IDENTITY();
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.InsertarPersona @IdPersona = 0, @Nombres = 'Ignacio Mael', @Apellidos = 'Lima Leopoldo', @Telefono1 = '809-193-3209', 
                          @Telefono2 = '849-105-0525', @Direccion = 'Bo. Las Boemias, Calle 3, #29', 
                          @Correo = 'ignaciomael@example.com', @Edad = 32, @FechaDeNacimiento = '1992-05-10', @Cedula = '2123406080', @IdSexo = 1, 
						  @IdCiudad = 2, @IdCreadoPor = 1, @FechaCreacion = @FechaActual, @IdModificadoPor = 1, @FechaModificacion = @FechaActual,
						  @IdEstadoRegistro = 1;
*/ -- Select * From Personas


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Clientes: --
Create or Alter procedure dbo.InsertarCliente
  @IdPersona int,
  --
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Clientes
    (IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES(@IdPersona, @IdCreadoPor, GETDATE(), 1)

  SELECT SCOPE_IDENTITY();
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.InsertarCliente
     @IdPersona = 6, @IdCreadoPor = 1, @FechaCreacion = @FechaActual, 
     @IdModificadoPor = 1, @FechaModificacion = @FechaActual, @IdEstadoRegistro = 1;
*/ -- Select * From Clientes


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla EMPRESAS: --
Create or Alter procedure dbo.InsertarEmpresa
  @IdEmpresa int,
  @NombreEmpresa varchar(60),
  @RNC varchar(9),
  @Correo varchar(60),
  @Teléfono1 varchar(12),
  @Teléfono2 varchar(12),
  @SitioWeb varchar(255),
  @Dirección varchar(50),
  @IdCiudad int,
  --
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Empresas
    (NombreEmpresa, RNC, Correo, Teléfono1, Teléfono2, SitioWeb, Dirección, IdCiudad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)

  VALUES(@NombreEmpresa, @RNC, @Correo, @Teléfono1, @Teléfono2, @SitioWeb, @Dirección, @IdCiudad, @IdCreadoPor, GetDate(), 1)

  SELECT SCOPE_IDENTITY();
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.InsertarEmpresa 
    @IdEmpresa = 0, @NombreEmpresa = 'Ignacio Auditorias', @RNC = '1312555900', @Correo = 'igaudi@gmail.com', @Teléfono1 = '829-400-5001', 
	@Teléfono2 = '849-805-8488', @SitioWeb = 'www.igaudi.com', @Dirección = 'Bo. La Nueve, Calle C, #53', @IdCiudad = 1, 
	@IdCreadoPor = 1, @FechaCreacion = @FechaActual, @IdModificadoPor = 1, @FechaModificacion = @FechaActual, @IdEstadoRegistro = 1;
*/ -- Select * From Empresas


GO
--
-- 
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Clientes_Empresas: --
Create or Alter procedure dbo.Insertar_Cliente_Empresa
  @IdCliente int,
  @IdEmpresa int,
  --
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Clientes_Empresas
    (IdCliente, IdEmpresa, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES(@IdCliente, @IdEmpresa, @IdCreadoPor, GETDATE(), 1)
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.Insertar_Cliente_Empresa 
    @IdCliente = 6, @IdEmpresa = 7, @IdCreadoPor = 1, @FechaCreacion = @FechaActual, 
	@IdModificadoPor = 1, @FechaModificacion = @FechaActual, @IdEstadoRegistro = 1;
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Proveedor: --
Create or Alter procedure dbo.InsertarProveedor
  @IdEstadoProveedor int,
  @IdPersona int,
  --
  @IdCreadoPor int,
  @FechaCreacion Datetime,
  @IdModificadoPor int,
  @FechaModificacion Datetime,
  @IdEstadoRegistro int
AS
BEGIN
  Set nocount On
  Insert Into Proveedores
    (IdEstadoProveedor, IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
  VALUES(@IdEstadoProveedor, @IdPersona, @IdCreadoPor, GETDATE(), @IdModificadoPor, GETDATE(), @IdEstadoRegistro)

  SELECT SCOPE_IDENTITY();
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.InsertarProveedor
     @IdEstadoProveedor = 1, @IdPersona = 16,  @IdCreadoPor = 1, @FechaCreacion = @FechaActual, 
     @IdModificadoPor = 1, @FechaModificacion = @FechaActual, @IdEstadoRegistro = 1;
*/ -- Select * From Proveedores


GO
--
-- 
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Proveedores_Empresas: --
Create or Alter procedure dbo.Insertar_Proveedor_Empresa
  @IdProveedor int,
  @IdEmpresa int,
  --
  @IdCreadoPor int,
  @FechaCreacion Datetime,
  @IdModificadoPor int,
  @FechaModificacion Datetime,
  @IdEstadoRegistro int
AS
BEGIN
  Set nocount On
  Insert Into Proveedores_Empresas
    (IdProveedor, IdEmpresa, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
  VALUES(@IdProveedor, @IdEmpresa, @IdCreadoPor, GETDATE(), @IdModificadoPor, GETDATE(), @IdEstadoRegistro)
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.Insertar_Proveedor_Empresa 
    @IdProveedor = 6, @IdEmpresa = 16, @IdCreadoPor = 1, @FechaCreacion = @FechaActual, 
	@IdModificadoPor = 1, @FechaModificacion = @FechaActual, @IdEstadoRegistro = 1;
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......U.P.D.A.T.E._._._._._.U.P.D.A.T.E._._._._._._ Procedimiento almacenado (Update) para acualizar la tabla Personas: --
Create or Alter procedure dbo.ActualizarPersona
  @IdPersona int,
  @Nombres varchar(40),
  @Apellidos varchar(40),
  @Telefono1 varchar(15),
  @Telefono2 varchar(15),
  @Direccion varchar(60),
  @Correo varchar(60),
  @Edad int,
  @FechaDeNacimiento date,
  @Cedula varchar(13),
  -->
  @IdSexo int,
  @IdCiudad int,
  -->
  @IdModificadoPor int
AS
BEGIN
  Set nocount On
  Update Personas SET Nombres = @Nombres, Apellidos = @Apellidos, Telefono1 = @Telefono1, Telefono2 = @Telefono2, Direccion = @Direccion, 
                    Correo = @Correo, Edad = @Edad, FechaDeNacimiento = @FechaDeNacimiento, Cedula = @Cedula, IdSexo = @IdSexo, 
	                IdCiudad = @IdCiudad, IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE() WHERE IdPersona = @IdPersona
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.ActualizarPersona @IdPersona = 3, @Nombres = 'Johncito', @Apellidos = 'Doecito', @Telefono1 = '829456789', @Telefono2 = '929654321', @Direccion = 'Calle Secundaria', 
                          @Correo = 'johncitodoe@example.com', @Edad = 31, @FechaDeNacimiento = '1993-05-10', @Cedula = '2034668998', @IdSexo = 1, 
						  @IdCiudad = 2, @IdCreadoPor = 0, @FechaCreacion = @FechaActual, @IdModificadoPor = 1, @FechaModificacion = @FechaActual,
						  @IdEstadoRegistro = 1;
						  Select * From Personas
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......U.P.D.A.T.E._._._._._.U.P.D.A.T.E._._._._._._. Procedimiento almacenado (Update) para actualizar en la tabla EMPRESAS: --
Create or Alter procedure dbo.ActualizarEmpresa
  @IdEmpresa int,
  @NombreEmpresa varchar(60),
  @RNC varchar(9),
  @Correo varchar(60),
  @Teléfono1 varchar(15),
  @Teléfono2 varchar(15),
  @SitioWeb varchar(40),
  @Dirección varchar(40),
  @IdCiudad int,
  --
  @IdModificadoPor int
AS
BEGIN
  Set nocount On
  Update Empresas SET NombreEmpresa = @NombreEmpresa, RNC = @RNC, Correo = @Correo, Teléfono1 = @Teléfono1, Teléfono2 = @Teléfono2, SitioWeb = @SitioWeb, 
	                       Dirección = @Dirección, IdCiudad = @IdCiudad, IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE() 
						   WHERE IdEmpresa = @IdEmpresa
END
/* EJECUCION DEL PROCEDIMIENTO
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.ActualizarSoloEmpresa_ByIdEmpresa 
    @IdEmpresa = 3,  @NombreEmpresa = 'Mi Empresaaa 22', @RNC = '123456789', @Correo = 'empresa@example.com', @Teléfono1 = '123456789', @Teléfono2 = '987654321',
    @SitioWeb = 'www.empresa.com', @Dirección = 'Calle Principal', @IdCiudad = 1, @IdCreadoPor = 1, @FechaCreacion = @FechaActual,
    @IdModificadoPor = 1, @FechaModificacion = @FechaActual, @IdEstadoRegistro = 1;
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......U.P.D.A.T.E._._._._._.U.P.D.A.T.E._._._._._._. Procedimiento almacenado (Update) para actualizar en la tabla EmpleadosCargos: --
Create or Alter procedure dbo.ActualizarEmpleadosCargos
  @IdEmpleado int,
  @IdCargo int,
  @Descripcion varchar(100),
  @IdModificadoPor int
AS
BEGIN
  Set nocount On
  Update EmpleadosCargos SET IdCargo = @IdCargo, Descripción = @Descripcion, @IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE()
	  WHERE IdEmpleado = @IdEmpleado
END




GO
--
--
--.P.R.O.C.E.D.U.R.E.......U.P.D.A.T.E._._._._._.U.P.D.A.T.E._._._._._._. Procedimiento almacenado (DELETE SoftDelete) para DELETE en la tabla EmpleadosCargos: --
Create or Alter procedure dbo.Delete_EmpleadosCargos
  @IdCargo int
AS
BEGIN
  Set nocount On
  Update EmpleadosCargos SET IdEstadoRegistro = 2 WHERE IdCargo = 2
END



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Empleados: --
Create or Alter procedure dbo.InsertarEmpleado
  @FechadDeContratación date,
  @IdPersona int,
  --
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Empleados
    (FechadDeContratación, IdPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES(@FechadDeContratación, @IdPersona, @IdCreadoPor, GETDATE(), 1)

  SELECT SCOPE_IDENTITY();
END



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Cargos: --
Create or Alter procedure dbo.InsertarCargos
  @NombreCargo varchar(60),
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Cargos
    (NombreCargo, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES(@NombreCargo, @IdCreadoPor, GETDATE(), 1)
  SELECT SCOPE_IDENTITY();
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.InsertarCargos @IdCreadoPor = 6, @NombreCargo = 'Analista de topologías'
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Empleados_Cargos: --
Create or Alter procedure dbo.Insertar_EmpleadosCargos
  @IdEmpleado int,
  @IdCargo int,
  @Descripcion varchar(100),
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into EmpleadosCargos
    (IdEmpleado, IdCargo, Descripción, IdCreadoPor, IdEstadoRegistro)
  VALUES(@IdEmpleado, @IdCargo, @Descripcion, @IdCreadoPor, 1)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.Insertar_EmpleadosCargos @IdEmpleado = 6, @IdCargo = 1002, @Descripcion = 'Encargado de analizar las topologías de redes involucradas en cada proyecto', @IdCreadoPor = 6
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Clientes_Empresas:
Create OR Alter Procedure dbo.Eliminar_Clientes_Empresas
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Clientes_Empresas set IdEstadoRegistro = 2 WHERE IdCliente = @IdCliente
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.Eliminar_Clientes_Empresas @IdCliente = 10
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Clientes_Empresas:
Create OR Alter Procedure dbo.Restaurar_Clientes_Empresas
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Clientes_Empresas set IdEstadoRegistro = 1 WHERE IdCliente = @IdCliente
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.Restaurar_Clientes_Empresas @IdCliente = 10
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla EmpleadosCargos:
Create OR Alter Procedure dbo.Eliminar_EmpleadosCargos
  @IdEmpleado int
AS
BEGIN
  Set Nocount On
  Update EmpleadosCargos set IdEstadoRegistro = 2 WHERE IdEmpleado = @IdEmpleado
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.Eliminar_Clientes_Empresas @IdCliente = 10
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla EmpleadosCargos:
Create OR Alter Procedure dbo.Eliminar_EmpleadosCargos
  @IdEmpleado int
AS
BEGIN
  Set Nocount On
  Update EmpleadosCargos set IdEstadoRegistro = 2 WHERE IdEmpleado = @IdEmpleado
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.Eliminar_Clientes_Empresas @IdCliente = 10
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Clientes_Empresas:
-- Por IdEmpresa
Create OR Alter Procedure dbo.EliminarClientes_Empresas_ByEmpresaId
  @IdEmpresa int
AS
BEGIN
  Set Nocount On
  Update Clientes_Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa = @IdEmpresa
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarClientes_Empresas_ByEmpresaId @IdEmpresa = 7
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Clientes_Empresas:
Create OR Alter Procedure dbo.EliminarClientes_Empresas_ByEmpresasIds
  @EmpresasIds varchar(MAX)
AS
BEGIN
  Set Nocount On
  UPDATE Clientes_Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa IN (SELECT CAST(value AS INT)
  FROM STRING_SPLIT(@EmpresasIds, ','));
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarClientes_Empresas_ByEmpresasIds @EmpresasIds = '7,2,2'
*/



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Empresas:
Create OR Alter Procedure dbo.EliminarEmpresa_ByEmpresasIds
  @EmpresasIds VARCHAR(MAX)
AS
BEGIN
  Set Nocount On
  Update Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa IN (SELECT CAST(value AS INT)
  FROM STRING_SPLIT(@EmpresasIds, ','));
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarEmpresa_ByEmpresasIds @@EmpresasIds = '1,2,3'
*/




GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Empresas:
CREATE OR ALTER PROCEDURE dbo.EliminarEmpresas
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa 
    In (Select CE.IdEmpresa
  From Clientes C INNER JOIN Clientes_Empresas CE ON C.IdCliente = CE.IdCliente
  WHERE C.IdCliente = @IdCliente)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarEmpresas @IdCliente = 10
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Empresas:
CREATE OR ALTER PROCEDURE dbo.RestaurarEmpresas
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Empresas set IdEstadoRegistro = 1 WHERE IdEmpresa 
    In (Select CE.IdEmpresa
  From Clientes C INNER JOIN Clientes_Empresas CE ON C.IdCliente = CE.IdCliente
  WHERE C.IdCliente = @IdCliente)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.RestaurarEmpresas @IdCliente = 10
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Clientes:
Create OR Alter Procedure dbo.EliminarClientes
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Clientes set IdEstadoRegistro = 2 WHERE IdCliente = @IdCliente
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarClientes @IdCliente = 10
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Clientes:
Create OR Alter Procedure dbo.RestaurarClientes
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Clientes set IdEstadoRegistro = 1 WHERE IdCliente = @IdCliente
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarClientes @IdCliente = 10
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Proveedores:
Create OR Alter Procedure dbo.EliminarProveedores
  @IdProveedor int
AS
BEGIN
  Set Nocount On
  Update Proveedores set IdEstadoRegistro = 2 WHERE IdProveedor = @IdProveedor
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarProveedores @IdProveedor = 1
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Empresas por IdProveedor:
Create OR Alter Procedure dbo.EliminarEmpresas_ByIdProveedor
  @IdProveedor int
AS
BEGIN
  Set Nocount On
  Update Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa 
    In (Select PE.IdEmpresa
  From Proveedores P INNER JOIN Proveedores_Empresas PE ON P.IdProveedor = PE.IdProveedor
  WHERE P.IdProveedor = @IdProveedor)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarEmpresas_ByIdProveedor @IdProveedor = 1
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Proveedores_Empresas:
Create OR Alter Procedure dbo.Eliminar_Proveedores_Empresas
  @IdProveedor int
AS
BEGIN
  Set Nocount On
  Update Proveedores_Empresas set IdEstadoRegistro = 2 WHERE IdProveedor = @IdProveedor
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.Eliminar_Proveedores_Empresas @IdProveedor = 1
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Persona por IdProveedor:
Create OR Alter Procedure dbo.EliminarPersonas_ByIdProveedor
  @IdProveedor int
AS
BEGIN
  Set Nocount On
  Update Personas set IdEstadoRegistro =  2 WHERE IdPersona 
    in (Select IdPersona
  FROM Proveedores P INNER JOIN Personas PS ON P.IdPersonaDeContacto = PS.IdPersona
  WHERE P.IdProveedor = @IdProveedor)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarPersonas_ByIdProveedor @IdProveedor = 1
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Personas:
Create OR Alter Procedure dbo.EliminarPersonas
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Personas set IdEstadoRegistro =  2 WHERE IdPersona 
in (Select IdPersona
  FROM Clientes C INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona
  WHERE C.IdCliente = @IdCliente)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarPersonas @IdCliente = 10
*/


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Personas:
Create OR Alter Procedure dbo.RestaurarPersonas
  @IdCliente int
AS
BEGIN
  Set Nocount On
  Update Personas set IdEstadoRegistro =  1 WHERE IdPersona 
in (Select IdPersona
  FROM Clientes C INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona
  WHERE C.IdCliente = @IdCliente)
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarPersonas @IdCliente = 10
*/ 


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Empresas:
Create OR Alter Procedure dbo.EliminarEmpresa_ByEmpresaId
  @IdEmpresa int
AS
BEGIN
  Set Nocount On
  Update Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa = @IdEmpresa
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarEmpresa_ByEmpresaId @IdEmpresa = 7
*/
GO

/*Algunas insersiones de datos:*/

-- Insertar datos en la tabla EstadosRegistros:
INSERT INTO EstadosRegistros
  (NombreEstado)
VALUES
  ('Activo'),
  ('Inactivo');
--Select * From EstadosRegistros



-- Insertar datos en la tabla Roles
INSERT INTO Roles
  (NombreRol, IdEstadoRegistro)
VALUES
  ('Administrador', 1),
  ('Administrador De Usuario', 1),
  ('Asistente Administrativo', 1),
  ('Asistente', 1);

-- Insertar datos en la tabla Usuarios
INSERT INTO Usuarios
  (NombreUsuario, Correo, Contraseña, IdRol, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('gregory01', 'greg@gestnett.com', '123', 1, 1, GETDATE(), 1, GETDATE(), 1),
  ('carlos01', 'carlos@gestnett.com', '123', 2, 1, GETDATE(), 1, GETDATE(), 1),
  ('joselo01', 'joselo@gestnett.com', '123', 2, 1, GETDATE(), 1, GETDATE(), 1),
  ('cristian01', 'cristiano@gestnett.com', '123', 3, 1, GETDATE(), 1, GETDATE(), 1),
  ('pedro01', 'pedro@gestnett.com', '123', 4, 1, GETDATE(), 1, GETDATE(), 1),
  ('juan01andres', 'juan@gestnett.com', '123', 1, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Usuarios

-- Insertar datos en la tabla Sexos
INSERT INTO Sexos
  (SexoNombre, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Masculino', 1, GETDATE(), 1, GETDATE(), 1),
  ('Femenino', 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Sexos



-- Insertar datos en la tabla Paises
INSERT INTO Paises
  (PaisNombre, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('República Dominicana', 1, GETDATE(), 1, GETDATE(), 1),
  ('Estados Unidos', 1, GETDATE(), 1, GETDATE(), 1);
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
-- Insertar datos en la tabla Personas:
INSERT INTO Personas
  (Nombres, Apellidos, Telefono1, Telefono2, Direccion, Correo, Edad, FechaDeNacimiento, Cedula, IdSexo, IdCiudad, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/('Juan José', 'Pérez Melindo', '809-123-4567', '809-987-6543', 'Bo. Santa fé, Calle 1, #26', 'juan@gmail.com', 30, '1993-05-15', '001-1234567-8', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('María Lola', 'González Ruíz', '809-111-2222', '809-333-4444', 'Bo. La luz, calle 2, #40', 'maria@gmail.com', 25, '1998-08-10', '002-2345678-9', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Emenejildo', 'Santana Cruz', '809-098-1010', '809-222-5555', 'Bo. La estrellita, calle 3, #10', 'emels@outlook.com', 25, '1998-08-10', '402-2040608-9', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('Ignacio Alex', 'Lopez Severino', '829-345-1345', '809-409-0197', 'Bo. Castañuela, calle 4 #20', 'alexig@hotmail.com', 25, '1998-08-10', '402-1234568-0', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('Maribel Ana', 'De la Rosa', '809-232-9876', '809-209-1076', 'Bo. Concepción, calle 5, #9', 'anamaria@gmail.com', 25, '1998-08-10', '402-1041111-9', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('María Eugenia', 'Gómez Fernández', '809-234-5678', '809-876-5432', 'Bo. Pueblo Nuevo, Calle 2, #15', 'mariaeugenia@gmail.com', 28, '1995-11-22', '002-8765432-1', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('Luis Miguel', 'Hernández Rodríguez', '809-345-6789', '809-987-6543', 'Bo. El Paraíso, Calle 5, #10', 'luismiguel@gmail.com', 35, '1986-09-10', '003-3456789-1', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('Ana Gabriela', 'González Soto', '809-456-7890', '809-321-6547', 'Bo. Las Flores, Calle 8, #20', 'anagabriela@gmail.com', 27, '1996-07-12', '004-4567890-2', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/('Carlos Andrés', 'López Ramírez', '809-567-8901', '809-234-5678', 'Bo. Los Alamos, Calle 12, #30', 'carloslopez@gmail.com', 32, '1989-03-25', '005-5678901-3', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/('María Fernanda', 'Guzmán Peña', '809-678-9012', '809-345-6789', 'Bo. El Carmen, Calle 20, #5', 'mariafernanda@gmail.com', 29, '1994-12-08', '006-6789012-4', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*11*/('Luis Alberto', 'Hernández Rodríguez', '809-890-1234', '809-456-7890', 'Bo. Los Jardines, Calle 30, #15', 'luis.hernandez@gmail.com', 35, '1988-09-20', '007-8901234-5', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*12*/('Laura', 'Gómez Martínez', '809-234-5678', '809-678-9012', 'Bo. Los Robles, Calle 5, #10', 'laura.gomez@gmail.com', 28, '1995-11-12', '008-2345678-6', 2, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*13*/('Carlos', 'Santana López', '809-345-6789', '809-890-1234', 'Bo. Los Alamos, Calle 15, #8', 'carlos.santana@gmail.com', 32, '1989-07-20', '009-3456789-7', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*14*/('Crisencio', 'Sinmi Ruiz', '829-333-1010', '849-202-2620', 'Bo. Los Guilamos, Calle 13, #9', 'sinmi.ruiz@gmail.com', 33, '1985-03-21', '113-2224444-8', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*15*/('Jolio', 'Carmuel Joanl', '849-103-1299', '829-112-1631', 'Bo. Los Casiz, Calle 11, #90', 'carmuel.joanl@gmail.com', 33, '1995-03-21', '100-0224040-1', 1, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*16*/('Juan', 'Pérez', '849-555-1234', '809-505-5678', 'Calle Principal 123', 'juan.perez@example.com', 30, '1992-05-10', '1234567890123', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*17*/('Maria', 'López', '849-555-4321', '809-505-5678', 'Avenida Central 456', 'maria.lopez@example.com', 28, '1994-09-18', '9876543210987', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*18*/('Alvarez', 'Cruz Filip', '809-055-5078', '829-050-5021', 'Calle Secundaria 789', 'pedro.rodriguez@example.com', 35, '1987-12-03', '4567890123456', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*19*/('Ana Lia', 'Gómez Lopez', '809-555-8765', '829-555-9071', 'Carrera Principal 321', 'ana.gomez@example.com', 42, '1980-07-22', '7890123456789', 2, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*20*/('Sofia Sael', 'García Moreno', '849-535-1010', '829-515-9292', 'Avenida Norte 789', 'sofia.garcia@example.com', 31, '1991-03-27', '3456789012345', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*21*/('Joeli', 'Sabino', '829-312-3303', '809-505-1292', 'Calle Oeste 567', 'carlos.martinez@example.com', 29, '1993-08-14', '5678901234567', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*22*/('Juan Andrés', 'César Jiménez', '829-836-3523', '809-650-5069', 'Villa 1 Calle Anthurias', 'juancj@gmail.com', 22, '2001-02-26', '1600000234567', 1, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*23*/('Gregory Albert', 'Sanchez', '809-806-3003', '829-659-5869', 'Vlla 3 Calle C', 'greg@gmai.com', 22, '2001-06-28', '1611110234567', 1, 3, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Personas


 
 GO
-- Insertar datos en la tabla Empresas:
INSERT INTO Empresas
  (NombreEmpresa, RNC, Correo, Teléfono1, Teléfono2, SitioWeb, Dirección, IdCiudad, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/('José Inversiones', '123456789', 'joseinv@hotmail.com', '809-111-1111', '809-222-2222', 'https://www.joseinv.com', 'Bo. Villa Cruz, calle 1, #26', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('Ferreteria María', '987654321', 'ferrema@gmail.com', '809-333-3333', '809-444-4444', 'https://www.ferrema.com', 'Bo. Villa navarro, calle 2, #30', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Banco Veracruz', '023454321', 'bancoveracruz@outlook.com', '809-554-2424', '809-321-1212', 'https://www.bancoveracruz.com', 'Bo. Vista Hermosa, calle 4, #31', 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('Tienda Ignacio', '123333320', 'ignacioshop@outlook.com', '829-222-1113', '809-309-4343', 'https://www.shopignacio.com', 'Bo. Consuelito, calle 5, #30', 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('Gym Mari', '234568091', 'gymmariana@outlook.com', '829-333-5590', '809-901-1234', 'https://www.gymmaria.com', 'Bo. nuñez 1, calle 7, #60', 4, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('María Construcciones', '987654321', 'mariaconstruct@gmail.com', '809-555-1234', '809-888-9999', 'https://www.mariaconstruct.com', 'Bo. Los Pinos, Calle 3, #8', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('Luis Consultores', '987654123', 'luisconsult@gmail.com', '809-222-3333', '809-444-5555', 'https://www.luisconsult.com', 'Bo. Las Palmas, Calle 6, #12', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('Ana Servicios', '987654987', 'anaserv@gmail.com', '809-777-8888', '809-999-0000', 'https://www.anaserv.com', 'Bo. Los Jardines, Calle 10, #5', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/('López Construcciones', '987654789', 'lopezconstruc@gmail.com', '809-333-4444', '809-555-6666', 'https://www.lopezconstruc.com', 'Bo. Los Pinos, Calle 15, #40', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/('Guzmán Arquitectura', '987654321', 'guzmanarq@gmail.com', '809-777-8888', '809-999-0000', 'https://www.guzmanarq.com', 'Bo. Los Almendros, Calle 25, #10', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*11*/('Hernández Ingeniería', '987654123', 'hernandezing@gmail.com', '809-111-2222', '809-333-4444', 'https://www.hernandezing.com', 'Bo. Los Pinos, Calle 10, #20', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*12*/('Gómez Arquitectos', '987654987', 'gomezarq@gmail.com', '809-111-3333', '809-444-5555', 'https://www.gomezarq.com', 'Bo. Los Pinos, Calle 8, #15', 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*13*/('Santana Construcciones', '987654321', 'santanaconstruc@gmail.com', '809-222-3333', '809-444-5555', 'https://www.santanaconstruc.com', 'Bo. Los Jardines, Calle 10, #25', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*14*/('Crisencio Baterias', '001340009', 'bateriascris@gmail.com', '829-201-3103', '849-303-1503', 'https://www.bateriascris.com', 'Bo. Los Rulos, Calle 11, #23', 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*15*/('Carmuel Prestamos', '566649912', 'prestamoscarmuel@gmail.com', '849-221-2191', '809-220-1117', 'https://www.prestamoscarmuel.com', 'Bo. Las Raiz, Calle 09, #11', 2, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Empresas



GO
-- Insertar datos en la tabla Clientes:
INSERT INTO Clientes
  (IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/(1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/(2, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/(3, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/(4, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/(5, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/(6, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/(7, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/(8, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/(9, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/(10, 1, GETDATE(), 1, GETDATE(), 1);



GO
-- Insertar datos en la tabla Clientes_Empresas:
INSERT INTO Clientes_Empresas
  (IdCliente, IdEmpresa, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/(1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/(2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/(3, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/(4, 4, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/(5, 5, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/(6, 6, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/(7, 7, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/(8, 8, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/(9, 9, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/(10, 10, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Clientes_Empresas



-- Insertar datos en la tabla EstadoProveedores:
Insert Into EstadoProveedores
  (EstadoNombre, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Proveedor estandar', 1, GETDATE(), 1, GETDATE(), 1);
--
Insert Into EstadoProveedores
  (EstadoNombre, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  ('Proveedor Principal', 1, GETDATE(), 1, GETDATE(), 1);


GO
-- Insertar datos en la tabla Proveedores:
Insert Into Proveedores
  (IdEstadoProveedor, IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*11*/(1, 11, 1, GETDATE(), 1, GETDATE(), 1),
  /*12*/(1, 12, 1, GETDATE(), 1, GETDATE(), 1),
  /*13*/(1, 13, 1, GETDATE(), 1, GETDATE(), 1),
  /*14*/(1, 14, 1, GETDATE(), 1, GETDATE(), 1),
  /*15*/(1, 15, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Proveedores


GO
-- Insertar datos en la tabla Proveedores_Empresas:
INSERT INTO Proveedores_Empresas
  (IdProveedor, IdEmpresa, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*11*/(1, 11, 1, GETDATE(), 1, GETDATE(), 1),
  /*12*/(2, 12, 1, GETDATE(), 1, GETDATE(), 1),
  /*13*/(3, 13, 1, GETDATE(), 1, GETDATE(), 1),
  /*14*/(4, 14, 1, GETDATE(), 1, GETDATE(), 1),
  /*15*/(5, 15, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Proveedores_Empresas
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


--  Insertar datos en la tabla Empleados:
INSERT INTO Empleados
  (FechadDeContratación, IdPersona, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/('2021-01-11', 16, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('2022-02-12', 17, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('2020-03-13', 18, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('2021-01-11', 19, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('2022-04-13', 20, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('2020-05-14', 21, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('2022-05-14', 22, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('2023-01-14', 23, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * from Empleados
GO


--  Insertar datos en la tabla EmpleadosCargos:
INSERT INTO EmpleadosCargos
  (IdEmpleado, IdCargo, Descripción, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
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
-- Asignar usuarios a los empleados:
Update Usuarios set IdEmpleado = 7 WHERE IdUsuario = 6
GO
Update Usuarios set IdEmpleado = 8 WHERE IdUsuario = 1



GO
-- Insertar datos en la tabla Unidades de Medida:
INSERT INTO UnidadesDeMedida
  (UnidadNombre, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Unidades', 1, GETDATE(), 1),
  /*2*/('Piezas', 1, GETDATE(), 1),
  /*3*/('Metros', 1, GETDATE(), 1),
  /*4*/('Rollos', 1, GETDATE(), 1);
-- Select * FROM UnidadesDeMedida


GO
-- Insertar datos en la tabla Estados (Estados-Productos):
INSERT INTO Estados
  (EstadoNombre, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
VALUES
  /*1*/('Sin entradas', 1, GETDATE(), 1),
  /*2*/('Existente', 1, GETDATE(), 1),
  /*3*/('Agotado', 1, GETDATE(), 1);
-- Select * FROM Estados


GO
-- INSETAR EN LA TABLA PRODUCTOS
INSERT INTO Productos
  (Nombre, Codigo, Descripción, Modelo, PrecioCosto, PrecioVenta, ITBIS, IdUnidad_DeMedida, IdEstado, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/('Router WiFi AC2000', 'RWAC-20', 'Router inalámbrico de alta velocidad AC2000', 'AC2000', 50.00, 80.00, 18.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('Switch Gigabit 24 puertos', 'SG-24P', 'Switch de red con 24 puertos Gigabit', 'SG24', 45.00, 75.00, 18.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Access Point Dual Band', 'APDBA', 'Punto de acceso inalámbrico dual band', 'AP-DB', 90.00, 100.00, 19.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('Cable Ethernet Cat 6', 'CEC-6S', 'Cable de red Ethernet categoría 6', 'CAT6-1M', 120.00, 190.00, 10.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('Enrutador 4G LTE', 'E-4GLTE', 'Enrutador con soporte para redes móviles 4G LTE', 'LTE-R1', 140.00, 160.00, 11.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('Switch PoE 8 puertos', 'SP-8PSP', 'Switch con 8 puertos PoE para alimentar dispositivos', 'PoE-S8', 125.00, 140.00, 15.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('Antena Direccional 2.4GHz', 'AD-2AD', 'Antena direccional para redes inalámbricas 2.4GHz', 'ANT-24D', 185.00, 195.00, 12.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('Cámara IP HD', 'CIHDD', 'Cámara de seguridad IP con resolución HD', 'CAM-HD', 145.00, 150.00, 18.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/('Repetidor WiFi', 'RWIFI', 'Repetidor inalámbrico para extender la señal WiFi', 'REP-WF', 175.00, 180.00, 12.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/('Firewall Empresarial', 'FESEC', 'Firewall de seguridad para redes empresariales', 'FIRE-ENT', 115.00, 130.00, 12.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*11*/('Puertos CA', 'PCAAE', 'Puerts RJ45 con seguridad integrada', 'FIRE-ENT', 115.00, 130.00, 12.00, 1, 1, 1, GETDATE(), 1, GETDATE(), 1);
-- Select * FROM Productos


GO
-- Insertar en la tabla Inventarios:
INSERT INTO Inventarios
  (Descripcion, Codigo, CantidadDisponible, IdProducto, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/('Routers AC2000 (La mejor calidad)', 'RAC000', 0, 1, 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('Switches G24P (Regular)', 'SGP000', 0, 2, 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Access Point DB (Estable)', 'APD001', 0, 3, 1, GETDATE(), 1, GETDATE(), 1),
  /*4*/('Cable Ethernet C6 (Reforzado)', 'CEC000', 0, 4, 1, GETDATE(), 1, GETDATE(), 1),
  /*5*/('Enrutador 4G LTE (La mejor calidad)', 'E4G000', 0, 5, 1, GETDATE(), 1, GETDATE(), 1),
  /*6*/('Swich 8P (La mejor calidad)', 'SP8000', 0, 6, 1, GETDATE(), 1, GETDATE(), 1),
  /*7*/('Antena direccional (La mejor calidad)', 'AD000', 0, 7, 1, GETDATE(), 1, GETDATE(), 1),
  /*8*/('Camara IP (La mejor calidad)', 'CIP000', 0, 8, 1, GETDATE(), 1, GETDATE(), 1),
  /*9*/('Repetidor Wifi (Bueno)', 'RW0000', 0, 9, 1, GETDATE(), 1, GETDATE(), 1),
  /*10*/('Firewall Empresarial (La mejor calidad)', 'FE0001', 0, 10, 1, GETDATE(), 1, GETDATE(), 1),
  /*11*/('Puertos CA (La mejor calidad)', 'PC0001', 0, 11, 1, GETDATE(), 1, GETDATE(), 1);



GO
-- INSERTAR DATOS EN LA TABLA EstadosFacturas:
INSERT INTO EstadosFacturas
  (NombreEstadoFactura, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/('Pagada', 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/('Pagos pendientes', 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/('Sin pagos', 1, GETDATE(), 1, GETDATE(), 1);



GO
-- INSERTAR DATOS EN LA TABLA FACTURAS_PROVEEDORES
-- FACTURA #1:
INSERT INTO FacturasProveedores
  (Fecha, MontoTotal, MontoRestante, NCF, IdEstadoFactura, IdProveedor, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/(GETDATE(), 13825, 0, 'NCF123450', 1, 1, 1, GETDATE(), 1, GETDATE(), 1),
  -- FACTURA #2:
  /*2*/(GETDATE(), 21200, 7.200, 'NCF003450', 2, 2, 1, GETDATE(), 1, GETDATE(), 1),
  -- FACTURA #3:
  /*3*/(GETDATE(), 16350, 16350, 'NCF103350', 1, 3, 1, GETDATE(), 1, GETDATE(), 1);


GO
-- INSERTANDO DATOS EN LA TABLA ENTRADAS:
INSERT INTO Entradas
  (IdProducto, IdFactura, IdInventario, CodigoDeSeguimiento, Fecha, Cantidad, ITBIS, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  -- TOTAL: 1600 + 1125 + 3500 + 7600 = 13825
  (1, 1, 1, 'ERAC00010', GETDATE(), 20, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (2, 1, 2, 'ESGP00012', GETDATE(), 15, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (3, 1, 3, 'APD000112', GETDATE(), 35, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (4, 1, 4, 'ACEC00012', GETDATE(), 40, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  -- TOTAL: 6400 + 2800 + 9750 + 2250 = 21200
  (5, 2, 5, 'E4G000123', GETDATE(), 40, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (6, 2, 6, 'ESP800012', GETDATE(), 20, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (7, 2, 7, 'EAD000A21', GETDATE(), 50, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (8, 2, 8, 'ECIP00013', GETDATE(), 15, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  -- TOTAL: 5400 + 4450 + 6500 = 16350
  (9, 3, 9, 'ECIP00013', GETDATE(), 30, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (10, 3, 10, 'ECIP00013', GETDATE(), 35, 0.5, 1, GETDATE(), 1, GETDATE(), 1),
  (11, 3, 11, 'ECIP00013', GETDATE(), 50, 0.5, 1, GETDATE(), 1, GETDATE(), 1)


-- Modificacion de la cantidad disponible en inventario:
UPDATE Inventarios SET CantidadDisponible = 20 WHERE IdInventario = 1
UPDATE Inventarios SET CantidadDisponible = 15 WHERE IdInventario = 2
UPDATE Inventarios SET CantidadDisponible = 35 WHERE IdInventario = 3
UPDATE Inventarios SET CantidadDisponible = 40 WHERE IdInventario = 4
--
UPDATE Inventarios SET CantidadDisponible = 40 WHERE IdInventario = 5
UPDATE Inventarios SET CantidadDisponible = 20 WHERE IdInventario = 6
UPDATE Inventarios SET CantidadDisponible = 50 WHERE IdInventario = 7
UPDATE Inventarios SET CantidadDisponible = 15 WHERE IdInventario = 8
--
UPDATE Inventarios SET CantidadDisponible = 30 WHERE IdInventario = 9
UPDATE Inventarios SET CantidadDisponible = 35 WHERE IdInventario = 10
UPDATE Inventarios SET CantidadDisponible = 50 WHERE IdInventario = 11

-- Modificacion del estado en inventario:
UPDATE Productos SET IdEstado = 2 WHERE IdProducto <= 11


GO
-- INSERTANDO DATOS EN LA TABLA PagosProveedores:
INSERT INTO PagosProveedores
  (MontoPago, FechaPago, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  /*1*/(13825, GETDATE(), 1, GETDATE(), 1, GETDATE(), 1),
  /*2*/(7000, GETDATE(), 1, GETDATE(), 1, GETDATE(), 1),
  /*3*/(7000, GETDATE(), 1, GETDATE(), 1, GETDATE(), 1)


GO
-- INSERTANDO DATOS EN LA TABLA PagosFacturasProveedores
INSERT INTO PagosFacturasProveedores
  (IdFactura, IdPago, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
VALUES
  (1, 1, 6, GETDATE(), 1, GETDATE(), 1),
  (2, 2, 6, GETDATE(), 1, GETDATE(), 1),
  (2, 3, 6, GETDATE(), 1, GETDATE(), 1)




GO
-- Procedimiento para Obtener usuario y loguear:
CREATE OR ALTER PROCEDURE dbo.GetUsuarioLogin
  @NombreUsuario varchar(30),
  @Contraseña varchar(30)
AS
BEGIN
  SET NOCOUNT ON
  SELECT IdUsuario, NombreUsuario, Correo, Contraseña, NombreRol
  FROM Usuarios U INNER JOIN Roles R ON U.IdRol = R.IdRol
  WHERE NombreUsuario = @NombreUsuario AND Contraseña = @Contraseña
END


GO
-- PROCEDIMIENTO ALMACENADO PARA OBTENER EMPRESAS POR IDCLIENTE:
Create OR ALTER PROCEDURE dbo.GetEmpresasByClienteId
  (
  @ClienteId int,
  @estadoId int
)
AS
BEGIN
  Select E.IdEmpresa, NombreEmpresa, RNC, Correo, E.Teléfono1, E.Teléfono2, SitioWeb, E.Dirección, C.IdCiudad, P.IdPais
  FROM Empresas E INNER JOIN Ciudades C ON E.IdCiudad = C.IdCiudad
    INNER JOIN Paises P ON C.IdPais = P.IdPais
    INNER JOIN Clientes_Empresas CE ON E.IdEmpresa = CE.IdEmpresa
    INNER JOIN Clientes Cli ON CE.IdCliente = Cli.IdCliente
  WHERE Cli.IdCliente = @clienteId AND (@estadoId = 0 OR CE.IdEstadoRegistro = @estadoId)
END
-- EXEC dbo.GetEmpresasByClienteId @clienteId = 1, @estadoId = 1



GO
-- PROCEDIMIENTO ALMACENAD PARA OBTENER LISTADO BASICO DE INFORMACION DE USUARIO (PERFIL) - Por IdUsuario
Create or alter procedure dbo.InformacionBasicaUsuario_ByIdUsuario
  (@IdUsuario int)
AS
BEGIN
  Select IdUsuario, NombreUsuario, U.Correo, NombreRol, R.IdRol, E.IdEmpleado, Nombres, Apellidos, Cedula, Direccion, Edad, FechaDeNacimiento
  FROM Usuarios U INNER JOIN Empleados E ON U.IdEmpleado = E.IdEmpleado
    INNER JOIN Personas P ON E.IdPersona = P.IdPersona
    INNER JOIN Roles R ON U.IdRol = R.IdRol
  WHERE IdUsuario = @IdUsuario
END
-- exec dbo.InformacionBasicaUsuario_ByIdUsuario @IdUsuario = 6



GO
-- PROCEDIMIENTO ALMACENAD PARA OBTENER LISTADO BASICO DE INFORMACION DE USUARIO (PERFIL) - GetAll
Create or alter procedure dbo.Lista_InformacionBasicaUsuarios_GetAll
AS
BEGIN
  Select IdUsuario NombreUsuario, P.Correo, NombreRol, R.IdRol, E.IdEmpleado, Nombres, Apellidos, Cedula, Direccion, Edad, FechaDeNacimiento
  FROM Usuarios U INNER JOIN Empleados E ON U.IdEmpleado = E.IdEmpleado
    INNER JOIN Personas P ON E.IdPersona = P.IdPersona
    INNER JOIN Roles R ON U.IdRol = R.IdRol
END
-- exec dbo.Lista_InformacionBasicaUsuarios_GetAll



GO
-- PROCEDIMIENTO ALMACENAD PARA OBTENER LISTA DE CARGOS POR EmpleadoId
Create or alter procedure dbo.CargosEmpleado_ByEmpleadoId
  (@IdEmpleado int)
AS
BEGIN
  Select C.IdCargo, NombreCargo
  FROM Cargos C INNER JOIN EmpleadosCargos EC ON C.IdCargo = EC.IdCargo
  WHERE EC.IdEmpleado = @IdEmpleado
END
-- Exec dbo.CargosEmpleado_ByEmpleadoId @IdEmpleado = 7


/* --- GREGORY --- --- GREGORY --- --- GREGORY --- --- GREGORY --- --- GREGORY --- --- GREGORY --- --- GREGORY --- --- GREGORY ---*/

---Activar cargo
GO
Create OR Alter Procedure dbo.Restaurar_Cargo_Empleado
    @IdEmpleado int
AS
BEGIN
    Set Nocount On
    Update EmpleadosCargos set IdEstadoRegistro = 1 WHERE IdEmpleado = @IdEmpleado
END



GO
---Activar persona via empleado
Create OR Alter Procedure dbo.RestaurarPersonasEmpleado
    @IdEmpleado  int
AS
BEGIN
    Set Nocount On
    Update Personas set IdEstadoRegistro =  1 WHERE IdPersona 
in (Select P.IdPersona
    FROM Empleados C INNER JOIN Personas P ON C.IdPersona = P.IdPersona
    WHERE C.IdEmpleado = @IdEmpleado )
END



GO
---Desactivar empleado via persona 
Create OR Alter Procedure dbo.EliminarPersonasEmpleado
    @IdEmpleado int
AS
BEGIN
    Set Nocount On
    Update Personas set IdEstadoRegistro =  2 WHERE IdPersona 
in (Select P.IdPersona
    FROM Empleados C INNER JOIN Personas P ON C.IdPersona = P.IdPersona
    WHERE C.IdEmpleado = @IdEmpleado)
END



GO
--Desactivar Empleado
Create OR Alter Procedure dbo.EliminarEmpleados
    @IdEmpleado int
AS
BEGIN
    Set Nocount On
    Update Empleados set IdEstadoRegistro = 2 WHERE IdEmpleado = @IdEmpleado
END



GO
-- Procedure para Obtener la lista de empleados:
CREATE OR ALTER PROCEDURE dbo.ListadoEmpleadoV2
AS
BEGIN
    SET NOCOUNT ON

    SELECT
        C.IdEmpleado, P.IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, P.Correo, Edad, 
        FechaDeNacimiento, Cedula, P.IdSexo, SexoNombre, P.IdCiudad, CiudadNombre, PA.IdPais, PaisNombre, 
        ER.IdEstadoRegistro, ER.NombreEstado,
        -- Obtener la lista de cargos de empleado
        (
            SELECT
            EC.IdCargo AS 'IdCargo',
            EC.Descripción AS 'Descripcion',
            (
                    SELECT
                CE2.NombreCargo AS 'NombreCargo'
            FROM Cargos CE2
            WHERE CE2.IdCargo = EC.IdCargo
                ) AS 'NombreCargo'
        FROM EmpleadosCargos EC
            INNER JOIN Cargos CE ON EC.IdCargo = CE.IdCargo
        WHERE EC.IdEmpleado = C.IdEmpleado
        FOR JSON PATH
        ) AS 'CargoEmpleadoDTOsJson'
    FROM Empleados C
        INNER JOIN Personas P ON C.IdPersona = P.IdPersona
        INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
        INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
        INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
        INNER JOIN EstadosRegistros ER ON C.IdEstadoRegistro = ER.IdEstadoRegistro
END
/*EJECUCION DE PROCEDIMIENTO: Execute dbo.ListadoEmpleadoV2 */



GO
--- Buscar empleado por id y traer toda su informacion
CREATE OR ALTER PROCEDURE dbo.GetPersonaInfoByIdEmpleado
    (@Id int)
AS
BEGIN
    SET NOCOUNT ON
    SELECT
        C.IdEmpleado,
        P.IdPersona,
        Nombres,
        Apellidos,
        Telefono1,
        Telefono2,
        Direccion,
        P.Correo,
        Edad,
        FechaDeNacimiento,
        Cedula,
        P.IdSexo,
        SexoNombre,
        P.IdCiudad,
        CiudadNombre,
        PA.IdPais,
        PaisNombre,
        ER.IdEstadoRegistro,
        ER.NombreEstado,
        -- Obtener la lista de cargos de empleado
        (
            SELECT
            EC.IdCargo AS 'IdCargo',
            EC.Descripción AS 'Descripcion',
            (
                    SELECT
                CE2.NombreCargo AS 'NombreCargo'
            FROM Cargos CE2
            WHERE CE2.IdCargo = EC.IdCargo
                ) AS 'NombreCargo'
        FROM EmpleadosCargos EC
            INNER JOIN Cargos CE ON EC.IdCargo = CE.IdCargo
        WHERE EC.IdEmpleado = C.IdEmpleado
        FOR JSON PATH
        ) AS 'CargoEmpleadoDTOsJson'
    FROM Empleados C
        INNER JOIN Personas P ON C.IdPersona = P.IdPersona
        INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
        INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
        INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
        INNER JOIN EstadosRegistros ER ON C.IdEstadoRegistro = ER.IdEstadoRegistro
    WHERE C.IdEmpleado = @Id
END
-- EXEC dbo.GetPersonaInfoByIdEmpleado @Id = 21



GO
-- Procedure para ver los cargos disponible 
Create or alter procedure dbo.CargoEmpleadoVer
AS
BEGIN
    SET NOCOUNT ON
    select IdCargo, NombreCargo
    from Cargos
END
Exec dbo.CargoEmpleadoVer




GO
-- Obtener cargos del empleado:
CREATE or ALTER PROCEDURE [dbo].[GetCargoEmpleados]
    (
    @IdEmpleado int,
    @estadoId int
)
AS
BEGIN
    Select e.IdCargo, ce.Descripción as Descripcion
    FROM Cargos E
        INNER JOIN EmpleadosCargos CE ON E.IdCargo = CE.IdCargo
        INNER JOIN Empleados Cli ON CE.IdEmpleado = Cli.IdEmpleado
    WHERE Cli.IdEmpleado =  @IdEmpleado AND (@estadoId = 0 OR CE.IdEstadoRegistro = @estadoId)
END
GO
-- exec GetCargoEmpleados @IdEmpleado = 7 , @estadoId = 1




GO
-- Actualizar empleados cargos:
Create or Alter procedure dbo.ActualizarEmpleadosCargos
    @IdEmpleado int,
    @IdCargo int,
    @Descripcion varchar(100),
    @IdModificadoPor int
AS
BEGIN
    Set nocount On
    Update EmpleadosCargos SET IdCargo = @IdCargo, Descripción = @Descripcion, @IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE()
	  WHERE IdEmpleado = @IdEmpleado
END




GO
-- INSERTAR EMPLEADOS Cargos:
Create or Alter procedure dbo.Insertar_EmpleadosCargos
    @IdEmpleado int,
    @IdCargo int,
    @Descripcion varchar(100),
    @IdCreadoPor int
AS
BEGIN
    Set nocount On
    Insert Into EmpleadosCargos
        (IdEmpleado, IdCargo, Descripción, IdCreadoPor, IdEstadoRegistro)
    VALUES(@IdEmpleado, @IdCargo, @Descripcion, @IdCreadoPor, 1)
END



GO
-- PROCEDIMIENTO ALMACENADO PARA OBTENER EMPRESAS POR IDCLIENTE:
ALTER   PROCEDURE [dbo].[GetEmpresasByClienteId]
(
@ClienteId int,
@estadoId int
)
AS
BEGIN
    Select E.IdEmpresa, NombreEmpresa, RNC, Correo, E.Teléfono1, E.Teléfono2, SitioWeb, E.Dirección, C.IdCiudad, P.IdPais, C.CiudadNombre, P.PaisNombre
	FROM Empresas E INNER JOIN Ciudades C ON E.IdCiudad = C.IdCiudad
	                INNER JOIN Paises P ON C.IdPais = P.IdPais
					INNER JOIN Clientes_Empresas CE ON E.IdEmpresa = CE.IdEmpresa
					INNER JOIN Clientes Cli ON CE.IdCliente = Cli.IdCliente
	WHERE Cli.IdCliente = @clienteId AND (@estadoId = 0 OR CE.IdEstadoRegistro = @estadoId)
END
 -- EXEC dbo.GetEmpresasByClienteId @clienteId = 1, @estadoId = 1














GO

CREATE OR ALTER PROCEDURE dbo.ListadoProveedores
AS
BEGIN
    SET NOCOUNT ON 
        SELECT C.IdProveedor, P.IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, P.Correo, Edad, FechaDeNacimiento, 
		       Cedula, P.IdSexo, SexoNombre, P.IdCiudad, CiudadNombre, PA.IdPais, PaisNombre, ER.IdEstadoRegistro, ER.NombreEstado
        FROM Proveedores C
        INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona 
        INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
        INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
        INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
		INNER JOIN EstadosRegistros ER ON C.IdEstadoRegistro = ER.IdEstadoRegistro
END
go
CREATE OR ALTER PROCEDURE dbo.GetPersonaInfoByIdProveedor
(@IdProveedor int)
AS
BEGIN
    SET NOCOUNT ON 
        SELECT C.IdProveedor, P.IdPersona, Nombres, Apellidos, Telefono1, Telefono2, Direccion, P.Correo, Edad, FechaDeNacimiento, 
		       Cedula, P.IdSexo, SexoNombre, P.IdCiudad, CiudadNombre, PA.IdPais, PaisNombre, ER.IdEstadoRegistro, ER.NombreEstado
        FROM Proveedores C
        INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona 
        INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
        INNER JOIN Ciudades CU ON P.IdCiudad = CU.IdCiudad
        INNER JOIN Paises PA ON CU.IdPais = PA.IdPais
		INNER JOIN EstadosRegistros ER ON C.IdEstadoRegistro = ER.IdEstadoRegistro
		WHERE C.IdProveedor = @IdProveedor
END

go
---insertar empresa pero con proveedores
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Proveedores_Empresas: --
Create or Alter procedure dbo.Insertar_Proveedor_Empresa
  @IdProveedor int,
  @IdEmpresa int,
  --
  @IdCreadoPor int,
  @FechaCreacion Datetime,
  @IdModificadoPor int,
  @FechaModificacion Datetime,
  @IdEstadoRegistro int
  AS
  BEGIN
      Set nocount On
	  Insert Into Proveedores_Empresas(IdProveedor, IdEmpresa, IdCreadoPor, FechaCreacion, IdModificadoPor, FechaModificacion, IdEstadoRegistro)
				         VALUES(@IdProveedor, @IdEmpresa, @IdCreadoPor, GETDATE(), @IdModificadoPor, GETDATE(), @IdEstadoRegistro)
END


go
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para activar en la tabla Proveedores:
Create OR Alter Procedure dbo.RestaurarProveedores
@IdProveedor int
AS 
BEGIN
    Set Nocount On
    Update Proveedores set IdEstadoRegistro = 1 WHERE IdProveedor = @IdProveedor
END


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para activar en la tabla Empresas por IdProveedor:
Create OR Alter Procedure dbo.RestaurarEmpresas_ByIdProveedor
@IdProveedor int
AS 
BEGIN
    Set Nocount On
    Update Empresas set IdEstadoRegistro = 1 WHERE IdEmpresa 
    In (Select PE.IdEmpresa From Proveedores P INNER JOIN Proveedores_Empresas PE ON P.IdProveedor = PE.IdProveedor 
	     WHERE P.IdProveedor = @IdProveedor)
END


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para activar en la tabla Proveedores_Empresas:
Create OR Alter Procedure dbo.Restaurar_Proveedores_Empresas
@IdProveedor int
AS 
BEGIN
    Set Nocount On
    Update Proveedores_Empresas set IdEstadoRegistro = 1 WHERE IdProveedor = @IdProveedor
END


go

---Activar persona via 

Create OR Alter Procedure dbo.RestaurarPersonasProveedor
@IdProveedor  int
AS 
BEGIN
    Set Nocount On
    Update Personas set IdEstadoRegistro =  1 WHERE IdPersona 
in (Select P.IdPersona FROM Proveedores C INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona WHERE C.IdProveedor = @IdProveedor )
END
go



---desactivar persona vinculada a proveedor
Create OR Alter Procedure dbo.EliminarPersonas_ByIdProveedor
@IdProveedor  int
AS 
BEGIN
    Set Nocount On
     Update Personas set IdEstadoRegistro =  2 WHERE IdPersona 
in (Select P.IdPersona FROM Proveedores C INNER JOIN Personas P ON C.IdPersonaDeContacto = P.IdPersona WHERE C.IdProveedor = @IdProveedor)
END
go


go
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Proveedores:
Create OR Alter Procedure dbo.EliminarProveedores
@IdProveedor int
AS 
BEGIN
    Set Nocount On
    Update Proveedores set IdEstadoRegistro = 2 WHERE IdProveedor = @IdProveedor
END

GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Empresas por IdProveedor:
Create OR Alter Procedure dbo.EliminarEmpresas_ByIdProveedor
@IdProveedor int
AS 
BEGIN
    Set Nocount On
    Update Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa 
    In (Select PE.IdEmpresa From Proveedores P INNER JOIN Proveedores_Empresas PE ON P.IdProveedor = PE.IdProveedor 
	     WHERE P.IdProveedor = @IdProveedor)
END



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para eliminar en la tabla Proveedores_Empresas:
Create OR Alter Procedure dbo.Eliminar_Proveedores_Empresas
@IdProveedor int
AS 
BEGIN
    Set Nocount On
    Update Proveedores_Empresas set IdEstadoRegistro = 2 WHERE IdProveedor = @IdProveedor
END






GO
-- PROCEDIMIENTO ALMACENADO PARA OBTENER EMPRESAS POR IDPROVEEDOR:
Create OR ALTER PROCEDURE dbo.GetEmpresasByIdProveedor
(
@IdProveedor int,
@estadoId int
)
AS
BEGIN
    Select E.IdEmpresa, NombreEmpresa, RNC, Correo, E.Teléfono1, E.Teléfono2, SitioWeb, E.Dirección, C.IdCiudad, P.IdPais 
	FROM Empresas E INNER JOIN Ciudades C ON E.IdCiudad = C.IdCiudad
	                INNER JOIN Paises P ON C.IdPais = P.IdPais
					INNER JOIN Proveedores_Empresas CE ON E.IdEmpresa = CE.IdEmpresa
					INNER JOIN Proveedores Cli ON CE.IdProveedor = Cli.IdProveedor
	WHERE Cli.IdProveedor =  @IdProveedor AND (@estadoId = 0 OR CE.IdEstadoRegistro = @estadoId)
END
go



GO
-- PROCEDIMIENTO ALMACENADO PARA Eliminar Proveedor y empresas:
Create OR Alter Procedure dbo.EliminarProveedor_Empresas_ByEmpresasIds
@EmpresasIds varchar(MAX)
AS 
BEGIN
    Set Nocount On
    UPDATE Proveedores_Empresas set IdEstadoRegistro = 2 WHERE IdEmpresa IN (SELECT CAST(value AS INT) FROM STRING_SPLIT(@EmpresasIds, ','));
END


go
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Proveedor_Empresas: --
Create or Alter procedure dbo.Insertar_Proveedor_Empresa
  @IdProveedor int,
  @IdEmpresa int,
  --
  @IdCreadoPor int
  AS
  BEGIN
      Set nocount On
	  Insert Into Proveedores_Empresas(IdProveedor, IdEmpresa, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
				         VALUES(@IdProveedor, @IdEmpresa, @IdCreadoPor, GETDATE(), 1)
END


go
--Create or Alter procedure dbo.
--  @IdEstadoProveedor int,
--  @IdPersona int,
--  --
--  @IdCreadoPor int,
 
--  @IdEstadoRegistro int
--  AS
--  BEGIN
--      Set nocount On
--	  Insert Into Proveedores(IdEstadoProveedor, IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdEstadoRegistro) 
--	                 VALUES(@IdEstadoProveedor, @IdPersona, @IdCreadoPor,GETDATE(), @IdEstadoRegistro)

	 
--END
---ahora
go 
CREATE OR ALTER PROCEDURE dbo.InsertarProveedor
(@IdPersonaDeContacto INT, @IdCreadoPor INT)
AS
BEGIN
   INSERT INTO Proveedores (IdEstadoProveedor, IdPersonaDeContacto, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
   VALUES (1, @IdPersonaDeContacto, @IdCreadoPor, GETDATE(), 1)
    SELECT SCOPE_IDENTITY();
END



GO
CREATE OR ALTER PROCEDURE [dbo].[GetEmpresasByIdProveedor]
(
@IdProveedor int,
@estadoId int
)
AS
BEGIN
    Select E.IdEmpresa, NombreEmpresa, RNC, Correo, E.Teléfono1, E.Teléfono2, SitioWeb, E.Dirección, C.IdCiudad, P.IdPais,c.CiudadNombre, p.PaisNombre
	FROM Empresas E INNER JOIN Ciudades C ON E.IdCiudad = C.IdCiudad
	                INNER JOIN Paises P ON C.IdPais = P.IdPais
					INNER JOIN Proveedores_Empresas CE ON E.IdEmpresa = CE.IdEmpresa
					INNER JOIN Proveedores Cli ON CE.IdProveedor = Cli.IdProveedor
	WHERE Cli.IdProveedor =  @IdProveedor AND (@estadoId = 0 OR CE.IdEstadoRegistro = @estadoId)
END
GO




/*============================ PROCEDIMIENTOS VERIFICACION DE CAMPOS UNIQUE: ===========================================*/

GO
/*====== PROCEDIMIENTOS VERIFICACION DE CAMPOS UNIQUE: ======*/
CREATE OR ALTER PROCEDURE dbo.VerificarUniqueCedula
  (@cedula varchar(13))
AS
BEGIN
  Declare @existe bit = 0
  -- Inicializamos la variable @existe a 0 (falso)

  -- Verificamos si la cédula existe en la tabla Personas
  IF EXISTS (SELECT 1
  FROM Personas
  WHERE Cedula = @cedula)
    BEGIN
    -- Si existe, establecemos @existe a 1 (verdadero)
    SET @existe = 1
  END

  Select @existe AS Existe
END
GO
-- EXEC dbo.VerificarUniqueCedula @cedula = '111-1234560-0'




GO
/*====== PROCEDIMIENTOS VERIFICACION DE CAMPOS UNIQUE: ======*/
CREATE OR ALTER PROCEDURE dbo.VerificarUniqueRnc
  (@rnc varchar(13))
AS
BEGIN
  Declare @existe bit = 0
  -- Inicializamos la variable @existe a 0 (falso)

  -- Verificamos si la cédula existe en la tabla Personas
  IF EXISTS (SELECT 1
  FROM Empresas
  WHERE RNC = @rnc)
    BEGIN
    -- Si existe, establecemos @existe a 1 (verdadero)
    SET @existe = 1
  END

  Select @existe AS Existe
END
GO
-- EXEC dbo.VerificarUniqueRnc @rnc = '123456789'



GO
/* Procedimiento almacenado para obtener una lisa de clientes con su existencia: */
CREATE OR ALTER PROCEDURE dbo.GetListaProductosConExistencia
AS
BEGIN
  SELECT P.IdProducto, P.Codigo, Nombre, Descripción, Modelo, PrecioCosto, PrecioVenta, ITBIS, UDM.IdUnidad_DeMedida,
    UDM.UnidadNombre, E.IdEstado, E.EstadoNombre, I.CantidadDisponible, ER.IdEstadoRegistro, ER.NombreEstado AS NombreEstadoRegistro
  FROM Productos P INNER JOIN UnidadesDeMedida UDM ON P.IdUnidad_DeMedida = UDM.IdUnidad_DeMedida
    INNER JOIN Inventarios I ON P.IdProducto = I.IdProducto
    INNER JOIN Estados E ON P.IdEstado = E.IdEstado
    INNER JOIN EstadosRegistros ER ON P.IdEstadoRegistro = ER.IdEstadoRegistro
END
GO
-- EXEC dbo.GetListaProductosConExistencia


GO
/* Procedimiento almacenado para obtener una lisa de clientes con su existencia: */
CREATE OR ALTER PROCEDURE dbo.GetListaProductosParaFacturaC
AS
BEGIN
  SELECT P.IdProducto, P.Codigo, Nombre, Descripción, Modelo, PrecioCosto, PrecioVenta, ITBIS, UDM.IdUnidad_DeMedida,
    UDM.UnidadNombre, E.IdEstado, E.EstadoNombre, I.CantidadDisponible, ER.IdEstadoRegistro, ER.NombreEstado AS NombreEstadoRegistro
  FROM Productos P INNER JOIN UnidadesDeMedida UDM ON P.IdUnidad_DeMedida = UDM.IdUnidad_DeMedida
    INNER JOIN Inventarios I ON P.IdProducto = I.IdProducto
    INNER JOIN Estados E ON P.IdEstado = E.IdEstado
    INNER JOIN EstadosRegistros ER ON P.IdEstadoRegistro = ER.IdEstadoRegistro
END
GO
-- EXEC dbo.GetListaProductosParaFacturaC




GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Productos: --
Create or Alter procedure dbo.InsertarProducto
  @Nombre VARCHAR(255),
  @Codigo VARCHAR(7),
  @Descripción VARCHAR(255),
  @Modelo VARCHAR(50),
  @PrecioCosto DECIMAL(10, 2),
  @PrecioVenta DECIMAL(10, 2),
  @ITBIS DECIMAL(5, 2),
  @IdUnidad_DeMedida INT,
  @IdCreadoPor INT
AS
BEGIN  SELECT * FROM Estados
  Insert Into Productos
        (Nombre, Codigo, Descripción, Modelo, PrecioCosto, PrecioVenta, ITBIS, IdUnidad_DeMedida, 
         IdEstado, IdCreadoPor, FechaCreacion, IdEstadoRegistro)

  Values(@Nombre, @Codigo, @Descripción, @Modelo, @PrecioCosto, @PrecioVenta, @ITBIS, @IdUnidad_DeMedida, 
         1, @IdCreadoPor, GETDATE(), 1)

  DECLARE @IdProducto INT; 
  SET @IdProducto = SCOPE_IDENTITY();

  INSERT INTO Inventarios
  (Descripcion, Codigo, CantidadDisponible, IdProducto, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES (@Descripción, @Codigo, 0, @IdProducto, @IdCreadoPor, GETDATE(), 1)
END
-- 
/*
EXECUTE dbo.InsertarProducto 
'Puerto Inteligente A5B3', 'PI-A5B3', 'Puero inteligente detector de amanezas al servidor principal', 'A5B3', 20, 30, 10, 1, 1, 6
*/




GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para ACTUALIZAR EN LA TABLA PRODUCTOS: --
Create or Alter procedure dbo.ActualizarProducto
  @IdProducto INT,
  @Nombre VARCHAR(255),
  @Codigo VARCHAR(7),
  @Descripción VARCHAR(255),
  @Modelo VARCHAR(50),
  @PrecioCosto DECIMAL(10, 2),
  @PrecioVenta DECIMAL(10, 2),
  @ITBIS DECIMAL(5, 2),
  @IdUnidad_DeMedida INT,
  @IdModificadoPor INT
AS
BEGIN  SELECT * FROM Estados
    UPDATE Productos SET Nombre = @Nombre, Codigo = @Codigo, Descripción = @Descripción, Modelo = @Modelo, PrecioCosto = @PrecioCosto, 
                       PrecioVenta = @PrecioVenta, ITBIS = @ITBIS, IdUnidad_DeMedida = @IdUnidad_DeMedida, 
         IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE()
    WHERE IdProducto = @IdProducto

  INSERT INTO Inventarios
  (Descripcion, Codigo, CantidadDisponible, IdProducto, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES (@Descripción, @Codigo, 0, @IdProducto, @IdModificadoPor, GETDATE(), 1)
END
-- 
/*
EXECUTE dbo.InsertarProducto 
'Puerto Inteligente A5B3', 'PI-A5B3', 'Puero inteligente detector de amanezas al servidor principal', 'A5B3', 20, 30, 10, 1, 1, 6
*/


GO
/*PROCEDIMIENTO ALMACENADO PARA OBTENER UNIDADES DE MEDIDA*/
CREATE PROCEDURE dbo.ObtenerUnidadesMedida
AS
BEGIN
   SELECT IdUnidad_DeMedida, UnidadNombre FROM UnidadesDeMedida
END
-- EXEC dbo.ObtenerUnidadesMedida

