USE BD_PROYENETT_MV47

GO
----------- /*1--*/ Procedimiento almcenado para obtener una lista general de clientes (empresas y personas fisicas):
	CREATE OR ALTER PROCEDURE dbo.GetListaCenerallientes
	AS
	BEGIN
		SELECT 
			C.IdCliente,
			CASE WHEN NombreEntidad IS NULL THEN P.Nombres + ' ' + P.Apellidos ELSE NombreEntidad END AS NombreEntidad,
			C.Codigo,
			E.IdEntidad,
			E.IdTipoEntidad,
			NombreTipoEntidad,
			P.Cedula AS Identificacion,
			P.Telefono1 AS Telefono,
			Correo,
			C.FechaInicioCliente,
			CiudadNombre,
			PaisNombre
		FROM Entidades E 
		INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
		INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
		INNER JOIN EntidadesPersonasFisicas EPF ON E.IdEntidad = EPF.IdEntidad
		INNER JOIN Personas P ON EPF.IdPersona = P.IdPersona
		INNER JOIN Ciudades Ci ON P.IdCiudad = Ci.IdCiudad
		INNER JOIN Paises Pa ON Ci.IdPais = Pa.IdPais

		UNION

		SELECT 
			C.IdCliente,
			CASE WHEN NombreEntidad IS NULL THEN EM.NombreEmpresa ELSE NombreEntidad END AS NombreEntidad,
			C.Codigo,
			E.IdEntidad,
			E.IdTipoEntidad,
			NombreTipoEntidad,
			EM.RNC AS Identificacion,
			EM.Telefono1 AS Telefono,
			Correo,
			C.FechaInicioCliente,
			CiudadNombre,
			PaisNombre
		FROM Entidades E 
		INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
		INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
		INNER JOIN EntidadesEmpresas EE ON E.IdEntidad = EE.IdEntidad
		INNER JOIN Empresas EM ON EE.IdEmpresa = EM.IdEmpresa
		INNER JOIN Ciudades Ci ON EM.IdCiudad = Ci.IdCiudad
		INNER JOIN Paises Pa ON Ci.IdPais = Pa.IdPais
		
		ORDER BY IdCliente ASC;
	END
	
-- EXEC dbo.GetListaCenerallientes


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para hacer Login: --
GO
-- Procedimiento para Obtener usuario y loguear:
CREATE OR ALTER PROCEDURE dbo.GetUsuarioLogin
  @NombreUsuario varchar(30),
  @Contraseña varchar(MAX)
AS
BEGIN
  SET NOCOUNT ON
  SELECT IdUsuario, NombreUsuario, Correo, Contraseña, NombreRol
  FROM Usuarios U INNER JOIN Roles R ON U.IdRol = R.IdRol
  WHERE NombreUsuario = @NombreUsuario AND Contraseña = @Contraseña
END
--- EXEC dbo.GetUsuarioLogin 



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Personas: --
Create or Alter procedure dbo.InsertarPersona
  @Nombres varchar(40),
  @Apellidos varchar(40),
  @Telefono1 varchar(12),
  @Telefono2 varchar(12),
  @Direccion varchar(60),
  @Correo varchar(60),
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
    (Nombres, Apellidos, Telefono1, Telefono2, Direccion, Correo, FechaDeNacimiento, Cedula, IdSexo,
    IdCiudad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)

  Values(@Nombres, @Apellidos, @Telefono1, @Telefono2, @Direccion, @Correo, @FechaDeNacimiento, @Cedula,
      @IdSexo, @IdCiudad, @IdCreadoPor, GETDATE(), 1)

  Select SCOPE_IDENTITY();
