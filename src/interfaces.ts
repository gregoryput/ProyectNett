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

export interface IEntidadProveedorDTO {
  IdEntidad: number;
  NombreEntidad: string;
  FileName?: string | null;
  ContentType?: string | null;
  FileSize?: number | null;
  Data?: Uint8Array | null;
}

export interface EmpresaInfoDTO {
  IdEmpresa: number;
  NombreEmpresa: string;
  RNC: string;
  Correo: string;
  Telefono1: string;
  Telefono2: string;
  IdPais: number;
  PaisNombre: string;
  IdCiudad: number;
  CiudadNombre: string;
  Fundada: Date;
  IdEmpresaImagen?: number;
  IdImagen?: number;
  FileName?: string;
  ContentType?: string;
  FileSize?: number;
  Data?: string; //
  Direccion: string;
  YaEstaAsociada: boolean;
}

export interface IEmpresa {
  IdEmpresa: number;
  NombreEmpresa: string;
  RNC: string;
  Correo: string;
  IdPais: number;
  Telefono1: string;
  Telefono2: string;
  SitioWeb: string;
  Direccion: string;
  IdCiudad: number;

  IdCreadoPor?: number;
  FechaCreacion?: string;
  IdModificadoPor?: number;
  FechaModificacion?: string;
  IdEstadoRegistro?: number;

  DataImagenEmpresa?: {
    Imagen: IImagen;
    EmpresaImagen: IEmpresaImagen;
  };
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

  Entidad: IEntidad;
}

export interface IPersonaImagen {
  IdPersonaImagen: number;
  IdImagen: number;
  IdPersona: number;
}

export interface IEmpresaImagen {
  IdEmpresaImagen: number;
  IdImagen: number;
  IdEmpresa: number;
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

  Entidad: IEntidad | null;
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

export interface IDocumentoCompraDTO {
  IdDocumento: number;
  IdTipoDocumento: number;
  DocumentoNombre: string;
  FechaDeEmision: Date;
  MontoTotal: number;
  MontoInicial: number;
  Secuencia: string;
  IdEntidad: number;
  NombreEntidad: string;
  IdTipoEntidad: number;
  NombreTipoEntidad: string;
  IdEstado: number;
  NombreEstadoDocumeto:string;
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

// -------------------------------------------------------------------------------------------
export interface IEntidad {
  IdEntidad: number;
  NombreEntidad: string;
  IdTipoEntidad: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
  EntidadRolEntidad?: IEntidadRolEntidad | null;
  EntidadPersonaFisica?: IEntidadPersonaFisica | null;
  EntidadPersonaFisicaRepresentante?: IEntidadPersonaFisicaRepresentante | null;
  ClienteEntidad?: IClienteEntidad | null;
}

export interface IEntidadRolEntidad {
  IdEntidadRolEntidad: number;
  IdEntidad: number;
  IdRolEntidad: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

export interface IEntidadPersonaFisica {
  IdEntidadPersonaFisica: number;
  IdEntidad: number;
  IdPersona: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

export interface IEntidadPersonaFisicaRepresentante {
  IdEPFR: number;
  IdEntidadPersonaFisica: number;
  IdRepresentanteActual: number;
  IdRolRepresentante: number;
  FechaInicioRepresentante: Date;
  FechaFinRepresentante: Date;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

interface IClienteEntidad {
  IdCliente: number;
  Codigo: string;
  IdEntidad: number;
  FechaInicioCliente: Date;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

// -----------------------------------------------------------------------------------------------------------------------

export interface IProductInv {
  IdProducto: number;
  Nombre: string;
  Codigo: string;
  Descripcion: string;
  Modelo: string;
  TieneVencimiento: boolean;
  IdEstado?: number | null;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
  ProductoUnidadesMedidaDetalles?: ProdutoDetalleUnidadMedidaDetalle[] | null;
  // ------------------
  DataImagenProducto?: {
    Imagen: IImagen;
    ProductoImagen: IProductoImagen;
  };
}

interface ProdutoDetalleUnidadMedidaDetalle {
  ProductoUnidadDeMedida: ProductoUnidadDeMedida;
  DetalleProductoUnidadDeMedida: DetalleProductoUnidadDeMedida;
}

interface ProductoUnidadDeMedida {
  IdProductoUnidadDeMedida: number;
  IdUnidadDeMedida: number;
  IdProducto: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

interface DetalleProductoUnidadDeMedida {
  IdProducto: number;
  IdUnidadDeMedida: number;
  PrecioCosto: number;
  PrecioVenta: number;
  ITBIS: number;
  IdProductoUnidadDeMedida: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

export interface IProductoImagen {
  IdPrductoImagen: number;
  IdImagen: number;
  IdProducto: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

// orden-compra.interface.ts
export interface IOrdenCompra {
  IdOrdenCompra: number;
  IdEntidadProveedor: number;
  MontoTotal: number;
  MontoInicial?: number; // Puede ser opcional, según el modelo de datos en SQL Server
  Secuencia: string;
  FechaEmision: Date;
  FechaEntrega: Date;
  IdCiudadEntrega: number;
  DireccionEntrega: string;
  IdEstadoDocumento: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
  OrdenCompraDetalles?: IOrdenCompraDetalle[] | null;
}

// orden-compra-detalle.interface.ts
export interface IOrdenCompraDetalle {
  IdDetalleOrdenCompra: number;
  IdProducto: number;
  IdUnidadDeMedida: number;
  IdOrdenCompra: number;
  Cantidad: number;
  Precio: number;
  ITBIS: number;
  Subtotal: number;
  IdCreadoPor?: number | null;
  FechaCreacion?: Date | null;
  IdModificadoPor?: number | null;
  FechaModificacion?: Date | null;
  IdEstadoRegistro?: number | null;
}

export interface IOrdenCompraDTO {
  IdOrdenCompra: number;
  IdEntidadProveedor: number;
  MontoTotal: number;
  Secuencia: number;
  FechaEmision: Date;
  FechaEntrega: Date;
  IdCiudadEntrega: number;
  PaisNombre: string;
  CiudadNombre: string;
  DireccionEntrega: string;
  MontoInicial: number;
  NombreEntidad: string;
  NombreTipoEntidad: string;
  DetallesOrdenCompra?: IOrdenCompraDetalleDTO[];
}

export interface IOrdenCompraDetalleDTO {
  IdDetalleOrdenCompra: number;
  IdProducto: number;
  Codigo: string;
  Nombre: string;
  IdUnidadDeMedida: number;
  UnidadNombre: string;
  IdOrdenCompra: number;
  Cantidad: number;
  Precio: number;
  ITBIS: number;
  Subtotal: number;
}
