import React from "react";
import Image from "next/image";

type Props = {  };

const Logo = (props: Props) => {
  return (
    <Image
      className="logo"
      src="/check-list.png"
      alt="Picture of the author"
      width={100}
      height={100}
    />
  );
};

export default Logo;
