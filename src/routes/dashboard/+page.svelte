<script lang="ts">
  import { page } from '$app/state';
  
  const user = $derived(page.data.session?.user);
</script>

<div class="max-w-6xl mx-auto">
  <!-- Welcome Header -->
  <div class="mb-10">
    <h1 class="text-3xl font-extrabold text-brand-charcoal mb-2">
      Selamat Datang, {user?.name || 'Mitra'}! 👋
    </h1>
    <p class="text-zinc-500">Berikut adalah ringkasan aktivitas katering Anda hari ini.</p>
  </div>

  <!-- Stats Grid -->
  <div class="grid md:grid-cols-3 gap-6 mb-10">
    <div class="glass-card p-6 bg-white border-zinc-200">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-brand-primary">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span class="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Bulanan</span>
      </div>
      <p class="text-sm font-medium text-zinc-500">Total Pesanan</p>
      <h3 class="text-2xl font-bold text-brand-charcoal">24 Pesanan</h3>
    </div>

    <div class="glass-card p-6 bg-white border-zinc-200">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Aktif</span>
      </div>
      <p class="text-sm font-medium text-zinc-500">Jadwal Minggu Ini</p>
      <h3 class="text-2xl font-bold text-brand-charcoal">5 Hari Kerja</h3>
    </div>

    <div class="glass-card p-6 bg-white border-zinc-200">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <span class="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Unpaid</span>
      </div>
      <p class="text-sm font-medium text-zinc-500">Tagihan Berjalan</p>
      <h3 class="text-2xl font-bold text-brand-charcoal">Rp 1.250.000</h3>
    </div>
  </div>

  <!-- Recent Menu / Activity -->
  <div class="grid lg:grid-cols-2 gap-8">
    <div class="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
      <div class="p-6 border-b border-zinc-100 flex items-center justify-between">
        <h3 class="font-bold text-brand-charcoal">Menu Unggulan Besok</h3>
        <button class="text-sm font-bold text-brand-primary">Lihat Kalender</button>
      </div>
      <div class="p-6">
        <div class="flex gap-4 items-center">
          <div class="w-20 h-20 bg-zinc-100 rounded-2xl"></div>
          <div>
            <h4 class="font-bold text-brand-charcoal">Nasi Liwet Special Sunda</h4>
            <p class="text-sm text-zinc-500 mb-2">Ayam Goreng, Tahu, Tempe, Sambal Lalap</p>
            <div class="flex gap-2">
              <span class="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-bold rounded-full uppercase">Main Course</span>
              <span class="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Tersedia</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm">
      <div class="p-6 border-b border-zinc-100">
        <h3 class="font-bold text-brand-charcoal">Aktivitas Terakhir</h3>
      </div>
      <div class="p-6">
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="w-2 h-10 bg-green-500 rounded-full"></div>
            <div>
              <p class="text-sm font-bold text-brand-charcoal">Pesanan Berhasil Dikirim</p>
              <p class="text-xs text-zinc-500">Hari ini, 12:05 WIB</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-2 h-10 bg-brand-primary rounded-full"></div>
            <div>
              <p class="text-sm font-bold text-brand-charcoal">Pesanan Baru Diterima</p>
              <p class="text-xs text-zinc-500">Hari ini, 09:15 WIB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
