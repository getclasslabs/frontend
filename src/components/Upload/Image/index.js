import React, { useState, useRef, useEffect } from "react";
import { IoMdImage } from "react-icons/io";
import { useField } from "@rocketseat/unform";
import PropTypes from "prop-types";

import api from "~/services/api";

import { Container } from "./styles";

export default function Image({ image }) {
  const { defaultValue, registerField } = useField("image");

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: "image",
        ref: ref.current,
        path: "dataset.file",
      });
    }
  }, [ref, registerField]);

  useEffect(() => {
    if (image) {
      setFile(image.id);
      setPreview(image.url);
    }
  }, [image]);

  async function handleChange(e) {
    const data = new FormData();

    data.append("file", e.target.files[0]);

    const response = await api.post("files", data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="image">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div>
            <IoMdImage
              size={40}
              style={{ color: "#DDDDDD", marginLeft: "35px" }}
            />
            <span>Adicionar foto</span>
          </div>
        )}

        <input
          type="file"
          id="image"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

Image.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
