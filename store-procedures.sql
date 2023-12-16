USE BD_PROYENETT

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
  @FechaDeNacimiento datetime,
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
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Imagnes: --
GO
CREATE OR ALTER PROCEDURE dbo.InsertarImagen
    @FileName VARCHAR(MAX),
    @ContentType VARCHAR(60),
    @FileSize INT,
    @Data VARCHAR(MAX),
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Imagenes (FileName, ContentType, FileSize, DATA, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES (@FileName, @ContentType, @FileSize, CONVERT(varbinary(MAX), @Data), @IdCreadoPor, GETDATE(), 1);

    Select SCOPE_IDENTITY();
END;




GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla PersonasImagenes: --
GO
CREATE OR ALTER PROCEDURE dbo.InsertarPersonaImagen
    @IdImagen INT,
    @IdPersona INT,
    @IdCreadoPor INT
    -- @FechaCreacion DATETIME,
    -- @IdModificadoPor INT,
    -- @FechaModificacion DATETIME,
    -- @IdEstadoRegistro INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO PersonasImagenes (IdImagen, IdPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES (@IdImagen, @IdPersona, @IdCreadoPor, GETDATE(), 1);
END;





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
    @FechaDeInicio DATEtime,
    @FechaDeFinalizacion DATEtime,
    @TiempoDuracionEstimado VARCHAR(70),
    -- @FechaRealDeFinalizacion DATEtime,
    @TiempoDuracionReal VARCHAR(50),
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
        TiempoDuracionReal,
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
        @TiempoDuracionReal,
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
    @FechaInicio DATEtime,
    @FechaFinalizacion DATEtime,
    @TiempDuracionEstimado VARCHAR(40),
    @FechaRealDeFinalizacion DATEtime,
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
        @FechaInicio,
        @FechaFinalizacion,
        @TiempDuracionEstimado,
        @FechaRealDeFinalizacion,
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
   -- @FechaDeEmision DATETIME,
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
        GETDATE(), --@FechaDeEmision,
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
GO




GO
CREATE OR ALTER PROCEDURE  ObtenerDatosProyecto
    @IdProyecto INT
AS
BEGIN
SELECT 
    p.IdProyecto,
    p.Nombre AS 'NombreProyecto',
    p.Descripcion,
    p.FechaDeInicio,
    p.FechaDeFinalizacion,
    p.PresupuestoAcordado,
	en.NombreEntidad,
	ten.NombreTipoEntidad,
    ep.EstadoNombre AS 'EstadoProyecto',
    (SUM(CASE WHEN t.IdEstado = 3 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PorcentajeCompletado,
    -- Total por tarea 
    (SELECT SUM(Cantidad * CostoTotal) as totalTarea FROM Tareas WHERE IdProyecto = p.IdProyecto) AS 'TotalTarea',
    (SELECT SUM(Subtotal) as totalProducto FROM ProyectosDetallesProductos WHERE IdProyecto = p.IdProyecto) AS 'TotalProducto',
    (SELECT SUM(MontoGasto) as totalGasto FROM GastosAdicionales WHERE IdProyecto = p.IdProyecto) AS 'TotalGasto',

	
    -- Lista de Servicio para el Proyecto
    (
         SELECT p.IdServicio, s.NombreServicio 
        FROM ProyectosServicios p 
        INNER JOIN Servicios s ON s.IdServicio = p.IdServicio
		inner join Proyectos r on r.IdProyecto = p.IdProyecto
        WHERE p.IdProyecto = @IdProyecto
        FOR JSON PATH
    ) AS 'ServicioProyectoJson',
    -- Lista de Tareas para el Proyecto
    (
       SELECT 
            t.IdTarea,
            t.Nombre AS 'NombreTarea',
            t.Descripcion,
            et.NombreEstado AS 'EstadoTarea',
            t.IdPrioridad,
			t.FechaInicio,
			t.FechaFinalizacion,
			cp.NombreParametro,
			t.CostoPorParametro,
			t.Cantidad,t.CostoTotal ,
			p.NombrePrioridad,
			ep.IdEstadoTarea,
			ep.NombreEstado
        FROM Tareas t
        INNER JOIN EstadosTareas et ON et.IdEstadoTarea = t.IdEstado
		inner join Prioridades p on  t.IdPrioridad = p.IdPrioridad
		inner join ParametrosCostos cp on  cp.IdParametroCosto = t.IdParametroCosto
		inner join EstadosTareas ep on ep.IdEstadoTarea = p.IdEstadoRegistro
        WHERE t.IdProyecto = @IdProyecto
        FOR JSON PATH
    ) AS 'TareasProyectoJson',
    -- Lista de Productos para el Proyecto
    (
        SELECT 
            pp.Cantidad,
            pr.Nombre AS 'NombreProducto'
        FROM ProyectosDetallesProductos pp
        INNER JOIN Productos pr ON pr.IdProducto = pp.IdProducto
        WHERE pp.IdProyecto = p.IdProyecto
        FOR JSON PATH
    ) AS 'ProductosProyectoJson',
    -- Lista de Empleados para el Proyecto SELECT * FROM ProyectosEmpleados WHERE IdProyecto = 13
    (
        SELECT 
            r.ResponsabilidadNombre,
            pe.IdResponsabilidad,
            pe.IdEmpleado,
            pe.IdPersonaProyecto,
            CONCAT(persona.Nombres, ' ', persona.Apellidos) AS 'NombreEmpleado'
        FROM ProyectosEmpleados pe
        INNER JOIN Responsabilidades r ON pe.IdResponsabilidad = r.IdResponsabilidad
        INNER JOIN Empleados emp ON pe.IdEmpleado = emp.IdEmpleado
        INNER JOIN Personas persona ON persona.IdPersona = emp.IdPersona
        WHERE pe.IdProyecto = p.IdProyecto
        FOR JSON PATH
    ) AS 'EmpleadosProyectoJson'
FROM Proyectos p
Inner join Entidades en on en.IdEntidad = p.IdEntidad
inner join TiposEntidades ten on ten.IdTipoEntidad = en.IdTipoEntidad
INNER JOIN EstadosProyectos ep ON ep.IdEstado = p.IdEstado
INNER JOIN Tareas t ON t.IdProyecto = p.IdProyecto
INNER JOIN EstadosTareas e ON e.IdEstadoTarea = t.IdEstado
WHERE p.IdProyecto = @IdProyecto
GROUP BY 
    p.IdProyecto,
    p.Nombre,
    p.FechaDeInicio,
    p.FechaDeFinalizacion,
    p.PresupuestoAcordado,
    ep.EstadoNombre,
    p.Descripcion,
	en.NombreEntidad,
	ten.NombreTipoEntidad
END
-- exec ObtenerDatosProyecto @IdProyecto = 1


GO
CREATE OR ALTER PROCEDURE dbo.ListaProyecto
AS
BEGIN
    SET NOCOUNT ON 
SELECT
    p.IdProyecto,
    p.Nombre AS NombreProyecto,
    COUNT(t.IdTarea) AS TotalTareas,
    SUM(CASE WHEN e.NombreEstado = 'Completo' THEN 1 ELSE 0 END) AS TareasCompletas,
 (SUM(CASE WHEN t.IdEstado = 3 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PorcentajeCompletado
FROM
    Proyectos p
INNER JOIN
    Tareas t ON t.IdProyecto = p.IdProyecto
INNER JOIN
    EstadosTareas e ON e.IdEstadoTarea = t.IdEstado
GROUP BY
    p.IdProyecto, p.Nombre;

END
go



GO
CREATE OR ALTER PROCEDURE dbo.GetDatosPersonales
AS
BEGIN
   SELECT P.IdPersona, Nombres, Apellidos, Cedula, FechaDeNacimiento, Correo, Telefono1, Telefono2, Pa.IdPais, PaisNombre, C.IdCiudad, CiudadNombre, S.IdSexo, S.SexoNombre,
   PI.IdPersonaImagen, I.IdImagen, I.[FileName], I.ContentType, I.FileSize, I.[DATA] AS [Data]
   FROM Personas P INNER JOIN Ciudades C ON P.IdCiudad = C.IdCiudad INNER JOIN Paises Pa ON C.IdPais = Pa.IdPais INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
   LEFT JOIN PersonasImagenes PI ON PI.IdPersona = P.IdPersona LEFT JOIN Imagenes I ON PI.IdImagen = I.IdImagen
END
GO
-- EXEC dbo.GetDatosPersonales

CREATE OR ALTER PROCEDURE dbo.EstadoTarea
(
    @IdProyecto int,
    @IdTarea int,
    @IdEstado int 
)
AS
BEGIN
    SET NOCOUNT ON 
	UPDATE Tareas
    SET 
        IdEstado = @IdEstado,
        FechaRealDeFinalizacion = CASE WHEN @IdEstado = 3 THEN GETDATE() ELSE FechaRealDeFinalizacion END
    WHERE IdTarea = @IdTarea AND IdProyecto = @IdProyecto
END
GO



CREATE OR ALTER PROCEDURE dbo.ListadoDocumentsVentas
AS
BEGIN
    SELECT IdCotizacion AS IdDocumento, 1 AS IdTipoDocumento, 'Cotización de proyecto' AS DocumentoNombre,
           FechaDeEmision, MontoTotal,MontoInicial, Secuencia, C.IdCliente, E.NombreEntidad, E.IdTipoEntidad, TP.NombreTipoEntidad,
            CP.IdEstado, Py.IdProyecto, Py.Nombre AS NombreProyecto
           
           FROM CotizacionesProyectos CP INNER JOIN Clientes C ON CP.IdCliente = c.IdCliente
                                         INNER JOIN Entidades E ON C.IdEntidad = E.IdEntidad
                                         INNER JOIN TiposEntidades TP ON E.IdTipoEntidad = TP.IdTipoEntidad
                                         INNER JOIN Proyectos Py ON CP.IdProyecto = Py.IdProyecto
    UNION 


    SELECT IdFactura AS IdDocumento, 2 AS IdTipoDocumento, 'Factura de proyecto' AS DocumentoNombre,
           FechaDeEmision, MontoTotal,MontoInicial, Secuencia, C.IdCliente, E.NombreEntidad, E.IdTipoEntidad, TP.NombreTipoEntidad,
           FV.IdEstado, Py.IdProyecto, Py.Nombre AS NombreProyecto
           
           FROM FacturasVentasProyectos FV INNER JOIN Clientes C ON FV.IdCliente = c.IdCliente
                                         INNER JOIN Entidades E ON C.IdEntidad = E.IdEntidad
                                         INNER JOIN TiposEntidades TP ON E.IdTipoEntidad = TP.IdTipoEntidad
                                         INNER JOIN Proyectos Py ON FV.IdProyecto = Py.IdProyecto
END
GO

-- EXEC dbo.ListadoDocumentsVentas







go
---Activar cargo
Create OR Alter Procedure dbo.Restaurar_Cargo_Empleado
@IdEmpleado int
AS 
BEGIN
    Set Nocount On
    Update EmpleadosCargos set IdEstadoRegistro = 1 WHERE IdEmpleado = @IdEmpleado 
END
go

Create OR Alter Procedure Eliminar_EmpleadosCargos
@IdEmpleado int
AS 
BEGIN
    Set Nocount On
    Update EmpleadosCargos set IdEstadoRegistro = 1 WHERE IdEmpleado = @IdEmpleado 
END

go

---Activar persona via empleado

Create OR Alter Procedure dbo.RestaurarPersonasEmpleado
@IdEmpleado  int
AS 
BEGIN
    Set Nocount On
    Update Personas set IdEstadoRegistro =  1 WHERE IdPersona 
in (Select P.IdPersona FROM Empleados C INNER JOIN Personas P ON C.IdPersona = P.IdPersona WHERE C.IdEmpleado = @IdEmpleado )
END
go


---Desactivar empleado via persona 
Create OR Alter Procedure dbo.EliminarPersonasEmpleado
@IdEmpleado int
AS 
BEGIN
    Set Nocount On
    Update Personas set IdEstadoRegistro =  2 WHERE IdPersona 
in (Select P.IdPersona FROM Empleados C INNER JOIN Personas P ON C.IdPersona = P.IdPersona WHERE C.IdEmpleado = @IdEmpleado)
END

/* EJECUCION DEL PROCEDIMIENTO
*/ 
---EXEC dbo.RestaurarPersonasEmpleado @Id = 57




go




--Activar Empleado 
Create OR Alter Procedure dbo.RestaurarEmpleado
@IdEmpleado  int
AS 
BEGIN
    Set Nocount On
    Update Empleados set IdEstadoRegistro = 1 WHERE IdEmpleado = @IdEmpleado 
END
/* EJECUCION DEL PROCEDIMIENTO
EXEC dbo.EliminarClientes @IdCliente = 10
*/
go

--Desactivar Empleado
Create OR Alter Procedure dbo.EliminarEmpleados
@IdEmpleado int
AS 
BEGIN
    Set Nocount On
    Update Empleados set IdEstadoRegistro = 2 WHERE IdEmpleado = @IdEmpleado
END


go
--Procedure para ver empleado
CREATE OR ALTER PROCEDURE dbo.ListadoEmpleadoV2
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
/*EJECUCION DE PROCEDIMIENTO:
*/
-- Execute dbo.ListadoEmpleadoV2 

select * from FacturasVentasProyectos

go
---Buscar empleado por id y traer toda su informacion

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
		WHERE C.IdEmpleado = @Id
END
 -- EXEC dbo.GetPersonaInfoByIdEmpleado @Id = 21

 go

 --Procedure para ver los cargos disponible 
 Create or alter procedure dbo.CargoEmpleadoVer
AS
BEGIN
  SET NOCOUNT ON 
    select IdCargo, NombreCargo from Cargos
END
-- Exec dbo.CargoEmpleadoVer

go

create or alter  PROCEDURE [dbo].[GetCargoEmpleados]
(
@IdEmpleado int,
@estadoId int
)
AS
BEGIN
    Select e.IdCargo, ce.Descripcion as Descripcion
	FROM Cargos E
					INNER JOIN EmpleadosCargos CE ON E.IdCargo = CE.IdCargo
					INNER JOIN Empleados Cli ON CE.IdEmpleado = Cli.IdEmpleado
	WHERE Cli.IdEmpleado =  @IdEmpleado AND (@estadoId = 0 OR CE.IdEstadoRegistro = @estadoId)
END
GO


-- exec GetCargoEmpleados @IdEmpleado = 7 , @estadoId = 1
go

Create or Alter procedure dbo.ActualizarEmpleadosCargos
  @IdEmpleado int,
  @IdCargo int,
  @Descripcion varchar(100),
  @IdModificadoPor int
  AS
  BEGIN
      Set nocount On
	  Update EmpleadosCargos SET IdCargo = @IdCargo, Descripcion = @Descripcion, @IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE()
	  WHERE IdEmpleado = @IdEmpleado
END

go


Create or Alter procedure dbo.Insertar_EmpleadosCargos
  @IdEmpleado int,
  @IdCargo int,
  @Descripcion varchar(max),
  @IdCreadoPor int
  AS
  BEGIN
      Set nocount On
	  Insert Into EmpleadosCargos(IdEmpleado, IdCargo, Descripcion, IdCreadoPor, IdEstadoRegistro,FechaCreacion)
				         VALUES(@IdEmpleado, @IdCargo, @Descripcion, @IdCreadoPor, 1, GETDATE())
END


GO
/*
Create or Alter procedure dbo.InsertarPersona
  @IdPersona int,
  @Nombres varchar(40),
  @Apellidos varchar(40),
  @Telefono1 varchar(12),
  @Telefono2 varchar(12),
  @Direccion varchar(60),
  @Correo varchar(60),
  @FechaDeNacimiento datetime,
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
*/



go
Create or Alter procedure dbo.InsertarEmpleado
  @FechadDeContratacion datetime,
  @IdPersona int,
  @IdCreadoPor int
AS
BEGIN
  Set nocount On
  Insert Into Empleados
    (IdPersona,FechaDeContratacion, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
  VALUES( @IdPersona,@FechadDeContratacion, @IdCreadoPor, GETDATE(), 1)

  SELECT SCOPE_IDENTITY();
END

go
Create or Alter procedure dbo.Delete_EmpleadosCargos
  @IdCargo int
AS
BEGIN
  Set nocount On
  Update EmpleadosCargos SET IdEstadoRegistro = 2 WHERE IdCargo = 2
END
go
Create or Alter procedure dbo.ActualizarPersona
  @IdPersona int,
  @Nombres varchar(40),
  @Apellidos varchar(40),
  @Telefono1 varchar(15),
  @Telefono2 varchar(15),
  @Direccion varchar(60),
  @Correo varchar(60),
  @FechaDeNacimiento datetime,
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
                    Correo = @Correo, FechaDeNacimiento = @FechaDeNacimiento, Cedula = @Cedula, IdSexo = @IdSexo, 
	                IdCiudad = @IdCiudad, IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE() WHERE IdPersona = @IdPersona
END


--- crud usuario
go
CREATE OR ALTER PROCEDURE dbo.ListaUsuario
AS
BEGIN
SELECT
    u.IdUsuario,
    u.NombreUsuario,
    u.Correo,
    r.NombreRol,
    r.IdRol,
    p.Nombres + ' ' + p.Apellidos as Empleado,
    u.IdEmpleado,
    es.IdEstadoRegistro,
    es.NombreEstado
FROM
    Usuarios u
INNER JOIN
    Roles r ON r.IdRol = u.IdRol
INNER JOIN
    Empleados em ON em.IdEmpleado = u.IdEmpleado
INNER JOIN
    Personas p ON p.IdPersona = em.IdEmpleado
INNER JOIN
    EstadosRegistros es ON es.IdEstadoRegistro = u.IdEstadoRegistro


END
go
CREATE OR ALTER PROCEDURE dbo.ListadoEmpleadoFiltradaUsuario
AS
BEGIN
SELECT e.IdEmpleado, p.Nombres, p.Apellidos
FROM Empleados e
INNER JOIN Personas p ON p.IdPersona = e.IdEmpleado
WHERE e.IdEstadoRegistro = 1
  AND NOT EXISTS (
    SELECT 1
    FROM Usuarios u
    WHERE u.IdEmpleado = e.IdEmpleado
  );
END

GO
CREATE OR ALTER PROCEDURE dbo.ListaRoles
AS
BEGIN
  select IdRol ,NombreRol from Roles 
END
go



CREATE OR ALTER PROCEDURE dbo.DesactivarUsuario
@IdUsuario int
AS
BEGIN
UPDATE Usuarios
SET  IdEstadoRegistro = 2
	WHERE IdUsuario = @IdUsuario  
END
go
CREATE OR ALTER PROCEDURE dbo.RestaurarUsuario
@IdUsuario int
AS
BEGIN
UPDATE Usuarios
SET  IdEstadoRegistro = 1
	WHERE IdUsuario = @IdUsuario  
END






go
CREATE or alter PROCEDURE InsertarUsuario
   ( @NombreUsuario VARCHAR(MAX),
    @Correo VARCHAR(MAX),
    @Contraseña VARCHAR(MAX),
    @IdRol INT,
    @IdEmpleado INT,
    @IdCreadoPor INT
	)
   
AS
BEGIN
    INSERT INTO Usuarios (NombreUsuario, Correo, Contraseña, IdRol, IdEmpleado,IdCreadoPor, FechaCreacion ,IdEstadoRegistro)
    VALUES (@NombreUsuario, @Correo, @Contraseña, @IdRol, @IdEmpleado, @IdCreadoPor ,GETDATE(), 1)
END
go
CREATE OR ALTER PROCEDURE ActualizarUsuario
   ( @IdUsuario INT,
     @NombreUsuario VARCHAR(MAX),
     @Correo VARCHAR(MAX),
     @Contraseña VARCHAR(MAX),
     @IdRol INT,
     @IdEmpleado INT,
     @IdModificadoPor INT
	)
AS
BEGIN
    UPDATE Usuarios
    SET 
        NombreUsuario = @NombreUsuario,
        Correo = @Correo,
        Contraseña = @Contraseña,
        IdRol = @IdRol,
        IdEmpleado = @IdEmpleado,
        IdModificadoPor = @IdModificadoPor,
        FechaModificacion = GETDATE()
    WHERE IdUsuario = @IdUsuario;
END




GO
CREATE PROCEDURE dbo.ObtenerUnidadesMedida
AS
BEGIN
   SELECT IdUnidadDeMedida, UnidadNombre FROM UnidadesDeMedida
END

GO



