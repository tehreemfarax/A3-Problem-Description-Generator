import React from "react";
import codeo from "../images/imgg/cedeo.webp";
import ics from "../images/imgg/lcs.webp";
import scrum from "../images/imgg/scrum-org.webp";
import iascc from "../images/imgg/iassc.webp";
import circular from "../images/imgg/beste-adviesbureau-2024-sticker.png";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 relative">
      {/* Circular Image Overlay */}
      <div className="absolute -top-14 right-2 transform -translate-x-1/2 z-10 rotate-12">
        <img
          src={circular}
          alt="Beste Adviesbureau"
          className="w-52 h-auto object-cover"
        />
      </div>

      <div className="container mx-auto flex lg:flex-row flex-col justify-between items-start gap-10 px-6 text-left">
        {/* UPD Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">UPD</h3>
          <p>Rijksstraatweg 115</p>
          <p>3632 AB Loenen a/d Vecht</p>
          <p>020 - 345 3015</p>
          <p>contact@upd.nl</p>
        </div>

        {/* Information Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Informatie</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-customyellow flex gap-3">
                <ChevronRightIcon className="text-customyellow h-5 my-auto" />
                Opleidingen
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-customyellow flex gap-3">
                <ChevronRightIcon className="text-customyellow h-5 my-auto" />
                Opleidingsoverzicht
              </a>
            </li>
            <li>
              <a href="#" className="hover:text--customyellow flex gap-3">
                <ChevronRightIcon className="text-customyellow h-5 my-auto" />
                Veelgestelde vragen
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-customyellow flex gap-3">
                <ChevronRightIcon className="text-customyellow h-5 my-auto" />
                Ons MVO Beleid
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-customyellow flex gap-3">
                <ChevronRightIcon className="text-customyellow h-5 my-auto" />
                Contact opnemen
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Volg ons...</h3>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center space-x-2 hover:text-customyellow"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-6 h-6"
              />
              <span>LinkedIn</span>
            </a>
          </div>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="hover:text-customyellow">
                Privacyverklaring
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-customyellow">
                Algemene Voorwaarden
              </a>
            </li>
          </ul>
        </div>

        {/* Images Section */}
        <div className="my-auto pt-20">
          <div className="flex flex-row">
            <a href="#">
              <img src={codeo} alt="codeo" className="w-auto h-24" />
            </a>
            <a href="#">
              <img src={ics} alt="isc" className="w-28 h-auto" />
            </a>
            <a href="#">
              <img src={scrum} alt="scrum" className="w-28 h-auto" />
            </a>
            <a href="#">
              <img src={iascc} alt="isacc" className="w-28 h-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
