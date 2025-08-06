# Laman Web Carian Lagu

Ini adalah sebuah prototaip laman web interaktif yang membolehkan pengguna mencari dan menapis lagu berdasarkan genre, bahasa, dan huruf pertama tajuk lagu.

Projek ini dibina menggunakan HTML, CSS, dan JavaScript tulen, dan direka bentuk dengan antara muka yang bersih dan menarik.

## Ciri-ciri
- **Penapisan Pelbagai Kriteria:** Tapis lagu mengikut genre, bahasa, dan abjad.
- **Reka Bentuk Menarik:** Menggunakan fon estetik dan palet warna Pink Lembut, Mint, dan Putih.
- **Animasi Halus:** Menggunakan pustaka Animate On Scroll (AOS) untuk memaparkan tajuk, penapis, dan hasil carian dengan menarik.
- **Antara Muka Responsif:** Direka untuk berfungsi pada pelbagai saiz skrin.

## Menguruskan Data Lagu

Untuk menambah, mengubah, atau memadam lagu, anda hanya perlu mengedit fail `songs.json`. Pastikan setiap entri lagu mengekalkan format JSON yang betul seperti di bawah:

```json
{
  "id": "L019",
  "title": "Nama Lagu Baru",
  "artist": "Nama Artis",
  "genre": "Genre Muzik",
  "language": "Bahasa Lagu"
}
```

-   Pastikan tiada koma (`,`) selepas objek `{...}` terakhir dalam senarai.

## Pemasangan di Netlify (Cara Mudah)

Laman web ini adalah laman statik, jadi ia sangat mudah untuk dipasang di perkhidmatan hosting seperti Netlify.

1.  **Daftar/Log Masuk ke Netlify:** Pergi ke [https://www.netlify.com/](https://www.netlify.com/) dan buat akaun percuma atau log masuk.
2.  **Muat Turun Fail Projek:** Pastikan anda mempunyai ketiga-tiga fail projek ini dalam satu folder di komputer anda:
    - `index.html`
    - `style.css`
    - `script.js`
3.  **Seret dan Lepas (Drag and Drop):**
    - Selepas log masuk, anda akan dibawa ke *dashboard* pasukan anda.
    - Cari bahagian yang bertajuk **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**.
    - Seret folder yang mengandungi fail-fail projek anda terus ke kawasan tersebut.
4.  **Selesai!** Netlify akan secara automatik memuat naik fail anda dan memberikan anda URL unik (contohnya: `random-name-12345.netlify.app`). Laman web anda kini telah disiarkan dan boleh diakses melalui pautan tersebut.
