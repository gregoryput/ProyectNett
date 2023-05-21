CREATE DATABASE BD_PROYENETT
GO
USE BD_PROYENETT
GO
-- CREACION DE LA TABLA ESTADOS_REGISTROS
Create table EstadosRegistros(
  IdEstadoRegistro int identity constraint PK_IdEstadoRegistro primary key,
  NombreEstado varchar(15),
  IdEstadoRegistro_fk int constraint Fk_IdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro)
)
GO
-- CREACION DE LA TABLA ROLES:
Create table Roles(
  IdRol int identity constraint PK_IdRol primary key,
  NombreRol varchar(40),
  IdEstadoRegistro int constraint Fk_RolesIdEstadoRegistro foreign Key references EstadosRegistros(IdEstadoRegistro)
)
GO
-- CREACION DE LA TABLA USUARIOS:
Create table Usuarios(
  IdUsuario int identity constraint PK_IdUsuario primary key,
  NombreRol varchar(40),
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
Create table Sexos(
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
Create Table Paises(
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
Create Table Ciudades(
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
  --
  IdSexo int constraint Fk_IdSexo foreign Key references Sexos(IdSexo),
  IdCiudad int constraint Fk_IdCiudad foreign Key references Ciudades(IdCiudad),
  --
  IdCreadoPor int constraint Fk_IdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion date,
  IdModificadoPor int constraint Fk_IdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion date,
  IdEstadoRegistro int constraint Fk_IdEstado foreign Key references EstadosRegistros(IdEstadoRegistro),
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
  --
  IdCreadoPor int constraint Fk_EmpresasIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_EmpresasIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_EmpresasIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA CLIENTES
Create Table Clientes(
  IdCliente int identity constraint PK_IdCliente primary key,
  IdEmpresa int null constraint Fk_IdEmpresa foreign Key references Empresas(IdEmpresa),
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
Create Table EstadoProveedores(
  IdEstadoProveedor int identity constraint PK_IdEstadoProveedor primary key,
  EstadoNombre varchar(15),
  --
  IdCreadoPor int constraint Fk_EPIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_EPIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_EPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA ESTADO PROVEEDORES
Create Table Proveedores(
  IdProveedor int identity constraint PK_IdProveedor primary key,
  IdEstadoProveedor int constraint Fk_IdEstadoProveedor foreign Key references EstadoProveedores(IdEstadoProveedor),
  IdEmpresa int constraint Fk_ProveedorIdEmpresa foreign Key references Empresas(IdEmpresa),
  IdPersonaDeContacto int constraint Fk_Proveedor_IdPersonaDeContacto foreign Key references Personas(IdPersona),
  --
  IdCreadoPor int constraint Fk_ProveedoresIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_ProveedoresIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_ProveedoresIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
)
GO

-- CREACION DE LA TABLA EMPLEADOS:
CREATE TABLE Empleados (
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
CREATE TABLE Cargos (
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
CREATE TABLE EmpleadosCargos (
  IdEmpleado INT,
  IdCargo INT,
  Descripción VARCHAR(255),
  CONSTRAINT Fk_CargoIdEmpleado FOREIGN KEY (IdEmpleado) REFERENCES Empleados(IDempleado),
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
CREATE TABLE UnidadesDeMedida (
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

-- CREACION DE LA TABLA Estados:
CREATE TABLE Estados (
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
CREATE TABLE Productos (
  IdProducto INT IDENTITY CONSTRAINT PK_IdProducto PRIMARY KEY,
  Nombre VARCHAR(255),
  Descripción VARCHAR(255),
  Modelo VARCHAR(50),
  PrecioCosto DECIMAL(10, 2),
  PrecioVenta DECIMAL(10, 2),
  CantidadDisponible INT,
  ITBIS DECIMAL(5, 2),
  IdUnidad_DeMedida INT,
  IdEstado INT,
  IdTipoProducto INT,
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

-- CREACION DE LA TABLA TipoMovimiento:
CREATE TABLE TipoMovimiento (
  IdTipoMovimiento INT IDENTITY CONSTRAINT PK_IdTipoMvimiento PRIMARY KEY,
  NombreMovimiento VARCHAR(20),
  --
  IdCreadoPor int constraint Fk_TMIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_TMIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_TMIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA INVENTARIO:
CREATE TABLE Inventario (
  IdInventario INT IDENTITY CONSTRAINT PK_IdInventario PRIMARY KEY,
  Descripcion VARCHAR(255),
  Fecha DATE,
  Cantidad INT,
  --
  IdProducto INT,
  CONSTRAINT Fk_InventarioIdProducto FOREIGN KEY (IdProducto) REFERENCES Productos(IdProducto),
  IdTipoMovimiento INT,
  --
  CONSTRAINT Fk_TipoMovimiento FOREIGN KEY (IdTipoMovimiento) REFERENCES TipoMovimiento(IdTipoMovimiento),
  --
  IdCreadoPor int constraint Fk_InventarioIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_InventarioIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_InventarioIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA EstadosFacturas:
CREATE TABLE EstadosFacturas (
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

-- CREACION DE LA TABLA FacturaProveedor:
CREATE TABLE FacturaProveedor (
  IdFactura INT IDENTITY CONSTRAINT PK_IdFactura PRIMARY KEY,
  Fecha DATE,
  MontoTotal DECIMAL(10, 2), 
  NCF VARCHAR(50),
  --
  IdEstadoFactura int constraint Fk_IdEstadoFactura foreign Key references EstadosFacturas(IdEstadoFactura),
  --
  --
  IdProveedor INT,
  CONSTRAINT Fk_IdProveedor FOREIGN KEY (IdProveedor) REFERENCES TipoMovimiento(IdTipoMovimiento),
  --
  IdCreadoPor int constraint Fk_FacturaProveedorIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_FacturaProveedordModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_FacturaProveedorIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro)
);

GO

-- CREACION DE LA TABLA DetalleFacturaProveedor:
CREATE TABLE DetalleFacturaProveedor (
  IdDetalleFactura INT IDENTITY CONSTRAINT PK_IdDetalleFactura PRIMARY KEY,
  Cantidad int,
  ITBIS decimal (10,2),
  --
  IdProducto int constraint Fk_DetalleIdProducto foreign Key references Productos(IdProducto),
  IdFactura int constraint Fk_IdFactura foreign Key references FacturaProveedor(IdFactura),
  --
  IdCreadoPor int constraint Fk_DFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_DFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_DFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA PagoParaProveedor:
CREATE TABLE PagoParaProveedor (
  IdPago INT IDENTITY CONSTRAINT PK_IdPagoPP PRIMARY KEY,
  Fecha DATE,
  MontoPago DECIMAL(10, 2),
  MontoRestante DECIMAL(10, 2),
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
CREATE TABLE PagosFacturaProveedor (
  IdPagoFacPro INT IDENTITY CONSTRAINT PK_IdPagoFacPro PRIMARY KEY,
  IdFactura int constraint Fk_PFPPagoIdFactura foreign Key references FacturaProveedor(IdFactura),
  IdPago int constraint Fk_PagoIdFactura foreign Key references PagoParaProveedor(IdPago),
  MontoPagado decimal(10, 2),
    --
  IdCreadoPor int constraint Fk_PFPIdCreadoPor foreign Key references Usuarios(IdUsuario),
  FechaCreacion Datetime,
  IdModificadoPor int constraint Fk_PFPIdModificadoPor foreign Key references Usuarios(IdUsuario),
  FechaModificacion Datetime,
  IdEstadoRegistro int constraint Fk_PFPIdEstadoR foreign Key references EstadosRegistros(IdEstadoRegistro),
);

GO

-- CREACION DE LA TABLA Estado_Proyecto:
CREATE TABLE Estado_Proyecto (
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
CREATE TABLE Proyectos (
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
CREATE TABLE Gestiona (
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
CREATE TABLE Responsabilidades (
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
CREATE TABLE PersonalProyecto (
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
CREATE TABLE GastoAdicional (
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
CREATE TABLE Servicios (
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
CREATE TABLE ProyectoServicio (
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
CREATE TABLE TipoDocumento (
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
CREATE TABLE Documentos (
  IdDocumento INT IDENTITY CONSTRAINT PK_IdDocumento PRIMARY KEY,
  FechaDeEmision DATE,
  MontoInicial DECIMAL(18, 2),
  FechaDeVencimiento DATE,
  DiasMora INT,
  MontoMora DECIMAL(18, 2),
  MontoTotal DECIMAL(18, 2),
  NCF NVARCHAR(255),
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
CREATE TABLE DetalleDocumento (
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
CREATE TABLE TipoPago (
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
CREATE TABLE Pagos (
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
CREATE TABLE PagoDocumentos (
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
CREATE TABLE ParametrosCosto (
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
CREATE TABLE EstadosTareas (
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
CREATE TABLE Prioridades (
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
CREATE TABLE Tareas (
  IdTarea INT PRIMARY KEY,
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



-- A CONTINUACIÓN LAS INSERCIONES DE DATOS: