import React from "react";
import { useDropzone } from "react-dropzone";

import { Card, CardBody } from "@nextui-org/react";

interface Props {}

const Uploader = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (...args) => {
      console.log(args);
    },
  },
  );

  return (
    <Card isPressable>
      <CardBody>
        <div {...getRootProps({ className: "dropzone" })}>
          添加附件
          <input {...getInputProps()} />
        </div>
      </CardBody>
    </Card>
  );
};

export default Uploader;
