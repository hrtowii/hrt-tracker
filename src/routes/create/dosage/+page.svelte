<script lang="ts">
  import { hrtData } from "$lib/storage.svelte";
  import {
    type EstrogenType,
    InjectableEstradiols,
    OralEstradiols,
    Antiandrogens,
    BloodTestUnits,
    type DosageHistoryEntry,
    DosageUnits,
    OralMethod,
    InjectionMethod,
  } from "$lib/types";

  let injectionDateTime = $state("");
  let oralDateTime = $state("");
  let eDose = $state(0);
  let eUnit: DosageUnits = $state(DosageUnits.mg);
  let aaDose = $state(0);
  let aaUnit: DosageUnits = $state(DosageUnits.mg);
  let route: "injection" | "oral" = $state<"injection" | "oral">("injection");
  let estrogen: EstrogenType = $state({
    route: "injection",
    method: InjectionMethod.intramuscular,
    type: InjectableEstradiols.Valerate,
  });

  $effect(() => {
    if (route === "injection") {
      estrogen = {
        route: "injection",
        method: InjectionMethod.intramuscular,
        type: InjectableEstradiols.Valerate,
      };
    } else {
      estrogen = {
        route: "oral",
        method: OralMethod.oral,
        type: OralEstradiols.Valerate,
      };
    }
  });

  let aa: Antiandrogens | "" = $state(Antiandrogens.CPA);

  function enumToDropdownOptions(e: any) {
    return Object.entries(e).map(([key, val]) => ({
      value: val as string,
      label: val as string,
    }));
  }

  const oralOptions = enumToDropdownOptions(OralEstradiols);
  const aaOptions = enumToDropdownOptions(Antiandrogens);
  const injectOptions = enumToDropdownOptions(InjectableEstradiols);
  const oralMethodOptions = enumToDropdownOptions(OralMethod);
  const injectMethodOptions = enumToDropdownOptions(InjectionMethod);
  const unitOptions = enumToDropdownOptions(DosageUnits);

  function handleSubmit(event: Event) {
    event.preventDefault();
    submitDosageForm();
  }

  function submitDosageForm() {
    let newDosageRecord: DosageHistoryEntry;
    const currentDateTime =
      route === "injection" ? injectionDateTime : oralDateTime;

    if (route === "injection") {
      newDosageRecord = {
        date: new Date(currentDateTime).getTime(),
        medicationType: "injectableEstradiol",
        type: estrogen.type as InjectableEstradiols,
        method: estrogen.method as InjectionMethod,
        dose: eDose,
        unit: eUnit,
      };
    } else {
      newDosageRecord = {
        date: new Date(currentDateTime).getTime(),
        medicationType: "oralEstradiol",
        type: estrogen.type as OralEstradiols,
        method: estrogen.method as OralMethod,
        dose: eDose,
        unit: eUnit,
      };

      if (aa !== "") {
        const aaRecord: DosageHistoryEntry = {
          date: Date.now(),
          medicationType: "antiandrogen",
          type: aa,
          dose: aaDose,
          unit: aaUnit,
        };
        hrtData.addDosageRecord(aaRecord);
      }
    }
    hrtData.addDosageRecord(newDosageRecord);
  }
</script>

