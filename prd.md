# Ürün Gereksinimleri Dokümanı (PRD): SürüGözü - Akıllı Çiftlik İzleme Platformu

## 1. Giriş ve Amaç

Bu doküman, çiftlik hayvanlarının sağlık, davranış ve çevresel faktörlerini izlemek amacıyla geliştirilecek olan "SürüGözü" adlı web tabanlı platformun gereksinimlerini tanımlamaktadır. Platform, sensörler aracılığıyla toplanan verileri işleyerek çiftlik yöneticilerine ve ilgili personele anlamlı bilgiler sunmayı, hayvan refahını artırmayı ve operasyonel verimliliği optimize etmeyi hedefler.

## 2. Hedef Kitle

*   **Çiftlik Sahipleri ve Yöneticileri:** Çiftlik operasyonlarının genel sağlığı, verimliliği ve hayvan refahı hakkında karar vericiler.
*   **Veteriner Hekimler:** Hayvan sağlığı takibi, erken teşhis ve tedavi süreçlerinde platformu kullanacak profesyoneller.
*   **Çiftlik Çalışanları:** Günlük hayvan gözlemleri, uyarı takibi ve temel müdahaleler için platformu kullanacak personel.

## 3. Çözülen Problemler ve Fırsatlar

*   Hayvan hastalıklarının erken teşhisinde yaşanan zorluklar ve gecikmeler.
*   Hayvan davranışlarındaki anormal değişikliklerin zamanında fark edilememesi.
*   Üreme süreçlerinin (kızgınlık, doğum) takibindeki verimsizlikler.
*   Hayvanların konum ve güvenlik takibindeki eksiklikler.
*   Çevresel faktörlerin hayvan sağlığı ve verimliliği üzerindeki etkilerinin yeterince izlenememesi.
*   Manuel veri toplama ve analiz süreçlerinin zaman alıcı ve hataya açık olması.
*   **Fırsat:** Teknolojiyi kullanarak proaktif hayvan yönetimi sağlamak, kayıpları azaltmak ve sürdürülebilir çiftçilik uygulamalarını desteklemek.

## 4. Ürün Vizyonu

SürüGözü, modern çiftlikler için vazgeçilmez bir dijital asistan olmayı hedefler. Sensör teknolojileri ve akıllı analizlerle hayvan refahını en üst düzeye çıkarırken, çiftlik operasyonlarını daha verimli, karlı ve yönetilebilir hale getirecektir.

## 5. Temel Özellikler ve Sayfa Yapısı

Platform, kullanıcı dostu bir arayüzle aşağıdaki ana sayfa yapıları üzerinden özelliklere erişim sağlayacaktır:

### 5.1. Kontrol Paneli (Dashboard)

*   **Amaç:** Çiftliğin genel anlık durumu, kritik uyarılar, önemli metriklerin özeti ve hızlı erişim bağlantıları sunmak.
*   **İçerik ve Özellikler (Özet veya Uyarı Olarak):**
    *   **Genel İstatistikler:** Toplam hayvan sayısı, sağlıklı/riskli hayvan sayısı vb.
    *   **Aktif Kritik Uyarılar:** Acil müdahale gerektiren durumların listesi.
    *   **Stres Seviyesi Özeti:** Yüksek stresli hayvan sayısı ve bu hayvanlara hızlı erişim linki.
    *   **Sürünün Sosyal Davranışları Özeti:** Genel sürü uyum skoru veya tespit edilen anormal sosyal dinamikler.
    *   **Kızgınlık Dönemi Takibi Özeti:** Aktif kızgınlıktaki hayvan sayısı ve bu hayvanlara hızlı erişim linki.
    *   **Doğum Anı Tespiti Özeti:** Doğumu yaklaşan veya başlamış olan hayvan sayısı ve bu hayvanlara hızlı erişim linki.
    *   **Boğulma Riski Durumu:** Riskli bölgelerde bulunan hayvan sayısı veya genel risk seviyesi göstergesi.
    *   **Sürüden Uzaklaşma Özeti:** Sürüden ayrılmış veya anormal konumda olan hayvan sayısı ve bu hayvanlara hızlı erişim linki.
    *   **Ortamdaki Gaz Seviyeleri Özeti (Opsiyonel):** Kritik seviyede olan amonyak, metan gibi gazların genel durumu veya uyarısı.
    *   **Hızlı Erişim Kartları/Grafikler:** En sık kullanılan veya en kritik metrikler için görsel özetler.

