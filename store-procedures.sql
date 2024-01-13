USE BD_PROYENETT_FINAL_6

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
            PaisNombre,
            C.FechaCreacion,
            C.FechaModificacion,
            img.IdImagen,
            img.FileName,
            img.ContentType,
            img.FileSize,
            img.Data
        FROM Entidades E
            INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
            INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
            INNER JOIN EntidadesPersonasFisicas EPF ON E.IdEntidad = EPF.IdEntidad
            INNER JOIN Personas P ON EPF.IdPersona = P.IdPersona
            INNER JOIN Ciudades Ci ON P.IdCiudad = Ci.IdCiudad
            INNER JOIN Paises Pa ON Ci.IdPais = Pa.IdPais
            LEFT JOIN PersonasImagenes PImg ON PImg.IdPersona = P.IdPersona
            LEFT JOIN Imagenes Img ON Img.IdImagen = PImg.IdImagen
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
            PaisNombre,
            C.FechaCreacion,
            C.FechaModificacion,
            null AS IdImagen,
            null AS FileName,
            null AS ContentType,
            null AS FileSize,
            null AS Data
        FROM Entidades E
            INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
            INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
            INNER JOIN EntidadesEmpresas EE ON E.IdEntidad = EE.IdEntidad
            INNER JOIN Empresas EM ON EE.IdEmpresa = EM.IdEmpresa
            INNER JOIN Ciudades Ci ON EM.IdCiudad = Ci.IdCiudad
            INNER JOIN Paises Pa ON Ci.IdPais = Pa.IdPais

    ORDER BY 
    IdCliente DESC, FechaModificacion DESC, FechaCreacion DESC;
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
    WHERE NombreUsuario = @NombreUsuario AND Contraseña = @Contraseña AND u.IdEstadoRegistro = 1
END
--- EXEC dbo.GetUsuarioLogin @
GO




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




GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para Actualizar en la tabla Personas: --
Create or Alter procedure dbo.ActualizarPersona
    @IdPersona INT,
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
    @IdModificadoPor int
AS
BEGIN
    Set nocount On
    UPDATE Personas SET Nombres = @Nombres, Apellidos = @Apellidos, Telefono1 = @Telefono1, Telefono2 = @Telefono2, Direccion = @Direccion,
                        Correo = @Correo, FechaDeNacimiento = @FechaDeNacimiento, Cedula = @Cedula, IdSexo = @IdSexo, IdCiudad = @IdCiudad,
                        IdModificadoPor = @IdModificadoPor, FechaCreacion = GETDATE()
    WHERE IdPersona = @IdPersona
END



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla PersonasTiposPersonas: --
CREATE OR ALTER PROCEDURE dbo.InsertPersonasTiposPersonas
    (@IdPersona INT,
    @IdTipoPersona INT,
    @IdCreadoPor INT)
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
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Imagenes
        (FileName, ContentType, FileSize, DATA, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@FileName, @ContentType, @FileSize, @Data, @IdCreadoPor, GETDATE(), 1);

    Select SCOPE_IDENTITY();
END;



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla imagenes: --
GO
CREATE OR ALTER PROCEDURE dbo.ActualizarImagen
    @IdImagen INT,
    @FileName VARCHAR(MAX),
    @ContentType VARCHAR(60),
    @FileSize INT,
    @Data VARCHAR(MAX),
    @IdModificadoPor INT

AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Imagenes SET FileName = @FileName, ContentType = @ContentType, FileSize = @FileSize, DATA = @DATA, IdModificadoPor = @IdModificadoPor, FechaCreacion = GETDATE()
    WHERE IdImagen = @IdImagen
END;



GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para Eliminar Imagen de persona: --
GO
CREATE OR ALTER PROCEDURE dbo.EliminarPersonaImagen
    @IdPersona INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @IdImagen INT;
    --
    SELECT @IdImagen = IdImagen
    FROM PersonasImagenes
    WHERE IdPersona = @IdPersona;

    DELETE PersonasImagenes WHERE IdImagen = @IdImagen AND IdPersona = @IdPersona
    DELETE Imagenes WHERE IdImagen = @IdImagen
END;


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para Eliminar Imagen de persona: --
GO
CREATE OR ALTER PROCEDURE dbo.EliminarProductoImagen
    @IdProducto INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @IdImagen INT;
    --
    SELECT @IdImagen = IdImagen
    FROM ProductosImagenes
    WHERE IdProducto = @IdProducto;

    DELETE ProductosImagenes WHERE IdImagen = @IdImagen AND IdProducto = @IdProducto
    DELETE Imagenes WHERE IdImagen = @IdImagen
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
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO PersonasImagenes
        (IdImagen, IdPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdImagen, @IdPersona, @IdCreadoPor, GETDATE(), 1);
END;


GO
--
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla ProductosImagenes: --
GO
CREATE OR ALTER PROCEDURE dbo.InsertarProductoImagen
    @IdImagen INT,
    @IdProducto INT,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ProductosImagenes
        (IdImagen, IdProducto, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdImagen, @IdProducto, @IdCreadoPor, GETDATE(), 1);
END;



GO
---- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Entidades: --
GO
GO
GO
GO
CREATE OR ALTER PROCEDURE dbo.InsertarEntidad
    @NombreEntidad VARCHAR(60),
    @IdTipoEntidad int,
    @IdCreadoPor int
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Entidades
        (NombreEntidad, IdTipoEntidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@NombreEntidad, @IdTipoEntidad, @IdCreadoPor, GETDATE(), 1);

    SELECT SCOPE_IDENTITY();
END
GO





GO
---- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla EntidadesRolesEntidades: --
GO
GO 
GO
CREATE OR ALTER PROCEDURE dbo.InsertarEntidadRolEntidad
    @IdEntidad int,
    @IdRolEntidad int,
    @IdCreadoPor int
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO EntidadesRolesEntidades
        (IdEntidad, IdRolEntidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdEntidad, @IdRolEntidad, @IdCreadoPor, GETDATE(), 1);

-- Puedes añadir aquí cualquier otro código o lógica que desees después de la inserción
END
GO




GO
---- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla EntidadesPersonasFisicas: --
GO
GO
GO
CREATE OR ALTER PROCEDURE InsertarEntidadPersonaFisica
    @IdEntidad int,
    @IdPersona int,
    @IdCreadoPor int
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO EntidadesPersonasFisicas
        (IdEntidad, IdPersona, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdEntidad, @IdPersona, @IdCreadoPor, GETDATE(), 1);

    SELECT SCOPE_IDENTITY();
