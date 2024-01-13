//import React from "react";
import { Image } from "antd";
import PropTypes from "prop-types";
import { FaProductHunt } from "react-icons/fa";

export default function CustomAvatar({
  sizeImage,
  sizeIcon,
  Data,
  ContentType,
}) {
  return (
    <div
      style={{
        minWidth: `${sizeImage}px`,
        maxWidth: `${sizeImage}px`,
        minHeight: `${sizeImage}px`,
        maxHeight: `${sizeImage}px`,
        background: "#C6C6C6",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "7px",
      }}
    >
      {Data != null ? (
        <Image
          style={{
            minWidth: `${sizeImage}px`,
            maxWidth: `${sizeImage}px`,
            minHeight: `${sizeImage}px`,
            maxHeight: `${sizeImage}px`,
            borderRadius: "50%",
            border: "2px solid #C6C6C6",
          }}
          onClick={(e) => e.stopPropagation()}
          src={`data:${ContentType};base64,${Data}`}
        />
      ) : (
        <FaProductHunt color="#818181" size={sizeIcon} />
      )}
    </div>
  );
}

CustomAvatar.propTypes = {
  sizeImage: PropTypes.number.isRequired,
  sizeIcon: PropTypes.number.isRequired,
  Data: PropTypes.string, // Assuming Data is a base64 encoded string
  ContentType: PropTypes.string,
};
