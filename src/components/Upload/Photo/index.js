import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoMdImage } from "react-icons/io";
import { useField } from "@rocketseat/unform";
import PropTypes from "prop-types";

import api from "~/services/api";

import { Container } from "./styles";

export default function Image({ image }) {
  const userLogged = useSelector((state) => state.user.profile);
  const { defaultValue, registerField } = useField("image");

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
      setPreview(image);
    }
  }, [image]);

  async function handleChange(e) {
    const data = new FormData();

    data.append("photo", e.target.files[0]);

    if (preview) {
      await api.delete("user/photo", {
        headers: { Authorization: "Bearer " + userLogged.jwt },
      });
    }

    const response = await api.put("user/photo", data, {
      headers: { Authorization: "Bearer " + userLogged.jwt },
    });

    const { image } = response.data;

    setPreview(`http://localhost:3000/user/images/${image}`);
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
              style={{ color: "#DDDDDD", margin: "0 auto" }}
            />
            <span>Adicionar foto</span>
          </div>
        )}

        <input
          type="file"
          id="image"
          accept="image/*"
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
