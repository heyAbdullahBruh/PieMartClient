import { useState, useEffect } from 'react';
import styles from './popup.module.css';

export default function Popup({ trigger,message,type}) {
  const [visible, setVisible] = useState(false);

  const showPopup = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  // Automatically show Popup when 'trigger' changes to true
  useEffect(() => {
    if (trigger) {
      showPopup();
    }
  }, [trigger]);

  return (
    <>
      {visible && (
        <div className={styles.popup} style={{backgroundColor:type?'green':'red'}}>
          <span>{type?'✔':'×'} {message}..!</span>
          <button className={styles.closeButton} onClick={() => setVisible(false)}>×</button>
        </div>
      )}
    </>
  );
}
