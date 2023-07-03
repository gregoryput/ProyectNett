import { FormContainer } from "./LoginStyled/Form";
import { Input } from "./LoginStyled/Input";
import { Label } from "./LoginStyled/Label";
import { Button } from "./LoginStyled/Button";
import { DivContainerPage } from "./LoginStyled/DivContainerPage";
import { ButtonPassword, DivPassword } from "./LoginStyled/DivPassword";
import { ButtonInformation } from "./Menu/ButtonInformation";
import { Avatar } from "./Menu/Avatar";
import { DivNav } from "./Menu/DivNav";
import { DivRotate } from "./Menu/DivRotate";
import { DropdownContent } from "./Menu/DropdownContent";
import { DivButtonSesion } from "./Menu/DivButtonSesion";
import { ButtonTheme } from "./Menu/ButtonTheme";
import { ButtonOption } from "./Menu/ButtonOption";
import { DivContainerNav } from "./MenuNavegacion/DivContainerNav";
import { ButtonNav } from "./MenuNavegacion/ButtonNav";
import { LabelNav } from "./MenuNavegacion/LabelNav";
import { Column } from "./LayoutComponent/Column";
import { Row } from "./LayoutComponent/Row";
import { ViewContainerPages } from "./LayoutComponent/ViewContainerPages";
import { DivRoll } from "./Menu/DivRoll";
import { Spinner } from "./LoadingSpinnerForms/loadingSpinnerForms.styled";
import { ContainerButton } from "./Formularios/ContainerButton";
import { DivAnimetor } from "./Formularios/divAnimetor";
import { ContainerForm } from "./Formularios/ContainerForm";
import { InputFor } from "./Formularios/InputFor";
import { LabelFor } from "./Formularios/LabelFor";
import { Option, Select } from "./Formularios/Select";
import { ContainerTable } from "./Formularios/ContainerTable";
import { PrincipalContainerForm } from "./Formularios/ContainerForm";
import { ContainerFormPrueba } from "./Formularios/ContainerForm";

/// importanciones de los componente
export {
  /// componente de login
  FormContainer,
  Input,
  Label,
  Button,
  DivContainerPage,
  DivPassword,
  ButtonPassword,

  ///importacion de estilo de menu de informacion
  ButtonInformation as ButtonMenu,
  Avatar,
  DivNav,
  DivRotate,
  DropdownContent,
  DivButtonSesion,
  ButtonTheme,
  ButtonOption,

  ///importacion de estilo de menu de navegacion
  DivContainerNav,
  ButtonNav,
  LabelNav,

  //importacion de estilo de layout
  Column,
  Row,
  ViewContainerPages,
  DivRoll,

  /// pantallla y componente de cargas
  Spinner,

  //// componente de formularios de cliente proveedores ...
  ContainerButton,
  DivAnimetor,
  ContainerForm,
  InputFor,
  LabelFor,
  Option,
  Select,
  ContainerTable,
  PrincipalContainerForm,
  ContainerFormPrueba,
};