### 5.2. Hayvan Listesi Sayfası

*   **Amaç:** Çiftlikteki tüm hayvanların kapsamlı bir listesini sunmak; filtreleme, arama ve sıralama işlevleriyle belirli hayvanlara kolayca ulaşılmasını sağlamak; her hayvan için temel durum göstergelerini sunmak.
*   **İçerik ve Özellikler:**
    *   **Listeleme:** Hayvan ID/Küpe No, Adı, Türü, Irkı, Yaşı, Cinsiyeti gibi temel bilgiler.
    *   **Filtreleme:** Tür, yaş, sağlık durumu, grup, kızgınlık durumu gibi kriterlere göre.
    *   **Arama:** Hayvan adı veya küpe numarasına göre.
    *   **Sıralama:** Farklı sütunlara göre artan/azalan.
    *   **Hızlı Durum Göstergeleri (Her Hayvan İçin):**
        *   **Sağlık Skoru/Durumu:** Renk kodlaması veya ikon (Vücut Sıcaklığı, Nabız, Stres Seviyesi gibi metriklerden türetilebilir).
        *   **Kızgınlık Durumu:** İkon veya metin.
        *   **Sürüden Uzaklaşma Durumu:** İkon veya metin.
        *   **Konum:** Harita üzerinde hızlı bakış veya riskli bölge uyarısı ikonu.
    *   Her hayvan için Hayvan Detay Sayfası'na yönlendiren link/buton.

### 5.3. Hayvan Detay Sayfası (Sekmeli Yapı)

*   **Amaç:** Seçilen tek bir hayvan hakkında mevcut tüm verilerin, geçmiş kayıtların, analizlerin ve ilgili eylemlerin detaylı bir şekilde sunulması.
*   **Sekmeler ve İlgili Özellikler:**
    *   **5.3.1. Genel Bilgiler Sekmesi:**
        *   Kimlik Bilgileri: Küpe No, Adı, Türü, Irkı, Cinsiyeti, Doğum Tarihi, Yaşı, Annesi/Babası (varsa).
        *   Fotoğraf (varsa).
        *   Atandığı Grup/Bölüm.
    *   **5.3.2. Sağlık Verileri Sekmesi:**
        *   **Nabız Ölçümü:** Anlık değer, zaman serisi grafiği (günlük, haftalık, aylık), normal aralık dışı uyarılar.
        *   **Vücut Sıcaklığı Takibi:** Anlık değer, zaman serisi grafiği, ateş/hipotermi uyarıları.
        *   **Stres Seviyesi:** Anlık skor/seviye, zaman serisi grafiği, eşik aşımlarında uyarı.
        *   **İlaç Etkisi İzleme:** Uygulanan ilaçların listesi (ad, doz, tarih, uygulayan kişi), tedavi sonrası sağlık metriklerindeki değişimlerin grafiği/notları, tedavi geçmişi.
    *   **5.3.3. Davranışlar Sekmesi:**
        *   **Uyku ve Dinlenme Kalitesi:** Günlük/haftalık toplam dinlenme süresi, dinlenme periyotlarının sayısı ve süresi, (varsa) sensör verisine dayalı kalite skoru.
        *   **Dinlenme / Ayakta Kalma Süresi:** Günlük oran grafiği veya karşılaştırmalı gösterim.
        *   **Geviş Getirme Sayısı:** Günlük/saatlik toplam sayı veya süresi, zaman serisi grafiği, normal aralık dışı uyarılar.
        *   **Adım Sayısı ve Hareketlilik:** Günlük toplam adım sayısı, aktivite seviyesi (düşük, normal, yüksek), aktivite yoğunluğu grafiği.
        *   **Yem Yeme Süresi (Kamera Entegrasyonu):** Günlük toplam yem yeme süresi, yemleme sıklığı. (Kamera entegrasyonu yoksa manuel giriş veya yer tutucu).
    *   **5.3.4. Üreme Takibi Sekmesi:**
        *   **Kızgınlık Dönemi Takibi:** Aktivite, vücut sıcaklığı ve diğer sensör verileriyle tahmin edilen/tespit edilen kızgınlık dönemleri, belirtiler, tohumlama kayıtları.
        *   **Doğum Anı Tespiti:** Beklenen doğum tarihi, doğum belirtilerinin takibi (huzursuzluk, yatış pozisyonu değişiklikleri sensör verileri), doğum başladığında acil uyarı.
        *   **Yavruya Olan İlgi (Annelik Davranışları) (Kamera Entegrasyonu):** Doğum sonrası anne-yavru etkileşim süresi, yalama gibi davranışların sıklığı/süresi. (Kamera entegrasyonu yoksa manuel gözlem notları veya yer tutucu).
    *   **5.3.5. Konum ve Sosyal Davranış Sekmesi:**
        *   **GPS ile Konum Takibi:** Anlık konumun harita üzerinde gösterimi, gün içindeki hareket rotası, geçmiş konum verileri.
        *   **Sürüden Uzaklaşma / Anormal Lokasyon Davranışı:** Belirlenen güvenli alan dışına çıkma veya uzun süreli izolasyon durumunda uyarılar, harita üzerinde görselleştirme.
        *   **Sürünün Sosyal Davranışları (Bu Hayvana İlişkin):** Hayvanın sürü içindeki diğer hayvanlarla etkileşim sıklığı, gruplaşma eğilimleri.
        *   **İneğin Kankalarını Tespit Etme (Opsiyonel):** Yakınlık sensörleri veya GPS verileriyle en çok vakit geçirdiği diğer hayvanların listesi, sosyal ağ haritası (basit).
    *   **5.3.6. Riskler ve Çevre Sekmesi:**
        *   **Boğulma Riski:** Tanımlanmış tehlikeli bölgelere (su kanalı, çamur vb.) yaklaştığında veya girdiğinde uyarı, harita üzerinde gösterim.
        *   **Ortamdaki Gaz Seviyeleri (Amonyak, Metan) (Opsiyonel):** Hayvanın sık bulunduğu bölgelerdeki veya genel ahır/mera ortamındaki gaz seviyelerinin gösterimi (eğer entegre sensörler varsa), eşik aşımlarında uyarı.

