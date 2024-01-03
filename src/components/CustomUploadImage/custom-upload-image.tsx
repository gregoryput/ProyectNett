import { Form, UploadFile } from "antd";
import React from "react";
import {
  ContainerPrincipal,
  ContainerSubPrincipal,
  DivAreaFoto,
  DivFooterFoto,
  DivUtilNoImage,
  ImageAntd,
} from "./custom-upload-image.styled";
import Upload, { RcFile } from "antd/es/upload";

import { FcAddImage } from "react-icons/fc";
import { MdImageNotSupported } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FcEditImage } from "react-icons/fc";
import { MdRemoveRedEye } from "react-icons/md";
import { IPersona } from "../../interfaces";

interface ICustomUploadImageProps {
  fileList: UploadFile<any>[];
  setFileList: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  width: string;
  dataEditPersona: IPersona | undefined;
  deleteImageEditMode: boolean;
  setDeleteImageEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomUploadImage = ({
  fileList,
  setFileList,
  width,
  dataEditPersona,
  deleteImageEditMode,
  setDeleteImageEditMode,
}: ICustomUploadImageProps) => {
  console.log("deleteImageEditMode", deleteImageEditMode);

  return (
    <ContainerPrincipal width={width}>
      <Form.Item name={"fotoCliente"}>
        <ContainerSubPrincipal>
          <DivAreaFoto>
            {dataEditPersona !== undefined && fileList.length == 0 ? (
              dataEditPersona.DataImagenPersona?.Imagen.Data != null &&
              deleteImageEditMode == false ? (
                <ImageAntd
                  src={`data:${dataEditPersona.DataImagenPersona?.Imagen?.ContentType};base64,${dataEditPersona.DataImagenPersona?.Imagen?.Data}`}
                  alt={`Imagen-${dataEditPersona.DataImagenPersona?.Imagen?.FileName}`}
                />
              ) : (
                renderNoImage()
              )
            ) : fileList.length > 0 ? (
              <ImageAntd
                src={URL.createObjectURL(fileList[0].originFileObj as RcFile)}
                alt={`Imagen-${fileList[0].fileName}`}
              />
            ) : (
              renderNoImage()
            )}
          </DivAreaFoto>

          {/*FOOTER DEL CIRCULO*/}
          <DivFooterFoto>
            <Upload
              listType="picture"
              multiple={false}
              name="EntidadFoto"
              maxCount={1}
              showUploadList={false}
              onChange={(infoFiles) => {
                const selectedFiles = infoFiles.fileList;
                // Agregar archivos únicos a fileList
                setFileList(selectedFiles);
              }}
            >
              {fileList.length === 0 &&
              dataEditPersona?.DataImagenPersona?.Imagen.Data === null ? (
                <FcAddImage
                  size={20}
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    deleteImageEditMode === true
                      ? setDeleteImageEditMode(false)
                      : false
                  }
                />
              ) : (
                <FcEditImage size={20} style={{ marginRight: "5px" }} />
              )}
            </Upload>

            <MdRemoveRedEye
              size={21}
              color="#8CBCD6"
              style={{ marginRight: "2px" }}
            />
            <MdDelete
              size={20}
              color="#8CBCD6"
              onClick={() => setDeleteImageEditMode(true)}
            />
          </DivFooterFoto>
        </ContainerSubPrincipal>
      </Form.Item>
    </ContainerPrincipal>
  );
};

export default CustomUploadImage;

const renderNoImage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <DivUtilNoImage>
        <MdImageNotSupported size={25} color="#90BFD9" />
      </DivUtilNoImage>
      <DivUtilNoImage>
        <span style={{ fontWeight: "bold", color: "#C6C6C6" }}>No img</span>
      </DivUtilNoImage>
    </div>
  );
};
