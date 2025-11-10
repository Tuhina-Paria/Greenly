import { footerLinks } from "../assets/assets.js";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-6 bg-primary/10">
      {/* 🌿 Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 py-5 border-b border-gray-300/30 text-gray-600">
        
        {/* ✅ Brand Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 sm:w-9 sm:h-9"
              src="/favicon.svg"
              alt="Greenly Logo"
            />
            <span className="text-lg sm:text-xl font-bold text-black-600">
              reenly
            </span>
          </div>

          <p className="max-w-[380px] mt-2 text-gray-700 leading-relaxed text-sm">
            Greenly is your trusted online grocery store delivering farm-fresh
            vegetables, fruits, and daily essentials with care and quality.
          </p>
        </div>

        {/* ✅ Footer Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full md:w-[60%]">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-sm text-gray-900 mb-2">
                {section.title}
              </h3>
              <ul className="text-xs space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-green-600 transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 🌿 Bottom Section */}
      <p className="py-3 text-center text-xs md:text-sm text-gray-500/80">
        © {currentYear}{" "}
        <span className="text-black-600 font-semibold">Greenly</span> — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
