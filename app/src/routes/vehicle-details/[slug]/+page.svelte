<script>
    import { page } from '$app/stores';
    console.log($page.params)
</script>
  <h1>Page param is: {$page.params.slug}</h1>