END
/* EJECUCION DEL PROCEDIMIENTO:
DECLARE @FechaActual DATETIME = GETDATE(); -- 'Fecha actual'

EXEC dbo.InsertarPersona  @Nombres = 'Ignacio Mael', @Apellidos = 'Lima Leopoldo', @Telefono1 = '809-193-3209', 
                          @Telefono2 = '849-105-0525', @Direccion = 'Bo. Las Boemias, Calle 3, #29', 
                          @Correo = 'ignaciomael@example.com', @FechaDeNacimiento = '1992-05-10', @Cedula = '2123406080', @IdSexo = 1, 
						  @IdCiudad = 2, @IdCreadoPor = 1;
*/ -- Select * From Personas



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla PersonasTiposPersonas: --
CREATE OR ALTER PROCEDURE dbo.InsertPersonasTiposPersonas
(@IdPersona INT, @IdTipoPersona INT, @IdCreadoPor INT)
AS
BEGIN
INSERT INTO PersonasTiposPersonas
  (IdPersona, IdTipoPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
   VALUES
   (@IdPersona, @IdTipoPersona, @IdCreadoPor, GETDATE(), 1)
END
GO
-- EXEC dbo.InsertPersonasTiposPersonas @IdPersona = 0, @IdTipoPersona = 0, @IdCreadoPor = 1



GO
---- PROYECTO 
--- Esto son enpoint para el formulario del proyecto
CREATE OR ALTER PROCEDURE dbo.ListaServicios
AS
BEGIN
    SET NOCOUNT ON 
        select IdServicio, NombreServicio from Servicios
END
-- EXEC dbo.ListaServicios


GO
CREATE OR ALTER PROCEDURE dbo.ListaUnidades
AS
BEGIN
    SET NOCOUNT ON 
        select IdUnidadDeMedida, UnidadNombre from UnidadesDeMedida
END



GO
CREATE OR ALTER PROCEDURE dbo.ListaClienteProyecto
AS
BEGIN
    SET NOCOUNT ON 
        	SELECT 
			C.IdCliente,
			CASE WHEN NombreEntidad IS NULL THEN P.Nombres + ' ' + P.Apellidos ELSE NombreEntidad END AS NombreEntidad,
			C.Codigo,
            E.IdEntidad,
			E.IdTipoEntidad,
			NombreTipoEntidad,
			P.Cedula AS Identificacion
		FROM Entidades E 
		INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
		INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
		INNER JOIN EntidadesPersonasFisicas EPF ON E.IdEntidad = EPF.IdEntidad
		INNER JOIN Personas P ON EPF.IdPersona = P.IdPersona

		UNION

		SELECT 
			C.IdCliente,
			CASE WHEN NombreEntidad IS NULL THEN EM.NombreEmpresa ELSE NombreEntidad END AS NombreEntidad,
			C.Codigo,
            E.IdEntidad,
			E.IdTipoEntidad,
			NombreTipoEntidad,
			EM.RNC AS Identificacion
		FROM Entidades E 
		INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
		INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
		INNER JOIN EntidadesEmpresas EE ON E.IdEntidad = EE.IdEntidad
		INNER JOIN Empresas EM ON EE.IdEmpresa = EM.IdEmpresa
		
		ORDER BY IdCliente ASC;
END
-- EXEC dbo.ListaClienteProyecto










GO
CREATE OR ALTER PROCEDURE dbo.ListaEmpleadoProyecto
AS
BEGIN
    SET NOCOUNT ON 
        select c.IdEmpleado, p.Nombres, p.Apellidos from Empleados c 
		inner join Personas p on p.IdPersona = c.IdPersona
		where c.IdEstadoRegistro = 1
END



GO
CREATE OR ALTER PROCEDURE dbo.ListaResponsabilidades
AS
BEGIN
    SET NOCOUNT ON 
         select IdResponsabilidad, ResponsabilidadNombre from Responsabilidades
END
go



GO
CREATE OR ALTER PROCEDURE dbo.ListaPrioridades
AS
BEGIN
    SET NOCOUNT ON 
         select IdPrioridad, NombrePrioridad from Prioridades
END



GO
----- PROCEDIMIENTO PARA OBTENER PRODUCTOS:
CREATE OR ALTER PROCEDURE dbo.GetInfoProductos
AS
BEGIN
   SELECT P.IdProducto, Nombre, Codigo, Descripcion, Modelo, TieneVencimiento, IdEstado, ER.NombreEstado
   FROM Productos P INNER JOIN EstadosRegistros ER ON P.IdEstado = ER.IdEstadoRegistro
END
-- EXEC dbo.GetInfoProductos


GO
----- PROCEDIMIENTO PARA OBTENER PRODUCTOS:
CREATE OR ALTER PROCEDURE dbo.GetInfoProductoUnidades
(@IdProducto INT)
AS
BEGIN
   SELECT PUDM.IdProductoUnidadDeMedida, PUDM.IdProducto, PUDM.IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, UnidadNombre
   FROM ProductosUnidadesDeMedida PUDM INNER JOIN DetallesProductosUnidadesDeMedida DPUDP ON PUDM.IdProductoUnidadDeMedida = DPUDP.IdProductoUnidadDeMedida
                                       INNER JOIN UnidadesDeMedida UDM ON UDM.IdUnidadDeMedida = DPUDP.IdUnidadDeMedida
   WHERE PUDM.IdProducto = @IdProducto
END
-- EXEC dbo.GetInfoProductoUnidades @IdProducto = 3





GO
CREATE OR ALTER PROCEDURE dbo.SelectConJSON
AS
BEGIN
SELECT 
        C.IdEmpleado,
        P.IdPersona,
        Nombres,
        Apellidos,
        Telefono1,
        Telefono2,
        Direccion,
        P.Correo,
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
                EC.Descripcion AS 'Descripcion',
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



-- INSERTAR PARAMETRS DE COSTO:
GO
CREATE OR ALTER Procedure dbo.InsertParametrosCostos
(@NombreParametro varchar(max), @IdCreadoPor INT)
AS
BEGIN
   INSERT INTO ParametrosCostos(NombreParametro, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
                        VALUES(@NombreParametro, @IdCreadoPor, GETDATE(), 1)
END



-- Obteer parametros de costo:
GO
CREATE OR ALTER Procedure dbo.GetParametrosCostos
AS
BEGIN
   SELECT IdParametroCosto, NombreParametro FROM ParametrosCostos
END
GO
-- EXEC dbo.GetParametrosCostos



GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA PROYECTOS: ----------------------------------
CREATE OR ALTER PROCEDURE dbo.InsertarProyecto
    @Nombre VARCHAR(255),
    @Descripcion VARCHAR(MAX),
    @FechaDeInicio DATE,
    @FechaDeFinalizacion DATE,
    @TiempoDuracionEstimado VARCHAR(70),
    -- @FechaRealDeFinalizacion DATE,
    -- @TiempoDuracionReal VARCHAR(50),
    @PresupuestoAcordado DECIMAL(18, 2),
    @ClienteEsPersonaFisica BIT,
    @IdEntidad INT,
    @IdEstado INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
	-- @IdEstadoRegistro INT
    -- @IdModificadoPor INT
    -- @FechaModificacion DATETIME,
AS
BEGIN
    INSERT INTO Proyectos (
        Nombre,
        Descripcion,
        FechaDeInicio,
        FechaDeFinalizacion,
        TiempoDuracionEstimado,
        -- FechaRealDeFinalizacion,
        -- TiempoDuracionReal,
        PresupuestoAcordado,
        ClienteEsPersonaFisica,
        IdEntidad,
		IdEstado,
        IdCreadoPor,
        FechaCreacion,
		IdEstadoRegistro
        -- IdModificadoPor,
        -- FechaModificacion,
    )
    VALUES (
        @Nombre,
        @Descripcion,
        @FechaDeInicio,
        @FechaDeFinalizacion,
        @TiempoDuracionEstimado,
        -- @FechaRealDeFinalizacion,
        -- @TiempoDuracionReal,
        @PresupuestoAcordado,
        @ClienteEsPersonaFisica,
        @IdEntidad,
        @IdCreadoPor,
		@IdEstado,
        GETDATE(),
		1
        -- @IdModificadoPor,
        -- @FechaModificacion,
    );

    Select SCOPE_IDENTITY()
END;




GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA ProyectosDetallesProductos: ----------------------------------
CREATE OR ALTER PROCEDURE dbo.InsertarProyectoDetalleProducto
    @Cantidad DECIMAL,
    @PrecioCompra DECIMAL,
    @PrecioVenta DECIMAL,
    @ITBIS DECIMAL,
    @Codigo VARCHAR(10),
    @Descuento DECIMAL,
    @Subtotal DECIMAL,
    @IdProducto INT,
    @IdUnidadDeMedida INT,
    @IdProyecto INT,

    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    INSERT INTO ProyectosDetallesProductos (
        Cantidad,
        PrecioCompra,
        PrecioVenta,
        ITBIS,
        Codigo,
        Decuento,
        Subtotal,
        IdProducto,
        IdUnidadDeMedida,
        IdProyecto,
        IdCreadoPor,
        FechaCreacion,
		IdEstadoRegistro
        -- IdModificadoPor,
        -- FechaModificacion,
    )
    VALUES (
        @Cantidad,
        @PrecioCompra,
        @PrecioVenta,
        @ITBIS,
        @Codigo,
        @Descuento,
        @Subtotal,
        @IdProducto,
        @IdUnidadDeMedida,
        @IdProyecto,
        @IdCreadoPor,
        GETDATE(),
		1
        -- @IdModificadoPor,
        -- @FechaModificacion,
    );
END;



GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA ProyectosEntidadesEmpresas: ----------------------------------
CREATE OR ALTER PROCEDURE dbo.InsertProyectosEntidadesEmpresas
(
    @IdProyecto INT,
    @IdEntidad INT
)
AS
BEGIN
    INSERT INTO ProyectosEntidadesEmpresas (IdProyecto, IdEER) 
    VALUES 
    (   
        @IdProyecto, 
        (
            SELECT TOP 1 EER.IdEER 
            FROM EntidadesEmpresas EE 
            INNER JOIN EntidadesEmpresasRepresentantes EER ON EE.IdEntidadEmpresa = EER.IdEntidadEmpresa
            WHERE EE.IdEntidad = @IdEntidad
            ORDER BY EE.FechaCreacion DESC
        ) 
    )
END



GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA InsertProyectosEntidadesPersonasFisicas: ----------------------------------
CREATE OR ALTER PROCEDURE dbo.InsertProyectosEntidadesPersonasFisicas
(
    @IdProyecto INT,
    @IdEntidad INT
)
AS
BEGIN
    INSERT INTO ProyectosEntidadesPF (IdProyecto, IdEPFR) 
    VALUES 
    (   
        @IdProyecto, 
        (
            SELECT TOP 1 EPFR.IdEPFR 
            FROM EntidadesPersonasFisicas EPF
            INNER JOIN EntidadesPersonasFisicasRepresentantes EPFR ON EPF.IdEntidadPersonaFisica = EPFR.IdEntidadPersonaFisica
            WHERE EPF.IdEntidad = @IdEntidad
            ORDER BY EPF.FechaCreacion DESC
        ) 
    )
END






GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA ProyectosEmpleados: ----------------------------------
CREATE OR ALTER PROCEDURE InsertarProyectoEmpleado
    @IdProyecto INT,
    @IdResponsabilidad INT,
    @IdEmpleado INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    INSERT INTO ProyectosEmpleados (
        IdProyecto,
        IdResponsabilidad,
        IdEmpleado,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
    )
    VALUES (
        @IdProyecto,
        @IdResponsabilidad,
        @IdEmpleado,
        @IdCreadoPor,
        GETDATE(), -- @FechaCreacion,
        -- @IdModificadoPor,
        -- @FechaModificacion,
        1 -- @IdEstadoRegistro
    );
END;



---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA GastosAdicionales: ----------------------------------
GO
CREATE OR ALTER PROCEDURE InsertarGastoAdicional
    @DescripcionGasto VARCHAR(60),
    @MontoGasto DECIMAL(10, 2),
    @IdProyecto INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    INSERT INTO GastosAdicionales (
        DescripcionGasto,
        MontoGasto,
        IdProyecto,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
    )
    VALUES (
        @DescripcionGasto,
        @MontoGasto,
        @IdProyecto,
        @IdCreadoPor,
        GETDATE(), -- @FechaCreacion,
        -- @IdModificadoPor,
        -- @FechaModificacion,
        1 -- @IdEstadoRegistro
    );
END;




---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA ProyectosServicios: ----------------------------------
GO
CREATE OR ALTER PROCEDURE InsertarProyectoServicio
    @Descripcion VARCHAR(70),
    @IdProyecto INT,
    @IdServicio INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    INSERT INTO ProyectosServicios (
        Descripcion,
        IdProyecto,
        IdServicio,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
    )
    VALUES (
        @Descripcion,
        @IdProyecto,
        @IdServicio,
        @IdCreadoPor,
        GETDATE(), -- @FechaCreacion,
        -- @IdModificadoPor,
        -- @FechaModificacion,
        1 -- @IdEstadoRegistro
    );
END;




GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA Tareas: ----------------------------------
CREATE OR ALTER PROCEDURE dbo.InsertarTarea
    @Nombre VARCHAR(255),
    @Descripcion VARCHAR(255),
    @FechaInicio DATE,
    @FechaFinalizacion DATE,
    @TiempDuracionEstimado VARCHAR(40),
    @FechaRealDeFinalizacion DATE,
    @TiempoDuracionReal VARCHAR(40),
    @IdParametroCosto INT,
    @CostoPorParametro DECIMAL(10, 2),
    @Cantidad DECIMAL,
    @CostoTotal DECIMAL(10, 2),
    @IdPrioridad INT,
    @IdProyecto INT,
    @IdEstado INT,
    @IdServicioRelacionado INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    INSERT INTO Tareas (
        Nombre,
        Descripcion,
        FechaInicio,
        FechaFinalizacion,
        TiempDuracionEstimado,
        FechaRealDeFinalizacion,
        TiempoDuracionReal,
        IdParametroCosto,
        CostoPorParametro,
        Cantidad,
        CostoTotal,
        IdPrioridad,
        IdProyecto,
        IdEstado,
        IdServicioRelacionado,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
    )
    VALUES (
        @Nombre,
        @Descripcion,
        CONVERT(DATE, @FechaInicio),
        CONVERT(DATE, @FechaFinalizacion),
        @TiempDuracionEstimado,
        CONVERT(DATE, @FechaRealDeFinalizacion),
        @TiempoDuracionReal,
        @IdParametroCosto,
        @CostoPorParametro,
        @Cantidad,
        @CostoTotal,
        @IdPrioridad,
        @IdProyecto,
        @IdEstado,
        @IdServicioRelacionado,
        @IdCreadoPor,
        GETDATE(), -- @FechaCreacion,
        -- @IdModificadoPor,
        -- @FechaModificacion,
        1 -- @IdEstadoRegistro
    );
END;



GO
---------------------- PROCEDIMIENTO PARA INSERTAR EN LA TABLA Tareas: ----------------------------------
CREATE OR ALTER PROCEDURE dbo.InsertarCotizacionProyecto
    @FechaDeEmision DATETIME,
    @MontoInicial DECIMAL(18, 2),
    @MontoTotal DECIMAL(18, 2),
    @Secuencia VARCHAR(20),
    @IdCliente INT,
    @IdEstado INT,
    @IdProyecto INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    INSERT INTO CotizacionesProyectos (
        FechaDeEmision,
        MontoInicial,
        MontoTotal,
        Secuencia,
        IdCliente,
        IdEstado,
        IdProyecto,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
    )
    VALUES (
        CONVERT(DATE, @FechaDeEmision),
        @MontoInicial,
        @MontoTotal,
        @Secuencia,
        @IdCliente,
        @IdEstado,
        @IdProyecto,
        @IdCreadoPor,
        GETDATE(), -- @FechaCreacion,
        -- @IdModificadoPor,
        -- @FechaModificacion,
        1 -- @IdEstadoRegistro
    );
END;
GO