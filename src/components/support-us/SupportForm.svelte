<script lang="ts">
  import Circle from '@assets/icons/Circle.svelte';
  import { slide } from 'svelte/transition';

  import LoadingDots from './LoadingDots.svelte';
  import progressStore from './progress.store';
  import Spinner from './Spinner.svelte';

  const contributionOptions = [{ value: 10 }, { value: 35 }, { value: 75 }];

  let showForm = $state(false);
  let customContribution = $state<boolean>(false);
  let customContributionValue = $state<null | number>(null);

  let formData = $state({
    agreement: false,
    bic: '',
    city: '',
    contribution: 35,
    country: 'Deutschland',
    email: '',
    firstName: '',
    iban: '',
    lastName: '',
    nameMention: false,
    postalCode: '',
    streetAddress: '',
  });

  let submitting = $state(false);
  let loading = $state(false);
  let submitResult = $state<'error' | 'success' | null>(null);
  let delayed = $state(false);
  let timeout = $state(false);

  async function handleSubmit(event: Event) {
    if (submitting) return;
    submitting = true;
    loading = true;
    delayed = false;
    timeout = false;
    submitResult = null;
    event.preventDefault();
    const formDataSnapshot = $state.snapshot(formData);
    const data = new URLSearchParams();
    for (const [key, value] of Object.entries(formDataSnapshot)) {
      data.append(key, String(value));
    }

    // Log the form data for now
    console.log('Form submitted:', data, 'built from', formDataSnapshot);
    setTimeout(() => {
      if (loading) {
        delayed = true;
      }
    }, 500);
    setTimeout(() => {
      if (loading) {
        timeout = true;
      }
    }, 2000);

    try {
      const response = await fetch('/api/support-us', {
        body: data.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });
      if (response.ok) {
        submitResult = 'success';
      } else {
        submitResult = 'error';
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      submitResult = 'error';
    }
    loading = false;
    delayed = false;
    timeout = false;
    submitting = false;
    document.querySelector('#logo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showForm = false;
    setTimeout(() => {
      progressStore.update((v) => v + formData.contribution);
    }, 1000);
  }
</script>

{#if !showForm}
  <div class="mx-auto flex items-center justify-center">
    {#if submitResult == 'success'}
      <p class="text-green-200">Vielen Dank für deine Spende ❤️</p>
    {:else}
      <button
        type="button"
        onclick={() => (showForm = true)}
        class="inline-flex items-center gap-x-4 bg-green-50 p-4 px-8 font-bold text-white"
      >
        <Circle />
        Fördermitglied werden
      </button>
    {/if}
  </div>
{:else}
  <div transition:slide={{ duration: 500 }} class="mx-auto max-w-3xl pb-4">
    <form onsubmit={handleSubmit} method="POST" class="space-y-8" action="/api/support-us">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Persönliche Informationen</h2>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm/6 font-medium text-gray-900" for="first-name"
                >Vorname</label
              >
              <div class="mt-2">
                <input
                  autocomplete="given-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="first-name"
                  name="firstName"
                  type="text"
                  bind:value={formData.firstName}
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm/6 font-medium text-gray-900" for="last-name"
                >Nachname</label
              >
              <div class="mt-2">
                <input
                  autocomplete="family-name"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="last-name"
                  name="lastName"
                  type="text"
                  bind:value={formData.lastName}
                  required
                />
              </div>
            </div>

            <div class="sm:col-span-6">
              <label class="block text-sm/6 font-medium text-gray-900" for="email">
                E-Mail-Adresse
              </label>
              <div class="mt-2">
                <input
                  autocomplete="email"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="email"
                  name="email"
                  type="email"
                  bind:value={formData.email}
                  required
                />
              </div>
            </div>

            <!-- Address Group -->
            <div class="col-span-full space-y-4">
              <h3 class="text-sm font-semibold text-gray-900">Adresse</h3>
              <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div class="col-span-full">
                  <label class="block text-sm/6 font-medium text-gray-900" for="street-address">
                    Straße + Hausnummer
                  </label>
                  <div class="mt-1">
                    <input
                      autocomplete="street-address"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      id="street-address"
                      name="streetAddress"
                      type="text"
                      bind:value={formData.streetAddress}
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-sm/6 font-medium text-gray-900" for="postal-code">
                    PLZ
                  </label>
                  <div class="mt-1">
                    <input
                      autocomplete="postal-code"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      id="postal-code"
                      name="postalCode"
                      type="text"
                      bind:value={formData.postalCode}
                    />
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm/6 font-medium text-gray-900" for="city">
                    Stadt
                  </label>
                  <div class="mt-1">
                    <input
                      autocomplete="address-level2"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      id="city"
                      name="city"
                      type="text"
                      bind:value={formData.city}
                    />
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label class="block text-sm/6 font-medium text-gray-900" for="country">
                    Land
                  </label>
                  <div class="mt-1">
                    <input
                      autocomplete="country-name"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      id="country"
                      name="country"
                      type="text"
                      bind:value={formData.country}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Förderbeitrag und Bankdaten</h2>
          <p class="mt-1 text-sm/6 text-gray-600">
            Bitte gib deine Bankdaten für die Einzugsermächtigung an.
          </p>

          <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label class="mb-3 block text-sm/6 font-medium text-gray-900" for="contribution">
                Monatlicher Förderbeitrag
              </label>
              <div class="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {#each contributionOptions as option (option.value)}
                  <button
                    type="button"
                    class={[
                      'focus:ring-dark-green rounded-md border px-4 py-2.5 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
                      !customContribution && formData.contribution === option.value
                        ? 'border-dark-green bg-dark-green text-white'
                        : 'border-gray-300 bg-white text-gray-700',
                    ]}
                    onclick={() => {
                      customContribution = false;
                      formData.contribution = option.value;
                    }}
                  >
                    {option.value}€
                  </button>
                {/each}
                <div class="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    id="customContribution"
                    name="customContribution"
                    oninput={(e) => {
                      const newCustomContribution = Number((e.target as HTMLInputElement).value);
                      if (!(newCustomContribution >= 0)) {
                        customContribution = false;
                        customContributionValue = null;
                      } else {
                        customContribution = true;
                        customContributionValue = newCustomContribution;
                      }
                      formData.contribution = newCustomContribution;
                    }}
                    onfocus={() => {
                      customContribution = true;
                    }}
                    onblur={() => {
                      if (customContributionValue == null || customContributionValue <= 0) {
                        customContribution = false;
                        customContributionValue = null;
                      } else if (
                        contributionOptions.some(
                          (option) => option.value === customContributionValue,
                        )
                      ) {
                        customContribution = false;
                        formData.contribution = customContributionValue;
                        customContributionValue = null;
                      }
                    }}
                    min="1"
                    class={[
                      'focus:ring-dark-green block h-full w-full rounded-md border px-4 py-2.5 text-center transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
                      customContribution
                        ? 'border-dark-green bg-dark-green text-white'
                        : 'border-gray-300 bg-white text-gray-700',
                    ]}
                    value={customContributionValue}
                    placeholder="Anderer Betrag"
                  />
                </div>
                <input
                  class="hidden"
                  id="contribution"
                  name="contribution"
                  required
                  value={customContribution ?? formData.contribution}
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm/6 font-medium text-gray-900" for="iban"> IBAN </label>
              <div class="mt-2">
                <input
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="iban"
                  name="iban"
                  placeholder="DE00 0000 0000 0000 0000 00"
                  required
                  type="text"
                  bind:value={formData.iban}
                />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label class="block text-sm/6 font-medium text-gray-900" for="bic"> BIC </label>
              <div class="mt-2">
                <input
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  id="bic"
                  name="bic"
                  placeholder="MARKDEF1100"
                  type="text"
                  bind:value={formData.bic}
                />
                <p class="text-sm/6 text-gray-600 italic">
                  (Nur bei ausländischen Konten notwendig)
                </p>
              </div>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="text-sm/6 font-semibold text-gray-900">SEPA Lastschriftmandat</h3>
            <p class="mt-1 max-w-prose text-sm/6 text-gray-600">
              Ich ermächtige den Verein YoungVision e.V. wiederkehrend Zahlungen von meinem Konto
              mittels Lastschrift einzuziehen. Zugleich weise ich mein Kredit­institut an, die von
              der YoungVision e.V. auf mein Konto gezogenen Lastschriften einzulösen.
            </p>
            <p class="mt-2 text-sm/6 text-gray-600">
              Gläubiger Identifikationsnummer: <span class="font-semibold">DE05ZZZ00001731620</span>
              <br />
              Mandatsreferenz: <span class="italic">wird separat mitgeteilt</span>
            </p>
          </div>
        </div>

        <div class="mt-10 space-y-6">
          <div class="flex gap-3">
            <input
              type="checkbox"
              id="name-mention"
              name="nameMention"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              bind:checked={formData.nameMention}
            />
            <div class="text-sm/6">
              <label class="font-medium text-gray-900" for="name-mention">
                Namentliche Nennung (optional)
              </label>
              <p class="max-w-prose text-gray-500">
                Auf unserer <a
                  class="text-dark-green underline"
                  href="https://www.youngvision.org/"
                  rel="noopener noreferrer"
                  target="_blank">Vereinswebsite</a
                >
                würden wir uns gerne bei dir bedanken. <br />
                Ich bin damit einverstanden, dass ich namentlich genannt werden.
              </p>
            </div>
          </div>

          <div class="flex gap-3">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              required
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              bind:checked={formData.agreement}
            />
            <div class="text-sm/6">
              <label class="font-medium text-gray-900" for="agreement">
                Einverständniserklärung<span class="text-red-600">*</span>
              </label>
              <div>
                <p class="max-w-prose text-gray-500">
                  Ich bin damit einverstanden, dass meine Daten von der Organisation "YoungVision
                  e.V." zum Zweck der Vertragserfüllung im Rahmen der Mitgliedschaft hinterlegt,
                  verarbeitet und genutzt werden.
                </p>
                <p class="mt-2 max-w-prose text-gray-500">
                  Ich bin darauf hingewiesen worden, dass die im Rahmen der vorstehend genannten
                  Zwecke erhobenen personenbezogenen Daten unter Beachtung der
                  EU-Datenschutzgrundverordnung erhoben, verarbeitet, genutzt und übermittelt
                  werden. Ich wurde über meine Rechte als Betroffener unterrichtet.
                </p>
                <p class="mt-2 max-w-prose text-gray-500">
                  Die Einverständniserklärung erfolgt auf freiwilliger Basis. Ich wurde darüber
                  aufgeklärt, dass ich die Einverständniserklärung jederzeit durch schriftliche
                  Mitteilung für die Zukunft widerrufen kann.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {#if submitResult == 'error'}
        <div class="flex max-w-xl flex-col items-center space-y-4 p-4">
          <p class=" text-red-600">
            Das hat nicht geklappt 😟
            <br />
            Bitte versuche es noch einmal oder schreibe uns an
            <a class="text-blue-500 underline" href="mailto:kontakt@youngvision.org"
              >kontakt@youngvision.org</a
            >
          </p>
        </div>
      {/if}
      <div class="mt-6 flex justify-end">
        <button
          class="bg-dark-green flex w-[160px] items-center justify-center rounded-md px-8 py-4 font-bold text-white shadow-sm hover:bg-green-200 focus:ring-2 focus:ring-green-200 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {#if timeout}
            <LoadingDots />
          {:else if delayed}
            <Spinner />
          {:else if submitResult == 'error'}
            Nochmal
          {:else}
            Abschicken
          {/if}
        </button>
      </div>
    </form>
  </div>
{/if}
