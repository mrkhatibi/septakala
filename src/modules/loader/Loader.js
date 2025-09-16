"use client";

import React from "react";
import styles from "./loader.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}
