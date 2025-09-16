"use client";

import styles from "../../app/admin/addpost/addpost.module.css";

function Features({features, setFeaturs , value, setvalue}) {
 

  const changeHandler = (val, index) => {
    const newvalues = [...value];
    newvalues[index] = val;
    setvalue(newvalues);
  };

  const addHandler = (index) => {
    if (value[index].trim() === "")return
    setFeaturs([...features, value[index]]);
    setvalue([...value, ""]);
  };
  const deleteHandler = (index) => {
    const newValues = value.filter((_, i) => i !== index);
    setFeaturs(newValues);
    setvalue(newValues);
  };
  return (
    <div>
      {value.map((item, index) => (
        <div className={styles.inputdiv} key={index}>
          <input
            type="text"
            value={item}
            onChange={(e) => changeHandler(e.target.value, index)}
          />
          {index === 0 ? (
            <button className={styles.submitButton} type="button" onClick={() => addHandler(index)}>اضافه کردن</button>
          ) : (
            <div className={styles.adddiv} >
              <button className={styles.submitButton} type="button" onClick={() => addHandler(index)}>اضافه کردن</button>
              <button className={styles.submitButton} type="button" onClick={() => deleteHandler(index)}>حذف کردن</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Features;