END




GO
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla EntidadesPersonasFisicasRepresentantes: --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GO
GO
GO
CREATE OR ALTER PROCEDURE InsertarEntidadPersonaFisicaRepresentante
    @IdEntidadPersonaFisica INT,
    @IdRepresentanteActual INT,
    @IdRolRepresentante INT,
    @FechaInicioRepresentante DATETIME,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO EntidadesPersonasFisicasRepresentantes
        (IdEntidadPersonaFisica, IdRepresentanteActual, IdRolRepresentante, FechaInicioRepresentante, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdEntidadPersonaFisica, @IdRepresentanteActual, @IdRolRepresentante, GETDATE(), @IdCreadoPor, GETDATE(), 1);
END
GO




GO
--
--.P.R.O.C.E.D.U.R.E.......P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P.P Procedimiento almacenado para insertar en la tabla Clientes: --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
GO
CREATE OR ALTER PROCEDURE InsertarCliente
    @Codigo VARCHAR(9),
    @IdEntidad int,
    @FechaInicioCliente Datetime,
    @IdCreadoPor int
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Clientes
        (Codigo, IdEntidad, FechaInicioCliente, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@Codigo, @IdEntidad, @FechaInicioCliente, @IdCreadoPor, GETDATE(), 1);

-- Puedes añadir aquí cualquier otro código o lógica que desees después de la inserción
END




GO
---- PROYECTO 
--- Esto son enpoint para el formulario del proyecto
CREATE OR ALTER PROCEDURE dbo.ListaServicios
AS
BEGIN
    SET NOCOUNT ON
    select IdServicio, NombreServicio
    from Servicios
END
-- EXEC dbo.ListaServicios


GO
CREATE OR ALTER PROCEDURE dbo.ListaUnidades
AS
BEGIN
    SET NOCOUNT ON
    select IdUnidadDeMedida, UnidadNombre
    from UnidadesDeMedida
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
    select c.IdEmpleado, p.Nombres, p.Apellidos
    from Empleados c
        inner join Personas p on p.IdPersona = c.IdPersona
    where c.IdEstadoRegistro = 1
END



GO
CREATE OR ALTER PROCEDURE dbo.ListaResponsabilidades
AS
BEGIN
    SET NOCOUNT ON
    select IdResponsabilidad, ResponsabilidadNombre
    from Responsabilidades
END
go



GO
CREATE OR ALTER PROCEDURE dbo.ListaPrioridades
AS
BEGIN
    SET NOCOUNT ON
    select IdPrioridad, NombrePrioridad
    from Prioridades
END



GO
----- PROCEDIMIENTO PARA OBTENER PRODUCTOS:
CREATE OR ALTER PROCEDURE dbo.GetInfoProductos
AS
BEGIN
    SELECT P.IdProducto, Nombre, Codigo, Descripcion, Modelo, TieneVencimiento, IdEstado, ER.NombreEstado,
           I.IdImagen, I.[FileName], I.ContentType, I.FileSize, I.[DATA] AS [Data]
    FROM Productos P INNER JOIN EstadosRegistros ER ON P.IdEstado = ER.IdEstadoRegistro
                     LEFT JOIN ProductosImagenes PI ON PI.IdProducto = P.IdProducto
                     LEFT JOIN Imagenes I ON PI.IdImagen = I.IdImagen
    WHERE P.IdEstadoRegistro != 2 
    ORDER BY P.IdProducto DESC
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
    (@NombreParametro varchar(max),
    @IdCreadoPor INT)
