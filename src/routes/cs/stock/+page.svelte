<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade, fly } from 'svelte/transition';
  
  let { data, form } = $props();
  let loadingId = $state(0);

  function formatPrice(val: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  }
</script>

<div class="space-y-8" in:fade>
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div>
      <h1 class="text-4xl font-black text-brand-charcoal tracking-tighter">Stok Harian</h1>
      <p class="text-zinc-500 text-sm mt-1">Kelola ketersediaan porsi menu untuk setiap tanggal layanan.</p>
    </div>
    
    <div class="flex items-center gap-4 bg-white p-2 rounded-2xl border border-zinc-100 shadow-sm">
      <input 
        type="date" 
        value={data.selectedDate} 
        onchange={(e) => window.location.href = `?date=${e.currentTarget.value}`}
        class="bg-transparent border-none outline-none font-black text-brand-charcoal px-4 cursor-pointer"
      />
    </div>
  </div>

  {#if form?.message}
    <div 
      in:fly={{ y: -20 }}
      class="p-4 rounded-xl font-bold text-sm border {form.success ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}"
    >
      {form.message}
    </div>
  {/if}

  <!-- Stock Grid -->
  {#if data.schedules.length === 0}
    <div class="py-32 text-center bg-white rounded-[3rem] border border-dashed border-zinc-200">
      <div class="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h3 class="text-xl font-black text-brand-charcoal uppercase tracking-tight">Belum Ada Jadwal</h3>
      <p class="text-zinc-400 text-sm mt-1 px-10">Silakan hubungi Admin untuk menjadwalkan menu pada tanggal ini.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.schedules as item}
        <div class="bg-white rounded-[2.5rem] border border-zinc-100 p-8 shadow-sm hover:shadow-xl hover:shadow-brand-primary/5 transition-all group overflow-hidden relative">
          <div class="flex items-center gap-6 mb-8">
            <div class="w-20 h-20 bg-zinc-100 rounded-2xl overflow-hidden shadow-inner border border-zinc-50">
              <img src={item.menu.image} alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div>
              <span class="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded-md">{item.menu.category}</span>
              <h3 class="text-xl font-bold text-brand-charcoal leading-tight mt-1">{item.menu.name}</h3>
              <p class="text-sm font-black text-zinc-400 mt-1">{formatPrice(item.basePrice)}</p>
            </div>
          </div>

          <form 
            method="POST" 
            action="?/updateStock" 
            use:enhance={() => {
              loadingId = item.id;
              return async ({ update }) => {
                loadingId = 0;
                update();
              };
            }}
            class="space-y-4"
          >
            <input type="hidden" name="id" value={item.id} />
            <div>
              <label class="block text-[10px] font-black text-zinc-400 uppercase mb-2 tracking-widest">Stok Tersedia (Porsi)</label>
              <div class="relative">
                 <input 
                  type="number" 
                  name="stock" 
                  value={item.currentStock} 
                  required
                  class="w-full pl-6 pr-20 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-black text-brand-charcoal text-lg focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all"
                />
                <button 
                  disabled={loadingId === item.id}
                  class="absolute right-2 top-2 bottom-2 px-6 bg-brand-charcoal text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary transition-all disabled:opacity-50"
                >
                  {loadingId === item.id ? 'Wait' : 'Update'}
                </button>
              </div>
            </div>
          </form>

          <!-- Warning for low stock -->
          {#if item.currentStock < 10}
            <div class="absolute top-4 right-4 animate-pulse">
              <span class="px-3 py-1 bg-red-500 text-white text-[8px] font-black rounded-full uppercase tracking-tighter shadow-lg">Low Stock</span>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
