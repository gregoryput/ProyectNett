export interface IClienteDTO {
  IdCliente: number;
  NombreEntidad: string;
  Codigo: string;
  IdTipoEntidad: number;
  NombreTipoEntidad: string;
  Identificacion: string;
  Telefono: string;
  Correo: string;
  FechaInicioCliente: Date;
  CiudadNombre: string;
  PaisNombre: string;
  //
  IdImagen: number;
  FileName: string;
  ContentType: string;
  FileSize: number;
  Data: string;
}

export interface IActionsDAT {
  Name: string;
  Title: string;
  Method: () => void;
  Icon: JSX.Element;
}

export interface IActionsNew {
  Name: string;
  Title: string;
  Method: () => void;
  Icon: JSX.Element;
  Value: number;
}

export interface IResponseApi<T> {
  IsSuccess: boolean;
  DisplayMessage: true;
  Result: Array<T>;
  RrrorMessage: string | null;
}

export interface IResponseApiObject<T> {
  IsSuccess: boolean;
  DisplayMessage: true;
  Result: T;
  ErrorMessage: string | null;
}

export interface IPropsBtnMov {
  Title?: string;
  Method: () => void;
  Enabled: boolean;
}

export interface IButtonsMov {
  Back: IPropsBtnMov;
  Next: IPropsBtnMov;
}

export type TFormType = "form-ce" | "form-cp";

export interface IPais {
  IdPais: number;
  PaisNombre: string;
}

export interface ICiudad {
  IdCiudad: number;
  CiudadNombre: string;
  IdPais: number;
}

export interface IPersona {
  IdPersona: number;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  Telefono1: string;
  Telefono2: string;
  Correo: string;
  FechaDeNacimiento: Date;
  IdSexo: number;
  IdPais?: number | undefined | null;
  IdCiudad: number;
  Direccion: string;

  IdCreadoPor?: number;
  FechaCreacion?: string;
  IdModificadoPor?: number;
  FechaModificacion?: string;
  IdEstadoRegistro?: number;

  PersonaTiposPersona?: IPersonaTipoPersona[];

  DataImagenPersona?: {
    Imagen: IImagen;
    PersonaImagen: IPersonaImagen;
  };
}

export interface IPersonaConAsociado {
  IdPersona: number;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  Telefono1: string;
  Telefono2: string;
  Correo: string;
  FechaDeNacimiento: Date;
  IdSexo: number;
  IdPais?: number | undefined | null;
  IdCiudad: number;
  Direccion: string;

  IdCreadoPor?: number;
  FechaCreacion?: string;
  IdModificadoPor?: number;
  FechaModificacion?: string;
  IdEstadoRegistro?: number;

  PersonaTiposPersona?: IPersonaTipoPersona[];

  DataImagenPersona?: {
    Imagen: IImagen;
    PersonaImagen: IPersonaImagen;
  };

  YaEstaAsociado: boolean;
}

interface IPersonaImagen {
  IdPersonaImagen: number;
  IdImagen: number;
  IdPersona: number;
}

export interface IPersonaTipoPersona {
  IdPersonaTipoPersona: number;
  IdPersona: number;
  IdTipoPersona: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

export interface IImagen {
  IdImagen: number;
  FileName: string;
  ContentType: string;
  FileSize: number;
  Data: string | null;
  IdCreadoPor?: number;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

export interface PersonaInfoPersonalDTO {
  IdPersona: number;
  Nombres: string;
  Apellidos: string;
  Cedula: string;
  FechaDeNacimiento: Date;
  Correo: string;
  Telefono1: string;
  Telefono2: string;

  Direccion: string;

  // Propiedades para la relación con País
  IdPais: number;
  PaisNombre: string;

  // Propiedades para la relación con Ciudad
  IdCiudad: number;
  CiudadNombre: string;

  // Propiedades para la relación con Sexo
  IdSexo: number;
  SexoNombre: string;

  // Propiedades para la relación con Imagen
  IdImagen?: number | null;
  FileName?: string | null;
  ContentType?: string | null;
  FileSize?: number | null;
  Data?: string | null; // Representa los datos de imagen como un array de bytes o nulo

  PersonaTiposPersona?: IPersonaTipoPersona[];

  IdPersonaImagen: number;

  YaEstaAsociado: boolean;
}

export interface IDocumentoDTO {
  IdDocumento: number;
  IdTipoDocumento: number;
  DocumentoNombre: string;
  FechaDeEmision: Date;
  MontoTotal: number;
  Secuencia: string;
  IdCliente: number;
  NombreEntidad: string;
  IdTipoEntidad: number;
  NombreTipoEntidad: string;
  IdEstado: number;
  IdProyecto: number;
  NombreProyecto: string;
}

export interface IProductoInv {
  IdProducto: number;
  Nombre: string;
  Codigo: string;
  Descripcion: string;
  Modelo: string;
  TieneVencimiento: boolean;
  IdEstado: number;
  EstadoNombreProducto: string;
  IdEstadoRegistro: number;
  NombreEstado: string;
  ContentType: any; // Puedes cambiar el tipo si conoces la estructura de los datos
  Data: string | null; // Puedes cambiar el tipo si conoces la estructura de los datos
  ProductoExistencias: IProductoExistencia[];
}

export interface IProductoExistencia {
  IdUnidadDeMedida: number;
  PrecioCosto: number;
  PrecioVenta: number;
  ITBIS: number;
  UnidadNombre: string;
  CantidadExistente: number;
}
