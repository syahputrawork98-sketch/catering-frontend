<script lang="ts">
  import MenuHub from '$lib/components/operations/MenuHub.svelte';
  let { data } = $props();
</script>

<MenuHub {data} basePath="/admin" />
