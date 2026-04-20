<script lang="ts">
  import { page } from '$app/state';
  import { signOut } from '@auth/sveltekit/client';
  
  const user = $derived(page.data.session?.user);
</script>

<div class="min-h-screen bg-zinc-900 text-white p-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <header class="flex justify-between items-center mb-12">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight">Admin <span class="text-brand-primary">Control Hub</span></h1>
        <p class="text-zinc-400">Selamat datang kembali, {user?.name || 'Administrator'}</p>
      </div>
      <button 
        onclick={() => signOut()}
        class="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-semibold"
      >
        Sign Out
      </button>
    </header>

    <!-- Grid -->
    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Card 1 -->
      <div class="bg-zinc-800 border border-zinc-700 p-8 rounded-3xl hover:border-brand-primary transition-all group">
        <div class="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Manajemen User</h3>
        <p class="text-zinc-400 mb-6 italic text-sm">Fitur sedang dalam pengembangan...</p>
        <div class="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
          <div class="h-full bg-brand-primary w-1/3"></div>
        </div>
      </div>

       <!-- Card 2 -->
       <div class="bg-zinc-800 border border-zinc-700 p-8 rounded-3xl hover:border-brand-primary transition-all group">
        <div class="w-12 h-12 bg-orange-100/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Manajemen Menu</h3>
        <p class="text-zinc-400 mb-6 italic text-sm">Fitur sedang dalam pengembangan...</p>
        <div class="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
          <div class="h-full bg-brand-primary w-2/3"></div>
        </div>
      </div>

       <!-- Card 3 -->
       <div class="bg-zinc-800 border border-zinc-700 p-8 rounded-3xl hover:border-brand-primary transition-all group">
        <div class="w-12 h-12 bg-blue-100/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Laporan Keuangan</h3>
        <p class="text-zinc-400 mb-6 italic text-sm">Fitur sedang dalam pengembangan...</p>
        <div class="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
          <div class="h-full bg-blue-400 w-1/4"></div>
        </div>
      </div>
    </div>
  </div>
</div>
