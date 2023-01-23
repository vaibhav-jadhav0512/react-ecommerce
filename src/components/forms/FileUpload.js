import React from "react";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";

const FileUpload = ({ values, setvalues, setloading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const fileUploadAndResize = async (e) => {
    let files = [...e.target.files];
    let allUploadedFiles = values.images;
    if (files) {
      setloading(true);
      for (let i = 0; i < files.length; i++) {
        await axios
          .post(
            `http://localhost:9000/cloudinary/image/upload`,
            { file: files[i] },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                "content-type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            allUploadedFiles.push(res.data);
            setvalues({ ...values, images: allUploadedFiles });
            setloading(false);
          })
          .catch((err) => {
            setloading(false);
            console.log(err);
          });
      }
    }
  };
  const handleImageRemove = (imgId) => {
    setloading(true);
    axios
      .post(
        `http://localhost:9000/cloudinary/image/delete?imgId=${imgId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        setloading(false);
        const { images } = values;
        let filteredImg = images.filter((item) => {
          return Object.values(Object.keys(item))[0] !== imgId;
        });
        setvalues({ ...values, images: filteredImg });
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  return (
    <>
      <div>
        {values.images &&
          values.images.map((i) => (
            <Badge
              count="X"
              key={Object.values(Object.keys(i))[0]}
              offset={[-10, 10]}
              onClick={() =>
                handleImageRemove(Object.values(Object.keys(i))[0])
              }
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={Object.values(Object.values(i))[0]}
                size={80}
                shape="square"
                className="mx-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row col-md-2">
        <label className="btn btn-primary">
          Choose file
          <input
            type="file"
            multiple
            accept="images/*"
            className="d-none"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
