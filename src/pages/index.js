import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import { firstRow, secondRow, thirdRow } from "../data/features";

function FirstRow({ title, description }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={"../../img/cardImage.svg"} />
      <img className={styles.basic} src={"../../img/basic.svg"} />
      <img className={styles.arrow} src={"../../img/arrow.svg"} />
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

function SecondRow({ title, description }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={styles.cardSecond}>
      <img className={styles.cardImage} src={"../../img/cardImage.svg"} />
      <img className={styles.basic} src={"../../img/basic.svg"} />
      <img className={styles.secondArrow} src={"../../img/arrow.svg"} />
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.secondDescription}>{description}</p>
    </div>
  );
}

function ThirdRow({ imageUrl, title, description }) {
  // const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={styles.cardThird}>
      <img className={styles.cardImage} src={"../../img/cardImage.svg"} />
      <img className={styles.basic} src={"../../img/basic.svg"} />
      <img className={styles.thirdArrow} src={"../../img/arrow.svg"} />
      <h1 className={styles.thirdHeading}>{title}</h1>
      <p className={styles.thirdDescription}>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout>
      <header className={styles.explore}>
        <h1 className={styles.headline}>
          {" "}
          Welcome to Matic Developer Documentation{" "}
        </h1>{" "}
        <div>
          <Link to={useBaseUrl("docs/resources/new-to-matic")}>
            <h2 className={styles.headlineDescription}>Start Exploring </h2>
            <img className={styles.vector} src={"../../img/vector.svg"} />{" "}
          </Link>{" "}
          <div>
            <img className={styles.headerImage} src={"../../img/header.svg"} />{" "}
          </div>
        </div>
      </header>{" "}
      <main>
        <div className={styles.firstContainer}>
          <h1 className={styles.head}>Getting Started</h1>
          <p className={styles.subHead}>
            Here a few easy ways to quickly get started, each one appealing to a
            different use case
          </p>{" "}
        </div>
        <div>
          {firstRow && firstRow.length && (
            <div className={styles.cardContainer}>
              {firstRow.map((props, idx) => (
                <FirstRow key={idx} {...props} />
              ))}{" "}
            </div>
          )}{" "}
          {secondRow && secondRow.length && (
            <div className={styles.cardContainerSecond}>
              {secondRow.map((props, idx) => (
                <SecondRow key={idx} {...props} />
              ))}{" "}
            </div>
          )}{" "}
        </div>
        <div className={styles.secondContainer}>
          <h1 className={styles.head}>Tools and Libraries</h1>
          <p className={styles.subHead}>
            Here a few easy ways to quickly get started, each one appealing to a
            different use case
          </p>{" "}
        </div>
        <div>
          {thirdRow && thirdRow.length && (
            <div className={styles.cardContainerThird}>
              {thirdRow.map((props, idx) => (
                <ThirdRow key={idx} {...props} />
              ))}{" "}
            </div>
          )}{" "}
        </div>
        <div className={styles.anyQuestionBackground}></div>
        <div className={styles.anyQuestion}>
          <h1 className={styles.anyQuestionHeading}>Any question?</h1>
          <p className={styles.anyQuestionDesc}>
            Here a few easy ways to quickly get started, each one appealing to a
            different use case
          </p>
          <button className={styles.forum} href="#">
            <img className={styles.forumImage} src={"../../img/forum.svg"} />
            <div className={styles.forumContent}>Forum</div>
          </button>
          <button className={styles.discord} href="#">
            <img className={styles.discordImage} src={"../../img/discord.svg"} />
            <div className={styles.discordContent}>Chat with us</div>
          </button>
        </div>
      </main>{" "}
    </Layout>
  );
}

export default Home;
