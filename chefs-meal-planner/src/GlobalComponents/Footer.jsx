import React from "react";
import "../Style/footer.css";

/**
 * Footer component for the Exploring National Parks application.
 * Renders a footer with the application name and an animated tree image.
 * @module Footer
 * @memberof GlobalComponents
 * @returns {JSX.Element} The rendered Footer component.
 * 
 */
const Footer = () => {
  return (
    <div className="footer">
      <span>
        <p>Exploring New Recipes</p>
        <img
          src="https://web.archive.org/web/20091027005003im_/http://it.geocities.com/aniellobarra/Img/Clip/Animated/tree.gif"
          alt=""
        />
      </span>
    </div>
  );
};

export default Footer;
