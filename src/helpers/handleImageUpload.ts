import React from "react";

type Props = {
  e: React.ChangeEvent<HTMLInputElement>;
  setHandleImage: any;
};

const preset_key = "tckwqxsq";
const cloud_name = "dji4mudpi";

const handleImageUpload = async ({ e, setHandleImage }: Props) => {
  const file = e.target.files?.[0];

  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    const reader = new FileReader();

    reader.onload = () => {
      setHandleImage({
        url: `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formdata: formData,
        preview: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }
};

export default handleImageUpload;
