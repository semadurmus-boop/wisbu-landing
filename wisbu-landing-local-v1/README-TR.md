# Wisbu Landing — Yerel Önizleme

Bu paket yalnızca bilgisayarınızda önizleme almak için hazırlanmıştır. Wisbu'nun canlı sitesine veya mevcut ürününe bağlı değildir. OpenAI API anahtarı veya token gerektirmez.

## Çalıştırma

1. Bilgisayarınızda Node.js 22 veya daha yeni bir sürümün kurulu olduğundan emin olun.
2. ZIP dosyasını klasöre çıkarın ve klasörü VS Code ile açın.
3. VS Code içinde **Terminal > New Terminal** seçeneğine tıklayın.
4. Aşağıdaki komutları sırayla çalıştırın:

   ```bash
   npm install
   npm run dev
   ```

5. Terminalde görünen yerel adresi tarayıcıda açın. Varsayılan adres:

   ```text
   http://localhost:5173
   ```

Terminal açık kaldığı sürece önizleme çalışır. Kapatmak için terminalde `Ctrl + C` tuşlarına basın.

## Düzenlenecek temel dosyalar

- `app/page.tsx`: Sayfa içeriği ve etkileşimler
- `app/globals.css`: Tasarım, renkler ve responsive yapı
- `public/assets/wisbu-dashboard.webp`: Kullanılan Wisbu ürün görseli

