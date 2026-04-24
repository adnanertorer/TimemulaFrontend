import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Genel Rapor',
    url: 'genel-rapor.html',
    icon: 'icon-pencil'
  },
  {
    name: 'Müşteriler',
    url: 'musteriler',
    icon: 'icon-pencil'
  },
  {
    name: 'Personeller',
    url: 'personeller',
    icon: 'icon-user'
  },
  {
    name: 'Genel Tanımlar',
    url: '/genel-tanimlar',
    icon: 'icon-settings',
    children: [
      {
        name: 'Kategoriler',
        url: '/genel-tanimlar/kategoriler.html',
        icon: 'icon-layers'
      },
      {
        name: 'Alt Kategoriler',
        url: '/genel-tanimlar/alt-kategoriler.html',
        icon: 'icon-layers'
      },
      {
        name: 'Paketler',
        url: '/genel-tanimlar/paketler.html',
        icon: 'icon-folder-alt'
      },
      {
        name: 'Arama Motorları',
        url: '/genel-tanimlar/arama-motorlari.html',
        icon: 'icon-tag'
      },
      {
        name: 'Personel Tipleri',
        url: '/genel-tanimlar/personel-tipleri.html',
        icon: 'icon-user-following'
      },
      {
        name: 'Şubeler',
        url: '/genel-tanimlar/bayi-tanimlari.html',
        icon: 'icon-home'
      },
      {
        name: 'Dersler',
        url: '/genel-tanimlar/dersler.html',
        icon: 'icon-graduation'
      },
      {
        name: 'Derslikler',
        url: '/genel-tanimlar/derslikler.html',
        icon: 'icon-home'
      },
      {
        name: 'Ders/Sınıf İlişkisi',
        url: '/genel-tanimlar/ders-sinif-iliskisi.html',
        icon: 'icon-organization'
      },
      {
        name: 'Ders/Eğitmen İlişkisi',
        url: '/genel-tanimlar/hizmet-calisan-iliskisi.html',
        icon: 'icon-organization'
      },
      {
        name: 'Eğitmen Mesaileri',
        url: '/genel-tanimlar/egitmen-mesaileri.html',
        icon: 'icon-user-following'
      },
      {
        name: 'Ebeveyn Türleri',
        url: '/genel-tanimlar/ebeveynler.html',
        icon: 'icon-user-female'
      },
      {
        name: 'Genel Sağlık Sorunları',
        url: '/genel-tanimlar/genel-saglik-sorunlari.html',
        icon: 'icon-user-female'
      },
    ]
  },
  {
    name: 'Müşteri İşlemleri',
    url: '/musteri-islemleri',
    icon: 'icon-badge',
    children: [
      {
        name: 'Paket Kaydı',
        url: '/musteri-islemleri/paket-ekle.html',
        icon: 'icon-target'
      }, 
      {
        name: 'Randevu Girişi',
        url: '/musteri-islemleri/randevu-girisi.html',
        icon: 'icon-target'
      },
      {
        name: 'Randevu Ajanda',
        url: '/musteri-islemleri/randevu-ajanda.html',
        icon: 'icon-target'
      }
    ],
  },
  {
    name: 'Eğitmen İşlemleri',
    url: '/egitmen-islemleri',
    icon: 'icon-graduation',
    children: [
      {
        name: 'Eğitmen Dersleri',
        url: '/egitmen-islemleri/dersler.html',
        icon: 'icon-organization'
      }
    ],
  },
  {
    name: 'Actual Hareketler',
    url: '/actual-hareketler',
    icon: 'icon-graduation',
    children: [
      {
        name: 'Öğrenci Listesi',
        url: '/actual-hareketler/ogrenci-listesi.html',
        icon: 'icon-list'
      },
      {
        name: 'Eğitmen Listesi',
        url: '/actual-hareketler/egitmen-listesi.html',
        icon: 'icon-list'
      }
    ],
  },
  {
    name: 'Finansal Tanımlar',
    url: '/finansal-tanimlar',
    icon: 'icon-calculator',
    children: [
      {
        name: 'Kasa Tanımları',
        url: '/finansal-tanimlar/kasa-tanimlari.html',
        icon: 'icon-lock'
      },
      {
        name: 'Kasa Hareketleri',
        url: '/finansal-tanimlar/kasa-hareketleri.html',
        icon: 'icon-lock'
      },
      {
        name: 'Cari Hesap Hareketleri',
        url: '/cari-hesaplar/hesap-hareketleri.html',
        icon: 'icon-graph'
      },
      {
        name: 'Hakediş Hareketleri',
        url: '/finansal-tanimlar/hakedis-hareketleri.html',
        icon: 'icon-graph'
      },
      {
        name: 'Tahsilat Formu',
        url: '/cari-hesaplar/tahsilat-formu.html',
        icon: 'icon-heart'
      },
      {
        name: 'Vadeli Alacak Tahsilatı',
        url: '/cari-hesaplar/vadeli-alacak-tahsilati.html',
        icon: 'icon-heart'
      },
      {
        name: 'Ödeme Formu',
        url: '/cari-hesaplar/odeme-formu.html',
        icon: 'icon-paper-plane'
      },
      {
        name: 'Tedarikçiler',
        url: '/cari-hesaplar/tedarikciler.html',
        icon: 'icon-size-actual'
      }
    ],
  },
  {
    name: 'Ürünler',
    url: '#',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Ürün Ekle',
        url: '/urunler',
        icon: 'icon-basket-loaded'
      },
      {
        name: 'Ürün İşlemleri',
        url: '/urunler-islemleri',
        icon: 'icon-refresh'
      }
    ],
  },
  {
    name: 'Kullanıcı İşlemleri',
    url: '#',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Kullanıcılar',
        url: '/kullanicilar',
        icon: 'icon-basket-loaded'
      },
    ],
  },
];
