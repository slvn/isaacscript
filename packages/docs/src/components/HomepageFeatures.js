import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import React from "react";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "The Entire Isaac API, Strongly Typed",
    img: "img/items/magic-mushroom.png",
    description: (
      <>
        <li>Code fearlessly without having to worry about making a typo.</li>
        <li>
          Mouseover functions to see what they do, saving you from opening the
          docs.
        </li>
      </>
    ),
  },
  {
    title: "Powered by TypeScriptToLua",
    img: "img/typescript-to-lua.png",
    description: (
      <>
        <li>
          IsaacScript leverages the excellent{" "}
          <a href="https://typescripttolua.github.io/">TypeScriptToLua</a>{" "}
          library.
        </li>
        <li>
          All of your favorite TypeScript features will be automatically
          transpiled to Lua.
        </li>
      </>
    ),
  },
];

function Feature({ title, img, description }) {
  const imgStyle = {
    height: "7.5em",
    width: "7.5em",
  };

  // cspell:ignore horiz
  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <img src={useBaseUrl(img)} style={imgStyle} alt={title} />
      </div>
      <div className="padding-horiz--md">
        <h3 className="text--center">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
