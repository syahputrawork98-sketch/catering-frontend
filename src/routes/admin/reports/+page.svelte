<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  
  let { data } = $props();

  function formatPrice(val: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  }

  const profit = $derived(data.stats.revenue - data.stats.expense);
  const margin = $derived(data.stats.revenue > 0 ? (profit / data.stats.revenue) * 100 : 0);
</script>

<div class="space-y-10" in:fade>
  <!-- Main Financial Summary -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 bg-zinc-900 border border-white/5 rounded-[2.5rem] p-12 relative overflow-hidden shadow-2xl">
      <div class="relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <h1 class="text-4xl font-black text-white tracking-tighter">Laporan Keuangan Global</h1>
            
            <!-- Export Dropdown -->
            <div class="relative group">
                <button class="bg-brand-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Ekspor Data
                </button>
                <div class="absolute right-0 top-full mt-2 w-48 bg-zinc-800 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    <a href="/admin/api/export?type=reports&format=csv" class="flex items-center gap-3 px-6 py-4 text-xs font-bold text-white hover:bg-white/5 transition-colors">
                        <span class="w-6 h-6 bg-green-500/10 text-green-500 rounded flex items-center justify-center text-[8px]">CSV</span>
                        Unduh Format CSV
                    </a>
                    <a href="/admin/api/export?type=reports&format=excel" class="flex items-center gap-3 px-6 py-4 text-xs font-bold text-white hover:bg-white/5 transition-colors border-t border-white/5">
                        <span class="w-6 h-6 bg-blue-500/10 text-blue-500 rounded flex items-center justify-center text-[8px]">XLS</span>
                        Unduh Format Excel
                    </a>
                    <a href="/admin/api/export?type=reports&format=pdf" class="flex items-center gap-3 px-6 py-4 text-xs font-bold text-white hover:bg-white/5 transition-colors border-t border-white/5">
                        <span class="w-6 h-6 bg-red-500/10 text-red-500 rounded flex items-center justify-center text-[8px]">PDF</span>
                        Unduh Format PDF
                    </a>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <p class="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2">Total Pendapatan (Omzet)</p>
            <p class="text-5xl font-black text-white">{formatPrice(data.stats.revenue)}</p>
            <p class="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest">Dari {data.stats.orderCount} pesanan lunas</p>
          </div>
          <div>
            <p class="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Total Pengeluaran (Belanja)</p>
            <p class="text-5xl font-black text-white">{formatPrice(data.stats.expense)}</p>
            <p class="text-[10px] text-zinc-500 mt-2 font-bold uppercase tracking-widest">Dari {data.stats.expenseCount} nota belanja</p>
          </div>
        </div>

        <!-- Trend Bars -->
        <div class="space-y-4">
            <p class="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Trend Omzet Bulanan</p>
            <div class="flex items-end gap-2 h-20">
                {#each data.trends.monthlyRevenue as trend}
                    <div class="flex-1 group relative">
                        <div class="bg-brand-primary/20 w-full rounded-t-lg transition-all group-hover:bg-brand-primary" style="height: {(trend.revenue / (data.stats.revenue || 1)) * 100}%"></div>
                        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-zinc-800 text-[8px] font-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap">
                            {trend.month}: {formatPrice(trend.revenue)}
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="mt-12 pt-8 border-t border-white/5">
           <div class="flex items-center justify-between">
              <div>
                <p class="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Keuntungan Bersih (Gourmet Profit)</p>
                <p class="text-3xl font-black {profit >= 0 ? 'text-green-500' : 'text-red-500'}">{formatPrice(profit)}</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Profit Margin</p>
                <p class="text-3xl font-black text-white">{margin.toFixed(1)}%</p>
              </div>
           </div>
        </div>
      </div>
      <!-- Decorative Gradient -->
      <div class="absolute top-[-50px] right-[-50px] w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px]"></div>
    </div>

    <!-- Quick Insights -->
    <div class="bg-zinc-800/20 border border-white/5 rounded-[2.5rem] p-10 flex flex-col justify-center gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-lg font-black text-white">Performa Sehat</h3>
        <p class="text-xs text-zinc-500 mt-1">Sistem mendeteksi stabilitas keuangan V1 Anda dalam kondisi terjaga.</p>
      </div>
    </div>
  </div>

  <!-- Detailed Logs -->
  <div class="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-2xl font-black text-white tracking-tighter">Buku Kas (Log Belanja)</h2>
        <p class="text-sm text-zinc-500 mt-1">Audit mendalam setiap rupiah yang keluar untuk operasional.</p>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5">
            <th class="pb-4 px-6">Tanggal</th>
            <th class="pb-4 px-6">Keterangan Belanja</th>
            <th class="pb-4 px-6">Kategori</th>
            <th class="pb-4 px-6 text-right">Nominal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each data.allExpenses as exp}
            <tr class="group hover:bg-white/5 transition-colors">
              <td class="py-6 px-6">
                <p class="text-xs font-bold text-white uppercase tracking-tighter">{new Date(exp.expenseDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </td>
              <td class="py-6 px-6">
                <p class="text-sm font-black text-white leading-tight">{exp.description}</p>
              </td>
              <td class="py-6 px-6">
                <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-zinc-400">
                  {exp.category}
                </span>
              </td>
              <td class="py-6 px-6 text-right">
                <p class="text-red-500 font-black text-lg">-{formatPrice(Number(exp.amount))}</p>
              </td>
            </tr>
          {/each}
          {#if data.allExpenses.length === 0}
            <tr>
              <td colspan="4" class="py-20 text-center text-zinc-600 text-sm italic font-medium">Buku kas masih kosong. Belum ada catatan belanja.</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
