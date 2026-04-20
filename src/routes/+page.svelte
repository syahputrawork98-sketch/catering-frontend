<script lang="ts">
  // No complex logic needed for the static parts yet
</script>

<svelte:head>
  <title>Catering Hub | Solusi Katering Profesional & Berkualitas</title>
  <meta name="description" content="Layanan katering terbaik untuk instansi, kantor, dan acara personal dengan cita rasa gourmet." />
</svelte:head>

<main class="relative overflow-hidden">
  <!-- Hero Section -->
  <section class="relative h-[90vh] flex items-center justify-center">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/hero-bg.png" 
        alt="Premium Catering Background" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <div class="max-w-2xl">
        <span class="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-brand-primary uppercase bg-brand-primary/10 rounded-full border border-brand-primary/20">
          #1 Catering Solution in Indonesia
        </span>
        <h1 class="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          Kelezatan <span class="text-brand-primary">Gourmet</span> Untuk Setiap Momen.
        </h1>
        <p class="text-xl text-zinc-300 mb-10 leading-relaxed">
          Menyajikan hidangan berkualitas tinggi dengan standar kebersihan terbaik untuk kebutuhan instansi, kantor, dan acara spesial Anda.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="/register" class="btn-primary flex items-center justify-center">
            Pesan Sekarang
          </a>
          <a href="/login" class="px-8 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all flex items-center justify-center">
            Masuk ke Akun
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-24 bg-white">
    <div class="container mx-auto px-6">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-4xl font-bold mb-4">Mengapa Memilih Kami?</h2>
        <p class="text-zinc-600 text-lg">Kami tidak hanya menyajikan makanan, kami menyajikan pengalaman berkelas bagi Anda dan rekan kerja.</p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <!-- Feature 1 -->
        <div class="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-xl hover:border-brand-primary/20 group">
          <div class="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white text-brand-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/><line x1="6" y1="17" x2="18" y2="17"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">Menu Chef Professional</h3>
          <p class="text-zinc-600 leading-relaxed">Hidangan dikurasi langsung oleh chef berpengalaman dengan bahan-bahan grade A.</p>
        </div>

        <!-- Feature 2 -->
        <div class="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-xl hover:border-brand-primary/20 group">
          <div class="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white text-brand-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">Keamanan Pangan Terjamin</h3>
          <p class="text-zinc-600 leading-relaxed">Sertifikasi Halal dan standar higienitas super ketat di setiap langkah produksi.</p>
        </div>

        <!-- Feature 3 -->
        <div class="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 transition-all hover:shadow-xl hover:border-brand-primary/20 group">
          <div class="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white text-brand-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 class="text-xl font-bold mb-3">Pengiriman Tepat Waktu</h3>
          <p class="text-zinc-600 leading-relaxed">Sistem logistik cerdas memastikan makanan sampai di meja Anda tepat sebelum jam makan.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 bg-brand-charcoal relative overflow-hidden">
    <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-primary/20 blur-[120px] rounded-full"></div>
    <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full"></div>
    
    <div class="container mx-auto px-6 text-center relative z-10">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">Siap Untuk Meningkatkan Standar <br class="hidden md:block"> Makan Siang Kantor Anda?</h2>
      <p class="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">Gabungkan instansi Anda dan nikmati kemudahan manajemen katering harian dalam satu dashboard yang efisien.</p>
      <a href="/register" class="btn-primary inline-flex items-center">
        Daftar Sebagai Instansi Sekarang
      </a>
    </div>
  </section>

  <!-- Footer Footer -->
  <footer class="py-12 bg-white border-t border-zinc-100">
    <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
        <span class="text-xl font-bold text-brand-charcoal">Catering<span class="text-brand-primary">Hub</span></span>
      </div>
      <p class="text-zinc-500 text-sm">© 2026 Catering Hub. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="text-zinc-400 hover:text-brand-primary transition-colors">Instagram</a>
        <a href="#" class="text-zinc-400 hover:text-brand-primary transition-colors">WhatsApp</a>
      </div>
    </div>
  </footer>
</main>
