USE BD_PROYENETT_MV

GO
----------- /*1--*/ Procedimiento almcenado para obtener una lista general de clientes (empresas y personas fisicas):
CREATE PROCEDURE dbo.GetListaCenerallientes
AS
BEGIN
    SELECT C.IdCliente, NombreEntidad, C.Codigo, NombreTipoEntidad, P.Cedula AS Identificacion, 
	       P.Telefono1 AS Telefono, Correo, C.FechaInicioCliente, CiudadNombre, PaisNombre
	FROM Entidades E INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
	                 INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
	                 INNER JOIN EntidadesPersonasFisicas EPF ON E.IdEntidad = EPF.IdEntidad
					 INNER JOIN Personas P ON EPF.IdPersona = P.IdPersona
					 INNER JOIN Ciudades Ci ON P.IdCiudad = Ci.IdCiudad
					 INNER JOIN Paises Pa ON Ci.IdPais = Pa.IdPais

	UNION ALL

	SELECT C.IdCliente, NombreEntidad, C.Codigo, NombreTipoEntidad, EM.RNC AS Identificacion, 
	       EM.Telefono1 AS Telefono, Correo, C.FechaInicioCliente, CiudadNombre, PaisNombre
	FROM Entidades E INNER JOIN TiposEntidades TE ON E.IdTipoEntidad = TE.IdTipoEntidad
	                 INNER JOIN Clientes C ON E.IdEntidad = C.IdEntidad
	                 INNER JOIN EntidadesEmpresas EE ON E.IdEntidad = EE.IdEntidad
					 INNER JOIN Empresas EM ON EE.IdEmpresa = EM.IdEmpresa
					 INNER JOIN Ciudades Ci ON EM.IdCiudad = Ci.IdCiudad
					 INNER JOIN Paises Pa ON Ci.IdPais = Pa.IdPais
END

GO
EXEC dbo.GetListaCenerallientes