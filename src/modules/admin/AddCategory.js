"use client"

import styles from "../../app/admin/addpost/addpost.module.css";


function AddCategory({ setCategory}) {
  const categories = [
    "الکترونیک",
    "پوشاک",
    "کفش",
    "زیورآلات و اکسسوری",
    "سلامت و زیبایی",
    "خانه و آشپزخانه",
    "کتاب و لوازم تحریر",
    "ورزش و سرگرمی",
    "مواد غذایی و نوشیدنی",
    "ابزار و خودرو",
    "متفرقه",
  ];

  return (
    <div className={styles.selectcategory}>
      <select onChange={(e)=>setCategory(e.target.value)} defaultValue={"متفرقه"}>
        <option value={"متفرقه"}>دسته بندی</option>
        {categories.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddCategory;
