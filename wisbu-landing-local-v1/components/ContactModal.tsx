"use client";

import { useState, useRef, useEffect } from "react";

const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
  "Düzce", "Yurt dışı"
];

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [citySelected, setCitySelected] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredCities = cities.filter((c) =>
    c.toLocaleLowerCase("tr-TR").includes(citySearch.toLocaleLowerCase("tr-TR"))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-[600] text-slate-800">Ücretsiz Transfer Talebi</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form className="p-6 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Ad ve Soyad</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Adınız Soyadınız"
                maxLength={75}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Telefon No</label>
              <input
                type="tel"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="0 (5XX) XXX XX XX"
                maxLength={17}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              />
            </div>
          </div>

          <div className="space-y-1" ref={dropdownRef}>
            <label className="text-sm font-medium text-slate-700">Şehir</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Şehir Ara veya Seç"
                maxLength={50}
                value={isCityDropdownOpen ? citySearch : citySelected}
                onChange={(e) => {
                  setCitySearch(e.target.value.replace(/[0-9]/g, ''));
                  setIsCityDropdownOpen(true);
                  if (citySelected) setCitySelected("");
                }}
                onClick={() => setIsCityDropdownOpen(true)}
              />
              <svg
                className={`absolute right-3 top-3 h-5 w-5 text-slate-400 pointer-events-none transition-transform ${
                  isCityDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>

              {isCityDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <div
                        key={city}
                        className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer text-sm text-slate-700 transition-colors"
                        onClick={() => {
                          setCitySelected(city);
                          setCitySearch("");
                          setIsCityDropdownOpen(false);
                        }}
                      >
                        {city}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2.5 text-sm text-slate-500">Sonuç bulunamadı.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-slate-700">Mesaj</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm min-h-[120px] resize-none"
              placeholder="Eklemek istedikleriniz..."
              maxLength={500}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
              {message.length}/500
            </div>
          </div>

          <button className="w-full py-3.5 bg-[#312e81] text-white font-[600] rounded-full text-base sm:text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-4">
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
}
