<script>
    const vehicles = [
        {
            id: 43,
            year: 2002,
            make: "Toyota", 
            model: "Supra"
        },
        {
            id: 47,
            year: 2019,
            make: "BMW", 
            model: "M3"
        },
        {
            id: 90,
            year: 2013,
            make: "Lexus", 
            model: "CT 200h"
        },

    ]
</script>


{#each vehicles as vehicle}
    <div>
        <ul class="ul-border">
            <li>{vehicle.id}</li>
            <li>{vehicle.year}</li>
            <li>{vehicle.make}</li>
            <li>{vehicle.model}</li>
        </ul>
    </div>
{/each}

<style>
    .ul-border {
        border: 1px solid black;
        padding: 15px 25px;
    }
</style>