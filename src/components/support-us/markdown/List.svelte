<script>
  export let ordered;
  export let start;
</script>

{#if ordered}
  <ol class="list-inside" {start}><slot /></ol>
{:else}
  <ul class="list-inside list-disc"><slot /></ul>
{/if}
