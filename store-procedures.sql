USE BD_PROYENETT_MV14

GO
----------- /*1--*/ Procedimiento almcenado para obtener una lista general de clientes (empresas y personas fisicas):
	CREATE OR ALTER PROCEDURE dbo.GetListaCenerallientes
	AS
	BEGIN
		SELECT 
			C.IdCliente,
			CASE WHEN NombreEntidad IS NULL THEN P.Nombres + ' ' + P.Apellidos ELSE NombreEntidad END AS NombreEntidad,
			C.Codigo,
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

		UNION ALL

		SELECT 
			C.IdCliente,
			CASE WHEN NombreEntidad IS NULL THEN EM.NombreEmpresa ELSE NombreEntidad END AS NombreEntidad,
			C.Codigo,
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

