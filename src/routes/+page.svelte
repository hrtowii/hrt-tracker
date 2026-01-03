<script>
  import { hrtData } from "$lib/storage.svelte";

  function hasSetup() {
    return (
      hrtData.data.dosageHistory.length > 0 ||
      hrtData.data.bloodTests.length > 0
    );
  }
</script>

{#if !hasSetup()}
  <div class="p-10 flex flex-col space-y-4 items-center">
    <h1 class="text-2xl sm:text-4xl font-bold sm:underline font-outfit">
      welcome to hrt-tracker!
    </h1>
    <p class="sm:text-lg">
      get started with tracking your doses and blood tests!
    </p>
    <div
      class="border rounded-lg p-6 bg-white dark:bg-rose-pine-surface shadow-md"
    >
      <h2 class="text-xl mb-4">what would you like to do?</h2>
      <div class="flex flex-col space-y-3">
        <a
          class="block text-center bg-latte-rose-pine-foam hover:bg-rose-pine-pine text-white font-medium py-3 px-4 rounded transition-colors"
          href="/create/blood-test"
        >
          add blood test result
        </a>
        <a
          class="block text-center bg-latte-rose-pine-foam hover:bg-rose-pine-pine text-white font-medium py-3 px-4 rounded transition-colors"
          href="/create/dosage"
        >
          record hrt dosage
        </a>
        <a
          class="block text-center border-2 border-latte-rose-pine-foam text-latte-rose-pine-foam hover:bg-latte-rose-pine-foam hover:text-white dark:border-rose-pine-foam dark:text-rose-pine-foam dark:hover:bg-rose-pine-foam dark:hover:text-white font-medium py-3 px-4 rounded transition-colors"
          href="/backup"
        >
          import existing data
        </a>
      </div>
    </div>
  </div>
{:else}
  <div class="p-10 flex flex-col space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-4xl font-bold underline font-outfit">hrt-tracker</h1>
      <span class="text-sm opacity-75">
        {new Date().toLocaleDateString()}
      </span>
    </div>
    <p>quick actions</p>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a
        class="border rounded-lg p-6 bg-white dark:bg-rose-pine-surface shadow-md hover:shadow-lg transition-shadow text-latte-rose-pine-iris dark:text-rose-pine-iris hover:text-rose-pine-love"
        href="/create/dosage"
      >
        <h2 class="text-xl font-medium mb-2">record dosage</h2>
        <p class="text-sm opacity-75">log your daily hrt dose</p>
      </a>
      <a
        class="border rounded-lg p-6 bg-white dark:bg-rose-pine-surface shadow-md hover:shadow-lg transition-shadow text-latte-rose-pine-iris dark:text-rose-pine-iris hover:text-rose-pine-love"
        href="/create/blood-test"
      >
        <h2 class="text-xl font-medium mb-2">add blood test</h2>
        <p class="text-sm opacity-75">add new lab results</p>
      </a>
      <a
        class="border rounded-lg p-6 bg-white dark:bg-rose-pine-surface shadow-md hover:shadow-lg transition-shadow text-latte-rose-pine-iris dark:text-rose-pine-iris hover:text-rose-pine-love"
        href="/view"
      >
        <h2 class="text-xl font-medium mb-2">view progress</h2>
        <p class="text-sm opacity-75">see charts & history</p>
      </a>
    </div>
    <div class="flex flex-col items-start mt-4">
      <a
        class="text-latte-rose-pine-iris dark:text-rose-pine-iris hover:text-rose-pine-love transition-colors"
        href="/backup">backup / import data</a
      >
    </div>
  </div>
{/if}
