import React from "react";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCards = ({ product }) => {
  const { title, description, images } = product;
  return (
    <div>
      <Card
        className="my-3"
        hoverable
        style={{
          width: 300,
          objectFit: "cover",
        }}
        cover={
          <img
            alt="example"
            src={
              images
                ? images[0].url
                : "https://i.pcmag.com/imagery/reviews/0333NkfZrGoua687nkaStJP-24.fit_scale.size_760x427.v1612545761.png"
            }
          />
        }
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default AdminProductCards;
