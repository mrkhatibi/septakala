"use client";

import Image from "next/image";
import icon from "../../public/icon.png";
import styles from "./Header.module.css";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

import { IconButton, Drawer, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSession, signOut } from "next-auth/react";
import { useData } from "@/reducer/CartReducer";
import getAllPosts from "@/modules/getAllPosts";
import { useRouter } from "next/navigation";

function Header() {
  const [userStatus, setUserStatus] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getsession() {
      const session = await getSession();
      if (session) {
        setUserStatus(true);
      }
    }
    getsession();
  }, []);
  const { state } = useData();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  const searchHandler = async () => {
    console.log(search);
    router.push(`products?search=${search}`);
  };
  return (
    <>
      <div position="static">
        <div>
          {isMobile ? (
            <div className={styles.mobilecontainer}>
              <div>
                {userStatus ? (
                  <button className={styles.headerbuttonmobile}>
                    <p>{state.itemsCounter}</p>
                    <Link href={"/dashboard/mycart"}>
                      <IoCartOutline size={"20px"} />
                    </Link>
                  </button>
                ) : null}
                <button className={styles.headerbuttonmobile}>
                  {userStatus ? (
                    <Link href={"/dashboard"}>
                      <FaRegUser size={"20px"} />
                    </Link>
                  ) : (
                    <Link href={"/signup"}>ورود | ثبت نام</Link>
                  )}
                </button>
              </div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
            </div>
          ) : (
            // حالت دسکتاپ
            <div className={styles.container}>
              <div className={styles.topheader}>
                {/* top pf header */}
                <div className={styles.toprightheader}>
                  <div className={styles.searchdiv}>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="جستجو کنید"
                    />
                    <IoSearchOutline
                      onClick={() => searchHandler()}
                      color="white"
                      size={30}
                      className={styles.searchicon}
                    />
                  </div>
                  <Link href={"/"}>
                    <Image
                      src={icon}
                      alt="icon"
                      width={190}
                      height={100}
                      priority
                    />
                  </Link>
                </div>
                <div>
                  {userStatus ? (
                    <button className={styles.headerbutton}>
                      <p>{state.itemsCounter}</p>
                      <Link href={"/dashboard/mycart"}>
                        <IoCartOutline size={"20px"} />
                      </Link>
                    </button>
                  ) : null}
                  <button className={styles.headerbutton}>
                    {userStatus ? (
                      <Link href={"/dashboard"}>
                        <FaRegUser size={"20px"} />
                      </Link>
                    ) : (
                      <Link href={"/signup"}>ورود | ثبت نام</Link>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drawer برای موبایل */}
      <Drawer
        PaperProps={{
          sx: {
            width: 260,
            height: "40vh",
            backgroundColor: "rgba(10,26,26,0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "12px",
            padding: "2rem 1rem",
            border: "1px solid rgba(255,255,255,0.2)",
          },
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <div className={styles.drawerbuttons}>
          <div className={styles.searchdivmobile}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="جستجو کنید"
            />
            <IoSearchOutline
              onClick={() => searchHandler()}
              color="white"
              size={30}
              className={styles.searchiconmobile}
            />
          </div>
          <button>
            <Link href={"/"}>خانه</Link>
          </button>
          <button>
            <Link href={"/products"}>کالاها</Link>
          </button>
          {userStatus && (
            <button onClick={() => signOut()}>خروج از حساب</button>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default Header;
