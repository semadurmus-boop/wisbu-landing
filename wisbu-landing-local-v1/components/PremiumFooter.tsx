"use client";
import { useEffect, useRef, useState } from "react";

export function FooterCTA({ flat = false }: { flat?: boolean }) {
  const content = (
    <section className="premium-footer__cta">
      <div className="premium-footer__message">
        <span className="premium-footer__kicker font-[600]">YÖNETİMİ SADELEŞTİRMENİN TAM ZAMANI</span>
        <h2 className="premium-footer__title font-[600]">
          Bina yönetiminin<br />
          <span className="premium-footer__title-highlight">daha akıllı</span> haliyle tanışın.
        </h2>
        <p className="premium-footer__desc font-[400]">Aidattan finansal raporlamaya, tüm yönetim süreçleri tek yerde.</p>
      </div>
      <div className="premium-footer__actions flex flex-col sm:flex-row items-center justify-end gap-4 w-full">
        <a href="https://app.wisbu.net/pages/authentication/register" className="h-[54px] md:h-[56px] px-[28px] bg-[#fbfbfe] !text-[#312e81] font-[600] rounded-full text-base sm:text-lg shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-indigo-500/30 hover:-translate-y-[2px] hover:bg-white transition-all duration-200 flex justify-center items-center w-full sm:w-auto">30 Gün Ücretsiz Deneyin</a>
        <a href="https://app.wisbu.net/pages/authentication/login" className="h-[54px] md:h-[56px] px-[28px] bg-transparent backdrop-blur-md !text-white font-[600] rounded-full text-base sm:text-lg border border-[#a29bf3]/40 shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:bg-white/10 hover:shadow-indigo-500/30 hover:-translate-y-[2px] transition-all duration-200 flex justify-center items-center w-full sm:w-auto">Giriş Yap</a>
      </div>
    </section>
  );

  if (flat) {
    return (
      <div className="article-footer-cta bg-[#1e1b4b] text-[#f8f6ff]">
        <div className="w-[min(calc(100%-48px),var(--content-max))] mx-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
}

export default function PremiumFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="premium-footer" ref={footerRef}>
      <div
        className={`premium-footer__inner container-main mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <FooterCTA />

        <div className="premium-footer__divider" />

        <section className="premium-footer__navigation">
          <div className="premium-footer__brand flex flex-col">
            <img src="/assets/wisbu-marka.svg" alt="Wisbu" className="premium-footer__logo" />
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-[11px] font-[600] tracking-[0.15em] text-[#b9aef7] uppercase">
                BİR ARCODEX TEKNOLOJİSİ
              </span>
              <p className="text-[14px] text-[#a59ce0] font-[400] leading-[1.4] max-w-[260px]">
                Wisbu, Arcodex tarafından geliştirilen bina yönetim teknolojisidir.
              </p>
            </div>
          </div>
          <div className="premium-footer__group">
            <h4 className="premium-footer__group-title font-[600]">Ürün</h4>
            <a href="/#how" className="font-[400]">Nasıl Çalışır?</a>
            <a href="/#features" className="font-[400]">Özellikler</a>
            <a href="/#guven" className="font-[400]">Güven</a>
          </div>
          <div className="premium-footer__group">
            <h4 className="premium-footer__group-title font-[600]">Kaynaklar</h4>
            <a href="/#guide" className="font-[400]">Rehber</a>
            <a href="/#faq" className="font-[400]">SSS</a>
            <a href="https://wisbu.net/contact.html" className="font-[400]">İletişim</a>
          </div>
          <div className="premium-footer__group">
            <h4 className="premium-footer__group-title font-[600]">Yasal</h4>
            <a href="https://wisbu.net/contract-clarification.html" className="font-[400]">KVKK</a>
            <a href="https://wisbu.net/contract-user.html" className="font-[400]">Kullanıcı Sözleşmesi</a>
          </div>
          <div className="premium-footer__support">
            <div className="premium-footer__support-status">
              <span className="premium-footer__status-dot"></span>
              Destek ekibi yanınızda
            </div>
            <a href="https://wisbu.net/contact.html" className="premium-footer__support-link">İletişim</a>
          </div>
        </section>

        <div className="premium-footer__bottom">
          <div className="premium-footer__copyright">© 2026 Wisbu. Tüm hakları saklıdır.</div>
          <div className="premium-footer__legal-links">
            <span>Akıllı bina yönetim sistemi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
