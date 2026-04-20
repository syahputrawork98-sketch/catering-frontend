<script lang="ts">
  import { page } from '$app/state';
  import { signOut } from '@auth/sveltekit/client';
  import { enhance } from '$app/forms';
  
  const user = $derived(page.data.session?.user);
  let { data } = $props();
</script>

<div class="min-h-screen bg-white text-zinc-900">
  <!-- Top Bar -->
  <nav class="border-b border-zinc-100 bg-zinc-50/50 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">C</div>
        <span class="text-xl font-bold text-brand-charcoal">CS <span class="text-brand-primary">Portal</span></span>
      </div>
      <div class="flex items-center gap-6">
        <div class="text-right">
          <p class="text-sm font-bold text-brand-charcoal">{user?.name || 'CS Agent'}</p>
          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Online</span>
        </div>
        <button 
          onclick={() => signOut()}
          class="text-zinc-500 hover:text-red-500 font-medium transition-colors"
        >
          Keluar
        </button>
      </div>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto p-8">
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-brand-charcoal mb-2">Pusat Layanan Pelanggan</h2>
      <p class="text-zinc-500">Kelola pesanan masuk dan bantuan pelanggan secara real-time.</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- Order Request Queue -->
      <div class="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-zinc-100 bg-brand-primary/5">
          <h3 class="font-bold flex items-center">
            <svg class="w-5 h-5 mr-2 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Antrian Pesanan Baru
          </h3>
        </div>
        <div class="flex-1 p-12 flex flex-col items-center justify-center text-center">
           <div class="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
             <svg class="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
             </svg>
           </div>
           <p class="text-zinc-500 italic">Belum ada pesanan masuk...</p>
        </div>
      </div>

      <!-- Live Chat Support -->
      <div class="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-zinc-100 bg-blue-50">
          <h3 class="font-bold flex items-center text-blue-700">
            <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Bantuan Live Chat
          </h3>
        </div>
        <div class="flex-1 p-12 flex flex-col items-center justify-center text-center">
          <div class="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
             <svg class="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
             </svg>
           </div>
           <p class="text-zinc-500 italic">Antrian bantuan kosong...</p>
        </div>
      </div>
    </div>

    <!-- Manajemen Katalog Menu Section -->
    <div class="mt-8 pt-8 border-t border-zinc-100">
      <h3 class="text-2xl font-bold text-brand-charcoal mb-6">Manajemen Katalog Menu</h3>
      
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Form Add Menu -->
        <div class="lg:col-span-1 bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 group hover:border-brand-primary/20 transition-all">
          <h4 class="font-bold text-brand-charcoal mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tambah Menu Baru
          </h4>
          
          <form method="POST" action="?/createMenu" use:enhance class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-zinc-400 uppercase mb-1">Nama Makanan</label>
              <input type="text" name="name" required placeholder="Contoh: Nasi Bakar Ayam" class="w-full px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
            </div>
            
            <div>
              <label class="block text-xs font-bold text-zinc-400 uppercase mb-1">Kategori</label>
              <select name="category" class="w-full px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all">
                <option>Nasi Kotak</option>
                <option>Bento Box</option>
                <option>Healthy Salad</option>
                <option>Snack</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-zinc-400 uppercase mb-1">Harga Dasar (Rp)</label>
              <input type="number" name="price" required placeholder="25000" class="w-full px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all" />
            </div>

            <div class="pt-2">
              <button type="submit" class="btn-primary w-full shadow-lg shadow-brand-primary/20">Simpan ke Master Menu</button>
            </div>
          </form>
        </div>

        <!-- Master Menu List (Summary) -->
        <div class="lg:col-span-2 bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
          <div class="p-6 border-b border-zinc-100 flex justify-between items-center">
            <h4 class="font-bold text-brand-charcoal">Master Menu (Terdaftar)</h4>
            <span class="text-xs font-medium text-zinc-400">Total: {data.menus?.length || 0} Item</span>
          </div>
          <div class="p-6 h-[400px] overflow-y-auto">
            <div class="space-y-3">
              {#if data.menus && data.menus.length > 0}
                {#each data.menus as item}
                  <div class="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:border-brand-primary/20 transition-colors">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 bg-zinc-200 rounded-xl overflow-hidden">
                        {#if item.image}
                          <img src={item.image} alt="" class="w-full h-full object-cover" />
                        {/if}
                      </div>
                      <div>
                        <p class="font-bold text-brand-charcoal leading-tight">{item.name}</p>
                        <p class="text-xs text-brand-primary font-medium">{item.category}</p>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                      <p class="font-bold text-zinc-500 text-sm">Rp {parseInt(item.basePrice).toLocaleString()}</p>
                      <button class="text-zinc-400 hover:text-brand-primary">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                {/each}
              {:else}
                <div class="py-10 text-center text-zinc-400 italic">Belum ada master menu terdaftar.</div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
  </main>
</div>