### 5.4. Uyarılar (Alerts) Sayfası

*   **Amaç:** Sistem tarafından üretilen tüm aktif ve geçmiş uyarıların merkezi bir yerden takip edilmesi, filtrelenmesi, önceliklendirilmesi ve yönetilmesi.
*   **İçerik ve Özellikler:**
    *   **Uyarı Listesi:** Uyarı türü, ilgili hayvan ID, tarih/saat, ciddiyet seviyesi (kritik, yüksek, orta, düşük), durum (yeni, okundu, çözüldü).
    *   **Filtreleme:** Uyarı türü, ciddiyet seviyesi, tarih aralığı, hayvan ID gibi kriterlere göre.
    *   **Sıralama:** Tarih, ciddiyet gibi kriterlere göre.
    *   **Detay Görüntüleme:** Her uyarı için detaylı bilgi ve ilgili hayvanın detay sayfasına link.
    *   **İşlem Yapma:** Uyarıyı okundu olarak işaretleme, yorum ekleme, çözüldü olarak işaretleme.
    *   **Örnek Uyarı Türleri:** Yüksek Nabız, Ateş, Yüksek Stres, Doğum Başladı, Sürüden Uzaklaşma, Tehlikeli Bölgeye Giriş, Düşük Aktivite, Kızgınlık Tespit Edildi.

### 5.5. Ayarlar (Settings) Sayfası

*   **Amaç:** Platformun genel işleyişi, kullanıcı tercihleri ve çiftlik özelindeki parametrelerin yönetilmesi.
*   **İçerik ve Özellikler:**
    *   **Kullanıcı Yönetimi:** Yeni kullanıcı ekleme, mevcut kullanıcıları düzenleme, rol ve yetki atama.
    *   **Bildirim Tercihleri:** Hangi uyarı türleri için kimlere nasıl bildirim (SMS, e-posta, uygulama içi) gönderileceğinin ayarlanması.
    *   **Sensör Yönetimi (Opsiyonel Arayüz):** Sensörlerin durumu, kalibrasyonu veya hayvanlarla eşleştirilmesi (daha çok teknik bir arayüz olabilir).
    *   **Uyarı Eşikleri:** Her bir izlenen metrik için (vücut sıcaklığı, nabız, aktivite seviyesi vb.) normal aralıkların ve uyarı tetikleme eşiklerinin tanımlanması.
    *   **Çiftlik Bilgileri:** Çiftlik adı, adresi, kapasitesi gibi genel bilgiler.
    *   **Tehlikeli Bölge Tanımlama (Geofencing):** Harita üzerinde boğulma riski olan veya hayvanların girmemesi gereken alanların işaretlenmesi.

