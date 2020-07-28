import React, { useState } from 'react';
import styles from "./index.scss";
import { Link } from 'react-router-dom';

function IndexPage() {
  // const [count, setCount] = useState(0);
  return (
    <div className={styles.page}>
      <div className={styles.helloword}>
        <p>helloword</p>
      </div>
      <Link to={'/about'}>about</Link>
    </div>
  );
}
export default IndexPage;
