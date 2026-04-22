<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    Search, 
    ChevronLeft, 
    X, 
    Trash2, 
    Eye, 
    Info, 
    Calendar,
    ArrowRight
  } from 'lucide-svelte';

  
  interface Menu {
    id: string;
    name: string;
    description: string | null;
    image: string;
    basePrice: string;
    typeId: string | null;
    categoryId: string | null;
    createdAt: Date;
    type?: { name: string };
    category?: { name: string };
  }

  let { data } = $props<{ data: { menus: Menu[], types: any[], categories: any[] } }>();

  
  // State
  let searchQuery = $state('');
  let selectedType = $state<string | null>(null);
  let selectedMenu = $state<Menu | null>(null);

  let isDeleting = $state<string | null>(null);

  // Derived filtered menus
  let filteredMenus = $derived(
    data.menus.filter((m: Menu) => {
      const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType ? m.typeId === selectedType : true;
      return matchSearch && matchType;
    })
  );

  function formatPrice(val: string) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(parseInt(val));
  }
</script>

<div class="min-h-screen bg-zinc-50 pb-20">
  <!-- Header & Navigation -->
  <div class="bg-white border-b border-zinc-100 px-8 py-8">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <a href="/cs" class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-brand-primary transition-colors mb-2">
          <ChevronLeft size={14} /> Kembali ke Dashboard
        </a>
        <h1 class="text-4xl font-black text-brand-charcoal tracking-tight">Master Menu Management</h1>
        <p class="text-zinc-400 font-medium mt-1">Kelola dan telusuri seluruh aset hidangan Gourmet Hub.</p>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row items-center gap-4">
            <div class="relative w-full sm:w-80 group">
              <label for="menu-search" class="sr-only">Cari Masakan</label>
              <Search class="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                id="menu-search"
                type="text" 
                bind:value={searchQuery}
                placeholder="Cari masakan..." 
                class="w-full pl-14 pr-8 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-brand-charcoal"
              />
            </div>

        
        <div class="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
          <button 
            onclick={() => selectedType = null}
            class="px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap {selectedType === null ? 'bg-brand-charcoal text-white shadow-xl shadow-brand-charcoal/20' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}"
          >
            Semua
          </button>
          {#each data.types as type}
            <button 
              onclick={() => selectedType = type.id}
              class="px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap {selectedType === type.id ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}"
            >
              {type.name}
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Content Grid -->
  <main class="max-w-7xl mx-auto px-8 mt-12">
    {#if filteredMenus.length === 0}
      <div class="flex flex-col items-center justify-center py-40 text-center" in:fade>
        <div class="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-300 mb-6">
          <Search size={48} />
        </div>
        <h3 class="text-2xl font-black text-brand-charcoal">Tidak Ada Menu Ditemukan</h3>
        <p class="text-zinc-400 font-medium mt-2">Coba sesuaikan pencarian atau filter Anda.</p>
        <button onclick={() => { searchQuery = ''; selectedType = null; }} class="mt-8 text-brand-primary font-black uppercase text-[10px] tracking-widest underline underline-offset-8">Reset Semua Filter</button>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {#each filteredMenus as menu (menu.id)}
          <div 
            transition:fly={{ y: 20, duration: 400 }}
            class="group bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all relative"
          >
            <!-- Card Image -->
            <div class="aspect-[4/5] bg-zinc-100 relative overflow-hidden flex items-center justify-center">
              <img 
                src={menu.image} 
                alt={menu.name} 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder-menu.jpg' }}
              />


              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 gap-4">
                <button 
                  onclick={() => selectedMenu = menu}
                  class="w-full py-4 bg-white text-brand-charcoal rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                >
                  <Eye size={14} /> Detail Hidangan
                </button>
                <form 
                  method="POST" 
                  action="?/deleteMenu" 
                  use:enhance={() => {
                    return async ({ result, update }) => {
                      if (result.type === 'success') {
                        isDeleting = null;
                        await update();
                      }
                    };
                  }}

                  class="w-full"
                >
                  <input type="hidden" name="id" value={menu.id} />
                  {#if isDeleting === menu.id}
                    <div class="flex gap-2" in:slide>
                        <button type="submit" class="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Yakin?</button>
                        <button type="button" onclick={() => isDeleting = null} class="px-4 py-4 bg-white/20 backdrop-blur-md text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/30 transition-all">Batal</button>
                    </div>
                  {:else}
                    <button 
                      type="button"
                      onclick={() => isDeleting = menu.id}
                      class="w-full py-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-500 hover:border-red-500 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      <Trash2 size={14} /> Hapus Menu
                    </button>
                  {/if}
                </form>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-8">
              <div class="flex gap-2 mb-4">
                <span class="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg text-[9px] font-black uppercase tracking-wider">{menu.type?.name}</span>
                <span class="px-3 py-1 bg-zinc-100 text-zinc-500 rounded-lg text-[9px] font-black uppercase tracking-wider">{menu.category?.name}</span>
              </div>
              <h3 class="text-2xl font-black text-brand-charcoal leading-tight mb-2 uppercase tracking-tight">{menu.name}</h3>
              <p class="text-zinc-400 text-sm font-medium line-clamp-2 mb-6">{menu.description || 'Tidak ada deskripsi.'}</p>
              
              <div class="flex items-center justify-between pt-6 border-t border-zinc-50">
                <div>
                  <p class="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">Base Price</p>
                  <p class="text-xl font-black text-brand-charcoal italic">{formatPrice(menu.basePrice)}</p>
                </div>
                <div class="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-300 group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:rotate-12">
                   <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </main>

  <!-- Detail Drawer -->
  {#if selectedMenu}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div 
      class="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm z-[100]" 
      onclick={() => selectedMenu = null}
      onkeydown={(e) => e.key === 'Escape' && (selectedMenu = null)}
      role="button"
      tabindex="-1"
      aria-label="Tutup Detail"
      transition:fade
    ></div>


    
    <div 
      class="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-[101] shadow-2xl flex flex-col"
      transition:fly={{ x: 600, duration: 500, opacity: 1 }}
    >
      <div class="relative h-96 overflow-hidden flex items-center justify-center bg-zinc-100">
        <img 
          src={selectedMenu.image} 
          alt={selectedMenu.name} 
          class="w-full h-full object-cover" 
          onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder-menu.jpg' }}
        />


        <button 
          onclick={() => selectedMenu = null}
          class="absolute top-8 right-8 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/40 transition-all"
          aria-label="Tutup"
        >
          <X size={24} />
        </button>

      </div>

      <div class="p-12 flex-1 overflow-y-auto scrollbar-none">
        <div class="flex gap-3 mb-8">
            <span class="px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl text-xs font-black uppercase tracking-widest">{selectedMenu.type?.name}</span>
            <span class="px-4 py-2 bg-zinc-100 text-zinc-500 rounded-xl text-xs font-black uppercase tracking-widest">{selectedMenu.category?.name}</span>
        </div>

        <h2 class="text-5xl font-black text-brand-charcoal mb-6 leading-tight uppercase tracking-tighter">{selectedMenu.name}</h2>
        
        <div class="grid grid-cols-2 gap-8 mb-12">
            <div class="p-6 bg-zinc-50 rounded-[2rem]">
                <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Harga Dasar</p>
                <p class="text-3xl font-black text-brand-primary italic">{formatPrice(selectedMenu.basePrice)}</p>
            </div>
            <div class="p-6 bg-zinc-50 rounded-[2rem]">
                <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Terdaftar Sejak</p>
                <p class="text-xl font-black text-brand-charcoal">{new Date(selectedMenu.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>

        <div class="space-y-6">
            <div>
                <h4 class="flex items-center gap-2 text-xs font-black text-brand-charcoal uppercase mb-4 tracking-widest">
                    <Info size={16} class="text-brand-primary" /> Deskripsi Hidangan
                </h4>
                <p class="text-zinc-500 leading-relaxed font-medium text-lg">
                    {selectedMenu.description || 'Saat ini belum ada deskripsi lengkap untuk menu ini. Deskripsi membantu pelanggan memahami bahan dan rasa hidangan.'}
                </p>
            </div>

            <div class="pt-8 border-t border-zinc-100">
                <h4 class="flex items-center gap-2 text-xs font-black text-brand-charcoal uppercase mb-4 tracking-widest">
                    <Calendar size={16} class="text-brand-primary" /> Statistik Menu
                </h4>
                <div class="space-y-4">
                    <div class="flex justify-between items-center px-6 py-4 bg-zinc-50 rounded-2xl font-bold text-zinc-600">
                        <span>Frekuensi Pesanan</span>
                        <span class="text-brand-charcoal">Coming Soon</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="p-12 bg-zinc-50 flex gap-4">
        <button class="flex-1 py-6 bg-brand-charcoal text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-brand-charcoal/20 hover:scale-[1.02] active:scale-95 transition-all">Edit Menu</button>
        <button class="flex-1 py-6 bg-white border border-zinc-200 text-zinc-500 rounded-[2rem] font-black uppercase tracking-widest hover:border-brand-primary transition-all">Lihat Jadwal</button>
      </div>
    </div>
  {/if}
</div>

<style>
  :global(.scrollbar-none::-webkit-scrollbar) {
    display: none;
  }
  :global(.scrollbar-none) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
