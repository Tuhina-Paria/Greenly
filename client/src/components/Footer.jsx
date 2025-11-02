import { footerLinks } from "../assets/assets.js"; // ✅ only import what's needed

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 bg-primary/10">
      {/* 🌿 Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-8 border-b border-gray-300/30 text-gray-600">
        
        {/* ✅ Brand Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 sm:w-10 sm:h-10"
              src="/favicon.svg"
              alt="Greenly Logo"
            />
            <span className="text-lg sm:text-xl font-bold text-green-600">
              reenly
            </span>
          </div>

          <p className="max-w-[410px] mt-3 text-gray-700 leading-relaxed text-sm sm:text-base">
            Greenly is your trusted online grocery store delivering farm-fresh
            vegetables, fruits, and daily essentials with care, quality, and a
            touch of green freshness.
          </p>
        </div>

        {/* ✅ Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-[60%]">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-3 sm:mb-4">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
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
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {currentYear}{" "}
        <span className="text-green-600 font-semibold">Greenly</span> — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
