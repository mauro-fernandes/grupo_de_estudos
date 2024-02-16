import React from "react";
import Image from "next/image";

type Props = {};

const MyImageCompnt = (props: Props) => {
  return (
    <>
      <div>
        <a href="#">
          <Image  src="/todo.webp" alt="" width="500" height={300} priority={true}/>
        </a>
      </div>
    </>
  );
};

export default MyImageCompnt;
