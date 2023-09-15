import React from "react";
import circle from "../../assets/images/footer/circle.png";
import townNight from "../../assets/images/footer/town_night.png";
import townDay from "../../assets/images/footer/town_day.png";
import man from "../../assets/images/footer/man.png";
import family from "../../assets/images/footer/family.png";

import {darkMode} from "../../recoil/atoms/common";
import "../../css/footer.css";
import {useRecoilValue} from "recoil";

export default function Footer() {
	const isDark = useRecoilValue(darkMode);
    return <footer>
		<section className="mt-10">
			<article className="town">
				<img src={circle} className="circle" alt="" />
				{isDark ? <img src={townNight} className="night" alt="" /> : <img src={townDay} className="day" alt="" />}
			</article>

			<article className="people">
				<img src={man} className="man" alt="" />
				<img src={family} className="family" alt="" />
			</article>
		</section>
		<div className="text-center m-auto">
			<div>
				<p className="text-grayscale5 dark:text-grayscale4">
					Copyright &copy;
					All rights reserved | BITBOX</p>
			</div>
		</div>
    </footer>;
}