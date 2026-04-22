<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly, slide } from 'svelte/transition';
  import { 
    Zap, 
    Clock, 
    AlertTriangle, 
    Users, 
    Plus, 
    Image as ImageIcon, 
    Upload, 
    ChevronRight,
    UtensilsCrossed,
    DollarSign,
    FileText
  } from 'lucide-svelte';
  
  interface MenuType { id: string; name: string; }
  interface Category { id: string; name: string; }
  interface MasterMenu {
    id: string;
    name: string;
    basePrice: string;
    image: string;
    type?: MenuType;
    category?: Category;
  }

  interface Stats {
    ordersToday: number;
    pendingOrders: number;
    lowStockItems: number;
    totalInstansi: number;
  }

  let { data } = $props<{ data: { 
    stats: Stats, 
    types: MenuType[], 
    categories: Category[], 
    menus: MasterMenu[] 
  } }>();


  
  let formLoading = $state(false);
  let imagePreview = $state<string | null>(null);

  function formatPrice(val: string) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(parseInt(val));
  }

  function handleFileChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      imagePreview = URL.createObjectURL(file);
    }
  }
</script>

<div class="space-y-10 pb-20" in:fade>
  <!-- Welcome Banner -->
  <div class="bg-gradient-to-br from-brand-charcoal to-[#1a1a1a] rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-6 bg-white/5 border border-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span class="text-[10px] font-black tracking-[0.2em] uppercase opacity-80">System Live · Operational Mode</span>
      </div>
      <h1 class="text-5xl font-black tracking-tight mb-4 leading-tight">Selamat Datang,<br/><span class="text-brand-primary">Operasional Staf</span></h1>
      <p class="text-zinc-400 max-w-xl font-medium text-lg leading-relaxed">Pusat kendali operasional Gourmet Hub. Kelola master menu dan pantau performa katering secara real-time.</p>
    </div>
    
    <!-- Decorative -->
    <div class="absolute right-[-100px] top-[-100px] w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px]"></div>
    <div class="absolute left-[40%] bottom-[-50px] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Stat 1 -->
    <div class="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div class="relative z-10">
        <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Pesanan Hari Ini</p>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-brand-charcoal leading-none tracking-tighter">{data.stats.ordersToday}</h3>
          <div class="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all transform group-hover:rotate-12">
            <Zap size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div class="absolute -right-4 -bottom-4 opacity-[0.03] transform scale-150 rotate-12 group-hover:scale-125 transition-transform">
        <Zap size={120} />
      </div>
    </div>

    <!-- Stat 2 -->
    <div class="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div class="relative z-10">
        <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Butuh Verifikasi</p>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-orange-500 leading-none tracking-tighter">{data.stats.pendingOrders}</h3>
          <div class="w-12 h-12 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all transform group-hover:rotate-12">
            <Clock size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div class="absolute -right-4 -bottom-4 opacity-[0.03] transform scale-150 rotate-12 group-hover:scale-125 transition-transform">
        <Clock size={120} />
      </div>
    </div>

    <!-- Stat 3 -->
    <div class="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div class="relative z-10">
        <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Stok Menipis</p>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-red-500 leading-none tracking-tighter">{data.stats.lowStockItems}</h3>
          <div class="w-12 h-12 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all transform group-hover:rotate-12">
            <AlertTriangle size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div class="absolute -right-4 -bottom-4 opacity-[0.03] transform scale-150 rotate-12 group-hover:scale-125 transition-transform">
        <AlertTriangle size={120} />
      </div>
    </div>

    <!-- Stat 4 -->
    <div class="bg-white p-8 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
      <div class="relative z-10">
        <p class="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Klien Instansi</p>
        <div class="flex items-end justify-between">
          <h3 class="text-5xl font-black text-blue-600 leading-none tracking-tighter">{data.stats.totalInstansi}</h3>
          <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-12">
            <Users size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>
      <div class="absolute -right-4 -bottom-4 opacity-[0.03] transform scale-150 rotate-12 group-hover:scale-125 transition-transform">
        <Users size={120} />
      </div>
    </div>
  </div>

  <!-- Main Tools Section -->
  <div class="grid lg:grid-cols-2 gap-10">
    <!-- Quick Menu Creator -->
    <div class="bg-white rounded-[2.5rem] border border-zinc-100 p-12 shadow-sm overflow-hidden relative">
      <div class="flex items-center justify-between mb-10">
        <div>
          <h2 class="text-3xl font-black text-brand-charcoal">Registrasi Menu Baru</h2>
          <p class="text-zinc-400 text-xs font-bold mt-1 uppercase tracking-widest">Master Data Controller</p>
        </div>
        <div class="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-300">
          <Plus size={32} strokeWidth={3} />
        </div>
      </div>

      <form 
        method="POST" 
        action="?/createMenu" 
        enctype="multipart/form-data"
        use:enhance={() => {
          formLoading = true;
          return async ({ result, update }) => {
            formLoading = false;
            if (result.type === 'success') {
              imagePreview = null;
              await update();
            }
          };

        }}
        class="space-y-8"
      >
        <!-- Photo Upload & Preview -->
        <div class="relative group">
          <label for="image-upload" class="block text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest ml-1">Unggah Foto Makanan</label>
          <div class="relative aspect-video rounded-[2rem] overflow-hidden border-2 border-dashed border-zinc-200 bg-zinc-50 group-hover:border-brand-primary/30 transition-all cursor-pointer">

            {#if imagePreview}
              <div transition:fade class="w-full h-full relative">
                <img src={imagePreview} alt="Preview" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 flex items-center gap-2">
                    <ImageIcon size={16} />
                    <span class="text-xs font-black uppercase">Ganti Foto</span>
                  </div>
                </div>
              </div>
            {:else}
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-300 group-hover:text-zinc-400 transition-colors">
                <div class="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <Upload size={32} />
                </div>
                <div class="text-center">
                  <p class="font-black uppercase text-[10px] tracking-widest">Pilih atau Seret Foto Ke Sini</p>
                  <p class="text-[9px] font-medium mt-1">Recommended: 800x800px (WebP/JPG)</p>
                </div>
              </div>
            {/if}
            <input 
              id="image-upload"
              type="file" 
              name="image" 
              accept="image/*" 
              onchange={handleFileChange}
              class="absolute inset-0 opacity-0 cursor-pointer"
            />

          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="md:col-span-2">
            <label for="menu-name" class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest ml-1">
              <UtensilsCrossed size={12} /> Nama Masakan
            </label>
            <input id="menu-name" type="text" name="name" required class="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-brand-charcoal text-lg" placeholder="E.g. Salmon Soba & Edamame Box" />
          </div>

          
          <div>
            <label for="menu-type" class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest ml-1">
              Tipe Menu
            </label>
            <div class="relative">
              <select id="menu-type" name="typeId" required class="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-brand-charcoal appearance-none cursor-pointer">

                <option value="" disabled selected>Pilih Tipe</option>
                {#each data.types as type}
                  <option value={type.id}>{type.name}</option>
                {/each}
              </select>
              <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300">
                <ChevronRight size={20} class="rotate-90" />
              </div>
            </div>
          </div>

          <div>
            <label for="menu-category" class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest ml-1">
              Kategori
            </label>
            <div class="relative">
              <select id="menu-category" name="categoryId" required class="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-brand-charcoal appearance-none cursor-pointer">

                <option value="" disabled selected>Pilih Kategori</option>
                {#each data.categories as cat}
                  <option value={cat.id}>{cat.name}</option>
                {/each}
              </select>
              <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-300">
                <ChevronRight size={20} class="rotate-90" />
              </div>
            </div>
          </div>

          <div class="md:col-span-2">
            <label for="menu-price" class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest ml-1">
              <DollarSign size={12} /> Harga Dasar
            </label>
            <div class="relative">
              <div class="absolute left-8 top-1/2 -translate-y-1/2 font-black text-zinc-300">IDR</div>
              <input id="menu-price" type="number" name="price" required class="w-full pl-20 pr-8 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-brand-charcoal text-lg" placeholder="55000" />
            </div>
          </div>


          <div class="md:col-span-2">
            <label for="menu-description" class="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase mb-3 tracking-widest ml-1">
              <FileText size={12} /> Deskripsi Masakan
            </label>
            <textarea id="menu-description" name="description" rows="4" class="w-full px-8 py-5 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all font-bold text-brand-charcoal resize-none" placeholder="Berikan penjelasan singkat mengenai menu ini..."></textarea>
          </div>

        </div>

        <button 
          disabled={formLoading}
          class="w-full py-6 bg-brand-primary text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-brand-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {#if formLoading}
            <div class="animate-spin w-6 h-6 border-4 border-white/30 border-t-white rounded-full"></div>
            Memproses...
          {:else}
            Daftarkan Menu Baru
          {/if}
        </button>
      </form>
    </div>

    <!-- Recent Menus List -->
    <div class="bg-white rounded-[2.5rem] border border-zinc-100 p-12 shadow-sm flex flex-col">
      <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-3xl font-black text-brand-charcoal">Master Menu</h2>
            <p class="text-zinc-400 text-xs font-bold mt-1 uppercase tracking-widest">Aset Menu Terdaftar</p>
          </div>
          <a href="/cs/menu" class="px-6 py-3 bg-zinc-50 rounded-2xl text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center gap-2 group">
            Lihat Semua <ChevronRight size={14} class="group-hover:translate-x-1 transition-transform" />
          </a>
      </div>

      <div class="space-y-5 flex-1 max-h-[800px] overflow-y-auto pr-2 scrollbar-none">
        {#each data.menus as item}
          <div class="flex items-center justify-between p-6 bg-zinc-50 rounded-3xl border border-transparent hover:border-brand-primary/20 hover:bg-white hover:shadow-xl transition-all group cursor-default">
            <div class="flex items-center gap-6">
              <div class="w-20 h-20 bg-zinc-200 rounded-[1.5rem] overflow-hidden shadow-inner relative">
                <img 
                  src={item.image} 
                  alt="" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder-menu.jpg' }}

                />

                <div class="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[1.5rem]"></div>
              </div>
              <div>
                <p class="font-black text-brand-charcoal text-xl leading-tight mb-2">{item.name}</p>
                <div class="flex gap-2">
                    <span class="text-[9px] px-3 py-1 bg-brand-primary/10 text-brand-primary font-black uppercase rounded-lg tracking-wider">{item.type?.name || 'Tipe'}</span>
                    <span class="text-[9px] px-3 py-1 bg-zinc-200/50 text-zinc-500 font-black uppercase rounded-lg tracking-wider">{item.category?.name || 'Kategori'}</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="font-black text-brand-charcoal text-lg tracking-tight mb-1">{formatPrice(item.basePrice)}</p>
              <div class="flex items-center justify-end gap-1 text-[8px] text-zinc-400 font-bold uppercase tracking-widest">
                <DollarSign size={10} /> Base Price
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

