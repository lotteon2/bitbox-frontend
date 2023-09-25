import React from "react";
import circle from "../../assets/images/footer/circle.png";
import townNight from "../../assets/images/footer/town_night.png";
import townDay from "../../assets/images/footer/town_day.png";
import man from "../../assets/images/footer/man.png";
import family from "../../assets/images/footer/family.png";

import { darkmodeState } from "../../recoil/atoms/common";
import "../../css/footer.css";
import { useRecoilValue } from "recoil";

export default function Footer() {
  const isDark = useRecoilValue(darkmodeState);
  return (
    <footer className="relative">
      <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-grayscale3 to-grayscale1 opacity-50 dark:from-grayscale6 dark:to-grayscale7"></div>
      <section className="mt-10">
        <article className="town">
          <img src={circle} className="circle" alt="" />
          {isDark ? (
            <img src={townNight} className="night" alt="" />
          ) : (
            <img src={townDay} className="day" alt="" />
          )}
        </article>

        <article className="people">
          <img src={man} className="man" alt="" />
          <img src={family} className="family" alt="" />
        </article>
      </section>
      <div className="text-center m-auto">
        <div>
          <p className="text-grayscale7 dark:text-grayscale4">
            Copyright &copy; All rights reserved | BITBOX
          </p>
        </div>
      </div>
    </footer>
  );
}