AS
BEGIN
    INSERT INTO ParametrosCostos
        (NombreParametro, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES(@NombreParametro, @IdCreadoPor, GETDATE(), 1)
END



-- Obteer parametros de costo:
GO
CREATE OR ALTER Procedure dbo.GetParametrosCostos
AS
BEGIN
    SELECT IdParametroCosto, NombreParametro
    FROM ParametrosCostos
END
GO
-- EXEC dbo.GetParametrosCostos



GO
CREATE or alter PROCEDURE [dbo].[InsertarProyecto]
    @Secuencia VARCHAR(20),
    @Nombre VARCHAR(255),
    @Descripcion VARCHAR(MAX),
    @FechaDeInicio DATETIME,
    @FechaDeFinalizacion DATETIME,
    @TiempoDuracionEstimado VARCHAR(70),
    @TiempoDuracionReal VARCHAR(50),
    @PresupuestoAcordado DECIMAL(18, 2),
    @ClienteEsPersonaFisica BIT,
    @IdEntidad INT,
    @IdEstado INT,
    @IdCreadoPor INT,
    -- @FechaCreacion DATETIME,
    @IdEstadoRegistro INT
-- Agregado este par�metro que estaba comentado
-- @IdModificadoPor INT
-- @FechaModificacion DATETIME
AS
BEGIN
    INSERT INTO Proyectos
        (
        Secuencia,
        Nombre,
        Descripcion,
        FechaDeInicio,
        FechaDeFinalizacion,
        TiempoDuracionEstimado,
        TiempoDuracionReal,
        PresupuestoAcordado,
        ClienteEsPersonaFisica,
        IdEntidad,
        IdEstado,
        IdCreadoPor,
        FechaCreacion,
        IdEstadoRegistro
        -- IdModificadoPor,
        -- FechaModificacion
        )
    VALUES
        (
            @Secuencia,
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
            @IdEstado,
            @IdCreadoPor,
            GETDATE(),
            @IdEstadoRegistro
        -- @IdModificadoPor,
        -- @FechaModificacion
    );

    SELECT SCOPE_IDENTITY()
END



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
    INSERT INTO ProyectosDetallesProductos
        (
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
    VALUES
        (
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
    INSERT INTO ProyectosEntidadesEmpresas
        (IdProyecto, IdEER)
    VALUES
        (
            @IdProyecto,
            (
            SELECT TOP 1
                EER.IdEER
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
    INSERT INTO ProyectosEntidadesPF
        (IdProyecto, IdEPFR)
    VALUES
        (
            @IdProyecto,
            (
            SELECT TOP 1
                EPFR.IdEPFR
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
    INSERT INTO ProyectosEmpleados
        (
        IdProyecto,
        IdResponsabilidad,
        IdEmpleado,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
        )
    VALUES
        (
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
    INSERT INTO GastosAdicionales
        (
        DescripcionGasto,
        MontoGasto,
        IdProyecto,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
        )
    VALUES
        (
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
    INSERT INTO ProyectosServicios
        (
        Descripcion,
        IdProyecto,
        IdServicio,
        IdCreadoPor,
        FechaCreacion,
        -- IdModificadoPor,
        -- FechaModificacion,
        IdEstadoRegistro
        )
    VALUES
        (
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
    INSERT INTO Tareas
        (
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
    VALUES
        (
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
    @Secuencia VARCHAR(20),
    @MontoInicial DECIMAL(18, 2),
    @MontoTotal DECIMAL(18, 2),
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
    INSERT INTO CotizacionesProyectos
        (
        --FechaDeEmision,
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
    VALUES
        (
            --GETDATE(), --@FechaDeEmision,
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
CREATE OR ALTER PROCEDURE [dbo].[ObtenerDatosProyecto]
    @IdProyecto INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1
    FROM Proyectos
    WHERE IdProyecto = @IdProyecto)
    BEGIN
        -- Si el proyecto no existe, devuelve NULL
        SELECT NULL AS 'ProyectoNoExiste';
        RETURN;
    END

    SELECT
        p.IdProyecto,
        p.Nombre AS 'NombreProyecto',
        p.Descripcion,
        p.FechaDeInicio,
        p.FechaDeFinalizacion,
        p.PresupuestoAcordado,
        cp.MontoInicial,
        en.NombreEntidad,
        ten.NombreTipoEntidad,
        ep.EstadoNombre AS 'EstadoProyecto',
        (SUM(CASE WHEN t.IdEstado = 3 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS PorcentajeCompletado,
        -- Total por tarea 
        (SELECT SUM(CostoTotal) as totalTarea
        FROM Tareas
        WHERE IdProyecto = p.IdProyecto) AS 'TotalTarea',
        (SELECT SUM(Subtotal) as totalProducto
        FROM ProyectosDetallesProductos
        WHERE IdProyecto = p.IdProyecto) AS 'TotalProducto',
        (SELECT SUM(MontoGasto) as totalGasto
        FROM GastosAdicionales
        WHERE IdProyecto = p.IdProyecto) AS 'TotalGasto',
        -- Lista de Servicio para el Proyecto
        (
            SELECT p.IdServicio, s.NombreServicio
        FROM ProyectosServicios p
            INNER JOIN Servicios s ON s.IdServicio = p.IdServicio
            INNER JOIN Proyectos r on r.IdProyecto = p.IdProyecto
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
            t.FechaRealDeFinalizacion,
            t.TiempDuracionEstimado,
            cp.NombreParametro,
            t.CostoPorParametro,
            t.Cantidad,
            t.CostoTotal,
            p.NombrePrioridad,
            ep.IdEstadoTarea,
            ep.NombreEstado,
            s.NombreServicio,
            s.IdServicio
        FROM Tareas t
            LEFT JOIN EstadosTareas et ON et.IdEstadoTarea = t.IdEstado
            LEFT JOIN Servicios s ON s.IdServicio = t.IdServicioRelacionado
            LEFT JOIN Prioridades p ON t.IdPrioridad = p.IdPrioridad
            LEFT JOIN ParametrosCostos cp ON cp.IdParametroCosto = t.IdParametroCosto
            LEFT JOIN EstadosTareas ep ON ep.IdEstadoTarea = t.IdEstado
        WHERE t.IdProyecto = @IdProyecto
        FOR JSON PATH
        ) AS 'TareasProyectoJson',
        -- Lista de Productos para el Proyecto
        (
            SELECT
            pp.Cantidad,
            pr.Nombre AS 'NombreProducto',
            pp.PrecioVenta,
            pp.ITBIS,
            pp.Subtotal
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
        ) AS 'EmpleadosProyectoJson',
        -- lista de cargo adicionales 
        ( 
            SELECT
            pp.DescripcionGasto,
            pp.MontoGasto
        FROM GastosAdicionales pp
        WHERE pp.IdProyecto = p.IdProyecto
        FOR JSON PATH
        ) AS 'GastoProyectoJson'
    FROM Proyectos p
        INNER JOIN Entidades en ON en.IdEntidad = p.IdEntidad
        INNER JOIN TiposEntidades ten ON ten.IdTipoEntidad = en.IdTipoEntidad
        INNER JOIN EstadosProyectos ep ON ep.IdEstado = p.IdEstado
        INNER JOIN Tareas t ON t.IdProyecto = p.IdProyecto
        INNER JOIN EstadosTareas e ON e.IdEstadoTarea = t.IdEstado
        INNER JOIN CotizacionesProyectos cp ON cp.IdProyecto = p.IdProyecto
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
        ten.NombreTipoEntidad,
        cp.MontoInicial
END



GO

GO

GO

GO

GO

GO

GO

GO

GO

GO

GO

GO

GO

GO

GO

GO
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
GO


-- // --------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- ----------- -----------
GO
CREATE OR ALTER PROCEDURE dbo.GetDatosPersonales
AS
BEGIN
    SELECT P.IdPersona, Nombres, Apellidos, Cedula, FechaDeNacimiento, Correo, Telefono1, Telefono2, Pa.IdPais, PaisNombre, C.IdCiudad, CiudadNombre, S.IdSexo, S.SexoNombre,
        PI.IdPersonaImagen, I.IdImagen, I.[FileName], I.ContentType, I.FileSize, I.[DATA] AS [Data], Direccion,

        CASE WHEN Cli.IdEntidad IS NOT NULL THEN CAST(1 AS bit) ELSE CAST(0 AS bit) END AS YaEstaAsociado
    FROM Personas P
        INNER JOIN Ciudades C ON P.IdCiudad = C.IdCiudad
        INNER JOIN Paises Pa ON C.IdPais = Pa.IdPais
        INNER JOIN Sexos S ON P.IdSexo = S.IdSexo
        LEFT JOIN PersonasImagenes PI ON PI.IdPersona = P.IdPersona
        LEFT JOIN Imagenes I ON PI.IdImagen = I.IdImagen
        LEFT JOIN EntidadesPersonasFisicas EPF ON P.IdPersona = EPF.IdPersona
        LEFT JOIN Clientes Cli ON EPF.IdEntidad = Cli.IdEntidad

    ORDER BY 
    P.IdPersona DESC, P.FechaModificacion DESC, P.FechaCreacion DESC;
END
GO
-- EXEC dbo.GetDatosPersonales


GO
CREATE OR ALTER PROCEDURE Get_EntidadCliente_By_IdPersona
    (@IdPersona INT)
AS
BEGIN
    SELECT IdCliente, Codigo, C.IdEntidad, FechaInicioCliente
    FROM Clientes C INNER JOIN Entidades E ON C.IdEntidad = E.IdEntidad
        INNER JOIN EntidadesPersonasFisicas EPF ON E.IdEntidad = EPF.IdEntidad
    WHERE EPF.IdPersona = @IdPersona
END



GO
CREATE OR ALTER PROCEDURE dbo.Get_Entidad_By_IdPersona
    (@IdPersona INT)
AS
BEGIN
    SELECT E.IdEntidad, NombreEntidad, IdTipoEntidad
    FROM Entidades E
        INNER JOIN EntidadesPersonasFisicas EPF ON E.IdEntidad = EPF.IdEntidad
    WHERE EPF.IdPersona = @IdPersona
END
GO



GO
CREATE OR ALTER PROCEDURE Get_PersonasTiposPersonas_By_IdPersona
    (@IdPersona INT)
AS
BEGIN
    SELECT *
    FROM PersonasTiposPersonas
    WHERE IdPersona = @IdPersona
END


GO
-- OBTENER ENTIDADES PERSONAS FISICAS BY ID PERSONAS:
CREATE OR ALTER PROCEDURE Get_EntidadesPersonasFisicas_By_IdPersona
    (@IdPersona INT)
AS
BEGIN
    SELECT IdEntidadPersonaFisica, IdEntidad, IdPersona
    FROM EntidadesPersonasFisicas
    WHERE IdPersona = @IdPersona
END


GO
-- OBTENER EntidadesPersonasFisicasRepresentantes BY IdEntidadPersonaFisica:
CREATE OR ALTER PROCEDURE dbo.Get_EntidadesPersonasFisicasRepresentantes_By_IdEntidadPersonaFisica
    (@IdEntidadPersonaFisica INT)
AS
BEGIN
    SET NOCOUNT ON
    SELECT IdEPFR, IdEntidadPersonaFisica, IdRepresentanteActual, IdRolRepresentante, FechaInicioRepresentante, FechaFinRepresentante
    FROM EntidadesPersonasFisicasRepresentantes
    WHERE IdEntidadPersonaFisica = @IdEntidadPersonaFisica AND FechaFinRepresentante IS NULL
END



GO
CREATE OR ALTER PROCEDURE dbo.GetDatosEmpresas
AS
BEGIN
    SELECT emp.IdEmpresa, NombreEmpresa, RNC, Correo, Telefono1, Telefono2, Pa.IdPais, PaisNombre, C.IdCiudad, CiudadNombre, GETDATE() AS Fundada,
        EI.IdEmpresaImagen, I.IdImagen, I.[FileName], I.ContentType, I.FileSize, I.[DATA] AS [Data], Direccion,
        CASE WHEN Cli.IdEntidad IS NOT NULL THEN CAST(1 AS bit) ELSE CAST(0 AS bit) END AS YaEstaAsociada
    FROM Empresas emp
        INNER JOIN Ciudades C ON emp.IdCiudad = C.IdCiudad
        INNER JOIN Paises Pa ON C.IdPais = Pa.IdPais
        LEFT JOIN EmpresasImagenes EI ON EI.IdEmpresa = emp.IdEmpresa
        LEFT JOIN Imagenes I ON EI.IdImagen = I.IdImagen
        LEFT JOIN EntidadesEmpresas EE ON emp.IdEmpresa = EE.IdEmpresa
        LEFT JOIN Clientes Cli ON Cli.IdEntidad = EE.IdEntidad

    ORDER BY 
    emp.IdEmpresa DESC, emp.FechaModificacion DESC, emp.FechaCreacion DESC;
END
GO
-- EXEC dbo.GetDatosEmpresas



GO
CREATE or  alter   PROCEDURE [dbo].[EstadoTarea]
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
            CP.FechaCreacion AS FechaDeEmision, MontoTotal, CP.Secuencia, C.IdCliente, E.NombreEntidad, E.IdTipoEntidad, TP.NombreTipoEntidad,
            CP.IdEstado, Py.IdProyecto, Py.Nombre AS NombreProyecto

        FROM CotizacionesProyectos CP INNER JOIN Clientes C ON CP.IdCliente = c.IdCliente
            INNER JOIN Entidades E ON C.IdEntidad = E.IdEntidad
            INNER JOIN TiposEntidades TP ON E.IdTipoEntidad = TP.IdTipoEntidad
            INNER JOIN Proyectos Py ON CP.IdProyecto = Py.IdProyecto
    UNION


        SELECT IdFactura AS IdDocumento, 2 AS IdTipoDocumento, 'Factura de proyecto' AS DocumentoNombre,
            FV.FechaCreacion AS FechaDeEmision, MontoTotal, FV.Secuencia, C.IdCliente, E.NombreEntidad, E.IdTipoEntidad, TP.NombreTipoEntidad,
            FV.IdEstadoFactura, Py.IdProyecto, Py.Nombre AS NombreProyecto

        FROM FacturasVentasProyectos FV INNER JOIN Proyectos Py ON FV.IdProyecto = Py.IdProyecto
            INNER JOIN Entidades E ON Py.IdEntidad = E.IdEntidad
            INNER JOIN Clientes C ON C.IdEntidad = E.IdEntidad
            INNER JOIN TiposEntidades TP ON E.IdTipoEntidad = TP.IdTipoEntidad
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
in (Select P.IdPersona
    FROM Empleados C INNER JOIN Personas P ON C.IdPersona = P.IdPersona
    WHERE C.IdEmpleado = @IdEmpleado )
END
go


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
    select IdCargo, NombreCargo
    from Cargos
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
    Insert Into EmpleadosCargos
        (IdEmpleado, IdCargo, Descripcion, IdCreadoPor, IdEstadoRegistro,FechaCreacion)
    VALUES(@IdEmpleado, @IdCargo, @Descripcion, @IdCreadoPor, 1, GETDATE())
END


GO



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
    VALUES( @IdPersona, @FechadDeContratacion, @IdCreadoPor, GETDATE(), 1)

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
    select IdRol , NombreRol
    from Roles
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
    (
    @NombreUsuario VARCHAR(MAX),
    @Correo VARCHAR(MAX),
    @Contraseña VARCHAR(MAX),
    @IdRol INT,
    @IdEmpleado INT,
    @IdCreadoPor INT
)

AS
BEGIN
    INSERT INTO Usuarios
        (NombreUsuario, Correo, Contraseña, IdRol, IdEmpleado,IdCreadoPor, FechaCreacion ,IdEstadoRegistro)
    VALUES
        (@NombreUsuario, @Correo, @Contraseña, @IdRol, @IdEmpleado, @IdCreadoPor , GETDATE(), 1)
END
go
CREATE OR ALTER PROCEDURE ActualizarUsuario
    (
    @IdUsuario INT,
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
CREATE or ALTER PROCEDURE dbo.ObtenerUnidadesMedida
AS
BEGIN
    SELECT IdUnidadDeMedida, UnidadNombre
    FROM UnidadesDeMedida
END
-- EXEC dbo.ObtenerUnidadesMedida
GO


GO
-- Crear un procedimiento almacenado para generar la secuencia de documentos
CREATE OR ALTER PROCEDURE GenerarSecuenciaDocumento
    @clave VARCHAR(60)
AS
BEGIN
    DECLARE @valorActual INT;
    DECLARE @valorAutoIncrementado INT;

    -- Obtener el valor actual para la clave especificada
    SELECT @valorActual = CONVERT(INT, Valor)
    FROM ConfiguracionesGenerales
    WHERE Clave = @clave;

    -- Verificar si se encontró un valor para la clave
    IF (@valorActual IS NOT NULL)
    BEGIN
        SELECT @valorAutoIncrementado = @valorActual +1

        -- Generar la secuencia de documento concatenando el valor con ceros a la izquierda
        DECLARE @secuenciaDocumento VARCHAR(60);

        SET @secuenciaDocumento =  @clave + RIGHT('0000000000000', 13 - LEN(@clave + CAST(@valorActual AS VARCHAR(10)))) + CAST(@valorAutoIncrementado AS VARCHAR(10));

        -- Actualizar el valor en ConfiguracionesGenerales
        UPDATE ConfiguracionesGenerales SET Valor = CONCAT(@valorAutoIncrementado, ''), FechaModificacion = GETDATE()  WHERE Clave = @clave;

        -- Imprimir o devolver la secuencia de documento generada
        SELECT @secuenciaDocumento AS SecuenciaGenerada;
    END
    ELSE
    BEGIN
        -- Si no se encontró un valor para la clave especificada
        RAISERROR('No se encontró una configuración para la clave especificada', 16, 1);
    END
END;




GO
CREATE OR ALTER PROCEDURE dbo.GetListaProductosInfoBasica
AS
BEGIN
    SELECT P.IdProducto, Nombre, Codigo, Descripcion, Modelo, TieneVencimiento, IdEstado, EP.EstadoNombre AS EstadoNombreProducto,
        P.IdEstadoRegistro, ER.NombreEstado, PI.IdProductoImagen, I.IdImagen, I.[FileName], I.ContentType, I.FileSize, I.[DATA] AS [Data],
        (
        SELECT PUDM.IdUnidadDeMedida, UDM.UnidadNombre, PrecioCosto, PrecioVenta, ITBIS,
            CASE WHEN e.CantidadExistente IS NULL THEN 0 ELSE e.CantidadExistente END AS CantidadExistente
        FROM ProductosUnidadesDeMedida PUDM INNER JOIN DetallesProductosUnidadesDeMedida DPUDM ON PUDM.IdProductoUnidadDeMedida = DPUDM.IdProductoUnidadDeMedida
            LEFT JOIN Existencias E ON E.IdUnidadMedida = DPUDM.IdUnidadDeMedida AND E.IdProducto = DPUDM.IdProducto
            INNER JOIN UnidadesDeMedida UDM ON UDM.IdUnidadDeMedida = PUDM.IdUnidadDeMedida
        WHERE PUDM.IdProducto = P.IdProducto
        FOR JSON PATH
    ) AS 'ProductosExistenciasJson'

    FROM Productos AS P INNER JOIN EstadosProductos EP ON P.IdEstado = EP.IdEstadoProducto
        INNER JOIN EstadosRegistros ER ON P.IdEstadoRegistro = ER.IdEstadoRegistro
        --- IMAGNEES
        LEFT JOIN ProductosImagenes PI ON P.IdProducto = PI.IdProducto
        LEFT JOIN Imagenes I ON PI.IdImagen = I.IdImagen
    ORDER BY IdProducto DESC
END
GO
-- EXEC dbo.GetListaProductosInfoBasica




----  PROCEDIMIENTO PARA INSERTAR EN PRODUCTOS ----------------- ---------------- ----------------- ---------------- --------------------- ------------------ ---------------- ----------:
GO
CREATE OR ALTER PROCEDURE dbo.InsertarProductoInv
    @Nombre VARCHAR(255),
    @Codigo VARCHAR(7),
    @Descripcion VARCHAR(255),
    @Modelo VARCHAR(50),
    @TieneVencimiento BIT,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Productos
        (Nombre, Codigo, Descripcion, Modelo, TieneVencimiento, IdEstado, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@Nombre, @Codigo, @Descripcion, @Modelo, @TieneVencimiento, 1, 1, GETDATE(), 1);

    Select SCOPE_IDENTITY();
END



GO
-- INSERTAR PRODUCTO
CREATE OR ALTER PROCEDURE dbo.InsertarExistencia
    @Descripcion VARCHAR(255),
    @Codigo VARCHAR(30),
    @CantidadExistente INT,
    @IdProducto INT,
    @IdUnidadMedida INT,
    @IdDetalleProductoUnidad INT,

    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insertar datos en la tabla Existencias
    INSERT INTO Existencias (
             Descripcion, Codigo, CantidadExistente, IdProducto, IdUnidadMedida, IdDetalleProductoUnidad, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES (@Descripcion, @Codigo, @CantidadExistente, @IdProducto, @IdUnidadMedida, @IdDetalleProductoUnidad, @IdCreadoPor, GETDATE(), 1);
END;




----  PROCEDIMIENTO PARA ACTUALIZAR EN PRODUCTOS ----------------- ---------------- ----------------- ---------------- --------------------- ------------------ ---------------- ----------:
GO
CREATE OR ALTER PROCEDURE dbo.UpdateProductoInv
    @IdProducto INT,
    @Nombre VARCHAR(255),
    @Codigo VARCHAR(7),
    @Descripcion VARCHAR(255),
    @Modelo VARCHAR(50),
    @TieneVencimiento BIT,
    @IdModificadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Productos SET 
        Nombre = @Nombre, Codigo = @Codigo, Descripcion = @Descripcion, Modelo = @Modelo, TieneVencimiento = @TieneVencimiento,
        IdModificadoPor = @IdModificadoPor, FechaModificacion = GETDATE()
    WHERE IdProducto = @IdProducto
END



GO
CREATE or ALTER PROCEDURE dbo.InsertarProductoUnidadDeMedida
    @IdUnidadDeMedida INT,
    @IdProducto INT,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ProductosUnidadesDeMedida
        (IdUnidadDeMedida, IdProducto, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdUnidadDeMedida, @IdProducto, @IdCreadoPor, GETDATE(), 1);

    SELECT SCOPE_IDENTITY();
END




GO
CREATE OR ALTER PROCEDURE dbo.InsertarDetalleProductoUnidadDeMedida
    @IdProducto INT,
    @IdUnidadDeMedida INT,
    @PrecioCosto DECIMAL(10, 2),
    @PrecioVenta DECIMAL(10, 2),
    @ITBIS DECIMAL(5, 2),
    @IdProductoUnidadDeMedida INT,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO DetallesProductosUnidadesDeMedida
        (IdProducto, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida, IdCreadoPor, FechaCreacion, IdEstadoRegistro)
    VALUES
        (@IdProducto, @IdUnidadDeMedida, @PrecioCosto, @PrecioVenta, @ITBIS, @IdProductoUnidadDeMedida, @IdCreadoPor, GETDATE(), 1);

    SELECT SCOPE_IDENTITY();
END



GO
CREATE OR ALTER PROCEDURE dbo.Get_ProductosUnidadesDeMedida_By_IdProducto
(
    @IdProducto INT
)
AS
BEGIN
    SELECT IdProductoUnidadDeMedida, IdUnidadDeMedida, IdProducto FROM ProductosUnidadesDeMedida 
    WHERE IdProducto = @IdProducto
END




GO
CREATE OR ALTER PROCEDURE dbo.Get_DetallesProductosUnidadesDeMedida_By_IdProducto
(
    @IdProductoUnidadDeMedida INT
)
AS
BEGIN
    SELECT IdDetalle, IdUnidadDeMedida, PrecioCosto, PrecioVenta, ITBIS, IdProductoUnidadDeMedida, IdProducto
     FROM DetallesProductosUnidadesDeMedida  
    WHERE IdProductoUnidadDeMedida = @IdProductoUnidadDeMedida
END



GO

-- Crear un procedimiento almacenado para Generar Secuencia NCF
CREATE OR ALTER PROCEDURE GenerarNCFSecuenciaDocumento
    @clave VARCHAR(60)
AS
BEGIN
    DECLARE @valorActual INT;
    DECLARE @valorAutoIncrementado INT;

    -- Obtener el valor actual para la clave especificada
    SELECT @valorActual = CONVERT(INT, Valor)
    FROM ConfiguracionesGenerales
    WHERE Clave = @clave;

    -- Verificar si se encontró un valor para la clave
    IF (@valorActual IS NOT NULL)
    BEGIN
        SELECT @valorAutoIncrementado = @valorActual +1

        -- Generar la secuencia de documento concatenando el valor con ceros a la izquierda
        DECLARE @secuenciaDocumento VARCHAR(60);

        SET @secuenciaDocumento =  @clave + RIGHT('0000000000000', 13 - LEN(@clave + CAST(@valorActual AS VARCHAR(10)))) + CAST(@valorAutoIncrementado AS VARCHAR(10));

        -- Actualizar el valor en ConfiguracionesGenerales
        UPDATE ConfiguracionesGenerales SET Valor = CONCAT(@valorAutoIncrementado, ''), FechaModificacion = GETDATE()  WHERE Clave = @clave;

        -- Imprimir o devolver la secuencia de documento generada
        SELECT @secuenciaDocumento AS SecuenciaGenerada;
    END
    ELSE
    BEGIN
        -- Si no se encontró un valor para la clave especificada
        RAISERROR('No se encontró una configuración para la clave especificada', 16, 1);
    END
END;


GO


CREATE OR ALTER PROCEDURE [dbo].[GenerarSecuenciaNCF]
(@tipoNCFId INT)
AS
BEGIN
     -- Verificar que no se haya vencido el NCF:
     IF EXISTS (SELECT 1 FROM NCF WHERE FechaVencimiento <= GETDATE() AND TipoNCFId = @tipoNCFId)
	 BEGIN
	     SELECT null AS Secuencia, 'Se ha vencido el NCF de tipo ' + (SELECT NombreCorto FROM TiposNCF WHERE IdTipoNCF = @tipoNCFId) AS Mensaje;
	 END

     -- Verificar que no se ha agotado el NCF:
     Else IF EXISTS (SELECT 1 FROM NCF WHERE Actual >= Limite AND TipoNCFId = @tipoNCFId)
	 BEGIN
	     SELECT null AS Secuencia, 'Se ha agotado el NCF de tipo ' + (SELECT NombreCorto FROM TiposNCF WHERE IdTipoNCF = @tipoNCFId) AS Mensaje;
	 END

	 ELSE
	 BEGIN
          DECLARE @codigo VARCHAR(10);
          SELECT @codigo = Codigo FROM NCF WHERE TipoNCFId = @tipoNCFId;

          DECLARE @actual INT;
          SELECT @actual = CAST(Actual AS INT) + 1 FROM NCF WHERE TipoNCFId = @tipoNCFId;

          -- Concatenar @valor, @codigo y @actual con ceros rellenados
          DECLARE @Secuencia VARCHAR(11);
          SET @Secuencia = @codigo + RIGHT('00000000000', 11 - LEN(@codigo + CAST(@actual AS VARCHAR(10)))) + CAST(@actual AS VARCHAR(10));

          -- INCREMENTAR SECUENCIA:
          UPDATE NCF SET Actual = @actual WHERE TipoNCFId = @tipoNCFId;

          -- RESULTADO:                     -- Preguntar si es mejor incrementar desde c# en visual studio:
          SELECT @Secuencia AS Secuencia, FechaVencimiento, /*@actual - 1 AS Actual,*/ NULL AS Mensaje FROM NCF WHERE TipoNCFId = @tipoNCFId;
	 END
END
GO




GO
CREATE OR ALTER PROCEDURE dbo.InsertarFacturaVentaProyecto
    @FechaDeEmision DATETIME,
    @MontoInicial DECIMAL(18, 2),
    @FechaDeVencimiento DATETIME,
    @FechaVencimientoNCF DATETIME,
    @MontoTotal DECIMAL(18, 2),
    @TipoNCFId INT,
    @Secuencia VARCHAR(20),
    -- @IdCliente INT,
    @IdProyecto INT,
    @IdEstadoFactura INT,
    @IdCreadoPor INT,
    @CantidadCuotas INT,
    @PorcientoMora DECIMAL(18, 2),
    @DiaPagoMensual INT,
    @DiasParaVencimiento INT,
    @IdTipoPlazo INT
AS
BEGIN
    INSERT INTO FacturasVentasProyectos (
        FechaDeEmision, MontoInicial, FechaDeVencimiento, FechaVencimientoNCF, MontoTotal,
        TipoNCFId, Secuencia, IdProyecto, IdEstadoFactura, IdCreadoPor,
        CantidadCuotas, PorcientoMora, DiaPagoMensual, DiasParaVencimiento, IdTipoPlazo,
        FechaCreacion, IdEstadoRegistro
    )
    VALUES (
        @FechaDeEmision, @MontoInicial, @FechaDeVencimiento, @FechaVencimientoNCF, @MontoTotal,
        @TipoNCFId, @Secuencia, @IdProyecto, @IdEstadoFactura, @IdCreadoPor,
        @CantidadCuotas, @PorcientoMora, @DiaPagoMensual, @DiasParaVencimiento, @IdTipoPlazo,
        GETDATE(), 1
    );

    -- Retorna el ID de la factura recién insertada
    SELECT SCOPE_IDENTITY() AS IdFactura;
END;




GO
CREATE or alter PROCEDURE InsertarDistribucionPago
    @IdFactura INT,
    @MontoAPagar DECIMAL,
    @FechaEmision DATETIME,
    @FechaVencimiento DATETIME,
    @SePago BIT,
    @IdCreadoPor INT,
    @CuotaNumero INT
AS
BEGIN
    INSERT INTO ProyectosDistribucionesPagos (
        IdFactura, MontoAPagar, FechaEmision, FechaVencimiento, SePago, IdCreadoPor, FechaCreacion, IdEstadoRegistro, CuotaNumero
    )
    VALUES (
        @IdFactura, @MontoAPagar, @FechaEmision, @FechaVencimiento, @SePago, @IdCreadoPor, GETDATE(), 1, @CuotaNumero
    );
END;



GO
CREATE OR ALTER PROCEDURE dbo.Get_EntidadesProveedores_ForSelect
AS
BEGIN
    SELECT E.IdEntidad, E.NombreEntidad, I.[FileName], I.ContentType, I.FileSize, I.[DATA]
    FROM Entidades E LEFT JOIN EntidadesImagenes EI ON E.IdEntidad = EI.IdEntidad
                     LEFT JOIN Imagenes I ON EI.IdImagen = I.IdImagen
                     INNER JOIN Proveedores P ON E.IdEntidad = P.IdEntidad

    WHERE E.IdEstadoRegistro != 2 AND P.IdEstadoRegistro != 2
END



go
CREATE OR ALTER PROCEDURE dbo.InsertarOrdenCompra
    @IdEntidadProveedor INT,
    @MontoTotal DECIMAL,
    @Secuencia VARCHAR(30),
    @FechaEmision DATETIME,
    @FechaEntrega DATETIME,
    @IdCiudadEntrega INT,
    @DireccionEntrega VARCHAR(MAX),
    @MontoInicial DECIMAL,
    @IdEstadoDocumento INT,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO OrdenesCompras (
        IdEntidadProveedor, MontoTotal, Secuencia, FechaEmision, FechaEntrega, IdCiudadEntrega, DireccionEntrega, MontoInicial, IdEstadoDocumento, IdCreadoPor, FechaCreacion, IdEstadoRegistro
    )
    VALUES (
        @IdEntidadProveedor, @MontoTotal, @Secuencia, @FechaEmision, @FechaEntrega, @IdCiudadEntrega, @DireccionEntrega, @MontoInicial, @IdEstadoDocumento, @IdCreadoPor, GETDATE(), 1
    );

    -- Retorna el valor del SCOPE_IDENTITY
    SELECT SCOPE_IDENTITY() AS IdOrdenCompra;
END;
GO


CREATE OR ALTER PROCEDURE InsertarDetalleOrdenCompra
    @IdProducto INT,
    @IdUnidadDeMedida INT,
    @IdOrdenCompra INT,
    @Cantidad INT,
    @Precio DECIMAL,
    @ITBIS DECIMAL,
    @Subtotal DECIMAL,
    @IdCreadoPor INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO OrdenesComprasDetalles (
        IdProducto, IdUnidadDeMedida, IdOrdenCompra, Cantidad, Precio, ITBIS, Subtotal, IdCreadoPor, FechaCreacion, IdEstadoRegistro
    )
    VALUES (
        @IdProducto, @IdUnidadDeMedida, @IdOrdenCompra, @Cantidad, @Precio, @ITBIS, @Subtotal, @IdCreadoPor, GETDATE(), 1
    );
END;



GO

CREATE OR ALTER PROCEDURE dbo.ListadoDocumentosCompras
AS
BEGIN
        SELECT IdOrdenCompra AS IdDocumento, 1 AS IdTipoDocumento, 'Orden de compra' AS DocumentoNombre,
            OC.FechaCreacion AS FechaDeEmision, MontoTotal, OC.Secuencia, OC.IdEntidadProveedor AS IdEntidad, E.NombreEntidad, E.IdTipoEntidad, TP.NombreTipoEntidad,
            OC.IdEstadoDocumento, ED.NombreEstadoDocumeto

        FROM OrdenesCompras OC INNER JOIN Entidades E ON OC.IdEntidadProveedor = E.IdEntidad
            INNER JOIN TiposEntidades TP ON E.IdTipoEntidad = TP.IdTipoEntidad
            INNER JOIN EstadosDocumentos ED ON OC.IdEstadoDocumento = ED.IdEstadoDocumento
END
-- EXEC dbo.ListadoDocumentosCompras


GO
CREATE OR ALTER PROCEDURE dbo.GetOrdenCompraById
(@IdOrdenCompra INT)
AS
BEGIN
    SELECT IdOrdenCompra, IdEntidadProveedor, NombreEntidad, NombreTipoEntidad, MontoTotal, Secuencia, FechaEmision, FechaEmision, FechaEntrega,
           IdCiudadEntrega, PaisNombre, CiudadNombre, DireccionEntrega, MontoInicial
    FROM OrdenesCompras OC INNER JOIN Ciudades C ON OC.IdCiudadEntrega = C.IdCiudad 
                           INNER JOIN Paises P ON C.IdPais = P.IdPais
                           INNER JOIN Entidades E ON OC.IdEntidadProveedor = E.IdEntidad
                           INNER JOIN TiposEntidades TE ON TE.IdTipoEntidad = E.IdTipoEntidad
    WHERE IdOrdenCompra = @IdOrdenCompra
END
-- EXEC dbo.GetOrdenCompraById @IdOrdenCompra = 3


GO
CREATE OR ALTER PROCEDURE dbo.GetOrdenCompraDetallesById
(@IdOrdenCompra INT)
AS
BEGIN
    SELECT IdDetalleOrdenCompra, P.IdProducto, p.Codigo, P.Nombre, UD.IdUnidadDeMedida, ud.UnidadNombre, IdOrdenCompra, Cantidad, Precio, ITBIS, Subtotal
     FROM OrdenesComprasDetalles OCD INNER JOIN UnidadesDeMedida UD ON OCD.IdUnidadDeMedida = UD.IdUnidadDeMedida
                                     INNER JOIN Productos P ON OCD.IdProducto = P.IdProducto
     WHERE IdOrdenCompra = @IdOrdenCompra
END
-- EXEC dbo.GetOrdenCompraDetallesById @IdOrdenCompra = 3



GO

CREATE OR ALTER PROCEDURE AprobarOrdenCompra
(@ordenId INT)
AS
BEGIN
    UPDATE OrdenesCompras SET IdEstadoDocumento = 1 WHERE IdOrdenCompra = @ordenId
END



GO

CREATE OR ALTER PROCEDURE IncrementarInventario
    @OrdenId INT
AS
BEGIN
    UPDATE E
    SET CantidadExistente = E.CantidadExistente + OCD.Cantidad
    FROM Existencias E
    JOIN OrdenesComprasDetalles OCD ON E.IdProducto = OCD.IdProducto AND E.IdUnidadMedida = OCD.IdUnidadDeMedida
    WHERE OCD.IdOrdenCompra = @OrdenId;
END;


GO
CREATE OR ALTER PROCEDURE DisminuirInventario
    @ProyectoId INT
AS
BEGIN
    UPDATE E
    SET CantidadExistente = E.CantidadExistente + OCD.Cantidad
    FROM Existencias E
    JOIN ProyectosDetallesProductos OCD ON E.IdProducto = OCD.IdProducto AND E.IdUnidadMedida = OCD.IdUnidadDeMedida
    WHERE OCD.IdProyecto = @ProyectoId;
END;




GO
CREATE OR ALTER PROCEDURE ObtenerDatosProcesarPagosProyecto
    @IdProyecto INT
AS
BEGIN
    SELECT
        fp.FechaDeEmision,
        fp.MontoInicial,
        fp.FechaDeVencimiento,
        fp.FechaVencimientoNCF,
        fp.CantidadCuotas,
        fp.PorcientoMora,
        fp.DiaPagoMensual,
        fp.DiasParaVencimiento,
        tp.NombrePlazo,
        fp.MontoTotal,
        fp.TipoNCFId,
        fp.Secuencia,
      
        (
            SELECT
				pp.IdDistribucionPago,
                pp.IdFactura,
                pp.CuotaNumero,
                pp.MontoAPagar,
                pp.FechaEmision,
                pp.FechaVencimiento,
                pp.SePago
            FROM ProyectosDistribucionesPagos pp
                INNER JOIN FacturasVentasProyectos f ON f.IdFactura = pp.IdFactura
            WHERE f.IdProyecto = fp.IdProyecto 
            FOR JSON PATH
        ) AS 'CuotaProyectoJson'
       
    FROM
        FacturasVentasProyectos fp
        INNER JOIN Proyectos p ON p.IdProyecto = fp.IdProyecto
        INNER JOIN TiposPlazos tp ON tp.IdTipoPlazo = fp.IdTipoPlazo
        INNER JOIN Entidades en ON en.IdEntidad = p.IdEntidad
        INNER JOIN TiposEntidades ten ON ten.IdTipoEntidad = en.IdTipoEntidad
        INNER JOIN EstadosProyectos ep ON ep.IdEstado = p.IdEstado
    WHERE
        fp.IdProyecto = @IdProyecto;
END
GO



go
GO
CREATE or alter PROCEDURE InsertarPagoFacturaVenta
    @Fecha DATEtime,
    @MontoPago DECIMAL(18, 2),
    @MontoMora DECIMAL(18, 2),
    @MontoTotal DECIMAL(18, 2),
    @FechaPago DATE,
    @MontoEfectivo DECIMAL(18, 2),
    @DevolucionEfectivo DECIMAL(18, 2),
    @MontoTarjeta DECIMAL(18, 2),
    @Tarjeta VARCHAR(50),
    @IdTipoPago INT,
    @IdDistribucionPago INT,
    @IdCreadoPor VARCHAR(50)
AS
BEGIN
    INSERT INTO PagosFacturasVentas (
        Fecha, 
        MontoPago,
        MontoMora, 
        MontoTotal, 
        FechaPago, 
        MontoEfectivo, 
        DevolucionEfectivo, 
        MontoTarjeta, 
        Tarjeta, 
        IdTipoPago, 
        IdDistribucionPago,
        IdCreadoPor, 
        FechaCreacion,  
        IdEstadoRegistro
    )
    VALUES (
        @Fecha, 
        @MontoPago, 
        @MontoMora, 
        @MontoTotal, 
        @FechaPago, 
        @MontoEfectivo, 
        @DevolucionEfectivo, 
        @MontoTarjeta, 
        @Tarjeta, 
        @IdTipoPago, 
        @IdDistribucionPago, 
        @IdCreadoPor,
        GETDATE(), 
        1
    );

    UPDATE ProyectosDistribucionesPagos 
    SET SePago =1 
    WHERE IdDistribucionPago = @IdDistribucionPago;
END



