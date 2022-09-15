<script>
    import { onMount } from 'svelte';
    import { request, gql } from 'graphql-request';
    import { loading } from '$lib/stores.js';

    let loadingValue;
    let vehicles;
    let error;

    loading.subscribe(value => {
        loadingValue = value;
    });

    const API_URL = import.meta.env.VITE_API_URL;
    const GET_VEHICLES = gql`
        query {
            vehicles {
                vehicleId
                year,
                make,
                model
            }
        }
    `;

    const getVehicles = async () => {
        loading.update(() => true);
        request(API_URL, GET_VEHICLES).then(
            data => vehicles = data.vehicles,
            e => {
                error = e;
            }
        );
        // loading.update(() => false);
    }

    onMount(async () => {
        await getVehicles();
        console.log(vehicles);
    });
    

    // const query = request(API_URL, GET_VEHICLES).then(getVehiclesSuccess, getVehiclesError)

    setTimeout(() => {
        loading.update(() => false);
    }, 3000)

    
</script>


<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation.</p>


{#if !vehicles}
        <div>Loading...</div>
{:else if vehicles}
    All Vehicles:
    {#each vehicles as vehicle}
        <div>
            <ul>
                <li>{vehicle.vehicleId}</li>
                <li>{vehicle.year}</li>
                <li>{vehicle.make}</li>
                <li>{vehicle.model}</li>
            </ul>
        </div>
    {/each}
{:else}
    <p>Something went wrong: {error.message}</p>
{/if}


<!-- {#await query}
        <div>Loading...</div>
{:then data}
    {#each data.vehicles as vehicle}
        <div>
            All Vehicles:
            <ul>
                <li>{vehicle.vehicleId}</li>
                <li>{vehicle.year}</li>
                <li>{vehicle.make}</li>
                <li>{vehicle.model}</li>
            </ul>
        </div>
    {/each}
{:catch error}
    <p>Something went wrong: {error.message}</p>
{/await} -->