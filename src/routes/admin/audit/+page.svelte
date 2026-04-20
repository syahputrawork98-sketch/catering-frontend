<script lang="ts">
  import { fade } from 'svelte/transition';
  
  let { data } = $props();

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  }
</script>

<div class="space-y-10" in:fade>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
    <div>
      <h1 class="text-4xl font-black text-white tracking-tighter">Audit Trail</h1>
      <p class="text-zinc-500 text-sm mt-1">Rekam jejak setiap aksi administratif di sistem Gourmet Hub.</p>
    </div>

    <!-- Export Dropdown -->
    <div class="relative group">
        <button class="bg-brand-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2 hover:scale-105 transition-all">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Ekspor Log
        </button>
        <div class="absolute right-0 top-full mt-2 w-48 bg-zinc-800 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
            <a href="/admin/api/export?type=audit&format=csv" class="flex items-center gap-3 px-6 py-4 text-xs font-bold text-white hover:bg-white/5 transition-colors">
                <span class="w-6 h-6 bg-green-500/10 text-green-500 rounded flex items-center justify-center text-[8px]">CSV</span>
                Unduh Format CSV
            </a>
            <a href="/admin/api/export?type=audit&format=excel" class="flex items-center gap-3 px-6 py-4 text-xs font-bold text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <span class="w-6 h-6 bg-blue-500/10 text-blue-500 rounded flex items-center justify-center text-[8px]">XLS</span>
                Unduh Format Excel
            </a>
            <a href="/admin/api/export?type=audit&format=pdf" class="flex items-center gap-3 px-6 py-4 text-xs font-bold text-white hover:bg-white/5 transition-colors border-t border-white/5">
                <span class="w-6 h-6 bg-red-500/10 text-red-500 rounded flex items-center justify-center text-[8px]">PDF</span>
                Unduh Format PDF
            </a>
        </div>
    </div>
  </div>

  <div class="bg-zinc-900 border border-white/5 rounded-[2.5rem] p-12 shadow-2xl overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-white/5">
            <th class="pb-6 px-4">Waktu</th>
            <th class="pb-6 px-4">Admin</th>
            <th class="pb-6 px-4">Aksi</th>
            <th class="pb-6 px-4">Entitas</th>
            <th class="pb-6 px-4">Detail</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          {#each data.logs as log}
            <tr class="group hover:bg-white/2 transition-colors">
              <td class="py-6 px-4">
                <p class="text-xs font-bold text-white uppercase tracking-tighter">{formatDate(log.createdAt)}</p>
              </td>
              <td class="py-6 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-brand-primary/20 text-brand-primary rounded-lg flex items-center justify-center font-black text-[10px]">
                    {(log.user?.name ?? '?').charAt(0)}
                  </div>
                  <p class="text-xs font-bold text-white leading-tight">{log.user?.name ?? 'Admin'}</p>
                </div>
              </td>
              <td class="py-6 px-4">
                <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-100 text-brand-charcoal">
                  {log.action}
                </span>
              </td>
              <td class="py-6 px-4">
                <p class="text-xs font-bold text-zinc-400 uppercase tracking-widest">{log.entityType}</p>
              </td>
              <td class="py-6 px-4">
                <p class="text-xs text-zinc-500 line-clamp-1 max-w-[200px]">{log.details || '-'}</p>
              </td>
            </tr>
          {/each}
          {#if data.logs.length === 0}
            <tr>
              <td colspan="5" class="py-20 text-center text-zinc-600 text-sm italic font-medium">Log audit masih kosong.</td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
