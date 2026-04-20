<script lang="ts">
  import { enhance } from '$app/forms';
  import { fade } from 'svelte/transition';
  
  let { data, form } = $props();
  let loading = $state(false);

  function formatPrice(val: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  }
</script>

<div class="space-y-10" in:fade>
  <!-- Financial Header Stats -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    <!-- Revenue -->
    <div class="bg-zinc-800/50 border border-white/5 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
      <div class="relative z-10">
        <p class="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Total Omzet</p>
        <h3 class="text-3xl font-black text-white">{formatPrice(data.stats.revenue)}</h3>
        <p class="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-tighter">Gross dari {data.stats.totalOrders} Pesanan Lunas</p>
      </div>
      <div class="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-all">
        <svg class="w-16 h-16 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>

    <!-- Expense -->
    <div class="bg-zinc-800/50 border border-white/5 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
      <div class="relative z-10">
        <p class="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">Total Belanja (HPP)</p>
        <h3 class="text-3xl font-black text-white">{formatPrice(data.stats.expense)}</h3>
        <p class="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-tighter">Log Pengeluaran Operasional</p>
      </div>
      <div class="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 group-hover:opacity-20 transition-all text-red-500">
        <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    </div>

    <!-- Net Profit -->
    <div class="bg-brand-primary p-8 rounded-[2rem] shadow-2xl shadow-brand-primary/20 relative overflow-hidden group">
        <div class="relative z-10">
          <p class="text-[10px] font-black text-white/60 uppercase tracking-widest mb-2">Keuntungan Bersih</p>
          <h3 class="text-3xl font-black text-white">{formatPrice(data.stats.revenue - data.stats.expense)}</h3>
          <p class="text-[10px] text-white/60 mt-1 uppercase font-bold tracking-tighter">V1 Net Profit Margin</p>
        </div>
        <div class="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-30 transition-all text-white">
          <svg class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
  </div>

  <!-- Tools Section -->
  <div class="grid lg:grid-cols-5 gap-8">
    
    <!-- Financial Tools (Expense Logging) -->
    <div class="lg:col-span-2 space-y-8">
      <div class="bg-zinc-900 border border-white/5 p-10 rounded-[2rem] shadow-2xl">
        <div class="mb-10">
          <h2 class="text-2xl font-black text-white tracking-tighter">Catat Belanja</h2>
          <p class="text-zinc-500 text-xs mt-1">Input pengeluaran belanja bahan baku atau operasional.</p>
        </div>

        <form 
          method="POST" 
          action="?/logExpense" 
          use:enhance={() => {
            loading = true;
            return async ({ update }) => {
              loading = false;
              update();
            };
          }}
          class="space-y-6"
        >
          <div class="space-y-4">
            <div>
              <label class="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Nominal Belanja (IDR)</label>
              <input name="amount" required type="number" placeholder="E.g. 2000000" class="w-full px-6 py-4 bg-zinc-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-bold" />
            </div>
            <div>
              <label class="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Keterangan / Item</label>
              <input name="description" required type="text" placeholder="E.g. Belanja Daging & Sayur Pasar" class="w-full px-6 py-4 bg-zinc-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-bold" />
            </div>
            <div>
              <label class="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Tanggal Belanja</label>
              <input name="date" required type="date" value={new Date().toISOString().split('T')[0]} class="w-full px-6 py-4 bg-zinc-800 border border-white/5 rounded-2xl text-white outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all font-bold" />
            </div>
          </div>

          {#if form?.message}
            <p class="text-xs font-bold {form?.success ? 'text-green-500' : 'text-red-500'}">{form.message}</p>
          {/if}

          <button 
            disabled={loading}
            class="w-full py-4 bg-zinc-100 text-brand-charcoal rounded-2xl font-black shadow-xl hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-3"
          >
            {#if loading}
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            {:else}
              Simpan Pengeluaran
            {/if}
          </button>
        </form>
      </div>

      <!-- Quick Stats -->
      <div class="bg-zinc-800/20 border border-white/5 p-8 rounded-[2rem] flex justify-around items-center">
        <div class="text-center">
          <p class="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Klien Instansi</p>
          <p class="text-xl font-black text-white">{data.stats.instansiCount}</p>
        </div>
        <div class="w-[1px] h-10 bg-white/5"></div>
        <div class="text-center">
          <p class="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Total User</p>
          <p class="text-xl font-black text-white">{data.stats.totalUsers}</p>
        </div>
      </div>
    </div>

    <!-- History Audit Stack -->
    <div class="lg:col-span-3 space-y-8">
      <!-- Recent Expenses (Belanja) -->
      <div class="bg-zinc-900 border border-white/5 p-10 rounded-[2rem] shadow-2xl flex flex-col">
        <div class="mb-10 flex justify-between items-center">
           <div>
             <h2 class="text-2xl font-black text-white tracking-tighter">Log Belanja Terakhir</h2>
             <p class="text-zinc-500 text-xs mt-1">Audit pengeluaran operasional terbaru.</p>
           </div>
        </div>

        <div class="space-y-3">
           {#if data.recentExpenses.length === 0}
             <p class="text-zinc-600 text-xs italic py-10 text-center">Belum ada catatan belanja.</p>
           {:else}
             {#each data.recentExpenses as exp}
               <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-red-500/30 transition-all">
                 <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center font-black">
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-white text-sm font-bold leading-tight">{exp.description}</p>
                      <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{new Date(exp.expenseDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                    </div>
                 </div>
                 <p class="text-red-400 font-black text-sm">-{formatPrice(Number(exp.amount))}</p>
               </div>
             {/each}
           {/if}
        </div>
      </div>

      <!-- Recent Account Audit -->
      <div class="bg-zinc-900/50 border border-white/5 p-10 rounded-[2rem] shadow-2xl flex flex-col">
        <div class="mb-10 flex justify-between items-center">
           <div>
             <h2 class="text-xl font-black text-white tracking-tighter opacity-60">Audit Pengguna Terbaru</h2>
           </div>
           <a href="/admin/users" class="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline">Kelola Penuh</a>
        </div>

        <div class="space-y-3 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
           {#each data.recentUsers as user}
             <div class="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group">
               <div class="flex items-center gap-4">
                  <div class="w-8 h-8 bg-brand-primary/20 text-brand-primary rounded-lg flex items-center justify-center font-black text-[10px]">
                    {(user.name ?? '?').charAt(0)}
                  </div>
                  <div>
                    <p class="text-white text-xs font-bold leading-tight">{user.name ?? 'Anonymous'}</p>
                    <p class="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{user.category}</p>
                  </div>
               </div>
               <span class="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest {user.status === 'ACTIVE' ? 'bg-green-500/10 text-green-500' : 'bg-zinc-500/10 text-zinc-500'}">
                 {user.status}
               </span>
             </div>
           {/each}
        </div>
      </div>
    </div>
  </div>
</div>
