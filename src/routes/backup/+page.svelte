<script lang="ts">
  import { hrtData } from "$lib/storage.svelte";
  import { HRT_STORAGE_KEY } from "$lib/types";

  let importError = $state("");
  let importSuccess = $state("");
  let exportSuccess = $state("");

  function hasData() {
    return (
      hrtData.data.bloodTests.length > 0 ||
      hrtData.data.dosageHistory.length > 0
    );
  }

  function exportToJSON() {
    const dataStr = JSON.stringify(hrtData.data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hrt-backup-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    exportSuccess = "successfully exported";
    setTimeout(() => (exportSuccess = ""), 3000);
  }

  function handleImport(e: Event) {
    importError = "";
    importSuccess = "";
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        localStorage.setItem(HRT_STORAGE_KEY, JSON.stringify(parsed));
        hrtData.data = parsed;
        importSuccess = "successfully imported";
        setTimeout(() => (importSuccess = ""), 3000);
      } catch (err) {
        importError = "Failed to import file. Make sure it's a valid JSON.";
      }
    };
    reader.readAsText(file);
    target.value = "";
  }
</script>

<div class="p-10 flex flex-col space-y-2 sm:space-y-10">
  <div
    class="flex flex-col sm:flex-row sm:justify-between space-y-10 sm:space-y-0 mb-2"
  >
    <h1 class="text-4xl">backup / export</h1>
    <a
      class="text-latte-rose-pine-iris dark:text-rose-pine-iris hover:text-rose-pine-love transition-colors"
      href="/view">view all tests</a
    >
  </div>

  {#if !hasData()}
    <p class="text-gray-500 italic">no data yet</p>
  {:else}
    <div
      class="border rounded-lg p-4 bg-white dark:bg-rose-pine-surface shadow-md"
    >
      <h2 class="text-2xl mb-4">export data to json</h2>
      <p class="mb-4 text-sm opacity-75">
        Download your blood tests and dosage history as a JSON file for backup
        or sharing.
      </p>
      <button
        class="cursor-pointer bg-latte-rose-pine-foam hover:bg-rose-pine-pine text-white font-medium py-2 px-4 rounded transition-colors"
        onclick={exportToJSON}
      >
        download backup
      </button>
      {#if exportSuccess}
        <p class="mt-2 text-green-600">{exportSuccess}</p>
      {/if}
    </div>

    <div
      class="border rounded-lg p-4 bg-white dark:bg-rose-pine-surface shadow-md"
    >
      <h2 class="text-2xl mb-4">import data from json</h2>
      <p class="mb-4 text-sm opacity-75">
        Upload a previously exported JSON file to restore your data. This will
        replace your current data.
      </p>
      <input
        type="file"
        accept=".json"
        onchange={handleImport}
        class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-latte-rose-pine-foam file:text-white hover:file:bg-rose-pine-pine"
      />
      {#if importError}
        <p class="mt-2 text-red-600">{importError}</p>
      {/if}
      {#if importSuccess}
        <p class="mt-2 text-green-600">{importSuccess}</p>
      {/if}
    </div>
  {/if}
</div>