### 5.6. Raporlar Sayfası (Opsiyonel ama Önerilir)

*   **Amaç:** Belirli zaman aralıkları veya kriterlere göre hayvan sağlığı, davranışları, üreme performansı ve genel sürü dinamikleri hakkında özet ve detaylı raporlar oluşturmak.
*   **İçerik ve Özellikler:**
    *   **Rapor Türleri (Örnekler):**
        *   Haftalık/Aylık Sağlık Raporu (Ortalama sıcaklık, nabız, stres; tedavi gören hayvan sayısı).
        *   Üreme Performansı Raporu (Kızgınlık tespit oranı, gebelik başarı oranı, doğum aralığı).
        *   Aktivite ve Davranış Raporu (Ortalama adım sayısı, dinlenme süreleri, anormal davranış sıklığı).
        *   Sürü Dinamikleri Raporu.
    *   **Filtreleme ve Parametreler:** Rapor oluşturmak için tarih aralığı, hayvan grubu, tür gibi parametrelerin seçilebilmesi.
    *   **Görselleştirme:** Raporların grafikler, tablolar ve özet metinlerle desteklenmesi.
    *   **Dışa Aktarma:** Raporların PDF veya CSV formatında indirilebilmesi (opsiyonel).

## 6. Kullanıcı Hikayeleri (Örnekler)

*   **Çiftlik Yöneticisi Olarak:** Sabahları kontrol panelime baktığımda, acil müdahale gerektiren hayvanları ve genel sürü sağlığını hızlıca görmek istiyorum.
*   **Veteriner Hekim Olarak:** Belirli bir hayvanın geçmiş sağlık verilerini ve uygulanan tedavileri detaylı bir şekilde inceleyebilmek istiyorum.
*   **Çiftlik Çalışanı Olarak:** Bir hayvanın sürüden ayrıldığına dair anlık bir uyarı almak ve konumunu haritada görebilmek istiyorum.
*   **Çiftlik Yöneticisi Olarak:** Ay sonunda, sürümün üreme performansını özetleyen bir rapor alabilmek istiyorum.

## 7. Başarı Kriterleri (Örnekler)

*   Hayvan hastalıklarında erken teşhis oranında %X artış.
*   Tedavi maliyetlerinde %Y azalma.
*   Kritik durumlara müdahale süresinde %Z kısalma.
*   Kullanıcı memnuniyet anketlerinde yüksek puanlar.
*   Platformun günlük aktif kullanıcı sayısı.

## 8. Varsayımlar ve Kısıtlamalar

*   Hayvanlara takılacak sensörlerin veri doğruluğu ve güvenilirliği kabul edilmektedir.
*   Sensörlerden veri akışının kesintisiz olacağı varsayılmaktadır (veya kesintilere karşı sistemin toleranslı olacağı).
*   Kamera entegrasyonu gerektiren özellikler (Yem Yeme Süresi, Yavruya İlgi) için uygun altyapının (kamera, internet bağlantısı, görüntü işleme kapasitesi) mevcut olduğu veya sağlanacağı varsayılmaktadır. Bu özellikler MVP (Minimum Viable Product) kapsamı dışında olabilir.
*   Geliştirme süresi ve bütçe kısıtlamaları, özelliklerin önceliklendirilmesini gerektirebilir.

## 9. Gelecek Geliştirmeler (MVP Sonrası)

*   Mobil uygulama (iOS ve Android).
*   Makine öğrenmesi tabanlı tahminleme modelleri (hastalık erken uyarısı, doğum zamanı tahmini).
*   Yem ve ilaç envanter takibi.
*   Diğer çiftlik yönetim sistemleriyle entegrasyon.
*   Daha gelişmiş raporlama ve analitik araçları.

## 10. Açık Sorular

*   Kullanıcı rolleri ve yetkilendirme seviyeleri ne kadar detaylı olmalı?
*   Hangi sensör markaları/modelleri ile öncelikli entegrasyon sağlanmalı?
*   Kamera verilerinin işlenmesi (yerel mi, bulutta mı) nasıl bir altyapı gerektirecek? 