<div class="p-10 flex flex-col space-y-2 sm:space-y-10">
  <div
    class="flex flex-col sm:flex-row sm:justify-between space-y-5 sm:space-y-0 mb-0"
  >
    <h1 class="text-4xl">set up / record dosage</h1>
    <a
      class="text-latte-rose-pine-iris dark:text-rose-pine-iris hover:text-rose-pine-love transition-colors"
      href="/view">view dosage history</a
    >
  </div>
  <form onsubmit={handleSubmit} class="shadow-md rounded pt-6 pb-8 mb-4">
    <div class="mb-4">
      <span
        class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
      >
        administration method
      </span>
      <label class="inline-flex items-center mr-4">
        <input
          type="radio"
          class="form-radio w-4 h-4 text-latte-rose-pine-foam"
          bind:group={estrogen.route}
          value="injection"
          id="injectionOption"
        />
        <span class="ml-2">Injection</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="radio"
          class="form-radio w-4 h-4 text-latte-rose-pine-foam"
          bind:group={estrogen.route}
          value="oral"
          id="oralOption"
        />
        <span class="ml-2">Oral</span>
      </label>
    </div>

    {#if estrogen.route === "injection"}
      <div class="mb-4 space-y-4">
        <div>
          <label
            class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
            for="injectionDateTime"
          >
            injection date / time
          </label>
          <input
            id="injectionDateTime"
            type="datetime-local"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-latte-rose-pine-text dark:text-rose-pine-text leading-tight focus:outline-none focus:shadow-outline"
            bind:value={injectionDateTime}
            required
          />
        </div>

        <div>
          <label
            class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
            for="injectedHormone"
          >
            injected hormone
          </label>
          <select
            class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
            id="injectedHormone"
            bind:value={estrogen.type}
          >
            {#each injectOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
    {:else}
      <div class="mb-4 space-y-4">
        <div>
          <label
            class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
            for="oralDateTime"
          >
            oral intake date / time
          </label>
          <input
            id="oralDateTime"
            type="datetime-local"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-latte-rose-pine-text dark:text-rose-pine-text leading-tight focus:outline-none focus:shadow-outline"
            bind:value={oralDateTime}
            required
          />
        </div>

        <div class="flex flex-col sm:flex-row md:space-x-4">
          <div class="w-full sm:w-1/2">
            <h3 class="text-lg font-medium mb-2">Estrogen</h3>
            <div class="mb-4">
              <label
                class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                for="consumedHormone1"
              >
                consumed estrogen
              </label>
              <select
                class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
                id="consumedHormone1"
                bind:value={
                  (
                    estrogen as {
                      route: "oral";
                      type: OralEstradiols;
                      method: OralMethod;
                    }
                  ).type
                }
              >
                {#each oralOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
            <div class="mb-4">
              <label
                class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                for="dose"
              >
                dose
              </label>
              <input
                id="dose"
                type="number"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-latte-rose-pine-text dark:text-rose-pine-text leading-tight focus:outline-none focus:shadow-outline"
                bind:value={eDose}
                required
              />
            </div>

            <div class="mb-4">
              <label
                class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                for="oralMethod"
              >
                oral method
              </label>
              <select
                class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
                id="oralMethod"
                bind:value={
                  (
                    estrogen as {
                      route: "oral";
                      type: OralEstradiols;
                      method: OralMethod;
                    }
                  ).method
                }
              >
                {#each oralMethodOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>

            <div class="mb-4">
              <label
                class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                for="unit"
              >
                unit
              </label>
              <select
                class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
                id="unit"
                bind:value={eUnit}
              >
                {#each unitOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
          </div>

          <div class="w-full sm:w-1/2 mt-4 md:mt-0">
            <h3 class="text-lg font-medium mb-2">Antiandrogen</h3>
            <div class="mb-4">
              <label
                class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                for="consumedHormone2"
              >
                consumed antiandrogen
              </label>
              <select
                class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
                id="consumedHormone2"
                bind:value={aa}
              >
                <option value="">None</option>
                {#each aaOptions as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            </div>
            {#if aa !== ""}
              <div class="mb-4">
                <label
                  class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                  for="aaDose"
                >
                  antiandrogen dose
                </label>
                <input
                  id="aaDose"
                  type="number"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-latte-rose-pine-text dark:text-rose-pine-text leading-tight focus:outline-none focus:shadow-outline"
                  bind:value={aaDose}
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
                  for="aaUnit"
                >
                  antiandrogen unit
                </label>
                <select
                  class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
                  id="aaUnit"
                  bind:value={aaUnit}
                >
                  {#each unitOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </select>
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    {#if estrogen.route === "injection"}
      <div class="mb-4">
        <label
          class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
          for="dose"
        >
          dose
        </label>
        <input
          id="dose"
          type="number"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-latte-rose-pine-text dark:text-rose-pine-text leading-tight focus:outline-none focus:shadow-outline"
          bind:value={eDose}
          required
        />
      </div>

      <div class="mb-4">
        <label
          class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
          for="injectionMethod"
        >
          injection method
        </label>
        <select
          class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
          id="injectionMethod"
          bind:value={estrogen.method}
        >
          {#each injectMethodOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>

      <div class="mb-4">
        <label
          class="block text-latte-rose-pine-text dark:text-rose-pine-text text-sm font-medium mb-2"
          for="unit"
        >
          unit
        </label>
        <select
          class="border py-2 px-3 rounded w-full leading-tight bg-white dark:bg-rose-pine-surface text-latte-rose-pine-text dark:text-rose-pine-text"
          id="unit"
          bind:value={eUnit}
        >
          {#each unitOptions as option}
            <option value={option.value}>{option.label}</option>
          {/each}
        </select>
      </div>
    {/if}

    <div class="flex items-center justify-between">
      <button
        class="cursor-pointer bg-latte-rose-pine-foam hover:bg-rose-pine-pine text-white font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:shadow-outline"
        type="submit"
      >
        record dosage
      </button>
    </div>
  </form>
</div>
